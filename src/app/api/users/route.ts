import { db } from "@/lib/db";
import { hashSync } from "bcryptjs";
import _ from "lodash";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const users = await db.user.findMany({
    where: {
      name: {
        contains: name ? name : ""
      }
    }
  });
  const usersWithoutPasswords = _.map(users, (user: any) =>
    _.omit(user, "password")
  );

  return Response.json(usersWithoutPasswords);
}

export async function POST(request: Request) {
  const body = await request.json();
  const passwordHash = hashSync(body.password, 10);

  try {
    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: passwordHash
      }
    });

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "server error" });
  }
}

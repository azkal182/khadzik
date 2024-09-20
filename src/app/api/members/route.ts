import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const members = await db.member.findMany({
    where: {
      name: {
        contains: name ? name : ""
      }
    }
  });

  return Response.json(members);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const member = await db.member.create({
      data: {
        name: body.name,
        address: body.address,
        phone: body.phone,
        saldo: body.saldo
      }
    });
    return Response.json(member);
  } catch (error) {
    return Response.json({ error: "server error" });
  }
}

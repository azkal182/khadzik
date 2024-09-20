import { db } from "@/lib/db";
import { hashSync } from "bcryptjs";
import { NextRequest } from "next/server";
import _ from "lodash";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const user = await db.user.findUnique({
      where: { id: parseInt(id) }
    });

    return Response.json(_.omit(user, "password"));
  } catch (error) {
    return Response.json({ error: "server error" });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await request.json();
  const passwordHash = hashSync(body.password, 10);

  try {
    const user = await db.user.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        email: body.email,
        password: passwordHash
      }
    });

    return Response.json(_.omit(user, "password"));
  } catch (error) {
    return Response.json({ error: "server error" });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const user = await db.user.delete({
      where: { id: parseInt(id) }
    });

    return Response.json(_.omit(user, "password"));
  } catch (error) {
    return Response.json({ error: "server error" });
  }
}

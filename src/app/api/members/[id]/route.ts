import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const member = await db.member.findUnique({
      where: { id: parseInt(id) },
      include: {
        debts: true
      }
    });

    return Response.json(member);
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
  try {
    const member = await db.member.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        address: body.address,
        phone: body.phone
      }
    });

    return Response.json(member);
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
    const member = await db.member.delete({
      where: { id: parseInt(id) }
    });

    return Response.json(member);
  } catch (error) {
    return Response.json({ error: "server error" });
  }
}

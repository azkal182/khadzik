import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const product = await db.product.delete({
      where: { id: parseInt(id) }
    });

    return Response.json(product);
  } catch (error) {
    return Response.json({ error: "server error" });
  }
}

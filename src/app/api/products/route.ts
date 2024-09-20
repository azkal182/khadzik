import { db } from "@/lib/db";

const data = require("@/app/(dashboard)/master-data/data.json");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const products = await db.product.findMany({
    where: {
      name: {
        contains: name ? name : ""
      }
    }
  });

  return Response.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const product = await db.product.create({
      data: {
        name: body.name,
        type: body.type,
        packingPrice: body.packingPrice,
        regularPrice: body.regularPrice,
        description: body.description
      }
    });
    return Response.json(product);
  } catch (error) {
    return Response.json({ error: "server error" });
  }
}

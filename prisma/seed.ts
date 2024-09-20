import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const products = require("./product.json");

type TProduct = {
  id: number;
  name: string;
  type?: string;
  priceReguler?: number;
  pricePlusPack?: number;
};

const prisma = new PrismaClient();
async function main() {
  const password = await hash("admin", 10);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "admin",
      password: password
    }
  });
  const member = await prisma.member.create({
    data: { name: "john doe" }
  });

  const data: any = [];

  products.map(async (item: TProduct, index: number) => {
    const result = await prisma.product.create({
      data: {
        name: item.name,
        type:
          item.type !== undefined && item.type !== "string"
            ? item.type.toString()
            : item.type,
        regularPrice: item.priceReguler as number,
        packingPrice: item.pricePlusPack as number
      }
    });
    data.push(result);
  });

  console.log({ user, data: data.length, member });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

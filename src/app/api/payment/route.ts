import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  const member = await db.member.findUnique({ where: { id: body.memberId } });
  const lastSaldo = member?.saldo;
  const newSaldo = lastSaldo!.toNumber() - parseInt(body.payment);

  try {
    // Membuat transaksi Prisma
    const result = await db.$transaction(async (prisma) => {
      // Update saldo member
      await prisma.member.update({
        where: { id: body.memberId },
        data: {
          saldo: newSaldo
        }
      });

      // Create transaction now
      const transaction = await prisma.transaction.create({
        data: {
          memberId: body.memberId,
          subTotal: body.payment,
          userId: parseInt(body.userId)
        }
      });

      // Create many debts
      const debt = await prisma.debt.create({
        data: {
          userId: parseInt(body.userId),
          memberId: body.memberId,
          name: "Pembayaran",
          credit: parseInt(body.payment),
          remainingDebt: newSaldo
        }
      });

      // Return the result
      return { transaction, debt };
    });

    console.log("Transaction successful:", result);
  } catch (error) {
    console.error("Transaction failed:", error);
    // Handle the error appropriately
  } finally {
    await db.$disconnect();
  }

  //   create many debts
  //   const debts = await db.debt.createMany({ data: finalData });

  //   console.log(JSON.stringify(finalData, null, 2));

  //   console.log(JSON.stringify(body, null, 2));

  return Response.json({ status: "ok" });

  //   try {
  //     const member = await db.member.create({
  //       data: {
  //         name: body.name,
  //         address: body.address,
  //         phone: body.phone,
  //         saldo: body.saldo
  //       }
  //     });
  //     return Response.json(member);
  //   } catch (error) {
  //     return Response.json({ error: "server error" });
  //   }
}

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const transactions = await db.member.findMany({});

  return Response.json(transactions);
}

export async function POST(request: Request) {
  const body = await request.json();
  //   {
  //     "memberId": 2,
  //     "subTotal": 156000,
  //     "data": [
  //       {
  //         "name": "Karet Arm",
  //         "type": null,
  //         "quantity": 6,
  //         "total": 156000
  //       }
  //     ]
  //   }
  // get member for get last saldo
  const member = await db.member.findUnique({ where: { id: body.memberId } });
  const lastSaldo = member?.saldo;
  const newSaldo = lastSaldo!.toNumber() + parseInt(body.subTotal);
  //   update saldo member
  //   await db.member.update({
  //     where: { id: body.id },
  //     data: {
  //       saldo: newSaldo
  //     }
  //   });

  // create transaction now
  //   const transaction = await db.transaction.create({
  //     data: {
  //       memberId: body.memberId,
  //       subTotal: body.subTotal,
  //       userId: 1
  //     }
  //   });

  //   let finalData = [];
  //   create Debts transaction
  //   for (const txn of body.data) {
  // finalData.push({
  //   userId: 1,
  //   memberId: body.memberId,
  //   name: txn.name,
  //   type: txn.type,
  //   qty: txn.quantity,
  //   price: txn.price,
  //   credit: txn.total
  // });
  //   const debts = await db.debt.create({
  //     data: {
  //       userId: 1,
  //       memberId: body.memberId,
  //       name: txn.name,
  //       type: txn.type,
  //       qty: txn.qty,
  //       price: txn.price,
  //       credit: txn.credit ? txn.credit : null,
  //       debit: txn.debit ? txn.debit : null
  //     }
  //   });
  //   }

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
          subTotal: body.subTotal,
          userId: parseInt(body.userId)
        }
      });

      let finalData = [];
      // Create Debts transaction
      for (const txn of body.data) {
        finalData.push({
          userId: parseInt(body.userId),
          memberId: body.memberId,
          name: txn.name,
          qty: txn.quantity,
          price: txn.price,
          debit: txn.total,
          credit: 0,
          remainingDebt: 0,
          ...(txn.type && { type: txn.type })
        });
      }

      // Create many debts
      await prisma.debt.createMany({ data: finalData });

      // Return the result
      return { transaction, debts: finalData };
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

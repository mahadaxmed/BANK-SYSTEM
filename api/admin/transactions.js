import { Router } from "express";
import prisma from "../lib/index.js";

const router = Router();

//____________get all Transactions
router.get("/", async (req, res) => {
  try {
    const transaction = await prisma.transaction.findMany();

    if (!transaction)
      return res.status(404).json({ error: "transaction not found" });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================DEPOSITS LIST============
router.get("/deposits", async (req, res) => {
  try {
    console.log("hello");
    const transaction = await prisma.transaction.findMany({
      where: {
        transType: "deposit",
      },
    });

    if (!transaction)
      return res.status(404).json({ error: "transaction not found" });

    res.json({ DEPOSITS: transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ================WITHDRAWAL LIST============
router.get("/withdrawals", async (req, res) => {
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        transType: "Withdrawal",
      },
    });

    if (!transaction)
      return res.status(404).json({ error: "transaction not found" });

    res.json({ WITHDRAWALS: transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//======dalete Transacton
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("hello");
    const transaction = await prisma.transaction.delete({
      where: {
        Trid: Number(id),
      },
    });

    if (!transaction)
      return res.status(404).json({ error: "transaction not found" });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

///___get indivitual transaction using ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await prisma.transaction.findUnique({
      where: {
        Trid: Number(id),
      },
    });

    if (!transaction)
      return res.status(404).json({ error: "transaction not found" });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  +++++DEPOSIT+++++
router.put("/deposit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { user_id, balance } = req.body;
    const balanceAcc = await prisma.account.findUnique({
      where: {
        accNumber: Number(id),
      },
    });
    const account = await prisma.account.update({
      where: {
        accNumber: Number(id),
      },
      data: {
        balance: Number(balanceAcc.balance) + Number(balance),
      },
    });

    if (!account) return res.status(404).json({ error: "account not found" });

    await prisma.transaction.create({
      data: {
        user: {
          connect: {
            id: Number(user_id),
          },
        },
        account: {
          connect: {
            accNumber: Number(id),
          },
        },
        transType: "deposit",
        amount: balance,
      },
    });

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  +++++WITHDRAW+++++
router.put("/withdraw/:id", async (req, res) => {
  try {
    console.log("hello");
    const { id } = req.params;
    let { user_id, balance } = req.body;
    const balanceAcc = await prisma.account.findUnique({
      where: {
        accNumber: Number(id),
      },
    });
    const account = await prisma.account.update({
      where: {
        accNumber: Number(id),
      },
      data: {
        balance: Number(balanceAcc.balance) - Number(balance),
      },
    });

    if (!account) return res.status(404).json({ error: "account not found" });

    await prisma.transaction.create({
      data: {
        user: {
          connect: {
            id: Number(user_id),
          },
        },
        account: {
          connect: {
            accNumber: Number(id),
          },
        },
        transType: "Withdrawal",
        amount: balance,
      },
    });

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

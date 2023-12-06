import { Router } from "express";
import prisma from "../lib/index";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const account = await prisma.account.findMany();

    if (!account) return res.status(404).json({ error: "account not found" });

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!account) return res.status(404).json({ error: "account not found" });

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { accType, balance, id } = req.body;
    const account = await prisma.account.create({
      data: {
        user: {
          connect: {
            id: Number(id),
          },
        },
        accType,
        balance,
      },
    });

    if (!account) return res.status(404).json({ error: "account not created" });

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.delete({
      where: {
        accNumber: Number(id),
      },
    });

    if (!account) return res.status(404).json({ error: "account not found" });

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////widrawal////////////////////
router.put("/withdraw/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { balance } = req.body;

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

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.delete({
      where: {
        accNumber: Number(id),
      },
    });

    if (!account) return res.status(404).json({ error: "account not found" });

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Depoit

router.put("/", async (req, res) => {
  try {
    const { accType, balance, id } = req.body;
    const account = await prisma.account.update({
      data: {
        user: {
          connect: {
            id: Number(id),
          },
        },
        accType,
        balance,
      },
    });

    if (!account) return res.status(404).json({ error: "account not created" });

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

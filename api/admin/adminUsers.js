const express = require("express");
const prisma = require("../lib/index");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await prisma.user.findMany();

    if (!user) return res.status(404).json({ error: "user not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) return res.status(404).json({ error: "user not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, userType, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        userType,
        email,
        password,
      },
    });

    if (!user) return res.status(404).json({ error: "user not created" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        accNumber: Number(id),
      },
    });

    if (!user) return res.status(404).json({ error: "user not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

///////////////////////Depoit//////////////////////
router.put("/deposit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let { balance } = req.body;
    const user = await prisma.user.update({
      where: {
        accNumber: Number(id),
      },
      data: {
        balance: balance + balance,
      },
    });

    if (!user) return res.status(404).json({ error: "user not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

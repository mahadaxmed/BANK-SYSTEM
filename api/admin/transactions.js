const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from transactions ");
});

router.post("/", (req, res) => {
  res.send("hello from transactions");
});

router.put("/", (req, res) => {
  res.send("hello from transactions");
});

router.delete("/", (req, res) => {
  res.send("hello from transactions");
});

module.exports = router;

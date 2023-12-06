const express = require("express");
const { json } = require("express");
const bodyParse = require("body-parser");

const app = express();
app.use(json());

// routes
const adminRouterUser = require("./api/admin/adminUsers");
const adminRouterTrans = require("./api/admin/transactions");
const adminRouterAcc = require("./api/admin/adminAcc");
const users = require("./api/user/transactions");
const bodyParser = require("body-parser");
const { join } = require("@prisma/client/runtime/library");

app.use("/admin/users", adminRouterUser);
app.use("/admin/accounts", adminRouterAcc);
app.use("/admin/transactions", adminRouterTrans);
app.use("/users", users);

app.use("/", (req, res, next) => {
  res.send("hello node");
});
const port = 700;
app.listen(port);

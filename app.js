import express from "express";
import { json } from "express";

const app = express();
app.use(json());

// routes
import adminRouterUser from "./api/admin/adminUsers";
import adminRouterTrans from "./api/admin/transactions";
import adminRouterAcc from "./api/admin/adminAcc";
import users from "./api/user/transactions";

app.use("/admin/users", adminRouterUser);
app.use("/admin/accounts", adminRouterAcc);
app.use("/admin/transactions", adminRouterTrans);
app.use("/users", users);

app.use("/", (req, res, next) => {
  res.send("hello node");
});
const port = 700;
app.listen(port);

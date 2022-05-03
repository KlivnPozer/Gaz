require("dotenv").config();
require("./database/connect");

const express = require("express");

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/account", require("./routers/account"));
app.use("/event", require("./routers/event"));
app.use("/eventMember", require("./routers/eventMember"));


app.listen(PORT, () => {
    console.log(`SERVER STARTED ON :${PORT}`)
});
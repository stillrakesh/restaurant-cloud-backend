import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 REAL DATA STORAGE (TEMP FIRST VERSION)
let db = {
  menu: [],
  tables: [],
  orders: [],
  sales: []
};

// ======================
// RECEIVE FULL SYNC
// ======================
app.post("/sync", (req, res) => {
  const { menu, tables, orders, sales } = req.body;

  if (menu) db.menu = menu;
  if (tables) db.tables = tables;
  if (orders) db.orders = orders;
  if (sales) db.sales = sales;

  res.json({ success: true, message: "Synced to cloud" });
});

// ======================
// SEND DATA TO POS / DASHBOARD
// ======================
app.get("/sync", (req, res) => {
  res.json(db);
});

// ======================
// BASIC HEALTH CHECK
// ======================
app.get("/", (req, res) => {
  res.send("Cloud POS Backend Running 🚀");
});

// ======================
app.listen(3000, "0.0.0.0", () => {
  console.log("Cloud backend running on port 3000");
});

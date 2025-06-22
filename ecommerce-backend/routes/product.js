import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products LIMIT 3"); //home page
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");

    if (rows.length === 0) {
      return res.status(404).json({ error: "No product found" });
    }

    res.json(rows); // ✅ Send the result rows directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error in /all" });
  }
});

router.get("/:id", async (req, res) => {
  const proId = parseInt(req.params.id);
  if (isNaN(proId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    // Query the database for product by ID
    const result = await pool.query("SELECT * FROM products WHERE ID = ?", [
      proId,
    ]);

    // result is an object; with mysql2/promise, rows are in result[0]
    const rows = result[0];

    if (rows.length === 0) {
      // No product found
      return res.status(404).json({ error: "Product not found" });
    }

    // Send back the first product row
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db error in /id" });
  }
});

export default router;

import express from "express";
const router = express.Router();
import pool from "../config/db.js";   

router.post("/add/:userId", async (req, res) => {
  const userId = req.params.userId; // ✅ from URL
  const { prod_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO cart_items (user_id, product_id) VALUES (?, ?)",
      [userId, prod_id]
    );
    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error("Error inserting into cart:", err); // Debug log
    res.status(500).json({ error: "failed to add to cart" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const [items] = await pool.query(
      `
      SELECT ci.quantity, p.name, p.price, p.imageUrl 
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?`,
      [req.params.userId]
    );
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch cart" });
  }
});
export default router;

import express from "express";
const router = express.Router();
import pool from "../config/db.js";   

router.post("/add/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { prod_id } = req.body;

  try {
    const [[existing]] = await pool.query(
      "SELECT quantity FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, prod_id]
    );

    if (existing) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?",
        [userId, prod_id]
      );
    } else {
      await pool.query(
        "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)",
        [userId, prod_id]
      );
    }

    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error("Error inserting into cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const [items] = await pool.query(
      `
      SELECT 
        ci.product_id AS id, 
        SUM(ci.quantity) AS quantity, 
        p.name, 
        p.price, 
        p.image_url 
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
      GROUP BY ci.product_id
      `,
      [req.params.userId]
    );
    res.json(items);
  } catch (err) {
    console.error("Failed to fetch cart:", err);
    res.status(500).json({ error: "failed to fetch cart" });
  }
});

router.delete("/remove/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    await pool.query(
      "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// PATCH /api/cart/update/:userId/:productId
router.patch("/update/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const { change } = req.body; // expected: { change: -1 or 1 }

  try {
    // Get current quantity
    const [[item]] = await pool.query(
      `SELECT quantity FROM cart_items WHERE user_id = ? AND product_id = ?`,
      [userId, productId]
    );

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
      // remove item if quantity drops to 0
      await pool.query(
        `DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`,
        [userId, productId]
      );
      return res.json({ message: "Item removed" });
    } else {
      // update quantity
      await pool.query(
        `UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?`,
        [newQuantity, userId, productId]
      );
      return res.json({ message: "Quantity updated", quantity: newQuantity });
    }
  } catch (err) {
    console.error("Quantity update failed:", err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});


export default router;

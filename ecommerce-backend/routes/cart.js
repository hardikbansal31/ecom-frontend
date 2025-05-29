import express from "express";
const router = express.Router();

router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    await pool.query(
      "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?",
      [userId, productId, quantity, quantity]
    );
    res.json({ message: "Added to cart" });
  } catch (err) {
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

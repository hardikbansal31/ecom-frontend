import express from "express";
const router = express.Router();

router.post("/create", async (req, res) => {
  const { userId } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [cartItems] = await conn.query(
      "SELECT * FROM cart_items WHERE user_id = ?",
      [userId]
    );
    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const [orderResult] = await conn.query(
      "INSERT INTO orders (user_id) VALUES (?)",
      [userId]
    );
    const orderId = orderResult.insertId;

    for (let item of cartItems) {
      await conn.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.product_id, item.quantity]
      );
    }

    await conn.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);
    await conn.commit();
    res.json({ message: "Order placed", orderId });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: "order failed" });
  } finally {
    conn.release();
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const [orders] = await pool.query(
      `
      SELECT o.id AS orderId, o.created_at, oi.quantity, p.name, p.price
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC`,
      [req.params.userId]
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch orders" });
  }
});
export default router;

const pool = require('../config/db');

exports.createOrder = async (req, res) => {
  const { items } = req.body; // [{ productId, quantity }]
  if (!items || !items.length) return res.status(400).json({ message: 'No items' });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const orderRes = await client.query(
      'INSERT INTO orders(buyer_id, status) VALUES($1, $2) RETURNING id',
      [req.user.id, 'PENDING']
    );
    const orderId = orderRes.rows[0].id;
    for (const it of items) {
      const prodRes = await client.query('SELECT price, farmer_id FROM products WHERE id=$1', [it.productId]);
      if (!prodRes.rows.length)
        throw new Error('Product not found');
      const price = prodRes.rows[0].price;
      await client.query(
        'INSERT INTO order_items(order_id, product_id, quantity, price_at_order)
         VALUES($1,$2,$3,$4)',
        [orderId, it.productId, it.quantity, price]
      );
    }
    await client.query('COMMIT');
    res.json({ orderId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const client = await pool.connect();
  try {
    const orderRes = await client.query('SELECT * FROM orders WHERE id=$1', [req.params.id]);
    if (!orderRes.rows.length) return res.status(404).json({ message: 'Not found' });
    const order = orderRes.rows[0];
    // role-based checks omitted for brevity
    const result = await client.query(
      'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
};

exports.getOrders = async (req, res) => {
  const client = await pool.connect();
  try {
    let query, params;
    if (req.user.role === 'BUYER') {
      query = 'SELECT * FROM orders WHERE buyer_id=$1'; params=[req.user.id];
    } else if (req.user.role === 'FARMER') {
      query = `SELECT o.* FROM orders o
        JOIN order_items oi ON oi.order_id=o.id
        JOIN products p ON p.id=oi.product_id
        WHERE p.farmer_id=$1 GROUP BY o.id`; params=[req.user.id];
    } else return res.status(403).json({ message: 'Forbidden' });
    const result = await client.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
};


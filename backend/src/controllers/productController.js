const pool = require("../config/db");

exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price)
    return res.status(400).json({ message: "Missing fields" });
  const imageUrl = req.file
    ? `${process.env.BACKEND_URL}/uploads/${req.file.filename}`
    : null;
  const client = await pool.connect();
  try {
    const insertText = `INSERT INTO products(farmer_id, name, price, description, image_url)
      VALUES($1,$2,$3,$4,$5) RETURNING *`;
    const values = [req.user.id, name, parseInt(price), description, imageUrl];
    const result = await client.query(insertText, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

exports.getProducts = async (req, res) => {
  const { lat, lng } = req.query;
  const client = await pool.connect();
  try {
    if (lat && lng) {
      const text = `SELECT p.*, u.latitude AS farmer_lat, u.longitude AS farmer_lng,
        (6371 * acos(
          cos(radians($1)) * cos(radians(u.latitude))
          * cos(radians(u.longitude) - radians($2))
          + sin(radians($1)) * sin(radians(u.latitude))
        )) AS distance
        FROM products p JOIN users u ON p.farmer_id = u.id
        ORDER BY distance LIMIT 100`;
      const values = [parseFloat(lat), parseFloat(lng)];
      const result = await client.query(text, values);
      return res.json(result.rows);
    }
    const result = await client.query("SELECT * FROM products LIMIT 100");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

exports.getProductById = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);
    if (!result.rows.length)
      return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

exports.updateProduct = async (req, res) => {
  const client = await pool.connect();
  try {
    const existing = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id],
    );
    if (!existing.rows.length || existing.rows[0].farmer_id !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });
    const fields = [];
    const vals = [];
    let idx = 1;
    ["name", "price", "description"].forEach((f) => {
      if (req.body[f]) {
        fields.push(`${f}=$${idx}`);
        vals.push(f === "price" ? parseInt(req.body[f]) : req.body[f]);
        idx++;
      }
    });
    if (req.file) {
      fields.push(`image_url=$${idx}`);
      vals.push(`${process.env.BACKEND_URL}/uploads/${req.file.filename}`);
      idx++;
    }
    if (!fields.length) return res.json(existing.rows[0]);
    const text = `UPDATE products SET ${fields.join(",")} WHERE id=$${idx} RETURNING *`;
    vals.push(req.params.id);
    const result = await client.query(text, vals);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

exports.deleteProduct = async (req, res) => {
  const client = await pool.connect();
  try {
    const existing = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id],
    );
    if (!existing.rows.length || existing.rows[0].farmer_id !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });
    await client.query("DELETE FROM products WHERE id = $1", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

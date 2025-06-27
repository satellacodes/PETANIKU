const pool = require("../config/db");

exports.getUsers = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT id, full_name, email, role, origin FROM users",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

exports.updateUser = async (req, res) => {
  const { role, fullName, origin } = req.body;
  const client = await pool.connect();
  try {
    const fields = [];
    const vals = [];
    let idx = 1;
    if (role) {
      fields.push(`role=$${idx}`);
      vals.push(role);
      idx++;
    }
    if (fullName) {
      fields.push(`full_name=$${idx}`);
      vals.push(fullName);
      idx++;
    }
    if (origin) {
      fields.push(`origin=$${idx}`);
      vals.push(origin);
      idx++;
    }
    if (!fields.length) return res.status(400).json({ message: "No data" });
    const text = `UPDATE users SET ${fields.join(",")} WHERE id=$${idx} RETURNING *`;
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

exports.deleteUser = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM users WHERE id=$1", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

exports.getAllReports = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT r.*, u.email, u.role FROM reports r JOIN users u ON r.user_id=u.id`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

exports.updateReport = async (req, res) => {
  const { status } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE reports SET status=$1 WHERE id=$2 RETURNING *",
      [status, req.params.id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

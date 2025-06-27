const pool = require("../config/db");

exports.createReport = async (req, res) => {
  const { type, message } = req.body;
  if (!type || !message)
    return res.status(400).json({ message: "Missing fields" });
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO reports(user_id, type, message, status) VALUES($1,$2,$3,$4) RETURNING *",
      [req.user.id, type, message, "OPEN"],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

exports.getMyReports = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM reports WHERE user_id=$1",
      [req.user.id],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

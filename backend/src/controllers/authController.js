const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { fullName, origin, latitude, longitude, email, password, role } =
    req.body;
  if (!fullName || !email || !password || !role)
    return res.status(400).json({ message: "Missing fields" });
  if (!["BUYER", "FARMER"].includes(role))
    return res.status(400).json({ message: "Invalid role" });

  const client = await pool.connect();
  try {
    const userCheck = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );
    if (userCheck.rows.length)
      return res.status(400).json({ message: "Email exists" });

    const hash = await bcrypt.hash(password, 10);
    const insertText = `INSERT INTO users(full_name, origin, latitude, longitude, email, password_hash, role)
      VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id, full_name, role`;
    const values = [
      fullName,
      origin || null,
      latitude || null,
      longitude || null,
      email,
      hash,
      role,
    ];
    const result = await client.query(insertText, values);
    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const client = await pool.connect();
  try {
    const userRes = await client.query(
      "SELECT id, full_name, password_hash, role FROM users WHERE email = $1",
      [email],
    );
    if (!userRes.rows.length)
      return res.status(400).json({ message: "Invalid credentials" });
    const user = userRes.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.json({
      token,
      user: { id: user.id, fullName: user.full_name, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

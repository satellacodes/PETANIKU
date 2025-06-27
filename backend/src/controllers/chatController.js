const pool = require("../config/db");

exports.getChatHistory = async (req, res) => {
  const userId = req.user.id;
  const otherId = req.params.otherUserId;
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM chat_messages WHERE
        (sender_id=$1 AND receiver_id=$2) OR
        (sender_id=$2 AND receiver_id=$1)
      ORDER BY timestamp ASC`,
      [userId, otherId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};

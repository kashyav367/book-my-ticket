import { pool } from "../config/db.js";

export const bookSeat = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.id;

  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    //  lock + check available
    const result = await conn.query(
      "SELECT * FROM seats WHERE id=$1 AND isbooked=0 FOR UPDATE",
      [id]
    );

    if (result.rowCount === 0) {
      await conn.query("ROLLBACK");
      return res.status(400).json({ error: "Seat already booked" });
    }

    // final update
    await conn.query(
      `UPDATE seats 
       SET isbooked=1, name=$2, user_id=$3 
       WHERE id=$1`,
      [id, name, userId]
    );

    await conn.query("COMMIT");

    return res.json({
      message: "Seat booked successfully",
      seatId: id,
      userId: userId
    });

  } catch (err) {
    await conn.query("ROLLBACK");
    return res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};
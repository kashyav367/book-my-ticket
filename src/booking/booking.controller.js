import { pool } from "../config/db.js";

export const bookSeat = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const userId = req.user.userId;

  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    const result = await conn.query(
      "SELECT * FROM seats WHERE id=$1 AND isbooked=0 FOR UPDATE",
      [id]
    );

    if (result.rowCount === 0) {
      res.send({ error: "Seat already booked" });
      return;
    }

    await conn.query(
      "UPDATE seats SET isbooked=1, name=$2, user_id=$3 WHERE id=$1",
      [id, name, userId]
    );

    await conn.query("COMMIT");

    res.send({ message: "Seat booked successfully" });

  } catch (err) {
    await conn.query("ROLLBACK");
    res.send({ error: err.message });
  } finally {
    conn.release();
  }
};
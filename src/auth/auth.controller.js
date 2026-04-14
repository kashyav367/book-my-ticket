import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { users } from "../config/schema.js";
import { eq } from "drizzle-orm";

const SECRET = "secret";

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  res.send({ message: "User registered" });
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  const user = result[0];

  if (!user) return res.send.json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.send({ error: "Wrong password" });

  const token = jwt.sign({id: user.id}, SECRET, {
    expiresIn: "30min",
  });

  res.json({ token });
};

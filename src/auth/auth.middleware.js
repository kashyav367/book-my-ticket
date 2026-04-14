import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { users } from "../config/schema.js";
import { eq } from "drizzle-orm";
const SECRET = "secret";


export const authMiddleware = async (req, res, next ) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization?.split(" ")[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies?.accessToken;
    }

  if (!token) return res.send({ error: "Login first" });


    const decoded = jwt.verify(token, SECRET);

    const checkUser = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.id));

    const user = checkUser[0];

    if (!user) {
      return res.send("user not found")
    }

    req.user = {
      id : user.id,
      name : user.name,
      email : user.email,
    };

    next();
  } 
  



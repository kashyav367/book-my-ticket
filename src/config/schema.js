import { pgTable, serial, text , varchar , integer} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
});

export const seats = pgTable("seats", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  isbooked: integer("isbooked"),
  userId: integer("user_id"),
});
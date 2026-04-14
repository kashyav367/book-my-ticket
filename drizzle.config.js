export default {
  schema: "./src/config/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "postgres",
    database: "seats",
    ssl: false, 
  },
};
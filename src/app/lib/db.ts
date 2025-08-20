import { Pool } from "pg";

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER || "scheduleuser",
    password: process.env.DB_PASSWORD || "schedulepass",
    database: process.env.DB_NAME || "scheduleapp",
});

export default pool;

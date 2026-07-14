import { Pool } from "@neondatabase/serverless";
import { defaultPortfolioData } from "./initialData";

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool(
  connectionString
    ? { connectionString }
    : {
        host: process.env.PGHOST || "localhost",
        port: parseInt(process.env.PGPORT || "5432", 10),
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD || "postgres",
        database: process.env.PGDATABASE || "manas_portfolio",
      }
);

export { defaultPortfolioData };

export async function initDb() {
  let client;
  try {
    client = await pool.connect();
  } catch (error: unknown) {
    // Error code 3D000: Database does not exist
    if (error && typeof error === "object" && "code" in error && error.code === "3D000") {
      console.log("Database 'manas_portfolio' does not exist. Attempting to create it...");
      
      let user = process.env.PGUSER || "postgres";
      let password = process.env.PGPASSWORD || "postgres";
      let host = process.env.PGHOST || "localhost";
      let port = parseInt(process.env.PGPORT || "5432", 10);

      if (connectionString) {
        // Parse: postgresql://user:password@host:port/database
        const match = connectionString.match(/postgresql:\/\/([^:]+):([^@]+)@([^:/]+)(?::(\d+))?\/([^?]+)/);
        if (match) {
          user = match[1];
          password = match[2];
          host = match[3];
          port = parseInt(match[4] || "5432", 10);
        }
      }

      const tempPool = new Pool({
        host,
        port,
        user,
        password,
        database: "postgres",
      });
      
      let tempClient;
      try {
        tempClient = await tempPool.connect();
        await tempClient.query("CREATE DATABASE manas_portfolio");
        console.log("Database 'manas_portfolio' created successfully.");
      } catch (createError) {
        console.error("Failed to create database 'manas_portfolio':", createError);
      } finally {
        if (tempClient) tempClient.release();
        await tempPool.end();
      }

      // Retry connection after database creation
      try {
        client = await pool.connect();
      } catch (retryError) {
        console.error("Database connection retry failed:", retryError);
        return;
      }
    } else {
      console.error("Database connection failed. Please set DATABASE_URL or PG* environment variables:", error);
      return;
    }
  }

  try {
    // Create the table if it does not exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS portfolio_data (
        id SERIAL PRIMARY KEY,
        key VARCHAR(50) UNIQUE NOT NULL,
        data JSONB NOT NULL
      );
    `);

    // Check if the default row exists
    const res = await client.query("SELECT * FROM portfolio_data WHERE key = 'main'");
    if (res.rows.length === 0) {
      await client.query(
        "INSERT INTO portfolio_data (key, data) VALUES ('main', $1)",
        [defaultPortfolioData]
      );
    }
  } catch (tableError) {
    console.error("Failed to initialize database tables:", tableError);
  } finally {
    if (client) client.release();
  }
}

export async function getPortfolioData() {
  let client;
  try {
    await initDb();
    client = await pool.connect();
    const res = await client.query("SELECT data FROM portfolio_data WHERE key = 'main'");
    if (res.rows.length > 0) {
      return res.rows[0].data;
    }
    return defaultPortfolioData;
  } catch (error) {
    console.error("Failed to fetch portfolio data from DB (using defaults):", error);
    return defaultPortfolioData;
  } finally {
    if (client) client.release();
  }
}

export async function updatePortfolioData(data: typeof defaultPortfolioData) {
  let client;
  try {
    await initDb();
    client = await pool.connect();
    await client.query(
      "INSERT INTO portfolio_data (key, data) VALUES ('main', $1) ON CONFLICT (key) DO UPDATE SET data = $1",
      [data]
    );
    return { success: true };
  } catch (error) {
    console.error("Failed to save portfolio data to DB:", error);
    return { success: false, error: String(error) };
  } finally {
    if (client) client.release();
  }
}

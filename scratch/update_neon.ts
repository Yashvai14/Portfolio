import "dotenv/config";
import { updatePortfolioData, defaultPortfolioData } from "../lib/db";

async function main() {
  console.log("Updating DB using DATABASE_URL:", process.env.DATABASE_URL?.substring(0, 30) + "...");
  const result = await updatePortfolioData(defaultPortfolioData);
  console.log("Update result:", result);
  process.exit(0);
}

main();

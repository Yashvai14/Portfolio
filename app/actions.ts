"use server";

import { revalidatePath } from "next/cache";
import { getPortfolioData, updatePortfolioData, defaultPortfolioData } from "@/lib/db";

export async function fetchPortfolioData() {
  try {
    const data = await getPortfolioData();
    // Return a plain JS object (clean JSON serialization)
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Action error fetching portfolio data:", error);
    return defaultPortfolioData;
  }
}

export async function savePortfolioData(data: typeof defaultPortfolioData) {
  try {
    const result = await updatePortfolioData(data);
    if (result.success) {
      revalidatePath("/");
      revalidatePath("/admin");
    }
    return result;
  } catch (error) {
    console.error("Action error saving portfolio data:", error);
    return { success: false, error: String(error) };
  }
}

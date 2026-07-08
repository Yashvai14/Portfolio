import { prisma } from "../lib/prisma";

async function check() {
  try {
    const blogs = await prisma.blogPost.findMany();
    console.log("Total Blogs Count:", blogs.length);
    console.log("Blogs Details:", blogs.map(b => ({ id: b.id, title: b.title, published: b.published })));
  } catch (err) {
    console.error("Error checking database:", err);
  } finally {
    await prisma.$disconnect();
  }
}

check();

import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
    },
  });

  console.log({ user });

  const post = await prisma.blogPost.upsert({
    where: { slug: 'welcome-to-my-portfolio' },
    update: {},
    create: {
      title: 'Welcome to my Portfolio!',
      slug: 'welcome-to-my-portfolio',
      content: 'This is my first blog post. I built this portfolio using Next.js 15, Prisma, and Tailwind CSS!',
      published: true,
    },
  });

  console.log({ post });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { prisma } from "@/lib/prisma";
import { BlogPost } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-dark-navy text-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-32">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          My Blog
        </h1>
        <p className="text-gray-400 text-lg mb-12">Thoughts, learnings, and updates.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-dark-navy-glass rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all h-full flex flex-col">
                {post.imageUrl ? (
                  <div className="h-48 w-full relative overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-blue-400 mb-3 font-medium">
                    {format(new Date(post.createdAt), "MMMM d, yyyy")}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                    {post.content}
                  </p>
                  <div className="text-sm font-medium text-purple-400 flex items-center">
                    Read more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400 bg-white/5 rounded-2xl border border-white/10">
              No blog posts published yet. Check back soon!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

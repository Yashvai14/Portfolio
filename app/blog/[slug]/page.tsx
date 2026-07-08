import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dark-navy text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-32">
        <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all posts
        </Link>
        
        <article className="prose prose-invert prose-blue max-w-none">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-400">
              Published on {format(new Date(post.createdAt), "MMMM d, yyyy")}
            </div>
          </header>

          {post.imageUrl && (
            <div className="w-full h-[400px] relative rounded-2xl overflow-hidden mb-10">
              <Image src={post.imageUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            </div>
          )}

          {post.videoUrl && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden mb-10 border border-white/10">
              <iframe
                width="100%"
                height="100%"
                src={post.videoUrl.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-lg text-justify">
            {post.content}
          </div>
        </article>
      </main>
    </div>
  );
}

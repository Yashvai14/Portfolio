import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error(`DELETE /api/blogs/[id] error for ID ${id}:`, error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const blog = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: slug,
        content: data.content,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        published: data.published ?? true,
      },
    });
    return NextResponse.json(blog);
  } catch (error) {
    console.error(`PUT /api/blogs/[id] error for ID ${id}:`, error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

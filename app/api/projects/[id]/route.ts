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
    await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(`DELETE /api/projects/[id] error for ID ${id}:`, error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
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
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        tags: data.tags || [],
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error(`PUT /api/projects/[id] error for ID ${id}:`, error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}


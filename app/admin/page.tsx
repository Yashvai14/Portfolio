import { prisma } from "@/lib/prisma";
import { FolderGit2, FileText } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const projectsCount = await prisma.project.count();
  const blogsCount = await prisma.blogPost.count();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to your portfolio management center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/projects" className="block group">
          <div className="bg-dark-navy-glass p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all hover:bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <FolderGit2 className="w-24 h-24 text-blue-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <FolderGit2 className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{projectsCount} Projects</h2>
              <p className="text-gray-400">Manage your portfolio projects</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/blogs" className="block group">
          <div className="bg-dark-navy-glass p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="w-24 h-24 text-purple-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{blogsCount} Blog Posts</h2>
              <p className="text-gray-400">Write and manage your daily blogs</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

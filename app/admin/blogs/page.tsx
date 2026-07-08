"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Upload, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

type Blog = { 
  id: string; 
  title: string; 
  slug: string; 
  content: string; 
  imageUrl: string; 
  videoUrl?: string;
  published: boolean 
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formBlog, setFormBlog] = useState({ 
    title: "", 
    content: "", 
    imageUrl: "", 
    videoUrl: "", 
    published: true 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/blogs").then(res => res.json()).then(data => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  const handleStartWrite = () => {
    setEditingBlogId(null);
    setPreviewUrl(null);
    setFormBlog({ title: "", content: "", imageUrl: "", videoUrl: "", published: true });
    setIsAdding(!isAdding);
  };

  const handleStartEdit = (blog: Blog) => {
    setEditingBlogId(blog.id);
    setPreviewUrl(blog.imageUrl || null);
    setFormBlog({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl || "",
      videoUrl: blog.videoUrl || "",
      published: blog.published
    });
    setIsAdding(true);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setFormBlog(prev => ({ ...prev, imageUrl: data.secure_url }));
        setPreviewUrl(data.secure_url);
      } else {
        const err = await res.json();
        alert("Image upload failed: " + (err.error || "Unknown error"));
        setPreviewUrl(formBlog.imageUrl || null);
      }
    } catch {
      alert("Network error during image upload.");
      setPreviewUrl(formBlog.imageUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBlogId) {
      // Edit mode (PUT)
      const res = await fetch(`/api/blogs/${editingBlogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formBlog),
      });
      if (res.ok) {
        const updated = await res.json();
        setBlogs(blogs.map((b) => (b.id === editingBlogId ? updated : b)));
        setEditingBlogId(null);
        setIsAdding(false);
        setPreviewUrl(null);
        setFormBlog({ title: "", content: "", imageUrl: "", videoUrl: "", published: true });
      } else {
        alert("Failed to update blog post");
      }
    } else {
      // Add mode (POST)
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formBlog),
      });
      if (res.ok) {
        const added = await res.json();
        setBlogs([added, ...blogs]);
        setIsAdding(false);
        setPreviewUrl(null);
        setFormBlog({ title: "", content: "", imageUrl: "", videoUrl: "", published: true });
      } else {
        alert("Failed to create blog post");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBlogs(blogs.filter((b) => b.id !== id));
      if (editingBlogId === id) {
        setEditingBlogId(null);
        setPreviewUrl(null);
        setIsAdding(false);
      }
    } else {
      alert("Failed to delete blog post");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
        <button 
          onClick={handleStartWrite} 
          className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" /> {isAdding && !editingBlogId ? "Close Form" : "Write Post"}
        </button>
      </div>

      {isAdding && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: "auto" }} 
          onSubmit={handleSubmit} 
          className="bg-dark-navy-glass p-6 rounded-xl border border-white/10 space-y-4"
        >
          <h2 className="text-lg font-semibold text-white mb-2">
            {editingBlogId ? "Edit Blog Post" : "Create Blog Post"}
          </h2>
          
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Post Title</label>
            <input 
              type="text" 
              placeholder="Post Title" 
              required 
              value={formBlog.title} 
              onChange={e => setFormBlog({...formBlog, title: e.target.value})} 
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500/50" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Markdown Content</label>
            <textarea 
              placeholder="Markdown Content..." 
              required 
              rows={8} 
              value={formBlog.content} 
              onChange={e => setFormBlog({...formBlog, content: e.target.value})} 
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white font-mono text-sm focus:outline-none focus:border-purple-500/50" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">Cover Image</label>
            <div className="flex gap-4 items-center flex-wrap">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-3 bg-black/30 border border-white/10 hover:border-purple-500/50 rounded-lg text-sm text-gray-300 transition-all font-medium"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-purple-400" />
                    Upload Image
                  </>
                )}
              </button>
              
              {previewUrl && (
                <div className="relative w-20 h-12 rounded border border-white/10 overflow-hidden bg-black/30 flex items-center justify-center">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormBlog(prev => ({ ...prev, imageUrl: "" }));
                      setPreviewUrl(null);
                    }}
                    className="absolute top-0 right-0 bg-red-600 p-0.5 rounded-bl hover:bg-red-500 transition-colors z-10"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              )}
            </div>
            
            <input 
              type="url" 
              placeholder="Or paste a Cover Image URL manually" 
              value={formBlog.imageUrl} 
              onChange={e => {
                setFormBlog({...formBlog, imageUrl: e.target.value});
                setPreviewUrl(e.target.value || null);
              }} 
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500/50 mt-2 text-sm" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-medium">YouTube Video URL (Optional)</label>
            <input 
              type="url" 
              placeholder="YouTube Video URL" 
              value={formBlog.videoUrl} 
              onChange={e => setFormBlog({...formBlog, videoUrl: e.target.value})} 
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500/50" 
            />
          </div>

          <div className="flex items-center gap-6 py-2">
            <label className="text-sm text-gray-300 font-medium flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formBlog.published} 
                onChange={e => setFormBlog({...formBlog, published: e.target.checked})} 
                className="w-4 h-4 rounded bg-black/30 border-white/10 accent-purple-600"
              />
              Publish Post (Visible on portfolio)
            </label>
          </div>

          <div className="flex gap-3">
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {editingBlogId ? "Save Changes" : "Publish Post"}
            </button>
            {editingBlogId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingBlogId(null);
                  setPreviewUrl(null);
                  setIsAdding(false);
                  setFormBlog({ title: "", content: "", imageUrl: "", videoUrl: "", published: true });
                }} 
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors border border-white/10"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.form>
      )}

      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-dark-navy-glass border border-white/10 rounded-xl p-6 flex flex-col justify-between">
              <div>
                {blog.imageUrl && (
                  <Image 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    width={400} 
                    height={128} 
                    className="w-full h-32 object-cover rounded-lg mb-4 opacity-80" 
                    unoptimized
                  />
                )}
                <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 font-light">{blog.content}</p>
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${blog.published ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"}`}>
                  {blog.published ? "Published" : "Draft"}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(blog)}
                    className="bg-blue-500/15 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all border border-blue-500/20 flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all border border-red-500/20 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

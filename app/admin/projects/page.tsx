"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Upload, X, Loader2, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";

type Project = { id: string; title: string; description: string; imageUrl: string; liveUrl: string; githubUrl: string; tags: string[] };

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({ title: "", description: "", imageUrl: "", githubUrl: "", liveUrl: "", tags: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load projects", err);
        setLoading(false);
      });
  }, []);

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
        setNewProject(prev => ({ ...prev, imageUrl: data.secure_url }));
      } else {
        const err = await res.json();
        alert("Image upload failed: " + (err.error || "Unknown error"));
        setPreviewUrl(null);
      }
    } catch {
      alert("Network error during image upload.");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const handleStartEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setPreviewUrl(project.imageUrl || null);
    setNewProject({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      tags: project.tags.join(", "),
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = newProject.tags.split(",").map(t => t.trim()).filter(Boolean);
    try {
      const url = editingProjectId ? `/api/projects/${editingProjectId}` : "/api/projects";
      const method = editingProjectId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newProject, tags: tagsArray }),
      });
      if (res.ok) {
        const saved = await res.json();
        if (editingProjectId) {
          setProjects(projects.map(p => p.id === editingProjectId ? saved : p));
        } else {
          setProjects([saved, ...projects]);
        }
        resetForm();
      } else {
        const err = await res.json();
        alert("Failed to save project: " + (err.error || "Unknown error"));
      }
    } catch {
      alert("Network error. Failed to save project.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects(projects.filter((p) => p.id !== id));
      if (editingProjectId === id) {
        resetForm();
      }
    } else {
      alert("Failed to delete project");
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingProjectId(null);
    setNewProject({ title: "", description: "", imageUrl: "", githubUrl: "", liveUrl: "", tags: "" });
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button
          type="button"
          onClick={() => isAdding ? resetForm() : setIsAdding(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          {isAdding ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add Project</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-dark-navy-glass p-6 rounded-xl border border-white/10 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            {editingProjectId ? "Edit Project" : "Create Project"}
          </h2>
          <input
            type="text"
            placeholder="Title *"
            required
            value={newProject.title}
            onChange={e => setNewProject({...newProject, title: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500"
          />
          <textarea
            placeholder="Description *"
            required
            value={newProject.description}
            onChange={e => setNewProject({...newProject, description: e.target.value})}
            rows={3}
            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500"
          />

          {/* Image Upload Section */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Project Image</label>

            {/* Preview */}
            {previewUrl && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-white/10">
                <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    <span className="text-white ml-2 text-sm">Uploading...</span>
                  </div>
                )}
                {!uploading && (
                  <button
                    type="button"
                    onClick={() => { setPreviewUrl(null); setNewProject(p => ({...p, imageUrl: ""})); }}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Upload Button */}
            {!previewUrl && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-white/20 hover:border-blue-500/50 bg-black/20 hover:bg-blue-500/5 rounded-lg p-6 text-center transition-all cursor-pointer"
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-400 text-sm">Click to upload image</p>
                <p className="text-gray-600 text-xs mt-1">PNG, JPG, GIF, WEBP</p>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <input
            type="text"
            placeholder="Live URL (optional)"
            value={newProject.liveUrl}
            onChange={e => setNewProject({...newProject, liveUrl: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="GitHub URL (optional)"
            value={newProject.githubUrl}
            onChange={e => setNewProject({...newProject, githubUrl: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Tags (comma separated, e.g. React, Next.js)"
            value={newProject.tags}
            onChange={e => setNewProject({...newProject, tags: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={uploading}
              className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading Image...</> : (editingProjectId ? "Save Changes" : "Save Project")}
            </button>
            {editingProjectId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors border border-white/10"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-dark-navy-glass border border-white/10 rounded-xl p-6 relative overflow-hidden group flex flex-col">
              {project.imageUrl && (
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <Image src={project.imageUrl} alt={project.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => <span key={tag} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">{tag}</span>)}
              </div>
              <div className="flex gap-2 mt-auto w-full">
                <button
                  type="button"
                  onClick={() => handleStartEdit(project)}
                  className="bg-blue-500/15 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all border border-blue-500/20 flex items-center justify-center gap-1 flex-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all border border-red-500/20 flex items-center justify-center gap-1 flex-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-gray-500 col-span-2 text-center py-10">No projects yet. Click &quot;Add Project&quot; to get started.</p>
          )}
        </div>
      )}
    </div>
  );
}

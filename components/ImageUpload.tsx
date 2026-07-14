"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-geist text-[9px] tracking-wider font-bold text-[#8c909f] uppercase">
          {label}
        </label>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {value ? (
          <div className="relative group rounded border border-white/10 overflow-hidden bg-[#050816]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={value} 
              alt="Uploaded Preview" 
              className="h-24 w-auto object-cover max-w-full"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button"
                onClick={handleRemove}
                className="bg-brand-error text-white p-1.5 rounded-full hover:scale-110 transition-transform"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-24 w-32 rounded border border-dashed border-white/20 bg-white/2 flex items-center justify-center">
            <span className="text-[#8c909f] text-xs font-geist">No image</span>
          </div>
        )}

        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white hover:bg-white/5 hover:border-brand-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
            ) : (
              <UploadCloud className="w-4 h-4 text-brand-primary" />
            )}
            {isUploading ? "Uploading..." : "Upload New Image"}
          </button>
          
          <div className="mt-2 text-[10px] text-[#8c909f] font-geist">
            Or paste a URL directly:
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="w-full mt-1 px-3 py-2 rounded bg-[#050816] border border-white/10 font-geist text-xs text-white"
          />
        </div>
      </div>
    </div>
  );
}

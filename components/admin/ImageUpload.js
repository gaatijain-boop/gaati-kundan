'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FiUpload, FiX, FiAlertCircle } from 'react-icons/fi';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'jewellery-images';

// Canvas-based compression — no external lib needed
function compressImage(file, maxDimension = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height / width) * maxDimension);
              width = maxDimension;
            } else {
              width = Math.round((width / height) * maxDimension);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else resolve(file); // fallback to original
            },
            'image/jpeg',
            quality
          );
        } catch (err) {
          resolve(file); // fallback to original on error
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function uploadToSupabase(file) {
  // Verify session first
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('Not authenticated. Please log in again.');
  }

  // Compress
  let blob;
  try {
    blob = await compressImage(file, 1200, 0.85);
  } catch {
    blob = file; // use original if compression fails
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safeExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'jpg';
  const fileName = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, blob, {
      contentType: `image/${safeExt === 'jpg' ? 'jpeg' : safeExt}`,
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Storage upload error:', error);
    // Provide helpful error messages
    if (error.message?.includes('not found') || error.message?.includes('bucket')) {
      throw new Error(`Bucket "${STORAGE_BUCKET}" not found. Check Supabase Storage.`);
    }
    if (error.message?.includes('policy') || error.message?.includes('permission') || error.message?.includes('Unauthorized')) {
      throw new Error('Permission denied. Check Storage policies in Supabase.');
    }
    throw new Error(error.message || 'Upload failed');
  }

  const { data: { publicUrl } } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(fileName);

  return publicUrl;
}

export default function ImageUpload({ images = [], onImagesChange, maxImages = 6 }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState([]);
  const inputRef = useRef(null);

  const processFiles = async (files) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!fileArray.length) {
      toast.error('Please select image files only (JPG, PNG, WEBP)');
      return;
    }

    const slots = maxImages - images.length;
    if (slots <= 0) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const toUpload = fileArray.slice(0, slots);
    setUploading(true);
    setProgress(toUpload.map((f) => ({ name: f.name, status: 'pending' })));

    const results = [];

    for (let i = 0; i < toUpload.length; i++) {
      setProgress((p) => p.map((item, idx) => idx === i ? { ...item, status: 'uploading' } : item));
      try {
        const url = await uploadToSupabase(toUpload[i]);
        results.push(url);
        setProgress((p) => p.map((item, idx) => idx === i ? { ...item, status: 'done' } : item));
      } catch (err) {
        console.error('Upload error:', err);
        setProgress((p) => p.map((item, idx) => idx === i ? { ...item, status: 'error', error: err.message } : item));
        toast.error(err.message || 'Upload failed');
      }
    }

    if (results.length > 0) {
      onImagesChange([...images, ...results]);
      toast.success(`${results.length} image(s) uploaded successfully!`);
    }

    setUploading(false);
    setProgress([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); processFiles(e.dataTransfer.files); }}
        className={cn(
          'border-2 border-dashed p-8 text-center transition-all duration-200',
          isDragging ? 'border-maroon bg-luxury-blush scale-[1.01]' : 'border-luxury-light-gray hover:border-gold/60 hover:bg-luxury-off-white',
          uploading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => processFiles(e.target.files)}
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            <div className="w-full max-w-xs space-y-2">
              {progress.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-sans">
                  <div className={cn(
                    'w-2 h-2 rounded-full flex-shrink-0',
                    p.status === 'uploading' ? 'bg-gold animate-pulse' :
                    p.status === 'done' ? 'bg-green-500' : 'bg-red-500'
                  )} />
                  <span className="text-luxury-gray truncate flex-1 text-left">{p.name}</span>
                  <span className={cn('flex-shrink-0 font-semibold',
                    p.status === 'done' ? 'text-green-600' :
                    p.status === 'error' ? 'text-red-500' : 'text-gold'
                  )}>
                    {p.status === 'done' ? '✓' : p.status === 'error' ? '✗' : '...'}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm font-sans text-luxury-gray">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 border border-gold/30 flex items-center justify-center">
              <FiUpload className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-luxury-black">
                Click to upload or drag & drop
              </p>
              <p className="font-sans text-xs text-luxury-gray mt-1">
                JPG, PNG, WEBP • Max {maxImages} images • Auto-compressed
              </p>
            </div>
            {images.length > 0 && (
              <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-sans font-semibold">
                {images.length}/{maxImages} uploaded
              </span>
            )}
          </div>
        )}
      </div>

      {/* Warning if bucket env not set */}
      {!process.env.NEXT_PUBLIC_STORAGE_BUCKET && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200">
          <FiAlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-sans text-amber-700">
            <strong>NEXT_PUBLIC_STORAGE_BUCKET</strong> not set in .env.local — using default <em>jewellery-images</em>
          </p>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {images.map((url, i) => (
              <div key={`${url}-${i}`} className="relative group aspect-square bg-luxury-off-white overflow-hidden">
                <Image
                  src={url}
                  alt={`Product image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                {i === 0 && (
                  <div className="absolute bottom-0 inset-x-0 py-0.5 bg-maroon text-white text-[10px] font-sans font-semibold text-center">
                    MAIN
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onImagesChange(images.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 rounded-sm"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs font-sans text-luxury-gray">
            {images.length}/{maxImages} images • First image is the main product photo
          </p>
        </>
      )}
    </div>
  );
}

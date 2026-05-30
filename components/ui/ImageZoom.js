'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ImageZoom({ src, alt, className }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden cursor-zoom-in',
        isZoomed && 'cursor-zoom-out',
        className
      )}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
          transition: isZoomed ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
        }}
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
    </div>
  );
}

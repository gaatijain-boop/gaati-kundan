export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-product bg-gray-200 shimmer" />
      <div className="pt-4 space-y-2">
        <div className="h-3 bg-gray-200 shimmer w-1/3 rounded" />
        <div className="h-5 bg-gray-200 shimmer w-3/4 rounded" />
        <div className="h-4 bg-gray-200 shimmer w-1/4 rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="aspect-square bg-gray-200 shimmer" />
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 shimmer" />
          ))}
        </div>
      </div>
      <div className="space-y-4 pt-4">
        <div className="h-4 bg-gray-200 shimmer w-1/4 rounded" />
        <div className="h-10 bg-gray-200 shimmer w-3/4 rounded" />
        <div className="h-8 bg-gray-200 shimmer w-1/3 rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 shimmer rounded" />
          <div className="h-4 bg-gray-200 shimmer rounded" />
          <div className="h-4 bg-gray-200 shimmer w-2/3 rounded" />
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200 shimmer" />
      <div className="pt-3 space-y-2">
        <div className="h-5 bg-gray-200 shimmer w-2/3 mx-auto rounded" />
      </div>
    </div>
  );
}

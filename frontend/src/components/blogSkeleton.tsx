
export const BlogSkeleton = () => {
  return (
    <div className="border-b pb-6 animate-pulse max-w-xl w-full">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

      {/* Author */}
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>

      {/* Content preview */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
};


import React from "react";

export const BlogsSkeleton = () => {
  return (
    <div className="border-b py-6 animate-pulse max-w-xl w-full">
      {/* Author avatar + name + dot + date */}
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <div className="h-4 bg-gray-300 rounded w-24" />
        <div className="w-1 h-1 bg-gray-400 rounded-full" />
        <div className="h-4 bg-gray-300 rounded w-12" />
      </div>

      {/* Blog title */}
      <div className="h-6 bg-gray-300 rounded w-3/3 mb-2" />

      {/* Blog preview content */}
      <div className="h-4 bg-gray-300 rounded w-full mb-1" />
      <div className="h-4 bg-gray-300 rounded w-5xl mb-4" />

      {/* Footer - estimated reading time */}
      <div className="h-3 bg-gray-200 rounded w-20" />
    </div>
  );
};

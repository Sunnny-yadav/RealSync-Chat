import React from "react";

const SkeletonCard = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-600 rounded-lg shadow-md animate-pulse mt-2 ">
      {/* Profile Image Skeleton */}
      <div className="w-12 h-12 bg-gray-700 rounded-full"></div>

      {/* Text Skeleton */}
      <div className="flex flex-col gap-2 w-full">
        <div className="w-3/4 h-4 bg-gray-700 rounded-md"></div>
        <div className="w-1/2 h-4 bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="p-4 border-b border-slate-300 space-y-2 ">
      {/* Author Info Row */}
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        <Avatar name={authorName} size="small" />
        <span className="font-medium">{authorName}</span>
        <span className="text-gray-400 text-xs">&#9679;</span>
        <span className="text-gray-500 font-light">{publishedDate}</span>
      </div>

      <Link to={`/blog/${id}`}>
      <div className="text-xl font-semibold text-gray-900 cursor-pointer">{title}</div>
      </Link>

      <div className="text-sm font-light text-gray-800 leading-relaxed">
        {content.slice(0, 100) + "..."}
      </div>

      <div className="text-xs text-slate-500 pt-2">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div>
    </div>
  );
};
export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  const sizeClass = size === "small" ? "w-6 h-6 text-xs" : "w-10 h-10 text-md";

  return (
    <div
      className={`relative inline-flex items-center justify-center ${sizeClass} bg-gray-400 rounded-full text-gray-700 font-light`}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

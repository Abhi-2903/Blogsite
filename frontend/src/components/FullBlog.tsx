import type { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const isAuthor = blog.authorId === Number(userId);

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this blog?");
      if (!confirmed) return;

      await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      alert("Blog deleted successfully!");
      navigate("/blog");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting blog");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left/Main content */}
          <div className="lg:w-8/12 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {blog.title}
            </h1>

            <div className="text-sm sm:text-base text-slate-500 mb-4">
              {blog && (
                <p>
                  Published on{" "}
                  {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>

            <p className="text-base sm:text-lg text-gray-800 mb-6 whitespace-pre-wrap">
              {blog.content}
            </p>

            {isAuthor && (
              <button
                type="button"
                onClick={handleDelete}
                className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Delete Blog
              </button>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-4/12 w-full">
            <div className="p-4 bg-gray-100 rounded-xl shadow">
              <h2 className="text-sm text-gray-700 font-semibold mb-2">
                About the author
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                <p className="text-xl font-bold text-black mb-1">
                  {blog.author.name || "Anonymous"}
                </p>
              </div>

              <p className="whitespace-pre-line text-sm text-gray-700">
                {`details about the author
-----------X-----------
this part coming soon`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

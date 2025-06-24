import { AppBar } from "./AppBar";
import type { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
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
      navigate("/"); // Redirect to homepage or blogs list
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting blog");
    }
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <AppBar />
      <Link to={"/:id"}></Link>
      <div className="grid grid-cols-12 gap-4 px-10 py-6">

        <div className="col-span-8">
          <div className="text-5xl font-bold mb-4">
            {blog.title}</div>
            <div className="text-slate-500">
                  {blog && (
  <div>
    
    <p>Published on {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}</p>
    
  </div>
)}

            </div>

          <p className="text-lg text-gray-800 mb-8 ">
            {blog.content}</p>
            

{isAuthor && (
 <button
      type="button"
      onClick={handleDelete}
      className="text-white bg-gradient-to-r transition-all duration-300 ease-in-out from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Delete Blog
    </button>)}

        </div>

        {/* Right side - Sidebar */}
        <div className="col-span-4">
          <div className="p-4 bg-gray-100 rounded-xl shadow">
            <h2 className="text-sm  text-gray-700 font-semibold mb-2">About the author</h2>
            <div className=" flex items-center gap-3">
                  <div>

            <Avatar size="big" name={blog.author.name ||"Anonymous"}/>
                  </div>
            <p className="text-xl font-bold text-black mb-1">{blog.author.name||"Anonymous"}</p>
            </div>
            <div className="whitespace-pre-line text-sm text-gray-700">

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

import React from "react";
import { AppBar } from "./AppBar";
import type { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="min-h-screen bg-white text-black">
      <AppBar />
      <div className="grid grid-cols-12 gap-4 px-10 py-6">

        <div className="col-span-8">
          <div className="text-5xl font-bold mb-4">
            {blog.title}</div>
            <div className="text-slate-500">
                  Post on 2nd December 2023
            </div>

          <p className="text-lg text-gray-800">
            {blog.content}</p>
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
            some catch data about the author temporarily checking for the content
          </div>
        </div>
      </div>
    </div>
  );
};

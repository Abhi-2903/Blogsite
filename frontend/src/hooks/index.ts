import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

// ✅ Correct interface name: Blog (not Blogs)
export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

// ✅ useBlog: Fetches one blog
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>(); // single blog

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      .then((response) => {
        setBlog(response.data.blog); // ✅ this should be blog, not blogs
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

// ✅ useBlogs: Fetches all blogs
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]); // multiple blogs

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs); // ✅ this is correct for bulk
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  authorId: number;
  title: string;
  id: number;
  likeCount: number;
  publishedAt: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>(); 

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      .then((response) => {
        setBlog(response.data.blog); 
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


export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]); 

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
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
export const useMyBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/myblogs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blog);
        setLoading(false);
      })
      .catch((e: any) => {
        if (e.response) {
          setError(e.response.data?.message || "Server error occurred");
        } else if (e.request) {
          setError("Network error. Please check your connection.");
        } else {
          setError("Unexpected error occurred.");
        }
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
    error,
  };
};
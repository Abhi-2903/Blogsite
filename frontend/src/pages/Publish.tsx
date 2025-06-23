// pages/Publish.tsx
import{ useState } from "react";
import { AppBar } from "../components/AppBar";
import { TextEditor } from "../components/TextEditor";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/blog"); 
    } catch (err) {
      console.error("Publish failed", err);
      alert("Failed to publish blog.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <AppBar />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">Publish Your Blog</h1>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <TextEditor content={content} onChange={setContent} />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

interface LikeButtonProps {
  blogId: number;
  initialCount: number;
}

export const LikeButton = ({ blogId, initialCount }: LikeButtonProps) => {
  const [likeCount, setLikeCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedBefore = localStorage.getItem(`liked-${blogId}`) === "true";
    setLiked(likedBefore);
  }, [blogId]);

  const handleLike = async () => {
    if (liked) {
      toast.info("You have already liked this post!");
      return;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/${blogId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          validateStatus: () => true, // IMPORTANT!
        }
      );

      if (res.status === 200 && res.data.count !== undefined) {
        setLikeCount(res.data.count);
        setLiked(true);
        localStorage.setItem(`liked-${blogId}`, "true");
        toast.success("Thanks for like!");
      } else if (res.status === 409) {
        toast.info("You have already liked this post!");
        setLiked(true);
        localStorage.setItem(`liked-${blogId}`, "true");
      } else if (res.status === 403) {
        toast.error("You must be logged in to like this post.");
      } else {
        toast.error("Something went wrong.");
        console.error("Unexpected response:", res);
      }
    } catch (err) {
      console.error("Like failed:", err);
      toast.error("Error like the blog");
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`text-white mr-2.5 font-medium rounded-lg text-sm px-5 py-2.5 transition ${
        liked
          ? "bg-green-500 hover:bg-green-600"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      👍 {liked ? "Liked" : "Like"} {likeCount}
    </button>
  );
};

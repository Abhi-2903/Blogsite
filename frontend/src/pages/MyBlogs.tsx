import { BlogCard } from '../components/BlogCard'
import { useMyBlogs } from '../hooks'
import { BlogsSkeleton } from '../components/BlogsSkeleton'

export const MyBlogs = () => {
  const { loading, blogs, error } = useMyBlogs();

  if (loading) {
    return (
      <div className="flex justify-center">
        <div>
          <BlogsSkeleton />
          <BlogsSkeleton />
          <BlogsSkeleton />
          <BlogsSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-500">You have no blogs yet.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-xl">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id} 
            id={blog.id}
            authorName={blog.author?.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"Null"}
          />
        ))}
      </div>
    </div>
  );
};

import { useBlog } from '../hooks'
import { useParams } from 'react-router-dom';
import { FullBlog } from '../components/FullBlog';
import { BlogSkeleton } from '../components/blogSkeleton';
import AdSlot from '../components/AdSlot';

export const Blog = () => {
      const {id} = useParams();
      const {loading, blog}= useBlog({
            id:id||""
      });
     if (loading) 
  return (
    <div>
      <BlogSkeleton/>
    </div>
  );
  return (
    <div>
      {blog && <FullBlog blog={blog} />}
      <AdSlot   slot="1234567890" />
    </div>
  )
}

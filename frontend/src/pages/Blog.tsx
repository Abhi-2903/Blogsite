import React from 'react'
import { useBlog } from '../hooks'
import { useParams } from 'react-router-dom';
import { FullBlog } from '../components/FullBlog';
import { BlogSkeleton } from '../components/blogSkeleton';

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
      
<FullBlog blog={blog}/>
    </div>
  )
}

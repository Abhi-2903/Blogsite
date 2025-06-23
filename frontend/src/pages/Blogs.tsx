import { BlogCard } from '../components/BlogCard'
import { AppBar } from '../components/AppBar'
import { useBlogs } from '../hooks'
import { BlogsSkeleton } from '../components/BlogsSkeleton'

export const Blogs = () => {
  const {loading,blogs}=useBlogs();
  if(loading){
    return <div>
<AppBar/>
<div className='flex justify-center'>
  <div >

      <BlogsSkeleton/>
      <BlogsSkeleton/>
      <BlogsSkeleton/>
      <BlogsSkeleton/>
      </div>
</div>
    </div>
  }
  return (<div>
<AppBar/>
    <div className='flex justify-center'>
    <div className=' max-w-xl'>
     
{blogs.map(blog=> <BlogCard
      id={blog.id}
      authorName={blog.author.name||"Anonymous"}
      title={blog.title}
      content={blog.content}
      publishedDate={"Null"}
      ></BlogCard>)}
      
      </div>
      </div>
      </div>
  )
}


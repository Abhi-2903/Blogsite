import { BlogCard } from '../components/BlogCard'
import { useBlogs } from '../hooks'
import { BlogsSkeleton } from '../components/BlogsSkeleton'
import AdSlot from '../components/AdSlot';

export const MyBlogs = () => {
  const {loading,blogs}=useBlogs();
  if(loading){
    return <div>
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
      </div><AdSlot adSlot="1076716203" />
      </div>
  )
}


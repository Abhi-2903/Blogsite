import { Avatar } from './BlogCard';
import { Link, useLocation } from 'react-router-dom';

export const AppBar = () => {
  const location = useLocation();
  const hideNewBlog = location.pathname === "/publish";

  return (
    <div className='border-b flex justify-between px-10 py-3'>
      <Link to={"/blog"}>
        <div className="text-xl font-bold">Medium</div>
      </Link>

      <div className="flex items-center">
        {!hideNewBlog && (
          <Link to="/publish">
            <button className="mr-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-4xl shadow">
              New Blog
            </button>
          </Link>
        )}

        <button className="cursor-pointer border-2 border-transparent hover:outline hover:outline-2 hover:outline-black/30 rounded-full transition duration-200">
          <Avatar size="big" name="Abhimanyu" />
        </button>
      </div>
    </div>
  );
};

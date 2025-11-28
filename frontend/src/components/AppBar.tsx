import { AvatarDropdown } from "./AvatarDropDown";
import { Link, useLocation } from "react-router-dom";

export const AppBar = () => {
  const location = useLocation();
  const hideNewBlog = location.pathname === "/publish";

  return (
    <div className="border-b flex justify-between px-10 py-3 items-center">
      {/* Logo */}
      <Link to="/blog">
        <div className="flex items-center gap-3">
          {/* Icon Box */}
          <div className="w-10 h-10 border-2 border-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
          </div>

          {/* Logo Text */}
          <h1 className="text-2xl font-bold">
            <span className="text-blue-600">Blog</span>
            <span className="text-black">Site</span>
          </h1>
        </div>
      </Link>

      {/* Right Side */}
      <div className="flex items-center">
        {!hideNewBlog && (
          <Link to="/publish">
            <button className="mr-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-3xl shadow">
              New Blog
            </button>
          </Link>
        )}
        <AvatarDropdown />
      </div>
    </div>
  );
};

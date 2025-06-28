import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

const name = localStorage.getItem("name") || "User"; 


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  // 👇 Detect click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
          <button
    onClick={() => setOpen((prev) => !prev)}
    className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center 
               focus:outline-none hover:outline-8 hover:outline-black/20 
               transition-all duration-200"
  >
    <span className="font-bold text-xl text-gray-700">
      {name[0].toUpperCase()}
    </span>
  </button>
      </div>

     {open && (
  <div className="absolute right-0 mt-2 w-60 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
    <div className="py-2">
      <button
        onClick={() => {
          navigate("/myblogs");
          setOpen(false);
        }}
        className="w-full text-left px-5 py-3 text-base text-gray-700 hover:bg-gray-100"
      >
        My Blogs
      </button>
      <button
        onClick={() => {
          navigate("/about");
          setOpen(false);
        }}
        className="w-full text-left px-5 py-3 text-base text-gray-700 hover:bg-gray-100"
      >
        About Me
      </button>
      <button
        onClick={handleLogout}
        className="w-full text-left px-5 py-3 text-base text-red-600 hover:bg-red-100"
      >
        Logout
      </button>
    </div>
  </div>
)}
    </div>
  );
}

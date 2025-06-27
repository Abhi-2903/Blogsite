// src/components/Footer.tsx

import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Built with ❤️ by{" "}
          <span className="font-semibold">Abhimanyu</span>
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/https://Abhi-2903"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/abhimanyu-chachan/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

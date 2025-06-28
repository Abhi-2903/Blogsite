import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./src/pages/Signup";
import { Blogs } from "./src/pages/Blogs";
import { Blog } from "./src/pages/Blog";
import { Publish } from "./src/pages/Publish";
import { Signin } from './src/pages/Signin';
import { AppBar } from "./src/components/AppBar";
import { Footer } from './src/components/Footer';
import { ProtectedRoute } from './src/components/ProtectedRoute';
import { MyBlogs } from "./src/pages/MyBlogs";
import { About } from "./src/pages/About";


export const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <AppBar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Protected Routes */}
          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publish"
            element={
              <ProtectedRoute>
                <Publish />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myblogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

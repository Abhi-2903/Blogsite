import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", cors({
  origin: (origin) => {
    const allowedOrigins = [
      "https://blogsite-seven-beta.vercel.app",
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ];
    if (origin && allowedOrigins.includes(origin)) return origin;
    return ""; 
  },
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
  credentials: true,
  maxAge: 86400
}));

// Handle preflight OPTIONS requests globally
app.options("/*", (c) => c.json({}, 204));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;

import { Hono } from "hono";

import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string;
    JWT_SECRET: string
  }
}>()

// Enhanced CORS configuration to handle preflight requests properly
app.use("/*", cors({
  origin: "*", // In production, replace with your frontend domain
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-Requested-With",
    "Accept",
    "Origin"
  ],
  exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
  maxAge: 86400, // Cache preflight for 24 hours
  credentials: false
}))

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app

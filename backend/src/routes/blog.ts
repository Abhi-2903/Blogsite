import { createBlogInput, udpateBlogInput } from "@abhimanyu-2903/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
// @ts-ignore
const authMiddleware= async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  const token = authHeader.replace(/^Bearer\s+/i, "");

  try {
    const user = await verify(token, c.env.JWT_SECRET);

    // @ts-ignore
    c.set("userId", user.id);

    await next();
  } catch (err) {
    
    console.error("JWT verification failed:", err);
    c.status(403);
    return c.json({ msg: "You are not logged in" });
  }
};

// Create blog post
blogRouter.post("/",authMiddleware, async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
const {success}= createBlogInput.safeParse(body)
if(!success){
  c.status(411);
  return c.json({
    //@ts-ignore
    msg:"Inputs are not correct"
  })
}
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
      },
    });

    return c.json({ id: blog.id });
  } catch (e) {
    //@ts-ignore
    console.error("Blog creation error:", e);
    c.status(500);
    return c.json({ msg: "Error creating blog" });
  }
});

// Update blog post
blogRouter.put("/",authMiddleware, async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
const {success}= udpateBlogInput.safeParse(body)
if(!success){
  c.status(411);
  return c.json({
    //@ts-ignore
    msg:"Inputs are not correct"
  })
}
  try {
    const blog = await prisma.blog.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: blog.id });
  } catch (e) {
    //@ts-ignore
    console.error("Blog update error:", e);
    c.status(500);
    return c.json({ msg: "Error updating blog" });
  }
});

// Get all blogs
blogRouter.get("/bulk",authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        publishedAt: "desc"
      },
      select:{
        content: true,
        title: true,
        authorId: true,
        likeCount: true,
        id: true,
        author:{
          select:{
            name: true
          }
        }
      }
    });
    return c.json({ blogs });
  } catch (e) {
    //@ts-ignore
    console.error("Fetching blogs failed:", e);
    c.status(500);
    return c.json({ msg: "Error fetching blogs" });
  }
});
//list my blogs
blogRouter.get("/myblogs", authMiddleware,async (c) => {
  const userId = c.get("userId");
  console.log("userId:", userId)

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    console.log("userId:", userId)
    const blog = await prisma.blog.findMany({
      where: { 
        authorId: Number(userId),
   
              },
      select:{
        id: true,
        title: true,
        content: true,
        authorId: true,
        publishedAt: true,
        author:{
          select:{
            name: true
          }
        }
      }
    });

    if (blog.length==0 ) {
      c.status(404);
      return c.json({ msg: "Blogs not found" });
    }

    return c.json({ blog });
  } catch (e) {
    console.error("Fetching blogs failed:", e);
    c.status(500);
    return c.json({ msg: "Error fetching blogs " });
  }
});

// Get single blog by ID
blogRouter.get("/:id", authMiddleware,async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: Number(id) },
      select:{
        id: true,
        title: true,
        content: true,
        likeCount:true,
        authorId: true,
        publishedAt: true,
        author:{
          select:{
            name: true
          }
        }
      }
    });

    if (!blog) {
      c.status(404);
      return c.json({ msg: "Blog not found" });
    }

    return c.json({ blog });
  } catch (e) {
    //@ts-ignore
    console.error("Fetching blog failed:", e);
    c.status(500);
    return c.json({ msg: "Error fetching blog post" });
  }
});

// Delete blog post
blogRouter.delete("/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });

    return c.json({ msg: "Blog deleted successfully" });
  } catch (e) {
    //@ts-ignore
    console.error("Deleting blog failed:", e);
    c.status(500);
    return c.json({ msg: "Error deleting blog post" });
  }
});

blogRouter.post("/:id/like", authMiddleware, async (c) => {
  const blogId = parseInt(c.req.param("id"));
  const userId = Number(c.get("userId"));

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_blogId: {
          userId,
          blogId,
        },
      },
    });

    if (existingLike) {
   if (existingLike) {
  c.status(409);
  return c.json({ msg: "Already liked" });
}
    }

    await prisma.like.create({
      data: {
        userId,
        blogId,
      },
    });

    await prisma.blog.update({
      where: { id: blogId },
      data: {
        likeCount: { increment: 1 },
      },
    });

    const count = await prisma.like.count({
      where: { blogId },
    });

    return c.json({ count });
  } catch (e: any) {
    console.error("Liking blog failed:", e); // ⛳ FULL error log here
    c.status(500);
    return c.json({ msg: "Error liking blog", error: e.message || e });
  }
});

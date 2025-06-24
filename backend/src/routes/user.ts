import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { sign } from "../jwt";
//@ts-ignore
import {signinInput, signupInput} from "@abhimanyu-2903/medium-common"
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  //@ts-ignore
  console.log("Signup attempt with username:", body.username); // Debug log
  const {success}= signupInput.safeParse(body)
if(!success){
  c.status(411);
  return c.json({
    //@ts-ignore
    msg:"Inputs are not correct"
  })
}
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );
return c.json({
  token: jwt,
  user: {
    id: user.id
  }
});

  } catch (e: any) {
    if (e.code === "P2002") {
      c.status(409);
      return c.text("User already exists with this username");
    }
    c.status(500);
    ///@ts-ignore
    console.log(e);
    return c.text("An unexpected error occurred");
  }
});
userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const {success}= signinInput.safeParse(body)
if(!success){
  c.status(411);
  return c.json({
    //@ts-ignore
    msg:"Inputs are not correct"
  })
}
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.text("Invalid credentials");
    }
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );
return c.json({
  token: jwt,
  user: {
    id: user.id
  }
});

  } catch (e) {
    c.status(500);
    return c.text("An unexpected error occurred during signin");
  }
});

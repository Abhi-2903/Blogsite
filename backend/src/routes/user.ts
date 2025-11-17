import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "../jwt";
import {signinInput, signupInput} from "@abhimanyu-2903/medium-common"
import bcrypt from "bcryptjs";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    TURNSTILE_SECRET: string;
  };
}>();
async function verifyTurnstile(token: string, secret: string) {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      response: token
    })
  });

  return await response.json();
}

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  // Turnstile token from client
  const turnstileToken = body.turnstileToken;

  if (!turnstileToken) {
    c.status(400);
    return c.json({ msg: "Captcha token missing" });
  }

  // Verify turnstile
  const captchaResult = await verifyTurnstile(turnstileToken, c.env.TURNSTILE_SECRET);

  if (!captchaResult.success) {
    c.status(400);
    return c.json({ msg: "Captcha failed", result: captchaResult });
  }

  // Input validation
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: "Inputs are not correct" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
        name: body.name,
      },
    });

    return c.json({
      msg: "User registered.",
      user: { id: user.id, name: user.name },
    });

  } catch (e: any) {
    if (e.code === "P2002") {
      c.status(409);
      return c.text("User already exists");
    }
    console.log(e);
    c.status(500);
    return c.text("Unexpected error");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const turnstileToken = body.turnstileToken;
  if (!turnstileToken) {
    c.status(400);
    return c.json({ msg: "Captcha token missing" });
  }

  const captchaResult = await verifyTurnstile(turnstileToken, c.env.TURNSTILE_SECRET);
  if (!captchaResult.success) {
    c.status(400);
    return c.json({ msg: "Captcha failed", result: captchaResult });
  }

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: "Inputs are not correct" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: { username: body.username },
    });

    if (!user) {
      c.status(403);
      return c.text("Invalid credentials");
    }

    let validUser = false;
    if (user.password.startsWith("$2b$")) {
      validUser = await bcrypt.compare(body.password, user.password);
    } else {
      validUser = body.password === user.password;
    }

    if (!validUser) {
      c.status(403);
      return c.text("invalid password");
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      token: jwt,
      user: { id: user.id, name: user.name }
    });

  } catch (e: any) {
    c.status(500);
    return c.json({ msg: "Unexpected error", error: e.message });
  }
});

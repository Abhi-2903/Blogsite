import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "../jwt";
import {signinInput, signupInput} from "@abhimanyu-2903/medium-common"
import bcrypt from "bcryptjs";
import { sendOTPEmail } from "../mailer";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

  function generateOTP(length = 6) {
  return Math.floor(1000 + Math.random() * 9999).toString();
}

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  //@ts-ignore
  console.log("Signup attempt with username:", body.username); 
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
    const hashedPassword = await bcrypt.hash(body.password, 10)
    console.log("Hashed password:", hashedPassword);
    
    const otp = generateOTP();

    const user = await prisma.user.create({
      data: {
      username: body.username,
      password: hashedPassword,
      name: body.name,
      otp,
      otpVerified:false,
      },
    });

    await sendOTPEmail(body.username, otp)

    return c.json({
      msg: "User registered. Please check your email for OTP.",
      user: {
        id:user.id,
        name: user.name   
        },

    })
  
    

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
      },
    });
    if (!user) {
      c.status(403);
      return c.text("Invalid credentials");
    }

    let validUser = false;
    if(user.password.startsWith("$2b$")){
      validUser = await bcrypt.compare(body.password, user.password)
    }
    else{
      validUser= body.password ===user.password
    }

    if(!validUser){
      c.status(403);
      return c.text("invalid password")
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
    id: user.id,
    name: user.name
  }
  
});

  } catch (e: any) {
  console.error("Signin error:", e);
  c.status(500);
  return c.json({ msg: "Unexpected error", error: e.message });
}
});

userRouter.post("/verify-otp", async (c) => {
  const body = await c.req.json();
  const { userId, otp } = body;

  if (!userId || !otp) {
    c.status(400);
    return c.json({ msg: "userId and otp are required" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      c.status(403);
      return c.json({ msg: "User not found" });
    }

    if (user.otpVerified) {
      return c.json({ msg: "OTP already verified" });
    }

    if (user.otp !== otp) {
      c.status(400);
      return c.json({ msg: "Invalid OTP" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { otpVerified: true, otp: null },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      msg: "OTP verified successfully",
      token: jwt,
      user: { id: user.id, name: user.name },
    });
  } catch (err) {
    console.error(err);
    c.status(500);
    return c.json({ msg: "Unexpected error", error: err });
  }
});

userRouter.post("/resend-otp", async (c) => {
  const { userId } = await c.req.json();

  if (!userId) {c.status(400);
    c.json({ msg: "userId is required" })
  };

  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user){ c.status(404)
      return c.json({ msg: "User not found" })
    };
    if (user.otpVerified) return c.json({ msg: "User already verified" });

    const otp = generateOTP();

    await prisma.user.update({
      where: { id: userId },
      data: { otp },
    });

    await sendOTPEmail(user.username, otp);

    return c.json({ msg: "OTP resent successfully" });
  } catch (err) {
    console.error(err);
     c.status(500) 
     return c.json({ msg: "Unexpected error", error: err });
  }
});

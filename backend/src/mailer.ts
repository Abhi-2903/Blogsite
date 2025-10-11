import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        // user: 
        // pass
    }
})

export async function sentOTPEmail(to:string, otp: string){
    try{
const info = await transporter.sendMail({
      from: `"MyProject" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <b>${otp}</b></p>`,
    });
    console.log("OTP email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
}
    
   

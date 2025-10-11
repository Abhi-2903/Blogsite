import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function sendOTPEmail(to: string, otp: string) {
  try {
    const mailerSend = new MailerSend({
        //@ts-ignore
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    const sentFrom = new Sender("your_verified_sender@mailersend.net", "MyApp Support");

    const recipients = [new Recipient(to, "User")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Your OTP Code")
      .setHtml(`<p>Hello 👋,</p>
                <p>Your One-Time Password (OTP) is:</p>
                <h2>${otp}</h2>
                <p>This code will expire in 10 minutes.</p>`)
      .setText(`Your OTP code is: ${otp}`);

    await mailerSend.email.send(emailParams);
    console.log(`✅ OTP email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
  }
}

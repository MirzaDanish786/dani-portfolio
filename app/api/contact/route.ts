import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { message: "Email service not configured" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "baigmirzadanish3@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3>Message:</h3>
            <p style="line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Failed to send email", error },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        message: "Failed to send email",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

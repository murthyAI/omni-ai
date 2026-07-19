import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactRequestBody = {
  name?: string;
  email?: string;
  category?: string;
  subject?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const category = body.category?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !category || !subject || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");

      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

    if (!receiverEmail) {
      console.error("CONTACT_RECEIVER_EMAIL is missing.");

      return NextResponse.json(
        { error: "Receiver email is not configured." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "OMNI AI Contact <onboarding@resend.dev>",
      to: receiverEmail,
      replyTo: email,
      subject: `OMNI AI Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #111827;">
          <div style="background: #2563eb; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: white; font-size: 24px;">
              New OMNI AI Contact Message
            </h1>
          </div>

          <div style="border: 1px solid #e5e7eb; border-top: 0; padding: 24px; border-radius: 0 0 12px 12px;">
            <p style="margin: 0 0 16px;">
              A user submitted a message through the OMNI AI Contact page.
            </p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; background: #f9fafb; border: 1px solid #e5e7eb;">
                  Name
                </td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">
                  ${escapeHtml(name)}
                </td>
              </tr>

              <tr>
                <td style="padding: 10px; font-weight: bold; background: #f9fafb; border: 1px solid #e5e7eb;">
                  Email
                </td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">
                  ${escapeHtml(email)}
                </td>
              </tr>

              <tr>
                <td style="padding: 10px; font-weight: bold; background: #f9fafb; border: 1px solid #e5e7eb;">
                  Enquiry Type
                </td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">
                  ${escapeHtml(category)}
                </td>
              </tr>

              <tr>
                <td style="padding: 10px; font-weight: bold; background: #f9fafb; border: 1px solid #e5e7eb;">
                  Subject
                </td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">
                  ${escapeHtml(subject)}
                </td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <h2 style="font-size: 18px; margin-bottom: 10px;">Message</h2>

              <div style="white-space: pre-wrap; line-height: 1.7; background: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px;">
                ${escapeHtml(message)}
              </div>
            </div>

            <p style="margin-top: 24px; color: #6b7280; font-size: 13px;">
              Use your email application's Reply button to respond directly to
              ${escapeHtml(name)}.
            </p>
          </div>
        </div>
      `,
      text: `
New OMNI AI Contact Message

Name: ${name}
Email: ${email}
Enquiry Type: ${category}
Subject: ${subject}

Message:
${message}
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { error: "Unable to send your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message was sent successfully.",
        emailId: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
import emailjs from "@emailjs/browser";

async function sendMail(
  firstName: string,
  lastName: string,
  email: string,
  message: string
) {
  if (
    !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    !process.env.NEXT_PUBLIC_CONTACT_FORM_SUBMISSION_MAIL
  ) {
    console.error("Missing required environment variables for EmailJS.");
    throw new Error("EmailJS configuration is incomplete.");
  }

  console.log({
    firstName,
    lastName,
    email,
    message,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  });

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        name: `${firstName || ""} ${lastName || ""}`,
        email: email,
        message: message || "",
        to_email: email,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    // Email to your internal contact address
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        name: `${firstName || ""} ${lastName || ""}`,
        email: email,
        message: message || "",
        to_email: process.env.NEXT_PUBLIC_CONTACT_FORM_SUBMISSION_MAIL,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    console.log("Emails sent successfully.");
  } catch (error) {
    console.error("Error sending emails via EmailJS:", error);
    throw new Error("Failed to send emails. Please try again later.");
  }
}

export default sendMail;

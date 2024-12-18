import emailjs from '@emailjs/browser';
import 'dotenv/config'; // ESM syntax

emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  })



async function sendMail(first_name, last_name, email, message){
     await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,{
                text: `Dear ${first_name || ""} ${last_name || ""}, 

                Thank you for reaching out to us. We have successfully received your form submission with the following details:
              
                - Name: ${first_name || ""} ${last_name || ""}
                - Email: ${email}
                - Message: ${message || ""}
              
                We will review your request and get back to you as soon as possible.
              
                Best regards,
                Hacktoast Team`,
                to_email: email,
              });

              await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,{
                text: ` 

                You have recieved a form submission:
              
                - Name: ${first_name || ""} ${last_name || ""}
                - Email: ${email}
                - Message: ${message || ""}
              `,
                to_email: process.env.NEXT_PUBLIC_CONTACT_FORM_SUBMISSION_MAIL,
              });

}


export default sendMail
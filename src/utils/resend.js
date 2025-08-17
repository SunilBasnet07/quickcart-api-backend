import { Resend } from "resend";

const ResendEmail =async(email)=>{
    const resend = new Resend('re_KXpG47ET_LnbnXFFXk6wXESX8t1S6RFMk');
     const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Hello World',
    html: '<strong>It works!</strong>', 
  });

  if (error) {
    return console.error({ error });
  }
}
export default ResendEmail;
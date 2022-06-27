import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "051b77cb288153",
    pass: "6891018290bb29"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject,body}: SendMailData){
    await transport.sendMail({
      from: 'Equipe Feedget <hi@mail.com>',
      to: 'Lucas Reis <reislcr.rj@gmail.com>',
      subject,
      html: body
    })
  };
}
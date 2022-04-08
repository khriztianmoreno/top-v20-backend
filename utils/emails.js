const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

async function createGoogleTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
}

async function sendMailNodeMailer(data) {
  const transporter = await createGoogleTransporter();

  // send mail with defined transport object
  const info = await transporter.sendMail(data);
  return info;
}

function sendMailSendGrid(data) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  return sgMail.send(data);
}

module.exports = {
  sendMailNodeMailer,
  sendMailSendGrid,
};

const nodemailer = require("nodemailer");
const { emailVerifyTemplate } = require("./template/verify");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendmail = async ({ token, email }) => {
  await transporter.sendMail({
    from: "ADMIN",
    to: email,
    subject: "Token Verify",
    text: "Please click the link below to verify your email",
    html: emailVerifyTemplate(
      `<a href="${process.env.ROOT_DOMAIN}/api/v1/user/auth/verify-email/${token}"class="button button--blue">Verify Email</a>`
    ),
  });
};

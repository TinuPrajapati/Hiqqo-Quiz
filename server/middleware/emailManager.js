const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = async ({ email, generateOtp }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Quiz App" ${process.env.SMTP_MAIL}`, // sender address
      to: email, // list of receivers
      subject: "Your Reset Password OTP", // Subject line
      html: `<b>OTP is: <i>${generateOtp}</i></b>`, // html body
    });

    // console.log(`Email sent to ${email}: ${info.messageId}`);
    return info.messageId;
  } catch (error) {
    console.log(`Error in sending email: ${error}`);
  }
};

module.exports = sendMail;

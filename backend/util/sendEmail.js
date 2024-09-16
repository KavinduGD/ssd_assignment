const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,  // The SMTP server host
    port: 587,     // Use STARTTLS port for TLS encryption
    secure: false, // Use STARTTLS (secure: false means STARTTLS, true means SMTPS)
    auth: {
      user: process.env.EMAIL_USER, // Your SMTP username
      pass: process.env.EMAIL_PASS, // Your SMTP password
    },
    tls: {
      // Ensure the server certificate is verified
      rejectUnauthorized: true,
      ciphers: 'SSLv3', // Optional: Specify the cipher suite for encryption
    },
  });

  const options = {
    from: sent_from,
    to: send_to,
    reply_to: reply_to || sent_from,
    subject: subject,
    html: message,
  };

  // Send the email and handle the response or any errors
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.error("Error occurred during email sending:", err);
    } else {
      console.log("Email sent successfully:", info);
    }
  });
};

module.exports = sendEmail;
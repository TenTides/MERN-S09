const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey', // Use 'apikey' as the user
    pass: process.env.SENDGRID_API_KEY // Check its in .env file
  }
});

const sendVerificationEmail = (email, verificationToken) => {
  const verificationUrl = `http://yourfrontend.com/verify?token=${verificationToken}`;
  
  transporter.sendMail({
    to: email,
    from: 'pa129475@ucf.edu', // Verify sender in SendGrid
    subject: 'Verify Your Email',
    html: `Please click the link to verify your email: <a href="${verificationUrl}">Verify Email</a>`
  }, (err, info) => {
    if (err) {
      console.error('Error sending verification email:', err);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};

module.exports = sendVerificationEmail;

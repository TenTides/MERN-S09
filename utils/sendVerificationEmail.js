const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to,
    from: 'climbingtiger001@gmail.com', // Use your verified sender email here
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent to', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;

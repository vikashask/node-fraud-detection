
const nodemailer = require('nodemailer');
// https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
module.exports.sendMail = (data) => {
  var mailTransport=nodemailer.createTransport({
    service:'Gmail',
    auth: {
        user : process.env.SMTP_USER?process.env.SMTP_USER:'vikashraj144@gmail.com',
        pass : process.env.SMTP_PASS?process.env.SMTP_PASS:'son@li@123'
    }
  });

  const message = {
    from: 'vikashraj144@gmail.com', // Sender address
    to: data.emailId?email.emailId:'vikashraj144@gmail.com',         // List of recipients
    subject: 'Forgot Password', // Subject line
    text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
};
mailTransport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
});
};

const { createTransport } = require("nodemailer");

// third party mail service =>
// const transporter = createTransport({
//   host: process.env.MAIL_SMTP_HOST,
//   port: process.env.MAIL_SMTP_PORT,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_AUTH_KEY,
//   },
// });

// google mail service =>
const transporter = createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_SMTP_PORT,
  secure: false, // use SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEMail = async (firstName, lastName, email, message) => {
  const mailOptions = {
    from: {
      name: "TEAM - AB",
      address: process.env.MAIL_USER,
    },
    to: [email],
    subject: "Sending Email using Node.js",
    text: "hi!",
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }

        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        p {
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello, ${firstName} ${lastName}!</h1>
        <p>Your message has been received, and someone from our team will contact you shortly.</p>
        <p>Thankyou for using our services</p>
        <p>Your Message:</p>
        <p>${message}</p>
    </div>
</body>
</html>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error, "<error in seding mail");
    else {
      // console.log(info, "< check info");
    }
  });
};

module.exports = sendEMail;

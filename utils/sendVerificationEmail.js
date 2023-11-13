const { createTransport } = require("nodemailer");

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

const sendVerificationEMail = async (firstName, lastName, email, id) => {
  const mailOptions = {
    from: {
      name: "TEAM - AB",
      address: process.env.MAIL_USER,
    },
    to: [email],
    subject: "Verify your Service Provider Account",
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
                    <p>We have recevied your application for joining us as a service provider.</p>
                    <p>Please verify your email</p>

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

// module.exports = sendVerificationEMail;

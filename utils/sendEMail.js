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

const sendVerificationEMail = async (firstName, lastName, email, _id) => {
  const transporter2 = createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_SMTP_PORT,
    secure: false, // use SSL
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });
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
                    button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        border-radius: 5px;
                        text-decoration: none;
                        font-size: 16px;
                        font-weight: bold;
                        border: none;
                        
                    }

                    button:hover {
                        background-color: #0069d9;
                        cursor: pointer;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hello, ${firstName} ${lastName}!</h1>
                    <p>We have recevied your application for joining us as a service provider.</p>
                    <p>Please verify your email.</p>
                    <a href=${process.env.BACKEND_URL}/api/v1/service-provider/verify/?id=${_id}&email=${email}"><button>Verify</button></a>
                </div>
            </body>
            </html>
            `,
  };

  transporter2.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error, "<error in seding mail");
    else {
      // console.log(info, "< check info");
    }
  });
};

const sendEmailServiceProvider = async (firstName, lastName, email, _id) => {
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
                    button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        border-radius: 5px;
                        text-decoration: none;
                        font-size: 16px;
                        font-weight: bold;
                        border: none;
                        
                    }

                    button:hover {
                        background-color: #0069d9;
                        cursor: pointer;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hello, ${firstName} ${lastName}!</h1>
                    <p>We have recevied your application for joining us as a service provider.</p>
                    <p>Please verify your email.</p>
                    <a href="https://f93f-103-167-115-23.ngrok-free.app/verify/?id=${_id}&email=${email}"><button>Verify</button></a>
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

const sendEmailAppliedAd = async (firstName, email) => {
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
                    <h1>Hello, ${firstName}!</h1>
                    <p>We have received Ad application. We will update you with the status regarding Ad application shortly.</p>
                    <p>Thankyou for using our services</p>
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

module.exports = {
  sendEMail,
  sendVerificationEMail,
  sendEmailServiceProvider,
  sendEmailAppliedAd,
};

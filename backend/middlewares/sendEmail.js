const nodeMailer = require("nodemailer");
var dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
const config = require("./config");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

exports.sendEmail = (options) => {
  const accessToken = OAuth2_client.getAccessToken();
  accessToken
    .then(function (result) {
      console.log(result); // "Some User token"
    })
    .catch((e) => console.log(e));

  // console.log("accessToken", accessToken);

  const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken: accessToken,
    },
  });

  const mail_options = {
    from: config.user,
    to: options.email,
    subject: options.subject,
    html: `<h3>${options.message}</h3>`,
  };
  transport.sendMail(mail_options, function (error, result) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Success:", result);
    }
    transport.close();
  });
};
// exports.sendEmail = async (options) => {
//   try {
//     // sending mail from mailtrap.io
//     const transporter = nodeMailer.createTransport({
//       host: "smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "687153a88a9b2a",
//         pass: "882d8238ff66b6",
//       },
//     });

//     const mailOptions = {
//       from: process.env.SMPT_MAIL,
//       to: options.email,
//       subject: options.subject,
//       text: options.message,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.log(error);
//   }
// };

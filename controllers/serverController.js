const { default: axios } = require("axios");
const sendEMail = require("../utils/sendEMail");
const Query = require("../models/query");
const todayDate = require("../utils/todayDate");

const mailHandler = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  if (!firstName || !lastName || !email || !message) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide all the details" });
  }

  try {
    const { data: verification } = await axios.get(
      `https://client.bulkemailverifier.com/api/singlemaildetails?secret=${process.env.MAIL_VERIFIER_KEY}&email=${email}`
    );
    if (verification && verification.success) {
      if (verification.result === "valid") {
        const newMsg = await Query.create({
          firstName,
          lastName,
          email,
          message,
          date: todayDate().date,
          time: todayDate().time,
        });

        const io = req.app.get("io");
        io.emit("haveSomethingToSay", newMsg);

        await sendEMail(firstName, lastName, email, message);
        res.status(200).json({ success: true, msg: "mail sent successfully" });
      } else {
        res.status(400).json({ success: false, msg: "Invalid email" });
      }
    } else {
      throw new Error("Error in mail verification");
    }
  } catch (error) {
    console.log(error, "< error in mailHandler");
    res.status(500).json({ success: false, msg: "Server error", error });
  }
};

module.exports = mailHandler;

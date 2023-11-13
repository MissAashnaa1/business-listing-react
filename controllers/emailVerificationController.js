const ServiceProvider = require("../models/serviceProvider");

const verifyEmail = async (req, res) => {
  console.log(req.query);
  const { _id, email } = req.query;

  const serviceProvider = await ServiceProvider.findById(_id);

  if (!serviceProvider) {
    return res.render("emailResponse", { status: "error" });
  }

  if (serviceProvider.email !== email) {
    return res.render("emailResponse", { status: "error" });
  }

  serviceProvider.isVerified = true;
  await serviceProvider.save();

  return res.render("emailResponse", { status: "success" });
};

module.exports = { verifyEmail };

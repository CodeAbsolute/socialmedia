require("dotenv").config({ path: "backend/config/config.env" });
module.exports = {
  user: process.env.user,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  refreshToken: process.env.refreshToken,
};

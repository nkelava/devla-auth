const jwtConfig = {
  access_token: {
    exp: "7d",
    secret: process.env.ACCESS_TOKEN_SECRET,
  },
  refresh_token: {
    exp: "30d",
    secret: process.env.REFRESH_TOKEN_SECRET,
  },
};

module.exports = {
  jwtConfig,
};

const jwtConfig = {
  access_token: {
    exp: "30s",
    secret: process.env.ACCESS_TOKEN_SECRET,
  },
  refresh_token: {
    exp: "1d",
    secret: process.env.REFRESH_TOKEN_SECRET,
  },
};

module.exports = {
  jwtConfig,
};

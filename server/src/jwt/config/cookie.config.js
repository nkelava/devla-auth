const cookieConfig = {
  refresh_token: {
    name: "refresh_token",
    options: {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 86400000, // 1d
    },
  },
};

module.exports = {
  cookieConfig,
};

const cookieConfig = {
  refresh_token: {
    name: "refresh_token",
    options: {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 2592000000, // 30d
    },
  },
};

module.exports = {
  cookieConfig,
};

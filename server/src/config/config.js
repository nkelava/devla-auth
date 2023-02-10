module.exports = {
  DB_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
  DB_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
  DB_IP: process.env.DB_IP || "mongo",
  DB_PORT: process.env.DB_PORT || 27017,
  DB_NAME: process.env.MONGO_INITDB_DATABASE,
};

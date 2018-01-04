module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/hapi17",
  SECRET_KEY: "72384rjdaks!$%^&*&*^&^#*$^DFGHTR4asdf54sdf54sdaf2345453afdfasdjfksdajfsafkjk^&#*HF@(^YH!Y*#RH!I#HTJ",
  REDIS_CONFIG: {
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    // password: "auth",
    db: 0,
  },
};

module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  MONGO_URL: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
  SECRET_KEY: "72384rjdaks!$%^&*&*^&^#*$^DFGHTR4asdf54sdf54sdaf2345453afdfasdjfksdajfsafkjk^&#*HF@(^YH!Y*#RH!I#HTJ",
  REDIS_CONFIG: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
};

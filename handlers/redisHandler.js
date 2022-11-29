const config = require("config");
const redis = require("redis");

const redisConfig = config.get("redis");
const client = redis.createClient(redisConfig);

const duplicate = () => {
  return client.duplicate();
};

module.exports = {
  duplicate,
};

const config = require("config");
const redis = require("redis");

const redisConfig = config.get("redis");
const client = redis.createClient(redisConfig);

const init = async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error(err);
  }
};

const CLIENT_IDS_KEY = "clientIds";

const addClientId = (clientId) => {
  return client.sAdd(CLIENT_IDS_KEY, clientId);
};

const removeClientId = (clientId) => {
  return client.sRem(CLIENT_IDS_KEY, clientId);
};

const getClientIds = () => {
  return client.sMembers(CLIENT_IDS_KEY);
};

const clearClientIds = () => {
  return client.del(CLIENT_IDS_KEY);
};

const duplicate = () => {
  return client.duplicate();
};

module.exports = {
  addClientId,
  removeClientId,
  getClientIds,
  duplicate,
  init,
};

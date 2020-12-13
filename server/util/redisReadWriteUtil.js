const redis = require("redis");

const client = redis.createClient(6379);
client.on_connect("error", (err) => {
  console.log(`err from redis ${err}`);
});


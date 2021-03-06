const redis = require("redis");
const http = require("http");
const url = require("url");
const client = redis.createClient(
  process.env.REDIS_URL || "redis://localhost:6379"
);

client.on("connect", () => console.log("connected"));

http
  .createServer((req, res) => {
    var query = url.parse(req.url, true).query;
    const key = query.key;
    const value = query.value;

    if (value) {
      client.set(key, value, (err, reply) => {
        console.log(err, reply);

        if (err) {
          res.write(err);
        } else {
          res.write(`set successful: [${key}:${value}]`);
        }
        res.end();
      });
    } else {
      client.get(key, (err, reply) => {
        console.log(err, reply);

        if (err) {
          res.write(err);
        } else {
          res.write(`get [${key}] successful: [${reply}]`);
        }
        res.end();
      });
    }
  })
  .listen(8080);

const jsonFile = require("jsonfile")
const redis = require('redis')

const redisInfoFileName = __dirname + "/redisInfo.json";
let info = jsonFile.readFileSync(redisInfoFileName);

//client
const client = redis.createClient(info.REDIS_CONF.port, info.REDIS_CONF.host);


client.on("error", err => {
    console.err(err);
})


// 存储值
function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    client.set(key, val, redis.print)
}

// 读取值
function get(key) {
    return client.get(key).then((val) => {
        if (val == null) {
            return null;
        }
        // 如果是json则转为对象，否则直接返回设置的值
        return val;
    })
}

client.connect();

module.exports = {
    client,
    set,
    get
}


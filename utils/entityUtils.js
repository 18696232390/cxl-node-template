// https://blog.csdn.net/dai_jing/article/details/47276921
var uuid = require('node-uuid');

var entityUtils = {
    getUuid: () => { return uuid.v1() },
    getUuidV4: () => { return uuid.v4()}
}

module.exports = entityUtils
const ENV = process.env.NODE_ENV || "development";
const devData = require("./development-data");
const testData = require("./test-data/index");

const Data = { development: devData, test: testData };

module.exports = data[ENV];

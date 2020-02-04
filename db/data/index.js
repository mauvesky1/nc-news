const ENV = process.env.NODE_ENV || "development";
const devData = require("./development-data");
const testData = require("./test-data/index");

const data = { development: devData, test: testData };

module.exports = data[ENV];

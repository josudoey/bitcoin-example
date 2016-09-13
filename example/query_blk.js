//ref https://github.com/bitpay/bitcoind-rpc
//ref https://github.com/bitpay/bitcoind-rpc/blob/master/lib/index.js#L134
//ref https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list
var co = require("co");
var Promise = require("bluebird");
var bitcore = require('bitcore');
var RpcClient = require('bitcoind-rpc');

var config = require("./config");

var rpc = new RpcClient(config);
var rpc = Promise.promisifyAll(rpc);

co(function* () {

  var blockNo = 1;
  var ret = yield rpc.getBlockHashAsync(blockNo);
  console.log("===getBlockHash===");
  console.log(JSON.stringify(ret, null, 4));

  var blockHash = ret.result;
  ret = yield rpc.getBlockAsync(blockHash);
  console.log("===getBlock===");
  console.log(JSON.stringify(ret, null, 4));

}).catch(function (err) {
  console.error(err);
});


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
  var addr = "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX";
  var ret = yield rpc.getAccountAddressAsync(addr);
  console.log("====getAccountAddress====");
  console.log(JSON.stringify(ret, null, 4));

  var ret = yield rpc.getAddressTxidsAsync({
    addresses: [addr]
  });
  console.log("====getAddressTxids====");
  console.log(JSON.stringify(ret, null, 4));

  var ret = yield rpc.getAddressBalanceAsync({
    addresses: [addr]
  });
  console.log("====getAddressBalance====");
  console.log(JSON.stringify(ret, null, 4));

}).catch(function (err) {
  console.error(err);
});


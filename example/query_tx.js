//ref https://github.com/bitpay/bitcoind-rpc
//ref https://github.com/bitpay/bitcoind-rpc/blob/master/lib/index.js#L134
//ref https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list
var co = require("co");
var Promise = require("bluebird");
var bitcore = require('bitcore');
var RpcClient = require('bitcoind-rpc');

var config = {
  protocol: 'http',
  user: 'bitcoin',
  pass: 'local321',
  host: 'localhost',
  port: '8332'
};

var rpc = new RpcClient(config);
var rpc = Promise.promisifyAll(rpc);

co(function* () {
  var info = yield rpc.getInfoAsync();
  console.log(JSON.stringify(info, null, 4));

  console.log("=======");
  var verbose = 1;
  var txHash = "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098";
  var rawtx = yield rpc.getRawTransactionAsync(txHash, verbose);
  console.log(JSON.stringify(rawtx, null, 4));

  console.log("===tx instance====");
  var tx = new bitcore.Transaction(rawtx.result.hex);
  console.log(JSON.stringify(tx.toObject(), null, 4));

}).catch(function (err) {
  console.error(err);
});


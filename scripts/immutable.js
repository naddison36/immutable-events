

var Contract = eth.contract([{"constant":true,"inputs":[],"name":"id","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"components":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"keyValues","type":"tuple[]"}],"name":"emitEvent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"components":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"indexed":false,"name":"keyValues","type":"tuple[]"}],"name":"ImmutableEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"SimpleEvent","type":"event"}]);
// var contract = Contract.at(''); // Geth dev
var contract = Contract.at('0xF0617D0b3A72B283E36a29FA03E7C40de919aBb0'); // Parity dev
//var contract = Contract.at(''); // mainnet

var accountPassword = 'Immutable';

function unlockAllAccounts() {
    eth.accounts.forEach(function(address) {
        personal.unlockAccount(address, accountPassword, 0);
    });
}

function transferEthToAll() {
  eth.accounts.forEach(function(account, i) {
    eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[i], value: web3.toWei(10, "ether")})
  })
}

//eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[3], value: web3.toWei(100, "ether")})
//eth.getTransactionReceipt('0xc5a930a4d4aef2525f9ce5d63e3c6a206400dae070394766de86bb43269dfc50');

### Start up the EthereumJS RPC client
> testrpc
### Deploy metacoin and related contract(s) to the network
> truffle migrate
### check if everything is working correctly
> truffle console     
truffle(development)> Migrations.deployed().then(console.log)     
truffle(development)> People.deployed().then(instance => instance.addPerson("first", "last", 20))     
truffle(development)> People.deployed().then(instance => instance.getPeople.call())    

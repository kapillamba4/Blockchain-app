var Migrations = artifacts.require("./People.sol");


module.exports = function(deployer) {
    deployer.deploy(Migrations);
};
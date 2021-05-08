const MyDeFiProject = artifacts.require("MyDeFiProject");

module.exports = function (deployer) {
  deployer.deploy(MyDeFiProject, "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa");
};

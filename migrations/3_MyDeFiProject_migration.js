const MyDeFiProject = artifacts.require("MyDeFiProject");

// interface du contrat Dai
const Dai = require("../build/contracts/Dai.json");

// web3 instance
const Web3 = require("web3");
const web3 = new Web3("http://localhost:9545");

module.exports = async function (deployer, networks, accounts) {
  const id = await web3.eth.net.getId();
  //console.log(id);

  const DaiDeployedNetwork = Dai.networks[id];
  //console.log(DaiDeployedNetwork);
  //console.log(DaiDeployedNetwork.address);

  //Dai contract instance
  const DaiContract = new web3.eth.Contract(
    Dai.abi,
    DaiDeployedNetwork.address
  );
  const DaiAddress = await DaiContract.options.address;
  //console.log(DaiAddress);

  // Deploy de MyDeFiProject avec l'argument du constructor
  await deployer.deploy(MyDeFiProject, DaiAddress);

  const myDeFiProject = await MyDeFiProject.deployed();

  await DaiContract.methods.faucet(myDeFiProject.address, 1000).send({
    from: accounts[0],
    gas: "2000000",
  });
  await myDeFiProject.foo(accounts[0], 100);

  const balance0 = await DaiContract.methods.balanceOf(myDeFiProject.address).call();
  const balance1 = await DaiContract.methods.balanceOf(accounts[0]).call();

  console.log(balance0.toString());
  console.log(balance1.toString());

};

// ou comme dans tutorial de EatTheBlock, déployer Dai et MyDefiProject en même temps:

// const Dai = artifacts.require("Dai");
// const MyDeFiProject = artifacts.require("MyDeFiProject");

// module.exports = async function (deployer, networks, accounts) {
//   await deployer.deploy(Dai);
//   const dai = await Dai.deployed();
//   await deployer.deploy(MyDeFiProject, dai.address);

//   const myDeFiProject = await MyDeFiProject.deployed();
//   await dai.faucet(myDeFiProject.address, 100);
//   await myDeFiProject.foo(accounts[1], 10);

//   const balance0 = await dai.balanceOf(myDeFiProject.address);
//   const balance1 = await dai.balanceOf(accounts[1]);

//   console.log(balance0.toString());
//   console.log(balance1.toString());
// };

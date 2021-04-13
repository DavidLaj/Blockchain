const MyDeFiProject = artifacts.require("MyDeFiProject");

// interface du contrat Dai
const Dai = require("../build/contracts/Dai.json");

// web3 instance
const Web3 = require("web3");
const web3 = new Web3("http://localhost:9545");

module.exports = async function (deployer) {
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

  // Deploy de MyDeFiProject avec l'arguemnt du constructor
  await deployer.deploy(MyDeFiProject, DaiAddress);
};

// ou comme dans tutorial de EatTheBlock, déployer Dai et MyDefiProject en même temps:

// const Dai = artifacts.require("Dai");
// const MyDeFiProject = artifacts.require("MyDeFiProject");

// module.exports = async function (deployer) {
//   await deployer.deploy(Dai);
//   const dai = await Dai.deployed();
//   await deployer.deploy(MyDeFiProject, dai.address);
// };

const Web3 = require("web3");
const MyContract = require("./build/contracts/MyDeFiProject.json");
const DAIcontract = require("./build/contracts/DAI.json");

const HDWalletProvider = require("@truffle/hdwallet-provider");

// "apart heart tide rare edit tuition mouse swamp fine police tooth survey"
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

const init = async () => {
  // provider instance
  const customProvider = new HDWalletProvider({
    mnemonic: mnemonic,
    providerOrUrl:
      "https://kovan.infura.io/v3/c7954c840d87401cb7181c9f5aa179dc",
    // index where to start
    addressIndex: 0,
    numberOfAddresses: 5,
  });
  // web3 instance
  const web3 = new Web3(customProvider);
  //or
  // const web3 = new Web3("http://localhost:8545");
  //or
  // const provider = new Web3.providers.HttpProvider('http://localhost:8545')
  // const new Web3(provider);

  const addresses = await web3.eth.getAccounts();
  console.log(addresses);
  await web3.eth.getBalance(addresses[0]).then(console.log);

  // MyDeFiProject contract instance
  const id = await web3.eth.net.getId();
  console.log(id);
  const deployedNetwork = MyContract.networks[id];
  console.log(deployedNetwork);
  console.log(deployedNetwork.address);
  const myDeFiProject = new web3.eth.Contract(
    MyContract.abi,
    deployedNetwork.address
  );

  // DAI contract instance
  const daiContract = new web3.eth.Contract(
    DAIcontract.abi,
    "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa"
  );

  console.log(await myDeFiProject.options.address);

  // WORK send a transaction to a function of the smart contract
  await myDeFiProject.methods.foo(addresses[0], 10).send({
    from: addresses[0],
    gas: "2000000",
  });

  //   const balance0 = await DAIcontract.balanceOf(myDeFiProject.address);
  //   const balance1 = await DAIcontract.balanceOf(addresses[0]);

  //   console.log(balance0.toString());
  //   console.log(balance1.toString());
};

init();

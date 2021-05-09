const Web3 = require("web3");
const MyContract = require("./build/contracts/MyDeFiProject.json");
// Pour avoir la ABI, on peut copy-paste le source code du contract de etherscan dans remix, compiler et copy-paste ABI dans un fichier
const DAIcontract = require("./build/contracts/Dai.json");

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
    chainId: 42,
    // index where to start
    addressIndex: 0,
    numberOfAddresses: 5,
  });

  // web3 instance
  const web3 = new Web3(customProvider);

  const addresses = await web3.eth.getAccounts();
  //console.log(addresses);
  //await web3.eth.getBalance(addresses[0]).then(console.log);

  // MyDeFiProject contract instance
  const id = await web3.eth.net.getId();
  //console.log(id);
  const deployedNetwork = MyContract.networks[id];
  //console.log(deployedNetwork);
  //console.log(deployedNetwork.address);
  const myDeFiProject = new web3.eth.Contract(
    MyContract.abi,
    deployedNetwork.address
  );
  //console.log(await myDeFiProject.options.address);

  // DAI contract instance
  const daiContract = new web3.eth.Contract(
    DAIcontract,
    "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa"
  );

  // Execute foo function from MyDeFiProject contract
  await myDeFiProject.methods.foo(addresses[0], 10).send(
    {
      from: addresses[0],
      gas: "2000000",
    },
    function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log("Hash of the transaction: " + res);
    }
  );

  // En utilisiant directement la fonction transfer du DaiToken contract pour le transfer inverse des fonds:

  //   await daiContract.methods.transfer(myDeFiProject.options.address, "10").send(
  //     {
  //       from: addresses[0],
  //       gas: "2000000",
  //     },
  //     function (err, res) {
  //       if (err) {
  //         console.log("An error occured", err);
  //         return;
  //       }
  //       console.log("Hash of the transaction: " + res);
  //     }
  //   );

  // On verifie la balance des deux addresses avec la fonction balanceOf du DaiToken contract
  const balance0 = await daiContract.methods
    .balanceOf(myDeFiProject.options.address)
    .call();
  const balance1 = await daiContract.methods.balanceOf(addresses[0]).call();

  console.log(balance0.toString());
  console.log(balance1.toString());
};

init();

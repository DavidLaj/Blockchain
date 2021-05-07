pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyDeFiProject {
    IERC20 dai;

    constructor(address daiAddress) public {
        dai = IERC20(daiAddress);
    }

    function foo(address recipient, uint amount) external {
        dai.transfer(recipient, amount);
    }
}

//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;
contract Trade{
    address  payable public owner;
    address public buyer;
    uint public price;

    constructor() {
        owner=payable(msg.sender);
    }

    
    function setPrice(uint _price) public {
        require(msg.sender==owner,"Only owner can call this function");
        price=_price;
        
    }
   
   
   

 function pay()external payable{
    require(msg.value==price,"value not same");
    uint a=address(this).balance;
    a+=msg.value;
    buyer=msg.sender;
   
 }

function getBalance() public view returns (uint){
    require(msg.sender==owner,"Only owner can call this function");
        return address(this).balance;
    }
   
   function withdraw() public payable  {
        require(msg.sender==owner,"Only owner can call this function");
        owner.transfer(address(this).balance);
    }

}
    
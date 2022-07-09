//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;
contract Trade{
    address  payable public owner;
    address public buyer;
    uint public price;

    constructor() {
        owner=payable(msg.sender);
    }

    modifier onlyOwner(){   
        require(msg.sender==owner,"Only owner can call this function");
        _;
    }
    function setPrice(uint _price) public onlyOwner{
        price=_price;
        
    }
     function updatingPrice() public {
          
           price=price+tx.gasprice;
            
    }
   
   

 function pay()external payable{
    require(msg.value==price,"value not same");
    uint a=address(this).balance;
    a+=msg.value;
    buyer=msg.sender;
   
 }

function getBalance() public onlyOwner view returns (uint){
        return address(this).balance;
    }
   
   function withdraw() public payable onlyOwner {
       
        owner.transfer(address(this).balance);
    }

}
    
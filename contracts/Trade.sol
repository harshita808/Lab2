//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

//Few lines of code are given for your help, complete the rest. You can do it :)
contract Trade{  

 function pay()external payable{
    require(msg.value==price,"value not same");
    uint a=address(this).balance;
    a+=msg.value;
    buyer=msg.sender;
   
 }
 
}
    

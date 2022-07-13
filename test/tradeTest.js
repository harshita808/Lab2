const Trade=artifacts.require('Trade');
contract('Trade',(accounts) => {
    let trade=null;
    before(async () =>{
        trade=await Trade.deployed();
    });
    it('Should set accounts[0] as owner',async () => {
        
        const owner= await trade.owner();
        const deployer_add=accounts[0];
        assert(owner==accounts[0]);
    });

   it('Should set the value of price variable',async () => {

    await trade.setPrice(10);
    const p=await trade.price();
    assert(p.toNumber()===10);
   }); 

   it("should withdraw ether from contract",async() =>{
 
    const p=await trade.price();
    await trade.withdraw();
    const balance= await web3.eth.getBalance(accounts[0]);
    assert.equal(parseInt(balance),(parseInt(balance))+(p.toNumber()));
   });

   it("should return balance of contract",async() => {
    const b=await trade.getBalance();
    assert(b);
   });

   it('checks if only owner can set price', async () => {
    try {
        await trade.setPrice(10,{from:accounts[0]});
        
    } catch (error) {
        assert(error,"Only owner should set price");
    }
 });

 it('checks if only owner can get balance', async () => {
    try {
        await trade.getBalance({from:accounts[0]});
        
    } catch (error) {
        assert(error,"Only owner should get balance");
    }
 });
   
 it('checks if only owner can withdraw', async () => {
    try {
        await trade.withdraw({from:accounts[0]});
        
    } catch (error) {
        assert(error,"Only owner should withdraw");
    }
 });

});
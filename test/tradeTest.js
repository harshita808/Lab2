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
    const trade=await Trade.deployed();
    await trade.setPrice(10);
    const p=await trade.price();
    assert(p.toNumber()===10);
   }); 

   it("should withdraw ether from contract",async() =>{
    const trade=await Trade.deployed();
    const p=await trade.price();
    await trade.withdraw();
    const balance= await web3.eth.getBalance(accounts[0]);
    assert.equal(parseInt(balance),(parseInt(balance))+(p.toNumber()));
   });

   it("should return balance of contract",async() => {
    const trade=await Trade.deployed();
    const b=await trade.getBalance();
    assert(b);
   });

   
});
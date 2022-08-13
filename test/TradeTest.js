const Trade = artifacts.require('Trade');
const truffleAssert = require('truffle-assertions');

contract('Trade', (accounts) => {
    let trade = null;
    before(async () => {
        trade = await Trade.deployed();
    });

    it('Should set accounts[0] as owner', async () => {
        const owner = await trade.owner();
        assert(owner == accounts[0]);
    });

    it('Should set the value of price variable', async () => {
        await trade.setPrice(10);
        const p = await trade.price();
        assert(p.toNumber() === 10);
    });

    it("should withdraw ether from contract", async () => {

        const p = await trade.price();
        await trade.withdraw();
        const balance = await web3.eth.getBalance(accounts[0]);
        assert.equal(parseInt(balance), (parseInt(balance)) + (p.toNumber()));
    });

    it("should return balance of contract", async () => {
        const b = await trade.getBalance();
        assert(b);
    });

    it('checks if only owner can set price', async () => {
        //check if owner can set
        await truffleAssert.passes(
            trade.setPrice(100,{from:accounts[0]}),
        );

        //other than owner should fail
        await truffleAssert.reverts(
            trade.setPrice(100,{from:accounts[1]}),
        );
    });

     it('checks if only owner can get balance', async () => {
        //check if owner can get
        await truffleAssert.passes(
            trade.getBalance({from:accounts[0]}),
        );

        //other than owner should fail
        await truffleAssert.reverts(
            trade.getBalance({from:accounts[1]}),
        );
     });

     it('checks if only owner can withdraw', async () => {
        //check if owner can set
        await truffleAssert.passes(
            trade.withdraw({from:accounts[0]}),
        );

        //other than owner should fail
        await truffleAssert.reverts(
            trade.withdraw({from:accounts[1]}),
        );
     });

     it('test pay function',async ()=> {
        // value passed 200, price is 100, pay() should fail
        await truffleAssert.reverts(
            trade.pay({value:200}),
        );

        const initialBal = await trade.getBalance();
        
        await truffleAssert.passes(
         await trade.pay({value:100}),
        );

        // const finalBal = await trade.getBalance();

        // console.log(initialBal);
        // console.log(finalBal);

        // assert.equal(finalBal-initialBal,100)
     });

});
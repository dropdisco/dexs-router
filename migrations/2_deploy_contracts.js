
const DexSwapFactory = artifacts.require("IDexSwapFactory");
const DexSwapRouter = artifacts.require("DexSwapRouter");
const WETH = artifacts.require("WETH");
const WONE = artifacts.require("WONE");
const argValue = (arg, defaultValue) => (process.argv.includes(arg) ? process.argv[process.argv.indexOf(arg) + 1] : defaultValue);
const network = () => argValue("--network", "local");


// HARMONY
const FACTORY_HARMONY = "0x151C94151a38564B42670b5241FbAcEB824E5281";
const WONE_HARMONY = "0x745FD8A0b73e2fCa6e338dc72f764228dCbC3c7a";// testnet harmony weth/wone

//RINKEBY ROPSTEN 
// const FACTORY_RINKEBY = "0xC9ae161dc43957cD56ed7CaC2cC4e302b44Df374";
// const WETH_RINKEBY = "0xc778417E063141139Fce010982780140Aa0cD5Ab";// rinkeby weth

// MATIC MAINNET
const FACTORY_MATIC = "";
const WMATIC_MATIC = "";

// MATIC TESTNET
const FACTORY_MUMBAI = "0x082c59cBc1BbA379cA97F5b158de3F38663cD726";
const WMATIC_MUMBAI = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";//ox

module.exports = async (deployer) => {
    const BN = web3.utils.toBN;
    const bnWithDecimals = (number, decimals) => BN(number).mul(BN(10).pow(BN(decimals)));
    const senderAccount = (await web3.eth.getAccounts())[0];

    
    if (network() === "harmony_testnet") {


        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_HARMONY);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);

        console.log();
        console.log(":: REUSE WONE"); 
        let WETHInstance = await WONE.at(WONE_HARMONY);
        await WETHInstance.deposit({ from: senderAccount, value: 100 });

        console.log();
        console.log(":: DEPLOY ROUTER");
        await deployer.deploy(DexSwapRouter, DexSwapFactoryInstance.address, WETHInstance.address);
        const DexSwapRouterInstance = await DexSwapRouter.deployed();
        console.log(`DEXSWAP ROUTER:`, DexSwapRouterInstance.address);


    } else if (network() === "mumbai") {

        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_MUMBAI);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);


        console.log();
        console.log(":: DEPLOY ROUTER");
        await deployer.deploy(DexSwapRouter, DexSwapFactoryInstance.address, WMATIC_MUMBAI);
        const DexSwapRouterInstance = await DexSwapRouter.deployed();
        console.log(`DEXSWAP ROUTER:`, DexSwapRouterInstance.address);


    } else if (network() === "matic") {

        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_MATIC);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);

        console.log();
        console.log(":: DEPLOY ROUTER");
        await deployer.deploy(DexSwapRouter, DexSwapFactoryInstance.address, WMATIC_MATIC);
        const DexSwapRouterInstance = await DexSwapRouter.deployed();
        console.log(`DEXSWAP ROUTER:`, DexSwapRouterInstance.address);

    }
};

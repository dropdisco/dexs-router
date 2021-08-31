
const DexSwapFactory = artifacts.require("IDexSwapFactory");
const DexSwapRouter = artifacts.require("DexSwapRouter");
const BADGER = artifacts.require("BADGER");
const USDC = artifacts.require("USDC");
const WETH = artifacts.require("WETH");
const WMATIC = artifacts.require("WMATIC");
const argValue = (arg, defaultValue) => (process.argv.includes(arg) ? process.argv[process.argv.indexOf(arg) + 1] : defaultValue);
const network = () => argValue("--network", "local");

//RINKEBY ROPSTEN 
const FACTORY_RINKEBY = "0x84A73B742d796F51620DC5F78F18a2de02C55FE9";
const WETH_RINKEBY = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
// MATIC MAINNET
const FACTORY_MATIC = "";
const WMATIC_MATIC = "";

// MATIC TESTNET
const FACTORY_MUMBAI = "";
const WMATIC_MUMBAI = "";

module.exports = async (deployer) => {
    const BN = web3.utils.toBN;
    const bnWithDecimals = (number, decimals) => BN(number).mul(BN(10).pow(BN(decimals)));
    const senderAccount = (await web3.eth.getAccounts())[0];

    
    if (network() === "rinkeby") {

        console.log();

        console.log();
        console.log(":: Deploying USDC");
        await deployer.deploy(USDC);
        const USDCInstance = await USDC.deployed();
        console.log();

        console.log();
        console.log(":: Deploying BADGER");
        await deployer.deploy(BADGER);
        const BADGERInstance = await BADGER.deployed();
        console.log();


        console.log();
        console.log(`USDC ADDRESS:`,          USDCInstance.address);
        console.log("====================================================================");
        console.log(`BADGER ADDRESS:`,        BADGERInstance.address);
        console.log("====================================================================");

        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_RINKEBY);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);

        console.log();
        console.log(":: REUSE WETH"); 
        let WETHInstance = await WETH.at(WETH_RINKEBY);
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

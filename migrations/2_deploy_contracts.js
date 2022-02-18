
const DexSwapFactory = artifacts.require("IDexSwapFactory");
const DexSwapRouter = artifacts.require("DexSwapRouter");
// const WETH = artifacts.require("WETH");
// const WONE = artifacts.require("WONE");
const AURORA = artifacts.require("AURORA");
const WMATIC = artifacts.require("WMATIC");
const argValue = (arg, defaultValue) => (process.argv.includes(arg) ? process.argv[process.argv.indexOf(arg) + 1] : defaultValue);
const network = () => argValue("--network", "local");

// MUMBAI 
const FACTORY_POLYGON = "0x3CBb677671F7A56e579dF767236B815338022CDd";
const WMATIC_POLYGON = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";// 

//AURORA
const FACTORY_AURORA = "0x315D8Ad6e8232F496Ba996D772b957a0443949ef";
const WETH_AURORA = "0x784e5B8541410284092cf465Cd455Beb09aAcdc3";//  weth aurora deployed


module.exports = async (deployer) => {
    const BN = web3.utils.toBN;
    const bnWithDecimals = (number, decimals) => BN(number).mul(BN(10).pow(BN(decimals)));
    const senderAccount = (await web3.eth.getAccounts())[0];

    
    if (network() === "aurora") {


        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_AURORA);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);

        console.log();
        console.log(":: REUSE AURORA"); 
        let WETHInstance = await AURORA.at(WETH_AURORA);
        await WETHInstance.deposit({ from: senderAccount, value: 100 });

        console.log();
        console.log(":: DEPLOY ROUTER");
        await deployer.deploy(DexSwapRouter, DexSwapFactoryInstance.address, WETHInstance.address);
        const DexSwapRouterInstance = await DexSwapRouter.deployed();
        console.log(`DEXSWAP ROUTER:`, DexSwapRouterInstance.address);


    } else if (network() === "mumbai") {

        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_POLYGON);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);

        console.log();
        console.log(":: REUSE WMATIC"); 
        let WETHInstance = await WMATIC.at(WMATIC_POLYGON);
        await WETHInstance.deposit({ from: senderAccount, value: 100 });

        console.log();
        console.log(":: DEPLOY ROUTER");
        await deployer.deploy(DexSwapRouter, DexSwapFactoryInstance.address, WETHInstance.address);
        const DexSwapRouterInstance = await DexSwapRouter.deployed();
        console.log(`DEXSWAP ROUTER:`, DexSwapRouterInstance.address);
    }

};

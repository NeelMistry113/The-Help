const hre = require('hardhat');

async function main() {

    const FirFactory = await hre.ethers.getContractFactory("FirFactory")
    const firFactory = await FirFactory.deploy();

    await firFactory.deployed();

    console.log("Factory deployed to:", firFactory.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
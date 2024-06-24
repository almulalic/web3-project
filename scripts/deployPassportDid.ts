import { ethers } from "hardhat";

async function main() {
	const [owner] = await ethers.getSigners();

	const PassportDID = await ethers.getContractFactory("PassportDID");
	console.log("Deploying PassportDID...");

	const did = await PassportDID.deploy({ from: owner });
	await did.waitForDeployment();

	console.log("PassportDID address: ", did.target);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

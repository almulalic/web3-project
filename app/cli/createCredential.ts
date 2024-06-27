import { agent } from "../veramo/setup.js";

async function main() {
	console.log(process.argv);

	return;
	const identifier = await agent.didManagerGetByAlias({ alias: "default" });

	const verifiableCredential = await agent.createVerifiableCredential({
		credential: {
			issuer: { id: identifier.did },
			credentialSubject: {
				id: "did:example-app:example.com",
				you: "Rock",
			},
		},
		proofFormat: "jwt",
	});

	console.log(`New credential created`);
	console.log(JSON.stringify(verifiableCredential, null, 2));
}

main().catch(console.log);

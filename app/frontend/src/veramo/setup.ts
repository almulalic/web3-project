import { createAgent, IResolver } from "@veramo/core";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { CredentialPlugin } from "@veramo/credential-w3c";
import { getResolver as webDidResolver } from "web-did-resolver";
import { getResolver as ethrDidResolver } from "ethr-did-resolver";

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

export const agent = createAgent<IResolver>({
	plugins: [
		new DIDResolverPlugin({
			...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
			...webDidResolver(),
		}),
		new CredentialPlugin(),
	],
});

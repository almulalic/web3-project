import "dotenv/config";

import {
	createAgent,
	IDIDManager,
	IResolver,
	IDataStore,
	IDataStoreORM,
	IKeyManager,
	ICredentialPlugin,
} from "@veramo/core";

import { DataSource } from "typeorm";
import { Resolver } from "did-resolver";
import { DIDManager } from "@veramo/did-manager";
import { KeyManager } from "@veramo/key-manager";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { CredentialPlugin } from "@veramo/credential-w3c";
import { EthrDIDProvider } from "@veramo/did-provider-ethr";
import { getResolver as webDidResolver } from "web-did-resolver";
import { KeyManagementSystem, SecretBox } from "@veramo/kms-local";
import { getResolver as ethrDidResolver } from "ethr-did-resolver";
import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from "@veramo/data-store";

const DATABASE_FILE = "database.sqlite";
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || process.env.REACT_APP_INFURA_PROJECT_ID;
const KMS_SECRET_KEY = process.env.KMS_SECRET_KEY! || process.env.REACT_APP_KMS_SECRET_KEY!;

export const dbConnection = new DataSource({
	type: "sqlite",
	database: DATABASE_FILE,
	synchronize: false,
	migrations,
	migrationsRun: true,
	logging: ["error", "info", "warn"],
	entities: Entities,
}).initialize();

export const agent = createAgent<
	IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin
>({
	plugins: [
		new KeyManager({
			store: new KeyStore(dbConnection),
			kms: {
				local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
			},
		}),
		new DIDManager({
			store: new DIDStore(dbConnection),
			defaultProvider: "did:ethr:sepolia",
			providers: {
				"did:ethr:sepolia": new EthrDIDProvider({
					defaultKms: "local",
					network: "sepolia",
					rpcUrl: "https://sepolia.infura.io/v3/" + INFURA_PROJECT_ID,
				}),
			},
		}),
		new DIDResolverPlugin({
			resolver: new Resolver({
				...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
				...webDidResolver(),
			}),
		}),
		new CredentialPlugin(),
	],
});

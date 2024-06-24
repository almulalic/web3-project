import { JolocomSDK, NaivePasswordStore } from "@jolocom/sdk";
import { JolocomTypeormStorage } from "@jolocom/sdk-storage-typeorm";
import { createConnection } from "typeorm";

(async () => {
	const typeOrmConfig = {
		name: "demoDb",
		type: "sqlite",
		database: ":memory:",
		dropSchema: true,
		entities: ["node_modules/@jolocom/sdk-storage-typeorm/js/src/entities/*.js"],
		synchronize: true,
		logging: false,
	};

	const connection = await createConnection(typeOrmConfig);
	const sdk = new JolocomSDK({
		storage: new JolocomTypeormStorage(connection),
	});
})();

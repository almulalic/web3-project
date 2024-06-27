Sample Veramo app that demonstrates login with DID credentials

To run this project you will need to add a .env file with 2 entries (and also run the scripts from the root folder):
```
INFURA_PROJECT_ID=<GET-YOUR-KEY-AT-https://app.infura.io/>
KMS_SECRET_KEY=<HEX-STRING-OF-LENGTH-64-or-"npx @veramo/cli config create-secret-key">
```

Also maker sure that you are using Node version < 20, as the ESM module support is still broken in the veramo library.
Usage of yarn is recommended by the maintainers but the npm install should work just fine.

To setup the dependencies run
```
yarn
```

To test out the single features you can run the following commands:
```
yarn ts-node --esm ./src/backend/cli/listIdentifiers.ts
yarn ts-node --esm ./src/backend/cli/createIdentifier.ts
yarn ts-node --esm ./src/backend/cli/createCredential.ts
yarn ts-node --esm ./src/backend/cli/verifyCredential.ts
```

Please note that these cli scripts contain hardcoded credentials in the "createCredential" script as their intended purpose is for testing only. You can change them but to see a more dynamic version of these concepts, run the frontend React app.

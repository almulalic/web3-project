import React, { useEffect, useState } from "react";
import { agent } from "../veramo/setup";

export const ViewDid = () => {
	const [didDoc, setDidDoc] = useState<any>(null);
	const [didId, setDidUrl] = useState<string>("");
	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<any>("");

	const resolve = async (didUrl: string) => {
		try {
			setLoading(true);
			const doc = await agent.resolveDid({
				didUrl: didUrl,
			});

			setDidDoc(doc);
			setLoading(false);
		} catch (e) {
			setErrorMessage(e);
		}
	};

	const onInputChange = (e: any) => {
		if (didId.startsWith("did:")) {
			setDidUrl(e.target.value);
		} else {
			setDidUrl(`did:ethr:sepolia:${e.target.value}`);
		}
	};

	useEffect(() => {
		resolve(didId);
	}, [didId]);

	return (
		<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full">
				<h1 className="text-2xl font-bold mb-4">Decentralized Identity Resolver</h1>
				<div className="mb-4">
					<input
						onChange={onInputChange}
						type="text"
						id="darkModeInput"
						placeholder="Enter your DID"
						className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
				<div className="mb-4">
					{isLoading && <div className="text-white-400 my-4">Loading...</div>}
					{errorMessage && (
						<pre className="bg-gray-600 p-4 rounded-md overflow-auto">
							<div className="text-red-500">{errorMessage}</div>
						</pre>
					)}
					{didDoc && <pre className="bg-gray-600 p-4 rounded-md overflow-auto">{JSON.stringify(didDoc, null, 2)}</pre>}
				</div>
				<button
					onClick={() => setDidUrl("")}
					className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
				>
					Clear
				</button>
			</div>
		</div>
	);
};

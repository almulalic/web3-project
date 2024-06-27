import React, { useState } from "react";
import { agent } from "../veramo/setup";

interface FormData {
	key: string;
	value: string;
}

export const CreateDid: React.FC = () => {
	const [formData, setFormData] = useState<FormData[]>([{ key: "", value: "" }]);
	const [exportedData, setExportedData] = useState<string | null>(null);

	const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const list = [...formData];
		list[index] = { ...list[index], [name]: value };
		setFormData(list);
	};

	const handleAddField = () => {
		setFormData([...formData, { key: "", value: "" }]);
	};

	const handleRemoveField = (index: number) => {
		const list = [...formData];
		list.splice(index, 1);
		setFormData(list);
	};

	const handleExportVariables = () => {
		const jsonObject: { [key: string]: string } = {};
		formData.forEach((item) => {
			if (item.key.trim() !== "") {
				jsonObject[item.key] = item.value;
			}
		});

		const jsonString = JSON.stringify(jsonObject, null, 2);

		setExportedData(jsonString);

		agent.createVerifiableCredential({
			credential: {
				issuer: { id: "identifier.did" },
				credentialSubject: {
					id: "did:example-app:example.com",
					you: "Rock",
				},
			},
			proofFormat: "jwt",
		});
	};

	const handleClear = () => {
		setFormData([{ key: "", value: "" }]);
		setExportedData(null);
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full">
				<h1 className="text-2xl font-bold mb-4">Create Variables</h1>
				{formData.map((field, index) => (
					<div key={index} className="flex mb-4">
						<input
							type="text"
							className="w-1/3 mr-4 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
							placeholder="Key"
							name="key"
							value={field.key}
							onChange={(e) => handleChange(index, e)}
						/>
						<input
							type="text"
							className="w-1/3 mr-4 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
							placeholder="Value"
							name="value"
							value={field.value}
							onChange={(e) => handleChange(index, e)}
						/>
						<button
							className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 focus:outline-none"
							onClick={() => handleRemoveField(index)}
						>
							Remove
						</button>
					</div>
				))}
				<div className="flex mb-4">
					<button
						className="bg-green-500 text-white px-3 py-2 rounded-md mr-4 hover:bg-green-600 focus:outline-none"
						onClick={handleAddField}
					>
						Add Field
					</button>
					<button
						className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
						onClick={handleExportVariables}
					>
						Export Variables
					</button>
				</div>
				{exportedData && <pre className="bg-gray-600 p-4 rounded-md overflow-auto">{exportedData}</pre>}
				<button
					onClick={handleClear}
					className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
				>
					Clear
				</button>
			</div>
		</div>
	);
};

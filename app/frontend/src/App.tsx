import React from "react";

import { ViewDid } from "./components/ViewDid";
import { CreateDid } from "./components/CreateDid";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ViewDid />} />
				<Route path="/view" element={<ViewDid />} />
				<Route path="/view/:did" element={<ViewDid />} />
				<Route path="/create" element={<CreateDid />} />
			</Routes>
		</BrowserRouter>
	);
}

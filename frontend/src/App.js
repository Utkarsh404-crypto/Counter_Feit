import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Form from "./components/form/Form";
import Landing from "./components/pages/Landing/Landing";
import PageInstance from "./components/pages/PageInstance/PageInstance";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Landing />}
			/>{" "}
			<Route
				path="/login"
				element={<Form />}
			/>{" "}
			<Route
				exact
				path="/home"
				element={<Home />}
			/>{" "}
			<Route
				exact
				path="/page-instance"
				element={<PageInstance />}
			/>{" "}
		</Routes>
	);
}

export default App;

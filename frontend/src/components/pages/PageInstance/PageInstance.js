import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../form/images/logo.jpg";
import back from "../PageInstance/images/back.jpg";
import "./pageInstance.css";
import BasicModal from "../../Modal/BasicModal";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import CustomerModal from "../../Modal/CustomerModal";

const PageInstance = () => {
	const [itemInfo, setItemInfo] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setItemInfo({ ...itemInfo, [name]: value });
	};

	const navigate = useNavigate();

	const user = localStorage.getItem("userInfo");
	const handleLogout = () => {
		localStorage.removeItem("userInfo");
		navigate("/");
	};
	const roleManu = useSelector((state) => state.manu);
	const roleSupp = useSelector((state) => state.supp);
	const roleCust = useSelector((state) => state.cust);

	if (roleManu.roleManu) {
		localStorage.setItem("supplier", null);
		localStorage.setItem("customer", null);
	}

	if (roleSupp.roleSupp) {
		localStorage.setItem("manufacturer", null);
		localStorage.setItem("customer", null);
	}
	if (roleCust.roleCust) {
		localStorage.setItem("manufacturer", null);
		localStorage.setItem("supplier", null);
	}

	const manufacturerObj = roleManu.roleManu;
	const supplierObj = roleSupp.roleSupp;
	const customerObj = roleCust.roleCust;

	const manufacturer = JSON.parse(localStorage.getItem("manufacturer"));
	const supplier = JSON.parse(localStorage.getItem("supplier"));
	const customer = JSON.parse(localStorage.getItem("customer"));

	if (!manufacturer) {
		localStorage.setItem("manufacturer", JSON.stringify(manufacturerObj));
	}
	if (!supplier) {
		localStorage.setItem("supplier", JSON.stringify(supplierObj));
	}
	if (!customer) {
		localStorage.setItem("customer", JSON.stringify(customerObj));
	}
	return (
		<>
			{user ? (
				<Box>
					<AppBar position="static">
						<Toolbar>
							<Typography
								variant="h6"
								component="div"
								sx={{ flexGrow: 1 }}>
								<img
									id="logo"
									alt=""
									src={logo}
								/>{" "}
							</Typography>{" "}
							<a
								onClick={handleLogout}
								id="logoutBtn">
								Logout{" "}
							</a>{" "}
						</Toolbar>{" "}
					</AppBar>{" "}
					<img
						src={back}
						className="backImg"
					/>
					<div className="itemContainer">
						<div className="lContainer">
							<b className="texts">
								{" "}
								{manufacturer
									? "Create Item"
									: supplier
									? "Update Item"
									: customer
									? "Check For Product"
									: "Create Item"}{" "}
							</b>{" "}
							{(manufacturer && !supplier) || (!manufacturer && supplier) ? (
								<input
									type="text"
									placeholder="Item Name"
									id="itemName"
									name="Name"
									value={itemInfo?.Name}
									onChange={handleChange}
									className="lInput"
								/>
							) : (
								""
							)}
							{(manufacturer && !supplier && !customer) ||
							(!manufacturer && !customer && supplier) ||
							(customer && !manufacturer && !supplier) ? (
								<input
									type="number"
									placeholder="Serial Number"
									id="sno"
									name="Sno"
									value={itemInfo?.Sno}
									onChange={handleChange}
									className="lInput"
								/>
							) : (
								""
							)}
							{supplier && (
								<input
									type="number"
									placeholder="Item Price"
									id="price"
									name="Price"
									value={itemInfo?.Price}
									onChange={handleChange}
									className="lInput"
								/>
							)}
							{(manufacturer && !supplier) || (!manufacturer && supplier) ? (
								<input
									type="text"
									placeholder="Source"
									id="source"
									name="Source"
									value={itemInfo?.Source}
									onChange={handleChange}
									className="lInput"
								/>
							) : (
								""
							)}
							{(manufacturer && !supplier) || (!manufacturer && supplier) ? (
								<input
									type="text"
									placeholder="Destination"
									id="destination"
									name="Destination"
									value={itemInfo?.Destination}
									onChange={handleChange}
									className="lInput"
								/>
							) : (
								""
							)}
							{(manufacturer && !supplier) || (!manufacturer && supplier) ? (
								<BasicModal
									itemName={itemInfo?.Name}
									itemSerialNumber={itemInfo?.Sno}
									itemSource={itemInfo?.Source}
									itemDestination={itemInfo?.Destination}
									itemPrice={itemInfo?.Price}
								/>
							) : (
								""
							)}
							{customer && <CustomerModal itemSerialNumber={itemInfo?.Sno} />}
						</div>{" "}
					</div>{" "}
					<div className="footerContainer">
						<footer>
							<h5> Powered by Counterfeit </h5> <p> &#169; Copyright 2022</p>
						</footer>
					</div>
				</Box>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};

export default PageInstance;

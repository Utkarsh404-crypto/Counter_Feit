import * as React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import getWeb3 from "../home/getWeb3";
import Manufacturer from "../../contracts/Manufacturer.json";
import Supplier from "../../contracts/Supplier.json";
import Qrcode from "qrcode.react";
import "./modal.css";
import { useSelector } from "react-redux";

export default function BasicModal({
	itemName,
	itemSerialNumber,
	itemSource,
	itemDestination,
	itemPrice
}) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const [values, setValues] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setError("");
		setValues("");
	};

	const roleManu = useSelector((state) => state.manu);
	const roleSupp = useSelector((state) => state.supp);

	if (roleSupp.roleSupp) {
		localStorage.setItem("manufacturer", null);
	}

	const manufacturerObj = roleManu.roleManu;

	const manufacturer = JSON.parse(localStorage.getItem("manufacturer"));

	if (!manufacturer) {
		localStorage.setItem("manufacturer", JSON.stringify(manufacturerObj));
	}

	const handleCreate = async () => {
		try {
			let web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get the contract instance.

			const manufacturerInstance = new web3.eth.Contract(
				Manufacturer.abi,
				"0xAEECFAD55f7EF2C8b062ee360200a599C0A87b11"
			);

			const data = await manufacturerInstance.methods
				.createItemManufactuter(
					itemSerialNumber,
					itemName,
					itemSource,
					itemDestination,
					web3.utils.toWei("1", "ether")
				)
				.send({ from: accounts[0] });

			// alert(data.events.manufacturerItem.returnValues._item);
			setValues(
				`Serial Number: ${data.events.manufacturerItem.returnValues.itemNumber}, Item Name: ${data.events.manufacturerItem.returnValues.itemName}, Source: ${data.events.manufacturerItem.returnValues.itemSource}, Destination: ${data.events.manufacturerItem.returnValues.itemDestination}`
			);
		} catch (error) {
			setError(`Some error occurred , please try again`);
		}
	};

	const handleSupplier = async () => {
		try {
			let web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get the contract instance.

			const supplierInstance = new web3.eth.Contract(
				Supplier.abi,
				"0xf4E82c333787F3929C6d0cF9173b48E416DCF4e1"
			);

			const txReceipt = await supplierInstance.methods
				.updateForSupplier(
					itemSerialNumber,
					itemName,
					itemSource,
					itemDestination,
					itemPrice
					//web3.utils.toWei("1", "ether")
				)
				.send({ from: accounts[0] });

			setValues(
				`Serial Number: ${txReceipt.events.supplierItem.returnValues.itemNumber}, Item Name: ${txReceipt.events.supplierItem.returnValues.itemName} 
					Item Price: ${txReceipt.events.supplierItem.returnValues.itemPrice}, Source: ${txReceipt.events.supplierItem.returnValues.itemSource}, Destination: ${txReceipt.events.supplierItem.returnValues.itemDestination}`
			);
		} catch (error) {
			setError(`Some error occurred , please try again`);
		}
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div className="style">
					<span className="heading">
						{manufacturer ? "Create Item" : "Update Item"}
					</span>
					<Qrcode
						value={values}
						className="qr"
					/>
					<button
						className="modalButton"
						onClick={manufacturer ? handleCreate : handleSupplier}>
						{manufacturer
							? "Create Item with QR code"
							: "Update Item with QR code"}
					</button>
					{error && <span style={{ color: "red" }}>{error}</span>}
				</div>
			</Modal>
			<button
				className="lbtn"
				onClick={handleOpen}>
				Open
			</button>
		</div>
	);
}

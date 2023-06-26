import * as React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import getWeb3 from "../home/getWeb3";
import Manufacturer from "../../contracts/Manufacturer.json";
import Supplier from "../../contracts/Supplier.json";
import ProductVerifier from "../../contracts/ProductVerifier.json";
import Qrcode from "qrcode.react";
import "./modal.css";

export default function CustomerModal({ itemSerialNumber }) {
	let index;
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const [values, setValues] = useState("");
	const [status, setStatus] = useState(true);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setError("");
		setValues("");
	};

	const handleForManufacturer = async () => {
		try {
			let web3 = await getWeb3();

			const manufacturerInstance = new web3.eth.Contract(
				Manufacturer.abi,
				"0xAEECFAD55f7EF2C8b062ee360200a599C0A87b11"
			);

			const eventsManufacturer = manufacturerInstance.events.manufacturerItem();

			const logsManufacturer = await manufacturerInstance.getPastEvents(
				eventsManufacturer,
				{
					fromBlock: 0
				}
			);
			const log1 = logsManufacturer.find(
				(log) => log.returnValues.itemNumber === itemSerialNumber
			);

			index = log1?.returnValues.itemIndex;

			if (log1?.returnValues.itemSource && log1?.returnValues.itemDestination) {
				Swal.fire({
					title: `
                    Item SNID: ${log1?.returnValues.itemNumber}
                    <hr>
                    Item Name: ${log1?.returnValues.itemName}
                    <hr>
                     Source: ${log1?.returnValues.itemSource}
                    <hr>
                Destination: ${log1?.returnValues.itemDestination}
                    <hr>`,
					width: 600,
					padding: "3em",
					color: "#716add",
					backdrop: `
                  rgba(0,0,123,0.4)
                  left top
                  no-repeat
                `
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "No transactions until now!"
				});
			}
			setOpen(false);
		} catch (err) {
			Swal.fire({
				icon: "error",
				title: "Ah Snap!",
				text: "Something went wrong!"
			});
		}
	};
	const handleForSupplier = async () => {
		try {
			let web3 = await getWeb3();
			const supplierInstance = new web3.eth.Contract(
				Supplier.abi,
				"0xf4E82c333787F3929C6d0cF9173b48E416DCF4e1"
			);

			const eventsSupplier = supplierInstance.events.supplierItem();

			const logsSupplier = await supplierInstance.getPastEvents(
				eventsSupplier,
				{
					fromBlock: 0
				}
			);
			const log2 = logsSupplier.find(
				(log) => log.returnValues.itemNumber === itemSerialNumber
			);

			index = log2?.returnValues.itemIndex;

			if (log2?.returnValues.itemSource && log2?.returnValues.itemDestination) {
				Swal.fire({
					title: `
                Item Index: ${log2?.returnValues.itemIndex}
				<hr>
                Item SNID: ${log2?.returnValues.itemNumber}
                <hr>
                Item Name: ${log2?.returnValues.itemName}
                <hr>
                Source: ${log2?.returnValues.itemSource}
                <hr>
                Destination: ${log2?.returnValues.itemDestination}
                <hr>`,
					width: 600,
					padding: "3em",
					color: "#716add",
					backdrop: `
                  rgba(0,0,123,0.4)
                  left top
                  no-repeat
                `
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "No transactions until now!"
				});
			}

			setOpen(false);
			setStatus(false);
		} catch (err) {
			Swal.fire({
				icon: "error",
				title: "Ah Snap!",
				text: "Something went wrong!"
			});
		}
	};

	const hanldeCustomer = async () => {
		try {
			let web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get the contract instance.

			const customerInstance = new web3.eth.Contract(
				ProductVerifier.abi,
				"0xe7982c612107515CfF2D38E5Fe31AD2B959ae369"
			);

			const data = await customerInstance.methods
				.verifyProduct(0, "Jaipur")
				.call({ from: accounts[0] });
			if (data) {
				setValues(`Product is genuine`);
			} else {
				setValues(`Product is counterfeit`);
			}
		} catch (error) {
			alert(error.message);
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
					<span className="heading">Check Item Details</span>
					<Qrcode
						value={values}
						className="qr"
					/>

					<div className="buttons">
						{status ? (
							<>
								<button
									className="modalButton-manu"
									onClick={handleForManufacturer}>
									Check for Manufacturer
								</button>
								<button
									className="modalButton-supp"
									onClick={handleForSupplier}>
									Check for Supplier
								</button>
							</>
						) : (
							<>
								<button
									className="modalButton-supp"
									onClick={hanldeCustomer}>
									Check for Customer
								</button>
							</>
						)}
					</div>
				</div>
			</Modal>
			{status ? (
				<button
					className="lbtn"
					onClick={handleOpen}>
					Open
				</button>
			) : (
				<button
					className="lbtn"
					onClick={handleOpen}>
					Check status
				</button>
			)}
		</div>
	);
}

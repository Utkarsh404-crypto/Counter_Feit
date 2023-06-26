import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import manu from "../home/images/manu.jpg";
import ret from "../home/images/retailor.jpg";
import cust from "../home/images/customer.jpg";
import getWeb3 from "./getWeb3";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch } from "react-redux";
import { custActions, manuActions, suppActions } from "../../store/store";

const Home = () => {
	var valueM = sessionStorage.getItem("boolM");
	var valueS = sessionStorage.getItem("boolS");
	var valueC = sessionStorage.getItem("boolC");
	var value = sessionStorage.getItem("bool");
	var userInfo = localStorage.getItem("userInfo");
	const [loadMeta, setLoadMeta] = useState(false);
	const [error, setError] = useState("");
	const [role, setRole] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = localStorage.getItem("userInfo");

	const handleLogout = () => {
		localStorage.removeItem("userInfo");
		navigate("/");
	};

	const handleClickManufacturer = async () => {
		try {
			await getWeb3();
			sessionStorage.setItem("boolM", true);
			setLoadMeta(true);
			setRole("Manufacturer");
			dispatch(manuActions.getRoleM());
		} catch (error) {
			setError(
				"Couldn't connect to the metamask or any given provider , try again"
			);
		}
	};
	const handleClickSupplier = async () => {
		try {
			await getWeb3();
			sessionStorage.setItem("boolS", true);
			setLoadMeta(true);
			setRole("Supplier");
			dispatch(suppActions.getRoleS());
		} catch (error) {
			setError(
				"Couldn't connect to the metamask or any given provider , try again"
			);
		}
	};
	const handleClickCustomer = async () => {
		try {
			await getWeb3();
			sessionStorage.setItem("boolC", true);
			setLoadMeta(true);
			setRole("Customer");
			dispatch(custActions.getRoleC());
		} catch (error) {
			setError(
				"Couldn't connect to the metamask or any given provider , try again"
			);
		}
	};

	const handleError = () => {
		setError("Close the session and try again!");
	};

	if (loadMeta === true && userInfo !== undefined) {
		sessionStorage.setItem("bool", true);
		return <Navigate to="/page-instance" />;
	}

	return (
		<>
			{user ? (
				<>
					{" "}
					<a
						onClick={handleLogout}
						id="logoutBtn">
						Logout{" "}
					</a>{" "}
					<Carousel
						pause={false}
						indicators={false}>
						<Carousel.Item interval={1000}>
							<img
								className="d-block w-100"
								src={manu}
								alt="First slide"
							/>
						</Carousel.Item>
						<Carousel.Item interval={1000}>
							<img
								className="d-block w-100"
								src={ret}
								alt="Second slide"
							/>
						</Carousel.Item>
						<Carousel.Item interval={1000}>
							<img
								className="d-block w-100"
								src={cust}
								alt="Third slide"
							/>
						</Carousel.Item>
					</Carousel>
					<div className="font">Who Are You?</div>
					{error && (
						<span
							className="texts"
							style={{ color: "red", fontSize: "22px" }}>
							{error}
						</span>
					)}
					<div className="center">
						<button
							className={value !== valueM ? "btn btn-error" : "btn"}
							id="btn-1"
							onClick={
								value !== valueM ? handleError : handleClickManufacturer
							}>
							Manufacturer
						</button>
						<button
							className={value !== valueS ? "btn btn-error" : "btn"}
							id="btn-2"
							onClick={value !== valueS ? handleError : handleClickSupplier}>
							Supplier
						</button>

						<button
							className={value !== valueC ? "btn btn-error" : "btn"}
							id="btn-3"
							onClick={value !== valueC ? handleError : handleClickCustomer}>
							Customer
						</button>
					</div>
				</>
			) : (
				<Navigate
					replace
					to="/"
				/>
			)}
		</>
	);
};

export default Home;

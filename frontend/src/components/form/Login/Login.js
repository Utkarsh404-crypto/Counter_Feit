import * as Components from "../Components.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import logo from "./../images/logo.jpg";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "0 auto",
	width: "22px",
	borderColor: "#8A2BE2"
};

const Login = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [userInfoLogin, setUserInfoLogin] = useState({});
	const [signIn, toggle] = useState(true);

	const user = localStorage.getItem("usersInfo");
	const token = JSON.parse(user)?.token;

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeLogin = (e) => {
		const { name, value } = e.target;

		setUserInfoLogin({ ...userInfoLogin, [name]: value });
	};
	const handleLogin = async (e) => {
		setLoading(true);
		e.preventDefault();
		if (!userInfoLogin?.email || !userInfoLogin?.password) {
			setOpen(true);
			setLoading(false);
			Swal.fire({
				icon: "warning",
				title: "Please fill the details!"
			});
			return;
		}
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			};

			const { data } = await axios.post(
				"http://localhost:8080/api/user/login",
				userInfoLogin,
				config
			);

			localStorage.setItem("userInfo", JSON.stringify(data));
			setLoading(false);

			navigate("/home");
		} catch (error) {
			setOpen(true);
			setLoading(false);
			Swal.fire({
				icon: "error",
				title: "Authorization failed"
			});
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			handleClose();
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [handleClose]);

	return (
		<div>
			<Components.SignInContainer signinIn={signIn}>
				<img
					id="logo"
					alt=""
					src={logo}
				/>{" "}
				<Components.Form>
					<Components.Title> Sign in </Components.Title>{" "}
					<Components.Input
						type="email"
						name="email"
						placeholder="Email"
						onChange={handleChangeLogin}
					/>{" "}
					<Components.Input
						type="password"
						name="password"
						placeholder="Password"
						onChange={handleChangeLogin}
					/>{" "}
					<Components.Anchor href="#">
						{" "}
						Forgot your password ?{" "}
					</Components.Anchor>{" "}
					<Components.Button onClick={handleLogin}>
						{" "}
						Sign in{" "}
					</Components.Button>{" "}
					<br />
					<ClipLoader
						loading={loading}
						cssOverride={override}
						size={25}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</Components.Form>{" "}
			</Components.SignInContainer>{" "}
		</div>
	);
};

export default Login;

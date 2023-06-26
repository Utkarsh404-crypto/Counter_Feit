import * as Components from "../Components.js";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../form.css";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passwordRegExp =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const SignupSchema = Yup.object().shape({
	username: Yup.string()
		.min(4, "*Username is too short!")
		.max(25, "*Username is too too Long!")
		.required("*Name is required"),
	email: Yup.string().email("*Invalid email").required("*Email is required"),
	mobileNo: Yup.string()
		.matches(phoneRegExp, "*Phone number is not valid")
		.required("*Phone Number is required"),
	password: Yup.string()
		.required("*Password is required")
		.min(8, "*Password must contain atleast 8 characters !")
		.matches(
			passwordRegExp,
			"*Password must contain an uppercase, lowercase, number and a special character"
		)
		.required("*Password is required"),
	confirmpassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "*Passwords must match")
		.required("*Confirm your password")
});

const initialValues = {
	username: "",
	email: "",
	mobileNo: "",
	password: "",
	confirmpassword: ""
};
const override = {
	display: "block",
	margin: "0 auto",
	width: "22px",
	borderColor: "#8A2BE2"
};

const SignUp = () => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleSignUp = async (values, e) => {
		const { confirmpassword, ...userFinalData } = values;

		setLoading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "application/json"
				}
			};
			const { data } = await axios.post(
				"http://localhost:8080/api/user/signup",
				userFinalData,
				config
			);
			console.log("yooo", data);
			setOpen(true);
			setLoading(false);

			Swal.fire({
				icon: "success",
				title: "Registration Successful"
			});

			localStorage.setItem("usersInfo", JSON.stringify(data));
		} catch (error) {
			setOpen(true);
			setLoading(false);
			Swal.fire({
				icon: "error",
				title: "Something went wrong!"
			});
		}
	};
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: initialValues,
			validationSchema: SignupSchema,
			onSubmit: (values) => {
				handleSignUp(values);
			}
		});

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
			{" "}
			<Components.SignUpContainer>
				<Components.Form onSubmit={handleSubmit}>
					<Components.Title> Create Account </Components.Title>{" "}
					<Components.Input
						type="text"
						name="username"
						value={values.username}
						placeholder="Name"
						onChange={handleChange}
						onBlur={handleBlur}
					/>{" "}
					{errors.username && touched.username && (
						<p className="error-text-register">{errors.username}</p>
					)}
					<Components.Input
						type="email"
						name="email"
						value={values.email}
						placeholder="Email"
						onChange={handleChange}
						onBlur={handleBlur}
					/>{" "}
					{errors.email && touched.email && (
						<p className="error-text-register">{errors.email}</p>
					)}
					<Components.Input
						type="number"
						name="mobileNo"
						value={values.mobileNo}
						placeholder="Mobile No."
						onChange={handleChange}
						onBlur={handleBlur}
					/>{" "}
					{errors.mobileNo && touched.mobileNo && (
						<p className="error-text-register">{errors.mobileNo}</p>
					)}
					<Components.Input
						type="password"
						name="password"
						value={values.password}
						placeholder="Password"
						onChange={handleChange}
						onBlur={handleBlur}
					/>{" "}
					{errors.password && touched.password && (
						<p className="error-text-register">{errors.password}</p>
					)}
					<Components.Input
						type="password"
						name="confirmpassword"
						value={values.confirmpassword}
						placeholder="Confirm Password"
						onChange={handleChange}
						onBlur={handleBlur}
					/>{" "}
					{errors.confirmpassword && touched.confirmpassword && (
						<p className="error-text-register">{errors.confirmpassword}</p>
					)}
					<Components.Button type="submit"> Sign Up </Components.Button> <br />
					<ClipLoader
						loading={loading}
						cssOverride={override}
						size={25}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</Components.Form>{" "}
			</Components.SignUpContainer>{" "}
		</div>
	);
};

export default SignUp;

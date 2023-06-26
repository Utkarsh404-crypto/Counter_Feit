import React, { Fragment } from "react";
import "./landing.css";
import vid from "./video/counterfeit.mp4";
import { Link } from "react-router-dom";
import logo from "../../form/images/logo.jpg";

const Landing = () => {
	return (
		<Fragment>
			{" "}
			<img
				id="home-logo"
				alt=""
				src={logo}
			/>{" "}
			<header className="head">
				<div class="container">
					<video
						autoPlay
						loop
						muted
						plays-inline
						class="back-video">
						<source
							src={vid}
							type="video/mp4"
						/>
					</video>

					<div class="htext">
						<h1>
							<span>&#10097;</span>
							<span>&#10097;</span>Fake and{" "}
							<span>
								{" "}
								Facade<span>&#10096;</span>
								<span>&#10096;</span>
							</span>
						</h1>
						<h2>Join Us!</h2>
						<br />
						<Link to="/login">Begin</Link>
					</div>
				</div>
			</header>
		</Fragment>
	);
};

export default Landing;

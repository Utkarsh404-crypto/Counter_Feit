import * as Components from "./Components.js";
import React from "react";
import { useState } from "react";
import SignUp from "./SignUp/SignUp.js";
import Login from "./Login/Login.js";
import "./form.css";

const Form = () => {
	const [signIn, toggle] = useState(true);

	return (
		<div>
			<Components.Container>
				<SignUp />
				<Login />
				<Components.OverlayContainer signinIn={signIn}>
					<Components.Overlay signinIn={signIn}>
						<Components.LeftOverlayPanel
							signinIn={signIn}
							className="leftPanelImg">
							<Components.Title id="welcomebackTitle">
								{" "}
								Welcome Back!{" "}
							</Components.Title>{" "}
							<Components.Paragraph className="paragraph">
								To keep connected with us please login with your personal info{" "}
							</Components.Paragraph>{" "}
							<Components.GhostButton onClick={() => toggle(true)}>
								Sign In{" "}
							</Components.GhostButton>{" "}
						</Components.LeftOverlayPanel>{" "}
						<Components.RightOverlayPanel
							signinIn={signIn}
							className="rightPanelImg">
							<Components.Title id="helloTitle"> Hello! </Components.Title>{" "}
							<Components.Paragraph>
								Enter your personal details and start a journey with us{" "}
							</Components.Paragraph>{" "}
							<Components.GhostButton onClick={() => toggle(false)}>
								Sign Up{" "}
							</Components.GhostButton>{" "}
						</Components.RightOverlayPanel>{" "}
					</Components.Overlay>{" "}
				</Components.OverlayContainer>{" "}
			</Components.Container>{" "}
		</div>
	);
};

export default Form;

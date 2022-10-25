import React, { useState } from "react";
import styles from "../componentsStyles/SignUp.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();
	const [user, setuser] = useState({
		Fname: "",
		Lname: "",
		DOB: "",
		Phone_Num: "",
		Salary: 0,
		email: "",
		password: "",
		Cpassword: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setuser({
			...user,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/auth/signUp", user)
			.then((res) => {
				alert(res.data);
				navigate("/");
			})
			.catch((err) => {
				alert("Email Already in use");
			});
	};
	return (
		<React.Fragment>
			<div className={styles.container}>
				<div className={styles.loginbox}>
					<form method="POST" className={styles.loginemail}>
						<p className={styles.logintext}>SignUp with email</p>
						<div className={styles.inputgroup}>
							<input
								type="text"
								placeholder="First Name"
								name="Fname"
								value={user.Fname}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.inputgroup}>
							<input
								type="text"
								placeholder="Last Name"
								name="Lname"
								value={user.Lname}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.inputgroup}>
							<input
								type="date"
								placeholder="Date of Birth"
								name="DOB"
								value={user.DOB}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.inputgroup}>
							<input
								type="tel"
								placeholder="Phone Number"
								name="Phone_Num"
								value={user.Phone_Num}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.inputgroup}>
							<input
								type="number"
								placeholder="Salary"
								name="Salary"
								value={user.Salary}
								onChange={handleChange}
								required
							/>
						</div>

						<div className={styles.inputgroup}>
							<input
								type="text"
								placeholder="Email"
								name="email"
								value={user.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className={styles.inputgroup}>
							<input
								type="password"
								placeholder="password"
								name="password"
								value={user.password}
								onChange={handleChange}
								required
							/>
						</div>

						<div className={styles.inputgroup}>
							<input
								type="password"
								placeholder="Confirm Password"
								name="Cpassword"
								value={user.Cpassword}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.inputgroup}>
							<button
								className={styles.btn}
								name="submit"
								onClick={handleSubmit}
							>
								Login
							</button>
						</div>
						<p className={styles.loginregistertext}>
							Already have an account?{" "}
							<button onClick={() => navigate("/")}>
								Sign In
							</button>
						</p>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SignUp;

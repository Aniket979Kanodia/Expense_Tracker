import React from "react";
import Sidebar from "./Sidebar";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import "../componentsStyles/select_path.css";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function Select_Path() {
	// if(cookies.get('Member')=='undefined'||cookies.get('Member')=='null'){
		const navigate = useNavigate();

		const cookies = new Cookies();
		console.log(cookies.get('Member'));
		if(!cookies.get('Memeber')){
			navigate('/')
		}
	// 	navigate('/');
	// }
	return (
		<div>
			<React.Fragment>
				<div className="container mt-4">
					<div className="row justify-content-around">
						<div className="col-md-5 shadow p-3 mb-5 bg-white rounded text-center">
							<GroupsIcon style={{ fontSize: 350 }} />
							<div className="display-4 header-text">
								My Expenses
							</div>
							<div className="select_button mt-5">
								<button onClick={() => navigate("/Group")}>
									SELECT
								</button>
							</div>
						</div>
						<div className="col-md-5 shadow p-3 mb-5 bg-white rounded text-center">
							<PersonIcon style={{ fontSize: 350 }} />
							<div className="display-4 header-text">Groups</div>
							<div className="select_button mt-5">
								<button onClick={() => navigate("/GroupList")}>
									SELECT
								</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		</div>
	);
}

export default Select_Path;

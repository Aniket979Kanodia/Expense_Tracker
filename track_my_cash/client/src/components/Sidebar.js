import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarItems";
import { IconContext } from "react-icons";
import "../componentsStyles/SideBar.css";
import { Navigate,useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
function Sidebar() {
	const cookies = new Cookies();
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(user);
		cookies.remove("Member");
		console.log(cookies.get("Member"));
		navigate("/");
	};
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);
	const navigate = useNavigate();

	const menubarstyle = { color: "#cd817a" };

	return (
		<React.Fragment>
			<IconContext.Provider value={{ color: "#fff" }}>
				<nav className="navbar navbar-expand-lg bg-light">
					<div className="container-fluid">
						<Link to="#" className="menu-bars">
							<FaIcons.FaBars
								onClick={showSidebar}
								style={menubarstyle}
							/>
						</Link>
						
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">

						<a className="nav-link active" onClick={() => navigate("/Select")}> Home</a>
									
								</li>
								<li className="nav-item">
								<a className="nav-link active" onClick={() => navigate("/GroupList")}> Groups</a>


								</li>
								<li className="nav-item">
									
								<a className="nav-link active" onClick={() => navigate("/Individual")}> Individual</a>

								</li>
								
								
							</ul>
							
								
								<button
									className="btn btn-outline-success"
									onClick={handleSubmit}
								>
									Log Out
								</button>
							
						</div>
					</div>
				</nav>
				{/* <div className='navbar'>
          
          
        </div> */}
				<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
					<ul className="nav-menu-items" onClick={showSidebar}>
						<li className="navbar-toggle">
							<Link to="#" className="menu-bars">
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cName}>
									<Link to={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</React.Fragment>
	);
}

export default Sidebar;

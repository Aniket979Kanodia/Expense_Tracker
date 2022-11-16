import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Cookies from "universal-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import Report_Card from "./report_card";

const Group_Report = ()=>{

    const cookies = new Cookies();
    const [membersExpenses, setExpenses] = useState([]);

	const Mem_Id = cookies.get("Member").mem_id;
	const fetchgroupDues= async (e) => {
        await axios
			.get("http://localhost:5000/member/dues/" + Mem_Id)
			.then((res) => {
                console.log(res.data);
				setExpenses(res.data);
			});
    };
    useEffect(() => {
    fetchgroupDues();}, []);
        return (
    
            <React.Fragment>
			<div>
				<Sidebar />

				

				<div className="container mt-4">
					
					<div className="card mt-4">
						<div className="card-header">Expenses</div>
						{membersExpenses.map((ele) => (
							<Report_Card content={ele}></Report_Card>
						))}
					</div>
					{/* <button>Log Out</button> */}
				</div>
			</div>
		</React.Fragment>

)
};
export default Group_Report;

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Cookies from "universal-cookie";
import { Navigate, useNavigate } from "react-router-dom";


const Group_Report = ()=>{

    const cookies = new Cookies();
	const Mem_Id = cookies.get("Member").mem_id;
	const fetchgroupDues= async (e) => {
        await axios
			.get("http://localhost:5000/member/dues/" + Mem_Id)
			.then((res) => {
				console.log(res.data);
			});
    };
    useEffect(() => {
    fetchgroupDues();}, []);
        return (
    
    <React.Fragment>
report
    </React.Fragment>

)
};
export default Group_Report;

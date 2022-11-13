import React from "react";
import axios from "axios";
import twclient from "./twilio.cjs";
function alert(content) {
	console.log(content);
	//const message = "You have amount due of rupees " + content.val + " INR to " + content.Name1;
	const fetchContact = async (e) => {
		console.log(content);
		await axios
			.post("http://localhost:5000/member/contact/", { mem_id: content.Mem_id1 })
			.then((res) => {
				console.log(res.data);
				console.log(twclient);


				twclient.messages
					.create({
						body: 'Hello',
						messagingServiceSid: 'MGd5e7845010b108d1605feb14082f12e1',
						from: '+18655357463',
						to: '+919752438758'
					})
					.then(message => console.log(message.sid))
					.done();
			});
	}
	fetchContact();
}
const Split_Card = ({ content }) => {
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card detail-card">
					<div className="card-body">
						<div className="row detail-head">
							<div className="col-md-10">{content.Name2}</div>
							<div className="col-md-2 d-flex justify-content-end">
								{content.val} INR
							</div>
						</div>
						<div className="row mt-2 detail-foot ">
							<div className="col-md-10">
								{" "}
								Should pay to {content.Name1}
							</div>
							<div className="col-md-2 d-flex justify-content-end">
								<button onClick={() => (alert(content))}>Alert</button>
								<button>Settled</button>
							</div>
							{/* <div className="col-md-2 d-flex justify-content-end">31 Jan,2021</div> */}
						</div>
					</div>
				</div>
			</div>
			{/* <div className="col-md-1 border"></div> */}
		</div>
	);
};

export default Split_Card;

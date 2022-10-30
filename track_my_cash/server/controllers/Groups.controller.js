import client from "../db.js";

export const getGroups = async (req, res) => {
	let mem_id = req.body.mem_id;
	let groups = [];
	try {
		groups = await client.query(
			"Select member.fname as owner_name,group_id,created_on,name from belongs_to natural join groups join member on groups.owner_id=member.mem_id where belongs_to.mem_id=$1 ",
			[parseInt(mem_id)]
		);
	} catch (error) {
		console.log(error);
	}
	res.status(200).send(groups);
};

export const showExpenses = async (req, res) => {
	let group_id = req.params;
	let expenses = [];
	try {
		expenses = await client.query(
			"Select  fname,remarks,amount,date from group_expense join member on paid_by_mem_id = mem_id where group_id=$1 order by date desc",
			[group_id.id]
		);
	} catch (error) {
		console.log(error);
	}
	res.status(200).send(expenses.rows);
};

export const addExpense = async (req, res) => {
	let group_id = parseInt(req.params.id);
	let involved = req.body.involved;
	let expense_id = 0;
	let paid_by = parseInt(req.body.paid_by);
	let added_by = parseInt(req.body.added_by);
	let amount = parseFloat(req.body.amount);
	let remarks = req.body.remarks;
	let share_amount = amount / involved.length;
	try {
		await client.query(
			"INSERT INTO Group_Expense(Group_id, Paid_by_mem_id,Added_by_mem_id,Amount,Remarks,Date) VALUES($1,$2,$3,$4,$5,NOW())",
			[group_id, paid_by, added_by, amount, remarks]
		);
		expense_id = await client.query(
			"Select max(expense_id) from group_expense where group_id=$1",
			[group_id]
		);
		await client.query(
			"update belongs_to SET amount_due = amount_due+ $1 WHERE Group_id= $2 AND Mem_id=$3",
			[amount,group_id,paid_by]
		)
		expense_id = expense_id.rows[0].max;
		involved.forEach(async (member) => {
			console.log(member);
			await client.query(
				"Insert into shares(Expense_id,Group_id,Mem_id,Share_amount,settled) values ($1,$2,$3,$4,false)",
				[parseInt(expense_id), group_id, member.mem_id, share_amount]
			);
			await client.query(
				"update belongs_to SET amount_due = amount_due- $1 WHERE Group_id= $2 AND Mem_id=$3",
				[share_amount,group_id,member.mem_id]
			)
		});
	} catch (err) {
		console.log(err);
	}
	res.status(200).send("done");
};

export const addGroup = async (req, res) => {
	let mem_id = req.body.mem_id;
	let group_id;
	try {
		await client.query(
			"INSERT INTO Groups(Owner_id,Name,Created_on) VALUES ($1,$2,NOW())",
			[parseInt(mem_id), group_name]
		);
		group_id = await client.query(
			"Select group_id from groups where owner_id=$1 and name=$2",
			[parseInt(mem_id), group_name]
		);
		await client.query(
			"INSERT INTO belongs_to(mem_id,group_id,amount_due) VALUES ($1,$2,0)",
			[parseInt(mem_id), parseInt(group_id)]
		);
	} catch (err) {
		console.log(err);
	}
};

export const addMember = async (req, res) => {
	let group_id = req.group_id;
	let mem_id = req.mem_id;
	try {
		await client.query(
			"INSERT INTO belongs_to(mem_id,group_id,amount_due) VALUES ($1,$2,0)",
			[parseInt(mem_id), parseInt(group_id)]
		);
	} catch (error) {
		console.log(error);
	}
};

export const getMembers = async (req, res) => {
	let group_id = req.params.id;
	let members;
	try {
		members = await client.query(
			"Select belongs_to.mem_id,fname,lname from belongs_to join member on belongs_to.mem_id=member.mem_id where group_id=$1",
			[parseInt(group_id)]
		);
		res.status(200).send(members.rows);
	} catch (err) {
		console.log(err);
	}
};

export const getTotalAmount = async(req,res)=>{
	let group_id = req.params.id;
	let Tamount;
	try {
		Tamount = await client.query(
		"SELECT SUM(Amount) from Group_Expense WHERE Group_id=$1",[group_id]
	);
	console.log(Tamount);
	res.status(200).send(Tamount);
}catch(err){
console.log(err);
}
};

export const getShareAmount = async(req,res)=>{
	let group_id = req.params.id;
	let Share_amount;
	try {
		Share_amount = await client.query(
		"SELECT belongs_to.Mem_id,amount_due,fname,lname from belongs_to JOIN Member ON belongs_to.Mem_id= Member.Mem_id WHERE Group_id=$1;",[group_id]
	);
	console.log(Share_amount.rows);
	res.status(200).send(Share_amount.rows);
}catch(err){
console.log(err);
}
};
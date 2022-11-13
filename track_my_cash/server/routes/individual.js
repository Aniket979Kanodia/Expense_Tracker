import express from "express";
import {
	getMembers,
	showExpenses,

	update_salary,

	getExpenseTypes,
	addExpense,
	getContact,
	allgroupexpenses

} from "../controllers/Individuals.controller.js";

const router = express.Router();

router.get("/types", getExpenseTypes);
router.get("/id/:id", getMembers);
router.get("/expenses/:id", showExpenses);
router.post("/addExpense", addExpense);
router.post("/updatesalary" , update_salary);
router.post("/contact", getContact);
router.get("/allgroupexpenses/:id",allgroupexpenses);
export default router;

import express from "express";
import {
	addExpense,
	getGroups,
	getMembers,
	showExpenses,

	getShareAmount,
	getTotalAmount,

	addGroup,
	addMember,

} from "../controllers/Groups.controller.js";

const router = express.Router();

router.post("/addMem", addMember);
router.post("/add", addGroup);
router.post("/", getGroups);
router.get("/members/:id", getMembers);
router.get("/amount/:id", getTotalAmount);
router.get("/share/:id", getShareAmount);
router.get("/:id", showExpenses);
router.post("/:id", addExpense);

export default router;

import express from "express";
import { createExpense, deleteExpense, getExpense, getSingleExpense, updateExpense } from "./controllers/expenseController.js";
import cors from "cors"
const app = express();

app.use(express.json())
app.use(cors());


app.post("/expense", createExpense);
app.get("/expense", getExpense);
app.patch("/expense/:expenseId", updateExpense)
app.delete("/expense/:expenseId", deleteExpense);
app.get("/expense/:expenseId", getSingleExpense);





export default app;     
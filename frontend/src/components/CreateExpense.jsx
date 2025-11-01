import React from 'react'
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const categories = ["Food", "Electronics", "Transport", "Shopping", "Entertainment", "Other"];

function formatDateForInput(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
            const day = String(d.getDate()).padStart(2, "0");
            // return `${year}-${month}-${day}`;
            return `${day}-${month}-${year}`
}

const CreateExpense = ({ existingExpense }) => {
            const [expense, setExpense] = useState({
                        title: "",
                        category: "",
                        amount: "",
                        date: ""
            });
            const navigate = useNavigate();

            console.log(existingExpense)
            console.log(expense)
            useEffect(() => {
                        if (existingExpense) {
                                    setExpense(existingExpense);
                        }
            }, [existingExpense])

            const handleChange = (e) => {
                        const { value, name } = e.target;
                        setExpense((prev) => ({ ...prev, [name]: value }))
            }

            const handleSubmit = async () => {

                        if (!expense.amount || !expense.category || !expense.date || !expense.title) return toast.success("All fields are required")
                        try {
                                    const { data } = await axios.post("http://localhost:3000/expense", expense);
                                    console.log(data)
                                    toast.success(data.message);

                        } catch (error) {
                                    console.error(error);
                        } finally {
                                    setExpense({ amount: "", category: "", title: "", date: "" })
                        }
            }

            const updateExpense = async () => {

                        try {
                                    const { data } = await axios.patch(`http://localhost:3000/expense/${existingExpense._id}`, expense);
                                    toast.success(data.message);
                                    navigate("/expense-list");
                        } catch (error) {
                                    console.log(error)
                        }
            }
            return (
                        <Box>
                                    <Button variant='contained' sx={{ margin: 2 }} onClick={() => navigate("/expense-list")}>Expense List</Button>
                                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} minHeight={"90vh"}>
                                                <Paper elevation={3} sx={{ padding: 4, width: 400, display: "flex", flexDirection: "column", gap: 2 }}>
                                                            <Typography align='center'>
                                                                        Add Expenses
                                                            </Typography>
                                                            <TextField color='error' autoFocus value={expense.title} name='title' onChange={handleChange} label="Title" fullWidth placeholder='Enter your title' />
                                                            <TextField value={expense.amount} name='amount' onChange={handleChange} label="Amount" type='number' placeholder=' Enter your Amount' />
                                                            <TextField
                                                                        select
                                                                        label="Category"
                                                                        name="category"
                                                                        value={expense.category}
                                                                        onChange={handleChange}
                                                                        fullWidth
                                                            >
                                                                        {categories.map((option) => (
                                                                                    <MenuItem key={option} value={option}>
                                                                                                {option}
                                                                                    </MenuItem>
                                                                        ))}
                                                            </TextField>
                                                            <TextField
                                                                        value={expense.date}
                                                                        onChange={handleChange}
                                                                        label="Date"
                                                                        name="date"
                                                                        type="date"
                                                                        fullWidth
                                                                        InputLabelProps={{ shrink: true }}
                                                            />

                                                            {

                                                                        existingExpense?._id ? <Button variant='contained' color='secondary' onClick={updateExpense}> Update Expense</Button> :
                                                                                    <Button variant='contained' color='secondary' onClick={handleSubmit}> Add Expense</Button>
                                                            }
                                                </Paper>
                                    </Box >
                        </Box>
            )
}

export default CreateExpense
import { Box, Button, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function formatDateForInput(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
            const day = String(d.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
}

const ExpenseList = () => {

            const [expenses, setExpenses] = useState([]);
            const navigate = useNavigate();
            const params = new URLSearchParams(location.search);
            const category = params.get("category");
            const month = params.get("month");




            const deleteExpense = async (id) => {
                        try {
                                    const { data } = await axios.delete(`http://localhost:3000/expense/${id}`);
                                    toast.success(data.message);
                                    fetchExpense();
                        } catch (error) {
                                    console.error(error)
                        }


            }

            const fetchExpense = async () => {
                        try {
                                    const { data } = await axios.get("http://localhost:3000/expense", {
                                                params: { category, month }
                                    });
                                    setExpenses(data.expense);
                        } catch (error) {
                                    console.error(error);
                        }
            }

            useEffect(() => {
                        fetchExpense();
            }, [])
            return (
                        <Box>
                                    <Typography align='center'>Expense Lists</Typography>
                                    <Button variant='contained' color='inherit' sx={{ margin: 2 }} onClick={() => navigate("/expense")}>Back</Button>

                                    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", height: "100vh", alignItems: "center", alignContent: "start" }}>
                                                {
                                                            expenses.map((data) => (
                                                                        <Paper
                                                                                    key={data._id}
                                                                                    sx={{
                                                                                                width: 400,
                                                                                                padding: 2,
                                                                                                margin: 2,
                                                                                                borderRadius: 2,
                                                                                                boxShadow: 3,
                                                                                    }}
                                                                        >
                                                                                    <Typography variant="h6">{data.title}</Typography>
                                                                                    <Typography>Amount: ₹{data.amount}</Typography>
                                                                                    <Typography>Category: {data.category}</Typography>
                                                                                    <Typography>Date: {formatDateForInput(data.date)}</Typography>

                                                                                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                                                                                <Button onClick={() => deleteExpense(data._id)} variant="contained" color="success">
                                                                                                            Delete
                                                                                                </Button>
                                                                                                <Button onClick={() => navigate(`/expense/${data._id}`)} variant="contained" color="primary">
                                                                                                            Edit
                                                                                                </Button>
                                                                                    </Box>
                                                                        </Paper>


                                                            ))
                                                }
                                    </Box>
                        </Box>

            )
}

export default ExpenseList                      
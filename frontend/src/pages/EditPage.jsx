import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CreateExpense from '../components/CreateExpense';

const EditPage = () => {
            const { id } = useParams();
            const [expense, setExpense] = useState(null);



            useEffect(() => {
                        const fetchExpense = async () => {
                                    try {
                                                const { data } = await axios.get(`http://localhost:3000/expense/${id}`)
                                                setExpense(data.expense);
                                                console.log(data)
                                    } catch (error) {
                                                console.error(error)
                                    }
                        }

                        fetchExpense();
            }, [id])
            return (
                        <div>
                                    <CreateExpense existingExpense={expense} />
                        </div>
            )
}

export default EditPage 
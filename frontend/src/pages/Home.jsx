import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
            const navigate = useNavigate();
            return (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', height: "100vh" }}>
                                    <Button variant='contained' color='primary' onClick={() => navigate("/expense")}>Click to Go Inside</Button>
                        </Box>
            )
}

export default Home     
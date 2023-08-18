import { Backdrop, Box, Button, Fade, Modal, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import WithAuth from './layout/WithAuth';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import axios from "axios"; // You can use axios for API requests
const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book/search";
function Homepage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${BASEURL}?keyword=${searchQuery}`);
            setResponseData(response.data.result[0]); // Assuming you want to display the first result
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="center-container">
        <div className="searchform">
            <form onSubmit={handleSearch}>
                <TextField
                    variant="outlined"
                    color="primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '10px',
                         width: '80%',
                         maxWidth: '500px',
                    }}
                />
                <Button type="submit" variant="contained" color="secondary">
                    Search
                </Button>
            </form>

            {/* Display the response data */}
            {responseData && (
                <div>
                    <p>Name:{responseData.name}</p>
                    <p>Description: {responseData.description}</p>
                    <p>Price: {responseData.price}</p>
                    <p>category: {responseData.category}</p>


                </div>
            )}
        </div>
        </div>
    );
}

export default WithAuth(Homepage);
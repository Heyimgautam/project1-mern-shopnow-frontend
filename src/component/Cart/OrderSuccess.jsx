import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className = "orderSuccess">
        <CheckCircleOutlineIcon/>

        <Typography>Your order has been placed Successfully. Thanks for your Purchase!</Typography>
        <Link to = "/orders"> View Orders</Link>
     
    </div>
  )
}

export default OrderSuccess

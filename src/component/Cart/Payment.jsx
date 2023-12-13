import React,{Fragment, useEffect, useRef} from 'react';
import Metadata from '../layout/Metadata';
import CheckOutSteps from './CheckOutSteps';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {createOrder, clearErrors} from '../../actions/OrderAction';
import './Payment.css';
const Payment = () => {
     const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const stripe = useStripe();
     const elements = useElements();
     const payBtn = useRef(null);

     const {shippingInfo, cartItems} = useSelector((state)=> state.cart);
     const {user} = useSelector((state)=> state.login);
     const {error} = useSelector((state)=> state.order);

     const paymentData = {
      amount : Math.round(orderInfo.totalPrice * 100),
     };

     const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
     }

  const submitHandler = async(e)=>{
      e.preventDefault();
      payBtn.current.disabled = true;

      try{
        const config = {
          headers : {
            "Content-Type" : "application/json",
          },
          withCredentials : true,
        };

        const { data } = await axios.post("/api/v1/payment/process", paymentData, config);

        const client_secret = data.client_secret;

        if(!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card : elements.getElement(CardNumberElement),
            billing_details :{
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
            }
          }
        }});
        if (result.error) {
          payBtn.current.disabled = false;
  
          toast.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };
  
            dispatch(createOrder(order));
  
            navigate("/success");
          } else {
            toast.error("There's some issue while processing payment ");
          } }
      }catch (error) {
        payBtn.current.disabled = false;
        toast.error(error.response.data.message);
      }

  }

  useEffect(()=>{
     if(error){
      toast.error(error);
      dispatch(clearErrors());
     }
  },[dispatch, error]);
  return (
    <Fragment>
      <Metadata title="Payment" />
      <CheckOutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
    
  )
}

export default Payment

import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CLEAR_ERRORS, MYORDER_REQUEST, MYORDER_SUCCESS, MYORDER_FAIL,ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,} from "../constant/constant";
import axios from 'axios';
import {server} from '../index';

export const createOrder = (order)=> async(dispatch)=>{
    try{
        dispatch({type : CREATE_ORDER_REQUEST});

        const {data} = await axios.post(`${server}/api/v1/order/new`,order,{
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : true,
        });
        dispatch({type : CREATE_ORDER_SUCCESS, payload : data});

    }catch(error){
        dispatch({type : CREATE_ORDER_FAIL, payload : error.response.data.message});
    }
}

//My Orders
export const myOrders = (id)=>async(dispatch)=>{
    try{
        dispatch({type : MYORDER_REQUEST});
        const {data} = await axios.get(`${server}/api/v1/order/me/${id}`,{withCredentials : true,});
      dispatch({
        type : MYORDER_SUCCESS, 
         payload : data.orders,
        });
    }catch(error){
       dispatch({type : MYORDER_FAIL, payload : error.response.data.message});
    }
}

//All Orders
export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });
  
      const { data } = await axios.get(`${server}/api/v1/order/admin/AllOrders`,{withCredentials : true,});
  
      dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Update Orders
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials : true,
    };
    const { data } = await axios.put(
      `${server}/api/v1/order/admin/OrderStatus/${id}`,
      order,
      config
    ); 
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
}; 


// Delete Orders
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`${server}/api/v1/order/admin/OrderStatus/${id}`,{withCredentials : true,});

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


//Order Details
export const orderDetailsAction = (id)=> async(dispatch)=>{
    try{
        dispatch({type : ORDER_DETAILS_REQUEST});
        const {data} = await axios.get(`${server}/api/v1/order/${id}`,{withCredentials : true,});
        dispatch({type : ORDER_DETAILS_SUCCESS, payload : data.order});
    }catch(error){
        dispatch({type : ORDER_DETAILS_FAIL, payload : error.response.data.message});
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
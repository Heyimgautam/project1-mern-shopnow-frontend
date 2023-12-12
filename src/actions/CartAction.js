import axios from 'axios';
import {server} from '../index';
import { ADD_TO_CART, REMOVE_TO_CART, SAVE_SHIPPING_INFO } from '../constant/constant';

//Add to cart
export const addItemsToCart = (id, quantity) => async(dispatch, getState)=>{
    const {data} = await axios.get(`${server}/api/v1/product/${id}`,{withCredentials : true});

    dispatch({
        type : ADD_TO_CART,
        payload : {
            product : data.product._id,
            name : data.product.name,
            price : data.product.price,
            image : data.product.images[0].url,
            stock : data.product.stock,
            quantity,
        },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Remove Item from cart
export const  removeItemsFromCart = (id) => async(dispatch, getState)=>{
    dispatch({type : REMOVE_TO_CART,
    payload : id,});

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//Save shipping Info
export const saveShippingInfo = (data) => async(dispatch)=>{
    dispatch({
        type : SAVE_SHIPPING_INFO,
        payload : data,
    });

    localStorage.setItem("shippingInfo",JSON.stringify(data));
}
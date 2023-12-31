import React, { Fragment } from 'react';
import Metadata from '../layout/Metadata';
import { useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import { addItemsToCart, removeItemsFromCart } from '../../actions/CartAction';
import { useDispatch, useSelector } from 'react-redux';
import CartItemsCart from './CartItemsCart.jsx';
import './Cart.css';

const Cart = () => {
     const dispatch = useDispatch();
     const Navigate = useNavigate();
     const {cartItems} = useSelector((state)=> state.cart);

     const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty));
      };
    
      const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty));
      };

      const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
      };
    
      const checkoutHandler = () => {
        //  <Navigate to = {"/login?redirect=shipping"}/>
         Navigate("/shipping");
       //  Navigate("/login?redirect=shipping");
      };
  return (
    <Fragment>
        {cartItems.length === 0 ?(<div className="emptyCart">
            <Metadata title = "Shopping Cart"/>
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>):(<Fragment>
        <div className = "cartPage">
        <Metadata title = "Shopping Cart"/>
            <div className = "cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {cartItems && cartItems.map((item)=>(
                <div className='cartContainer' key={item.product}>
                <CartItemsCart item={item} deleteCartItems = {deleteCartItems} />
                <div className = "cartInput">
                    <button onClick={()=> decreaseQuantity(item.product, item.quantity)}>-</button>
                    <input type="number" value={item.quantity} readOnly/>
                    <button onClick ={()=> increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                </div>
                  <p> {`₹${
                    item.price * item.quantity}`}</p>
                </div>
                  ))}
                <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
    </Fragment>)}
    </Fragment>
  )
}

export default Cart

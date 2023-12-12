import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productReducer,productDetailsReducer, newReviewReducer, newProductReducer, productEditReducer, productReviewsReducer, reviewReducer } from './reducer/ProductReducer';
import {allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer} from './reducer/UserReducer';
import { cartReducer } from './reducer/CartReducer';
import {allOrdersReducer, myorderReducer, newOrderReducer, orderDetailsReducer, orderReducer} from './reducer/OrderReducer'; 



const reducer = combineReducers({
     products : productReducer,
     productDetails : productDetailsReducer,
     login : userReducer,
     profile : profileReducer,
     password : forgotPasswordReducer,
     cart : cartReducer,
     order : newOrderReducer,
     MyOrder : myorderReducer,
     orderDetail : orderDetailsReducer,
     review : newReviewReducer,
     allUsers : allUsersReducer,
     allOrders : allOrdersReducer,
     newProduct : newProductReducer,
     editProduct : productEditReducer,
     editOrder: orderReducer,
     userDetail : userDetailsReducer,
     allReviews: productReviewsReducer,
     deleteReview : reviewReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },
};


const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
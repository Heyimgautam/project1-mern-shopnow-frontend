import {React,useEffect,useState} from 'react';
import "./app.css";
import axios from 'axios';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import  { Toaster } from "react-hot-toast";
import webFont from 'webfontloader';
import Header from './component/layout/header/Header';
import UserOptions from './component/layout/header/UserOptions.jsx';
import Home from './component/home/Home.jsx';
import Footer from './component/layout/footer/Footer';
import Products from './component/Product/Products';
import ProductDetails from './component/Product/ProductDetails';
import Search from './component/Product/Search';
import Login from './component/User/Login';
import Register from './component/User/Register';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import ProtectedRoute from './component/route/ProtectedRoute';
import store from './store';
import {loadUser} from './actions/UserActions';
import {useSelector} from 'react-redux';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import Step2Shipping from './component/Cart/Step2Shipping';
import Payment from './component/Cart/Payment';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrder from './component/Order/MyOrder'; 
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import CreateProduct from './component/admin/CreateProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import ProcessOrder from './component/admin/ProcessOrder';
import OrderList from './component/admin/OrderList';
import UserList from './component/admin/UserList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import Contact from './component/layout/contact/Contact';
import About from './component/layout/about/About';
import {server} from './index';


function App() {
  const {isAuthenticated, user} = useSelector((state)=>state.login);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get(`${server}/api/v1/payment/stripeapikey`,{withCredentials : true});

    setStripeApiKey(data.stripeApiKey);
  }
useEffect(()=>{
     webFont.load({
      google : {
        families : ['Roboto',"Droid Sans","Chilanka"],
      },
     });
     store.dispatch(loadUser());

     getStripeApiKey();
},[]);
  return (
    <>
    {stripeApiKey && (<Elements stripe = {loadStripe(stripeApiKey)} >
    <Router>
      {isAuthenticated && <UserOptions user={user}/>}
      <Header/>
      {/* {stripeApiKey && (<Elements stripe = {loadStripe(stripeApiKey)} ><Route path = "/process/payment" element = {<ProtectedRoute><Payment/></ProtectedRoute>}/></Elements>)} */}
      
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/product/:id' element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>
        <Route path="/products" element = {<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>} />
        <Route path="/Search" element={<Search/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path ="/user/new" element={<Register/>} />
        <Route path = "/account" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path = "/me/update" element = {<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
        <Route path = "/password/update" element = {<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
        <Route path = "/password/forgot" element={<ForgotPassword/>}/>
        <Route path = "/password/reset/:token" element={<ResetPassword/>} />
        <Route path = "/Cart" element = {<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path = "/shipping" element={<Shipping/>}/>
        <Route path = "/order/confirm" element={<Step2Shipping/>} />
        <Route path = "/contact" element={<Contact/>} />
        <Route path = "/about" element={<About/>} />
      
      <Route path = "/process/payment" element = {<ProtectedRoute><Payment/></ProtectedRoute>}/>
      {/* {stripeApiKey && (<Elements stripe = {loadStripe(stripeApiKey)} ><Route path = "/process/payment" element = {<ProtectedRoute><Payment/></ProtectedRoute>}/></Elements>)} */}
      <Route path = "/success"  element = {<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>  
    
    {/* Admin route */}
      <Route path = "/admin/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>}/>   
      <Route path = "/admin/products" element = {<ProtectedRoute><ProductList/></ProtectedRoute>}/>
      <Route path = "/admin/product/new" element = {<ProtectedRoute><CreateProduct/></ProtectedRoute>}/>
      <Route path = "/admin/product/:id" element = {<ProtectedRoute><UpdateProduct/></ProtectedRoute>}/>
      <Route path = "/admin/orders" element = {<ProtectedRoute><OrderList/></ProtectedRoute>}/>
      <Route path = "/admin/order/:id" element = {<ProtectedRoute><ProcessOrder/></ProtectedRoute>}/>
      <Route path = "/admin/users" element = {<ProtectedRoute><UserList/></ProtectedRoute>}/>
      <Route path = "/admin/user/:id" element = {<ProtectedRoute><UpdateUser/></ProtectedRoute>}/>
      <Route path = "/admin/reviews" element = {<ProtectedRoute><ProductReviews/></ProtectedRoute>}/>
    
    
      <Route path = "/orders"  element = {<ProtectedRoute><MyOrder/></ProtectedRoute>}/>      
      <Route path = "/orders/:id"  element = {<ProtectedRoute><OrderDetails/></ProtectedRoute>}/> 
      </Routes>
      <Footer/>
    </Router>
    <Toaster/>
    </Elements>)}
    </>
  );
}

export default App;

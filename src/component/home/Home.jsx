import React,{Fragment,useEffect} from 'react';
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import ProductCard from './ProductCard';
import Metadata from '../layout/Metadata';
import {getProduct,clearErrors} from '../../actions/ProductAction';
import Loader from '../layout/loader/loader.jsx';
import { useDispatch,useSelector } from 'react-redux';
import toast from "react-hot-toast";



const Home = () => {
  const dispatch = useDispatch();
  const {products, loading ,error} = useSelector(state=> state.products)
  useEffect(()=>{
     if(error){
      toast.error(error);
      dispatch(clearErrors());
     }
    dispatch(getProduct());
     
  },[dispatch,error]);
  
  return (
    <Fragment>
      {loading ? (<Loader/>) : (<Fragment>
        <Metadata title = "Shop Now"/>
        <div className = "banner">
         <p>Welcome to ShopNow</p>
         <h1>Find Amazing products Below</h1>

         <a href="#container">
            <button>Scroll <CgMouse/> </button>
        </a>
        </div>
        
        <h2 className = "homeHeading">Featured Products</h2>

        <div className = "container" id = "container">
          {products && products.map((product)=>(
             <ProductCard key = {product._id} product = {product}/>
          ))}
          {/* <ProductCard product = {product}/> */}
        </div>
    </Fragment>)} 
    </Fragment>
  )
}

export default Home

import React,{Fragment,useState} from 'react';
import Metadata from '../layout/Metadata';
import {getProduct} from '../../actions/ProductAction';
import { useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import "./Search.css";
const Search = () => {
    const [keyword,setKeyword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchHandler = (e)=>{
         e.preventDefault();
         if(keyword.trim()){
             dispatch(getProduct(keyword));
           navigate(`/products/${keyword}`);
         }else{
            dispatch(getProduct())
           navigate("/products");
         }    
    }
    
  return (
    <Fragment>
       <Metadata title = "Search product -- Shop Now"/>
       <form className = "searchBox" onSubmit = {searchHandler}>
        <input type="text" placeholder = "Enter the product..." onChange = {(e)=>setKeyword(e.target.value)}/>
        <input type= "submit" value = "Search" />
        </form> 
    </Fragment>
  )
}

export default Search

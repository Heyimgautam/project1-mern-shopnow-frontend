import React,{Fragment,useEffect,useState} from 'react';
import ProductCard from '../home/ProductCard'
import Metadata from '../layout/Metadata';
import Loader from '../layout/loader/loader';
import "./Products.css";
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';
import toast from 'react-hot-toast';
import Typography from '@mui/material/Typography';
import {getProduct,clearErrors} from '../../actions/ProductAction';
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

const categories = [
  "Laptops",
  "SmartPhones",
  "Clothes",
  "GirlsAttire",
  "Watches",
  "Camera"
];
const Products = () => {
  const dispatch = useDispatch();
  const {keyword} = useParams();
  const {products,loading,error,resultPerPage,productsCount,filteredProductsCount} = useSelector(state=> state.products);
  const [currentPage,setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category,setCategory] = useState("");
  const [ratings, setRatings] = useState(5);
 
  const setCurrentPageNo = (e)=>{
    setCurrentPage(e);
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  


   let count = filteredProductsCount;
useEffect(()=>{
  if(error){
    toast.error(error);
    dispatch(clearErrors());
  }
  dispatch(getProduct(keyword,currentPage,price,category,ratings));
},[dispatch,error,keyword,currentPage,price,category,ratings]);
  return (
    <Fragment>
      {loading ? (<Loader/>):(
        <Fragment>
          <Metadata title = "Products -- ShopNow"/>
          <h2 className = "productsHeading">Products</h2>
           <div className = "products">
           {products && products.map((product)=>(
            <ProductCard key={product._id} product={product}/>
          ))}
           </div>

           <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              color = "error"
              min={0}
              max={10000}
            />

            <Typography>Categories</Typography>
            <ul className = "categoryBox">
              {categories.map((category)=>(
                <li className="category-link" 
                   key = {category}
                   onClick={()=>setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                color = "error"
                min={0}
                max={5}
              />
            </fieldset>
            </div>
           {/* {resultPerPage < count && (
            <div className = "paginationBox">
              <Pagination 
              activePage = {currentPage}
              itemsCountPerPage = {resultPerPage}
              totalItemsCount = {productsCount}
              onChange = {setCurrentPageNo}
              nextPageText = "Next"
              prevPageText = "Prev"
              firstPageText = "1st"
              lastPageText = "Last"
              itemClass = "page-item"
              linkClass = "page-link"
              activeClass = "pageItemActive"
              activeLinkClass = "pageLinkActive"
              />
            </div> */}
           {/* )} */}
           <div className = "paginationBox">
              <Pagination 
              activePage = {currentPage}
              itemsCountPerPage = {resultPerPage}
              totalItemsCount = {productsCount}
              onChange = {setCurrentPageNo}
              nextPageText = "Next"
              prevPageText = "Prev"
              firstPageText = "1st"
              lastPageText = "Last"
              itemClass = "page-item"
              linkClass = "page-link"
              activeClass = "pageItemActive"
              activeLinkClass = "pageLinkActive"
              />
            </div>
          
        </Fragment>
      )}
    </Fragment>
  )
}

export default Products

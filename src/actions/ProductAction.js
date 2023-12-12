import axios from 'axios';
import {server} from '../index';
import {ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL,CLEAR_ERROR,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL,  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL} from '../constant/constant';

export const getProduct = (keyword="",currentPage = 1, price = [0,10000],category,ratings=0)=>async(dispatch)=>{
    try{
      dispatch({type : ALL_PRODUCT_REQUEST});

      let productLink = `${server}/api/v1/product/AllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings=${ratings}`;
      
      if(category){
        productLink = `${server}/api/v1/product/AllProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings=${ratings}`;
      };
      const {data} = await axios.get(productLink,{withCredentials : true,});
      dispatch({
        type : ALL_PRODUCT_SUCCESS,
        payload : data,
      });
    }catch(error){
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload : error.response.data.message,
        });
    }
}
//Product Details
export const getProductDetails = (id)=> async(dispatch)=>{
  try{
    dispatch({type : PRODUCT_DETAILS_REQUEST});

    const {data} = await axios.get(`${server}/api/v1/product/${id}`,{withCredentials : true,});

    dispatch({
      type : PRODUCT_DETAILS_SUCCESS,
      payload : data,
    });
  }catch(error){
    dispatch({
    type : PRODUCT_DETAILS_FAIL,
    payload : error.response.data.message,
    });
  }
  }

 //Create new Review
 export const newReview = (reviewData)=>async(dispatch)=>{
      try{
        dispatch({type : NEW_REVIEW_REQUEST});
        const {data} = await axios.post(`${server}/api/v1/product/review/new`,reviewData,{
          headers : {
            "Content-Type" : "application/json",
          },
          withCredentials : true,
        });
        dispatch({type : NEW_REVIEW_SUCCESS, payload : data.success});
      }catch(error){
        dispatch({type : NEW_REVIEW_FAIL, payload : error.response.data.message});
      }
 }


 //admin get all products
 export const getAllProduct = ()=> async(dispatch)=>{
    try{
      dispatch({type : ADMIN_PRODUCT_REQUEST});
      const {data} = await axios.get(`${server}/api/v1/product/admin/AllProducts`,{withCredentials : true,});
      dispatch({type : ADMIN_PRODUCT_SUCCESS, payload : data.products});
    }catch(error){
      dispatch({type : ADMIN_PRODUCT_FAIL, payload : error.response.data.message});
    }
 }

 //Create Product
 export const createProduct = (productData) => async (dispatch) =>{
  try{
    dispatch({type : NEW_PRODUCT_REQUEST});
    const {data} = await axios.post(`${server}/api/v1/product/new`,productData,{
      headers : {
        "Content-Type" : "multipart/form-data",
      },
      withCredentials : true,
    });
    dispatch({type : NEW_PRODUCT_SUCCESS, payload : data});
  }catch(error){
    dispatch({type : NEW_PRODUCT_FAIL, payload : error.response.data.message});
  }
 }

 //Delete Product
 export const deleteProduct = (id)=> async (dispatch) => {
  try{
    dispatch({type : DELETE_PRODUCT_REQUEST});
    const {data} = await axios.delete(`${server}/api/v1/product/${id}`,{
      headers : {
        "Content-Type" : "application/json"
      },
      withCredentials : true,
    });
    dispatch({type : DELETE_PRODUCT_SUCCESS, payload : data.success});
  }catch(error){
    dispatch({type : DELETE_PRODUCT_FAIL, payload : error.response.data.message});
  }
 };

 //update Product
 export const updateProduct = (id, formData) => async(dispatch)=>{
  try{
    dispatch({type : UPDATE_PRODUCT_REQUEST});
    const {data} = await axios.put(`${server}/api/v1/product/${id}`,formData, {
      headers : {
        "Content-Type" : "multipart/form-data"
      },
      withCredentials : true,
    });
    dispatch({type : UPDATE_PRODUCT_SUCCESS, payload : data.success});
  }catch(error){
  dispatch({type : UPDATE_PRODUCT_FAIL, payload : error.response.data.message});
}
 }

 // Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`${server}/api/v1/product/reviews/${id}`,{withCredentials : true,});

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete Reviews
export const deleteProductReviews = (reviewId, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `${server}/api/v1/product/reviews/${id}`,reviewId,{withCredentials : true,}
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clearing errors
export const clearErrors = () => (dispatch) =>{
    dispatch({type : CLEAR_ERROR});
}; 
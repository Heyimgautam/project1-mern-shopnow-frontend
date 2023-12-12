import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {useAlert} from 'react-alert';
import  Metadata from '../layout/Metadata';
import Sidebar from './Sidebar';
import { getAllProduct, deleteProduct, clearErrors } from '../../actions/ProductAction';
import { DELETE_PRODUCT_RESET } from '../../constant/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ProductList.css';
const ProductList = () => {
     const dispatch = useDispatch();
     const alert = useAlert();
     const navigate = useNavigate();
     const {products, error} = useSelector((state)=> state.products);
     const {isDeleted, error : deleteError} = useSelector((state)=> state.editProduct);
     
     const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id));
     };
     useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Product deleted successfully");
            navigate("/admin/dashboard");
            dispatch({type : DELETE_PRODUCT_RESET});
        }
        dispatch(getAllProduct());
     },[dispatch, error, alert, deleteError, isDeleted, navigate]);

     const columns = [
        {field : "id", headerName: "Product ID", minWidth: 200, flex: 0.5},

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 0.2,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.2,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.1,
        },

        {
            field: "action",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params)=>{
                return(
                    <Fragment>
                      <Link to = {`/admin/product/${params.id}`}><EditIcon/></Link>
                      <button onClick = {() => deleteProductHandler(params.id)}><DeleteIcon/></button>
                    </Fragment>
                );
            },
        },
     ];

     const rows = [];

     products && 
     products.forEach((item)=>{
        rows.push({
           id : item._id,
           stock : item.stock,
           price : item.price,
           name : item.name,
        });
     });

  return (
    <Fragment>
        <Metadata title={`ALL PRODUCTS - Admin`} />

<div className="dashboard">
  <Sidebar />
  <div className="productListContainer">
    <h1 id="productListHeading">ALL PRODUCTS</h1>

    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      className="productListTable"
      autoHeight
    />
  </div>
</div>
    </Fragment>
  )
}

export default ProductList

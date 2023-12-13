import React,{Fragment, useEffect} from 'react';
import Metadata from '../layout/Metadata';
import Loader from '../layout/loader/loader';
import {myOrders, clearErrors} from '../../actions/OrderAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { DataGrid } from '@mui/x-data-grid';
import "./MyOrder.css";

const MyOrder = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.login);
  const {loading, Orders, error} = useSelector((state)=> state.MyOrder);
  const columns = [{
    field : "id", headerName : "Order ID", minWidth : 300, flex: 1
  },
{
  field : "status", headerName : "Status", minWidth : 150, flex : 0.5,

  // cellClassName : (params) => {
  //   return (params.status ==="Delivered") ? ("redColor") : ("greenColor");
  // },
},
{
  field : "amount",
  headerName : "Amount",
  type : "number",
  minWidth : 270,
  flex : 0.5,
},
{
  field: "actions",
  flex: 0.3,
  headerName: "Actions",
  minWidth : 150,
  type : "number",
  sortable : false,
  renderCell : (params) => {
    return (
      <Link to = {`/orders/${params.id}`}><LaunchOutlinedIcon/></Link>
    )
  }
}];

const rows = [];

Orders && 
Orders.forEach((item, index)=> {
  rows.push({
    itemsQty : item.orderItems.length,
    id : item._id,
    status : item.orderStatus,
    amount : item.totalPrice, 
  });
});
 const  userId = user._id;
useEffect(()=>{
  if(error){
    toast.error(error);
    dispatch(clearErrors());
  }
  dispatch(myOrders(userId));
},[dispatch,error,userId]);
  return (
    <Fragment>
      <Metadata title = {`${user.name} - Orders`}/>
      {loading ? (<Loader/>) : 
      (<Fragment>
       <div className = "myOrdersPage">
        <DataGrid rows = {rows} columns = {columns} pageSize={10} className = "myOrdersTable" autoHeight />
        <Typography id = "myOrdersHeading">{user.name}'s Orders</Typography>
       </div>
      </Fragment>)}
    </Fragment>
  )
}

export default MyOrder

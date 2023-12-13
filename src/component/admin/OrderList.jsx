import React, { Fragment,useEffect } from 'react';
import Sidebar from './Sidebar';
import Metadata from '../layout/Metadata';
import { DataGrid } from '@mui/x-data-grid';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { getAllOrders, deleteOrder, clearErrors } from '../../actions/OrderAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { DELETE_ORDER_RESET } from '../../constant/constant';
const OrderList = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {orders, error} = useSelector((state)=> state.allOrders)
      const {error : deleteError, isDeleted} = useSelector((state)=> state.editOrder);

      const deleteOrderHandler = (id)=>{
        dispatch(deleteOrder(id));
      };


      useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isDeleted){
            toast.success("Order deleted Successfully");
            navigate("/admin/orders");
            dispatch({type : DELETE_ORDER_RESET});
        }
        dispatch(getAllOrders());
      },[dispatch, error, deleteError, isDeleted, navigate]);

      const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.4,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/order/${params.id}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteOrderHandler(params.id)
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
      const rows = [];

      orders &&
        orders.forEach((item) => {
          rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
          });
        });


  return (
    <Fragment>
       <Metadata title={`ALL ORDERS - Admin`} />

<div className="dashboard">
  <Sidebar />
  <div className="productListContainer">
    <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList

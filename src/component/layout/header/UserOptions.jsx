import React,{Fragment,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useAlert} from 'react-alert';
import {useSelector} from 'react-redux';
import { SpeedDial,SpeedDialAction,Backdrop } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useDispatch } from 'react-redux';
import {logout} from '../../../actions/UserActions';
import './header.css';
const UserOptions = ({user}) => {
  const navigate = useNavigate();
  const alert = useAlert();
    const [open,setOpen] = useState(false);
    const {cartItems} = useSelector((state)=> state.cart);
    const dispatch = useDispatch();
    const options = [
        {icon : <ListAltRoundedIcon/>, name : "Orders", func: orders},
        {icon : <PersonOutlineRoundedIcon />, name : "Profile", func : account},
        {icon : <ShoppingCartRoundedIcon style = {{color : cartItems.length > 0 ? "tomato" : "unset"}}/>, name : `Cart(${cartItems.length})`, func: cart},
        {icon : <ExitToAppRoundedIcon/>, name : "Logout", func: logoutUser},
    ];

    if(user.role === "admin"){
        options.unshift({
            icon : <DashboardRoundedIcon/>,
            name : "Dashboard",
            func : dashboard,
        });
    }

    function dashboard(){
         navigate("/admin/dashboard");
    }
    function account(){
        navigate("/account");
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("logout successfully");
        navigate("/");
    }
    function orders(){
       navigate("/orders");
    }

    function cart(){
      navigate("/cart");
    }
  return (
    <Fragment>
        <Backdrop open={open} style={{ zIndex: "10" }} />
        <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
  //sx={{position: 'absolute', bottom: 16, right: 16 }}
        icon={ <img
        className="speedDialIcon"
        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
        alt="Profile"
        />}
         >
         {options.map((item)=>(
 <SpeedDialAction key={item.name} icon={item.icon} onClick = {item.func} tooltipOpen = {true} tooltipTitle = {item.name}  />
         ))}   
       
    
  {/* {actions.map((action) => (
    <SpeedDialAction
      key={action.name}
      icon={action.icon}
      tooltipTitle={action.name}
    />
  ))} */}
</SpeedDial>
        {/* <SpeedDial
        //arialLabel = "SpeedDial tooltip example"
        onClose={()=>setOpen(false)}
        onOpen={()=> setOpen(true)}
        //open={open}
        direction = "down"
        className="speedDial"
        // icon={
        //     <img className="speedDialIcon"
        //     src = {user.avatar.url ? user.avatar.url : "/Profile.png"}
        //     alt = "Profile"
        //     />
        // }
        >
            <SpeedDialAction  icon={<DashboardRoundedIcon/>} tootipOpen = {window.innerWidth <= 600 ? true : false}/>
        </SpeedDial>     */}
    </Fragment>
  )
}

export default UserOptions

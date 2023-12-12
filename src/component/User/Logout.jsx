import React from 'react';
const Logout = ()=>{
    return (
        <>

        </>
    )
}

export default Logout;

// import React, { Fragment,useEffect } from 'react';
// import {Navigate} from 'react-router-dom';
// import {useAlert} from 'react-alert';
// import { useDispatch, useSelector } from 'react-redux';
// import {logout,clearErrors} from '../../actions/UserActions';
// import LogoutIcon from '@mui/icons-material/Logout'; 

// const Logout = () => {
//     const alert = useAlert();
//     const dispatch = useDispatch();
//     const {isAuthenticated, error, loading} = useSelector((state)=> state.login);
//     const logoutHandler = (e)=>{
//         e.preventDefault();
//         dispatch(logout());
//     };
//     useEffect(()=>{
//         if(error){
//             alert.error(error);
//             dispatch(clearErrors());
//         }
       
//     },[dispatch,error,alert,loading]);
    
//   return (
//     <>
//     { isAuthenticated ?
//     (<LogoutIcon onClick={(e)=>logoutHandler(e)}/>) : (<Navigate to={"/login"}/>)
// }
//     </>
//   )
// }

// export default Logout



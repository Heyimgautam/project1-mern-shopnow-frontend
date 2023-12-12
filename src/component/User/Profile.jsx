import React, { Fragment } from 'react';
import Metadata from '../layout/Metadata';
import Loader from '../layout/loader/loader';
import {useSelector} from 'react-redux';
import {Link,Navigate} from 'react-router-dom';
import "./UserProfile.css";
const Profile = () => {
    const {user, loading, isAuthenticated} = useSelector((state)=> state.login);
    // if(isAuthenticated === false){
    //   return <Navigate to = {'/login'}/>
    // }
  return (
    <Fragment>
     <Metadata title = "User Profile -- Shop Now"/>
      <div className='profileContainer'>
        <div >
            <h1>My Account Details</h1>
            <img src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt={user.name} />
            <Link to = '/me/update'> Edit Details</Link>
        </div>
        <div>
            <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
            </div>
            <div>
                <h4></h4>
            </div>
            <div>
                <h4>Email</h4>
                <p>{user.email}</p>
            </div>
            <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0,10)}</p>
            </div>
            <div>
                <Link to = "/orders">My Orders</Link>
                <Link to = "/password/update">Update Password</Link>
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile

import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Metadata from '../layout/Metadata';
import Loader from '../layout/loader/loader';
import Sidebar from './Sidebar';
import { Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { updateUser, getUserDetails,clearErrors } from '../../actions/UserActions';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constant/constant';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {id} = useParams();

    const {error, user, loading} = useSelector((state)=> state.userDetail);
    const {isUpdated, error : updateError, loading : updateLoading} = useSelector((state)=> state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (user && user._id !== id) {
          dispatch(getUserDetails(id));
        } else {
          setName(user.name);
          setEmail(user.email);
          setRole(user.role);
        }
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (updateError) {
          alert.error(updateError);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("User Updated Successfully");
          navigate("/admin/users");
          dispatch({ type: UPDATE_USER_RESET });
        }
      }, [dispatch, alert, error, navigate, isUpdated, updateError, user, id]);

      const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
    
        dispatch(updateUser(id, myForm));
      };

    

  return (
   <Fragment>
    <Metadata title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
   </Fragment>
  )
}

export default UpdateUser

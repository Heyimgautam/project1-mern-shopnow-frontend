import React,{Fragment,useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Metadata from '../layout/Metadata';
import Loader from "../layout/loader/loader";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { UPDATE_PASSWORD_RESET } from '../../constant/constant';
import toast from "react-hot-toast";
import { updatePassword, clearErrors } from '../../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import './UpdatePassword.css';
const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isUpdated, error, loading} = useSelector((state)=> state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const updatePasswordSubmit = (e)=> {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(updatePassword(myForm));
    };

    useEffect(()=>{
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
          }
      
          if (isUpdated) {
            toast.success("Password Updated Successfully");
              navigate("/account");
            dispatch({
              type: UPDATE_PASSWORD_RESET,
            });
          }
    },[dispatch, isUpdated,navigate, error]);

  return (
    <Fragment>
        {loading ? (<Loader/>) : (<Fragment>
          <Metadata title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>)}
    </Fragment>
  )
}

export default UpdatePassword

import React,{Fragment,useEffect,useState} from 'react';
import {Navigate} from 'react-router-dom';
import Metadata from '../layout/Metadata';
import Loader from "../layout/loader/loader";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { UPDATE_PASSWORD_RESET } from '../../constant/constant';
import { useAlert } from 'react-alert';
import { updatePassword, clearErrors } from '../../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import './UpdatePassword.css';
const UpdatePassword = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
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
            alert.error(error);
            dispatch(clearErrors());
          }
      
          if (isUpdated) {
            alert.success("Password Updated Successfully");
      
            dispatch({
              type: UPDATE_PASSWORD_RESET,
            });
          }
    },[dispatch, isUpdated, error, alert]);

    if(isUpdated){
        return <Navigate to = {"/account"} />
    }
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

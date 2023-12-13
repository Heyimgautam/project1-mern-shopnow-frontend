import React,{Fragment,useState,useEffect} from 'react';
import Metadata from '../layout/Metadata';
import Loader from '../layout/loader/loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import {resetPassword, clearErrors} from '../../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';
const ResetPassword = () => {
    const token = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, loading, success} = useSelector((state)=> state.password);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetPasswordSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          toast.success("Password Updated Successfully");
             navigate("/login");
        }
      }, [dispatch, error, navigate,success]);

   
  return (
    <Fragment>
        {loading ? (<Loader/>) : (<Fragment>
          <Metadata title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>)}
    </Fragment>
  )
}

export default ResetPassword

import React,{Fragment,useState,useEffect} from 'react';
import Metadata from '../layout/Metadata';
import Loader from "../layout/loader/loader";
import {MailOutlined} from '@mui/icons-material';
import { forgotPassword, clearErrors } from '../../actions/UserActions';
import { useDispatch, useSelector} from 'react-redux';
import toast from "react-hot-toast";
import './ForgotPassword.css';
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const {loading , message , error} = useSelector((state) => state.password);

    const [email, setEmail] = useState('');

    const forgotPasswordSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(()=>{
       if(error){
        toast.error(error);
        dispatch(clearErrors());
       }
       if(message){
        toast.success(message);
       }
    },[dispatch,message, error]);
  return (
    <Fragment>
        {loading ? (<Loader/>) : (<Fragment>
    <Metadata title="Forgot Password" />
    <div className="forgotPasswordContainer">
      <div className="forgotPasswordBox">
        <h2 className="forgotPasswordHeading">Forgot Password</h2>

        <form
          className="forgotPasswordForm"
          onSubmit={forgotPasswordSubmit}
        >
          <div className="forgotPasswordEmail">
            <MailOutlined />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Send"
            className="forgotPasswordBtn"
          />
        </form>
      </div>
    </div>
  </Fragment>)}
    </Fragment>
  )
}

export default ForgotPassword

import React,{Fragment,useState,useEffect} from 'react';
import {Link, useNavigate,useLocation} from 'react-router-dom';
import toast from "react-hot-toast";
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../layout/loader/loader';
import Metadata from '../layout/Metadata';
import {loginUser,clearErrors} from '../../actions/UserActions';
import {MailOutlined,LockOpen} from '@mui/icons-material';
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const {isAuthenticated, error, loading} = useSelector((state)=> state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const loginHandler = (e)=>{
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    } 
    if(isAuthenticated){
       navigate(redirect);
    } 
    
  },[dispatch,error,loading,navigate,isAuthenticated,redirect])
  
  
  
 
  return (
    <Fragment>
      {loading ? (<Loader/>) : (<Fragment>
        <Metadata title = "Login -- ShopNow"/>
      <div className = "login">
        <section>
          <form className = "login-box" onSubmit={loginHandler}>
         <h2>Login</h2>
            <div className='login-email'>
              <MailOutlined/>
            <input type="email" placeholder='Email' required value={email} onChange = {(e)=> setEmail(e.target.value)} />
            </div>
            <div className='login-password'>
              <LockOpen/>
            <input type="password" placeholder='Password' required value={password} onChange = {(e)=> setPassword(e.target.value)} />
            </div>
            
            <input disabled = {loading} type="submit" className='login-btn' value = "login"/>
            <Link id = "register"to = {'/user/new'}>Register</Link>
            <p>Or</p>
            <Link to = {"/password/forgot"} > Forgot Password?</Link>
          </form>
        </section>
      </div>
    </Fragment>)}
    </Fragment>
  )
}

export default Login

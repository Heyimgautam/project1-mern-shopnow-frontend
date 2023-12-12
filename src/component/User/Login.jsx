// import React,{Fragment,useState,useRef,useEffect} from 'react';
// import Loader from '../layout/loader/loader';
// import Metadata from '../layout/Metadata';
// import {Link,Navigate} from "react-router-dom";
// import {useAlert} from 'react-alert';
// import { MailOutlined, LockOpen } from '@mui/icons-material';
// import PersonIcon from '@mui/icons-material/Person';
// import {loginUser,registerUser, clearErrors} from '../../actions/UserActions';
// import {useDispatch, useSelector} from 'react-redux';
// import "./LoginAndSignUp.css";

// const LoginAndSignUp = () => {
//   const loginTab = useRef(null);
//   const registerTab = useRef(null);
//   const switcherTab  = useRef(null);

//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const [loading, isAuthenticated, error] = useSelector(state => state.login);
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [user, setUser] = useState({
//     name : "",
//     email : "",
//     password : "",
//   });

//   const {name, email, password} = user;
//   const [avatar, setAvatar] = useState('/Profile.png');
//   const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

//   const loginHandler = (e)=>{
//     e.preventDefault();
//     // dispatch(loginUser(loginEmail,loginPassword));
//   }

//   const registerHandler = (e)=>{
//     e.preventDefault();

//   //  const  myForm = new FormData();
   
//   //  myForm.set("name", name);
//   //  myForm.set("email" , email);
//   //  myForm.set('password', password);
//   //  myForm.set("avatar", avatar);
//   //  dispatch(registerUser(myForm));
//    };
//   const registerDataChange = (e)=>{
//     // if(e.target.name === "avatar"){
//     //   const reader = new FileReader();

//     //   reader.onload = () => {
//     //     if(reader.readyState === 2){
//     //       setAvatarPreview(reader.result);
//     //       setAvatar(reader.result);
//     //     }
//     //   };
//     //   reader.readAsDataURL(e.target.files[0]);
//     // }else{
//     //   setUser({...user, [e.target.name] : e.target.value});
//     // }
//   };

//   // useEffect(()=>{
//   //    if(error){
//   //     alert.error(error);
//   //     // dispatch(clearErrors());
//   //    }
     
//   // },[dispatch, error, alert,isAuthenticated])
//   const switchTabs = (e, tab) => {
//     if (tab === "login") {
//       switcherTab.current.classList.add("shiftToNeutral");
//       switcherTab.current.classList.remove("shiftToRight");

//       registerTab.current.classList.remove("shiftToNeutralForm");
//       loginTab.current.classList.remove("shiftToLeft");
//     }
//     if (tab === "register") {
//       switcherTab.current.classList.add("shiftToRight");
//       switcherTab.current.classList.remove("shiftToNeutral");

//       registerTab.current.classList.add("shiftToNeutralForm");
//       loginTab.current.classList.add("shiftToLeft");
//     }
//   };
//   if(isAuthenticated){
//     return <Navigate to="/"/>;
//    }
//   return (
//    <Fragment>
//     {loading ? (<Loader/>): (<Fragment>
//       <Metadata title = "Login -- Shop Now"/>
//     <div className = "LoginSignUpContainer">
//      <div className = "LoginSignUpBox">
//       <div>
//         <div className='login_signUp-toggle'>
//           <p onClick={(e)=> switchTabs(e, "login")}>LOGIN</p>
//           <p onClick = {(e)=> switchTabs(e, "register")}>REGISTER</p>
//         </div>
//         <button ref={switcherTab}></button>
//       </div>
//       <form className = "loginForm" ref = {loginTab} onSubmit={loginHandler}>
//         <div className = "loginEmail">
//           <MailOutlined/>
//           <input type="email" placeholder="Email" required value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)}/>
//         </div>
//         <div className='loginPassword'>
//           <LockOpen/>
//           <input type="password"  placeholder = "Password" required value={loginPassword} onClick = {(e)=> setLoginPassword(e.target.value)}/>
//         </div>
//         <Link to="/password/forget">Forget Password</Link>
//         <input type="submit" value = "Login" className= "loginBtn"/>
//       </form>
//       <form className = "signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit = {registerHandler}>
//        <div className="signUpName">
//         <PersonIcon/>
//         <input type="text" placeholder="Name" required name = "name" value = {name} onChange = {registerDataChange}/>
//        </div>
//        <div className = "signUpEmail">
//         <MailOutlined/>
//         <input type="email" placeholder="Email" requrired value={email} onChange={registerDataChange}/>
//        </div>
//        <div className = "signUpPassword">
//         <LockOpen/>
//         <input type="password" placeholder = "Password" required value={password} onChange={registerDataChange}/>
//        </div>
//        <div id="registerImage">
//         <img src={avatarPreview} alt="UserImage" />
//         <input type="file" name="avatar" accept="image/*" onChange={registerDataChange}/>
//        </div>
//        <input type="submit" value="Register" className="signUpBtn"/>
//       </form>
//      </div>
//     </div>
//    </Fragment>)}
//    </Fragment>
//   )
// }

// export default LoginAndSignUp;

import React,{Fragment,useState,useEffect} from 'react';
import {Link, useNavigate,useLocation} from 'react-router-dom';
import {useAlert} from 'react-alert';
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../layout/loader/loader';
import Metadata from '../layout/Metadata';
import {loginUser,clearErrors} from '../../actions/UserActions';
import {MailOutlined,LockOpen} from '@mui/icons-material';
import "./Login.css";

const Login = () => {
  const alert = useAlert();
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
      alert.error(error);
      dispatch(clearErrors());
    } 
    if(isAuthenticated){
       navigate(redirect);
    } 
    
  },[dispatch,error,loading,alert,navigate,isAuthenticated,redirect])
  
  
  
 
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

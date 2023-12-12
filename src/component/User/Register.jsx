import React, { Fragment,useEffect,useState} from 'react';
import Metadata from '../layout/Metadata';
import Loader from '../layout/loader/loader';
import {Navigate} from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person";
import {MailOutlined,LockOpen} from '@mui/icons-material';
import {registerUser, clearErrors} from '../../actions/UserActions';
import {useDispatch, useSelector} from "react-redux";
import './register.css';


const Register = () => {
    const dispatch = useDispatch();
    const {loading, error, isAuthenticated} = useSelector((state)=> state.login);

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [avatar, setAvatar] = useState('/Profile.png');

    // const registerHandler = (e)=>{
    //     e.preventDefault();
    //     const myForm = new FormData();

    // myForm.append("name", name);
    // myForm.append("email", email);
    // myForm.append("password", password);
    // myForm.append("avatar", avatar);
    // dispatch(registerUser(myForm));
    // }
    const [user,setUser] = useState({
        name : "",
        email : "",
        password : "",
    });

    const {name , email, password} = user;

    const [avatar, setAvatar] = useState('/Profile.png');
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

    const registerHandler = (e) =>{
        e.preventDefault();
        
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(registerUser(myForm));
    };
    const registerDataChange = (e)=>{
        if(e.target.name === "avatar"){
            const reader = new FileReader();

            reader.onload = ()  => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else{
            setUser({...user, [e.target.name] : e.target.value});
        }  
   };

    useEffect(()=>{
        if(error){
            dispatch(clearErrors());
        }

    },[dispatch,error,loading]);

    if(isAuthenticated){
        return <Navigate to = {"/"} />
    }
  return (
    <Fragment> 
   {loading ? (<Loader/>) : (<Fragment>
    <Metadata title = "register -- Shop Now"/>
    <div className='register'>
        <section>
        <form onSubmit={registerHandler} className="register-box">
            <h2>Register</h2>
            <div className = "name">
              <PersonIcon/>
              <input type="text" placeholder='Name' required name = "name" value={name} onChange={registerDataChange}/>
            </div>
            <div className='Email'>
                <MailOutlined/>
                <input type="email" placeholder='Email' required name = "email" value={email} onChange={registerDataChange}/>
            </div>
            <div className='Password'>
              <LockOpen/>
              <input type="password" placeholder='Password' required name = "password" value={password} onChange={registerDataChange}/>
            </div>
            <div id = "register-image">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name = "avatar" accept = "image/*" onChange={registerDataChange}/>

            </div>

                <input disabled = {loading} type="submit" className='register-btn' value="register"/>

        </form>
        </section>
    </div>
   </Fragment>)}
   </Fragment>
  )
}

export default Register

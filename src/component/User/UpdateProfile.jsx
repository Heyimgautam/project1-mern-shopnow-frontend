import React,{Fragment,useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Loader from '../layout/loader/loader';
import Metadata from '../layout/Metadata';
import { UPDATE_PROFILE_RESET } from '../../constant/constant';
import toast from "react-hot-toast";
import PersonIcon from "@mui/icons-material/Person";
import {MailOutlined} from '@mui/icons-material';
import {updateProfile, loadUser, clearErrors} from '../../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import "./UpdateProfile.css";
const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.login);
    const {isUpdated, loading , error} = useSelector((state)=> state.profile);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
      };

      const updateProfileDataChange = (e) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
      };

      useEffect(() => {
        if (user) {
          setName(user.name);
          setEmail(user.email);
          setAvatarPreview(user.avatar.url);
        }
    
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          toast.success("Profile Updated Successfully");
          dispatch(loadUser());
          navigate("/");
          dispatch({
            type: UPDATE_PROFILE_RESET,
          });
        }
      }, [dispatch, error, navigate, user,isUpdated]);

  return (
    <Fragment>
        {loading ? (<Loader/>) : (<Fragment>
          <Metadata title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                // encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlined/>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>)}
    </Fragment>
  )
}

export default UpdateProfile

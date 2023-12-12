import React,{Fragment} from 'react'
import { Rating } from "@mui/material";
import Profile from '../../Images/Profile.png';
const ReviewsCard = ({review}) => {
    const options = {
        value : review.rating,
        readOnly : true,
        ishalf : true,
    }
  return (
    <Fragment>
     <div className = "reviewCard">
        <img src={Profile} alt="User" />
        <p>{review.name}</p>
        <Rating {...options}/>
        <span className = "reviewCardComment">{review.comment}</span>
     </div>
    </Fragment>
  )
}

export default ReviewsCard

import React from 'react';
import {Button} from '@mui/material';
import Metadata from '../Metadata';
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contactContainer">
      <Metadata title = "Contact Page"/>
    <a className="mailBtn" href="mailto:gautamkumarjha1234@gmail.com">
      <Button>Contact: gautamkumarjha1234@gmail.com</Button>
    </a>
  </div>
  )
}

export default Contact

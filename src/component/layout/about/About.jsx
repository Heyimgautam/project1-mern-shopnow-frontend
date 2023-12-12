import React from 'react'
import Metadata from '../Metadata';
import { Button, Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./About.css";
const About = () => {

    const visitInstagram = () => {
        window.location = "https://www.instagram.com/heyimgautam_06/";
      };
  return (
    <div className="aboutSection">
        <Metadata title = "About Page"/>
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dbeqhzmvb/image/upload/v1702205096/mydp.jpg"
              alt="Founder"
            />
            <Typography>Gautam kumar Jha</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @heyimgautam_06. Only with the
              purpose to learn MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.linkedin.com/in/gautam-kumar-jha-658206204/"
              target="blank"
            >
              <LinkedInIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/heyimgautam_06/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

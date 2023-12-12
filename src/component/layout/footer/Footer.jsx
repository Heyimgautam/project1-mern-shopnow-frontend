import React from 'react'
import appStore from '../../../Images/Appstore.png'
import playStore from '../../../Images/playstore.png'
import './Footer.css'
const Footer = () => {
  return (
    <footer id= "footer">
    <div className = "leftFooter">
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App for Android and IOS devices</p>
      <img src={appStore} alt="APP STORE" />
      <img src={playStore} alt="PLAY STORE" />
    </div>

    <div className = "midFooter">
     <h1>SHOPNOW.</h1>
     <p>Believe in quality not quantity.</p>
     <p>Copyrights 2023 &copy; HeyImGautam</p>
    </div>

    <div className = "rightFooter">
      <h4>Follow Us</h4>
      <a href="https://www.instagram.com/heyimgautam_06/">Instagram</a>
      <a href="https://www.instagram.com/heyimgautam_06/">Facebook</a>
      <a href="https://www.linkedin.com/in/gautam-kumar-jha-658206204/">LinkedIn</a>
    </div>
    </footer>
  )
}

export default Footer

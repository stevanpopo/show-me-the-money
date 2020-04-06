import React from "react"
import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="about smaller">
        <p><span className="logo">Show me the money</span> is a side-project by <a href="https://www.stevanpopovic.com" title="Stevan Popovic's personal website">Stevan Popovic'</a>. I spent 5 years learning about the stock market, becoming an investor myself. I realised that many of my friends did not understand the power of investing and compound growth. I created this simple tool as a way to visually show people how simple passive investing can dramatically change their wealth over time.<a className="twitter" href="https://twitter.com/StevanPopo"><FaTwitter /></a><a className="github"  href="https://github.com/stevanpopo"><FaGithub /></a><a  className="linkedin"  href="https://www.linkedin.com/in/stevanpopovic/"><FaLinkedinIn /></a></p>
      </div>

      <div className="copyright">
        <p>Copyright, {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

export default Footer

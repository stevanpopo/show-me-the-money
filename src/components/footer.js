import React from "react"

const Footer = () => (
  <footer>
    <div className="container">
      <div className="about smaller">
        <p><span className="logo">Show me the money</span> is a side-project by <a href="https://twitter.com/StevanPopo" title="Stevan Popovic's twitter handle">@stevanpopo</a>. I spent 5 years learning about the stock market, becoming a regular investor myself. I realised that many of my friends did not understand the power of investing and compound growth. I created this simple tool as a way to visually show people how simple passive investing can dramatically change their wealth over time.</p>
      </div>

      <div className="copyright">
        <p>Copyright {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

export default Footer

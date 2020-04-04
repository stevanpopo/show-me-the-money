import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FaTwitterSquare } from 'react-icons/fa';

const Header = ({ siteTitle }) => (
	<header>
		<div className="container">
			<div className="logo">
				<Link to="/" title={siteTitle}>
					<h1>
						<span role="img" aria-label="moneybag">💰</span>
						show me the money
					</h1>
				</Link>
			</div>

			<a className="twitter-share" href="https://twitter.com/intent/tweet?text=I%20just%20learned%20how%20powerful%20investing%20is!%20&hashtags=showmethemoney">
				<FaTwitterSquare />
			</a>
		</div>
	</header>
)

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logo from "../../static/images/logo.svg"
import { FaTwitterSquare } from 'react-icons/fa';

const Header = ({ siteTitle }) => (
	<header>
		<div className="container">
			<div className="logo">
				<Link to="/" title={siteTitle}>
					<img alt="Logo" src={logo}/>
				</Link>
			</div>

			<a href="https://app.histaff.io">
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

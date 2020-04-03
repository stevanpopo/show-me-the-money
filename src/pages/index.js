import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import featureImage from "../../static/images/hero.png";

const IndexPage = () => (
	<Layout>
		<SEO title="Make your Staff and Workspace Happy" />

		<div className="home container">
			<div>
				<h1>Make your Staff and Workspace Happy</h1>
				<p>HiStaff gives your complex the opportunity to increase the percentage of happiness and enjoyment of your staff and as a result, bring productivity to your workspace.</p>
			</div>
			<div>
				<iframe height="315" src="https://www.youtube.com/embed/FCgy0dphOGc?modestbranding=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
		</div>


	</Layout>
)

export default IndexPage

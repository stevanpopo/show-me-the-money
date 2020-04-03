import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import featureImage from "../../static/images/hero.png";

const IndexPage = () => (
	<Layout>
		<SEO title="Make your Staff and Workspace Happy" />

		<div className={"page-header home"}>
			<h1>Make your Staff and Workspace Happy</h1>
			<p>HiStaff gives your complex the opportunity to increase the percentage of happiness<br />and enjoyment of your staff and as a result, bring productivity to your workspace.</p>
			{/* <img alt={"Dashboard"} src={featureImage}/> */}
		</div>

		<div className={"container"}>
			{/* stuff */}
		</div>
		
	</Layout>
)

export default IndexPage

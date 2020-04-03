import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import featureImage from "../../static/images/hero.png";
import { Line, Bar } from 'react-chartjs-2';

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			earnings: 0,
			spending: 0,
			age: '',
			data: {
				labels: ["Jan", "Feb", "March", "April", "May"],
				datasets: [
						{
							label: "Rev",
							data: [2, 3, 4.5, 6, 10],
						}
				]
			}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const field = e.target.name;
		this.setState({ [field]: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("Submit!");

		const difference = this.state.earnings - this.state.spending;
		this.produceData(1000, 30)
	}

	produceData(difference, years){
		console.log("produceData");
		
		const dates = this.getDates(years)
		
	}

	getDates(years){
		console.log("getDates");
		const today = new Date().getFullYear()
		const retirement = today + years
		console.log("Dates: ", today, retirement);

		// var d = new Date( "01 " + "July 2013");
    // first = d.getFullYear();
    // var s = new Date( "01 " + "May 2018");
    // second = s.getFullYear();
    const dates = Array();

		for(let i = today; i <= retirement; i++) arr.push(i.toString());
		 
		console.log("YEARS ", dates);
		return dates;
	}

	render() {
		console.log(this.state);

		return (
			<Layout>
				<SEO title="Make your Staff and Workspace Happy" />

				<div className="home container">
					<div>
						<h1>Show Me The Money</h1>
						<p>This is why you should invest. This is why you should invest. This is why you should invest. This is why you should invest. </p>
					</div>
					<div>
						<iframe height="315" src="https://www.youtube.com/embed/FCgy0dphOGc?modestbranding=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
					</div>
				</div>

				<div className="questions container">
					<form onSubmit={this.handleSubmit}>
						<div>
							<label>
								How much do you earn per month?
							<input type="text" name="earnings" placeholder="2,000" onChange={this.handleChange} />
							</label>
							<label>
								How much do you spend per month?
							<input type="text" name="spending" placeholder="1,200" value={this.state.spending} onChange={this.handleChange} />
							</label>
							<label>
								How old are you?
							<input type="text" name="age" placeholder="22"  value={this.state.age} onChange={this.handleChange} />
							</label>
						</div>
						<button>Show me the money!</button>
					</form>
				</div>

				<div className="results container">
					<div>
						<p>You earn £{this.state.earnings} a month and spend £{this.state.spending} a month. Great, you're living within your means!</p>
						<p>That gives you £{this.state.earnings - this.state.spending} to save and invest. By investing X of your surplus income in the S&P 500, you can earn 8% a year.</p>
					</div>
					<div>
						<Bar
							data={this.state.data}
							// width={100}
							// height={50}
							// options={{ maintainAspectRatio: false }}
						/>
					</div>
				</div>				
			</Layout>
		);
		}
	}

	export default IndexPage

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
			labels: ["2020", "2021", "2022", "2023", "2024"],
			dataset: [2, 3, 4.5, 6, 10]
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

		const difference = this.state.earnings - this.state.spending;
		const yearsToInvest = 70 - this.state.age;
		this.produceData(difference, yearsToInvest)
	}

	produceData(difference, numberOfYears){
		const years = this.getDates(numberOfYears)
		const data = this.createData(difference, years.length)

		this.setState({ labels: years, dataset: data})
	}

	createData(difference, years) {
		const data = []

		for(let i = 1; i <= years; i++) {
			difference = difference * 1.08;
			data.push(difference);
		}

		return data;
	}

	getDates(years){
		const today = new Date().getFullYear()
		const retirement = today + years
    const dates = [];

		for(let i = today; i <= retirement; i++) dates.push(i.toString());
		 
		return dates;
	}

	render() {
		console.log("STATE", this.state);
		const {labels, dataset} = this.state;

		const chartData = {
			labels: labels,
			datasets: [{
				label: "Wealth",
				data: dataset
			}]
		}

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
							<input type="text" name="earnings" placeholder="e.g. 2,000" onChange={this.handleChange} />
							</label>
							<label>
								How much do you spend per month?
							<input type="text" name="spending" placeholder="e.g. 1,200" onChange={this.handleChange} />
							</label>
							<label>
								How old are you?
							<input type="text" name="age" placeholder="e.g. 22" onChange={this.handleChange} />
							</label>
							Please note we do not save any of your personal information.
						</div>
						<div>
							<button>Show me the money!</button>
						</div>
					</form>
				</div>

				<div className="results container">
					<div className="chart">
						<Bar
							data={chartData}
							// width={100}
							// height={50}
							// options={{ maintainAspectRatio: false }}
						/>
					</div>
					<div>
						<div>
							<p>You earn £{this.state.earnings} a month and spend £{this.state.spending} a month. Great, you're living within your means!</p>
							<p>That gives you £{this.state.earnings - this.state.spending} to save and invest. By investing X of your surplus income in the S&P 500, you can earn 8% a year.</p>
						</div>
						<div>
							Levers
						</div>
					</div>
				</div>				
			</Layout>
		);
		}
	}

	export default IndexPage

import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import featureImage from "../../static/images/hero.png";
import { Line, Bar } from 'react-chartjs-2';

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			earnings: 1000,
			spending: 1000,
			age: 21,
			labels: ["2020", "2021", "2022", "2023", "2024"],
			dataset: [2, 3, 4.5, 6, 10],
			investingRate: 10
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const field = e.target.name;
		// const value = this.formatCurrency(e.target.value)
		this.setState({ [field]: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();

		const difference = this.state.earnings - this.state.spending;
		const yearsToInvest = 70 - this.state.age;
		const {years, data} = this.produceData(difference, yearsToInvest)

		this.setState({ labels: years, dataset: data, show: true})
	}

	produceData(difference, numberOfYears){
		const years = this.getDates(numberOfYears)
		const data = this.createData(difference, years.length)
		
		return {years, data}
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

	// formatCurrency(number){
	// 	console.log("NUMBER: ", number, typeof number);
	// 	return parseInt(number).toFixed(2)
	// }


	render() {
		console.log("STATE", this.state);
		const {labels, dataset, show, earnings, spending, age, investingRate} = this.state;
		let message = ""

		const chartData = {
			labels: labels,
			datasets: [{
				label: "Wealth",
				data: dataset
			}]
		}

		const formatter = new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency: 'GBP',
			minimumFractionDigits: 2
		})

		if (earnings > spending) {
			message = <div>
				<p>You earn {formatter.format(earnings)} a month and spend {formatter.format(spending)} a month. Great, you're living within your means. This is an important part of growing your wealth.</p>
				<p>That gives you {formatter.format(earnings - spending)} to save and invest on a monthly basis. We'll call this your surplus income.</p>
				<p>By investing {investingRate}% of your surplus income, you'll have {formatter.format(((earnings - spending) * investingRate)/100)} to invest on a monthly basis. It may not seem a lot to start, but bit by bit that {formatter.format(((earnings - spending) * investingRate)/100)} will grow, as shown in the graph above.</p>
			</div>
		} else {
			message = <div>
				<p>You earn {formatter.format(earnings)} a month and spend {formatter.format(spending)} a month. This means you won't have regular savings from which to invest. You might want to consider how you can boost your earnings or reduce your monthly spending.</p>
			</div>
		}

		return (
			<Layout>
				<SEO title="Investing grows your wealth" />

				<div className="home container">
					<div>
						<h2>Investing builds wealth</h2>
						<p>That is why <a href="https://data.worldbank.org/indicator/CM.MKT.LCAP.CD?most_recent_value_desc=true">$80 trillion</a> globally is held in the stock market. On average, the major stock markets grow by 8% per year.</p>
						<p>If you invest in the stock market, your money grows too. Over a long time, it grows a lot.</p>
						<p>Let's see how.</p>
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
								<div><span className="currency">£</span><input type="text" name="earnings" value={this.state.earnings} onChange={this.handleChange} /></div>
							</label>
							<label>
								How much do you spend per month?
								<div><span className="currency">£</span><input type="text" name="spending" value={this.state.spending} onChange={this.handleChange} /></div>
							</label>
							<label>
								How old are you?
								<input type="text" name="age" value={this.state.age} onChange={this.handleChange} />
							</label>
							Please note, we do not save any of your personal information.
						</div>
						<div>
							<button>Show me the money!</button>
						</div>
					</form>
				</div>

				{show && <div className="results container">
					<div className="chart">
						<Bar
							data={chartData}
							// width={100}
							// height={50}
							// options={{ maintainAspectRatio: false }}
						/>
					</div>
					<div>
						{message}
						<div>
							Levers
						</div>
					</div>
				</div>}				
			</Layout>
		);
		}
	}

	export default IndexPage

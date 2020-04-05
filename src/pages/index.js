import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Bar, defaults } from 'react-chartjs-2';

defaults.global.defaultFontFamily = "'Lato', sans-serif"
defaults.global.defaultColor = '#e65d07';
defaults.global.defaultFontColor = '#e65d07';

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
			investingRate: 20,
			newInvestingRate: 20
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

		const investingRate = this.state.newInvestingRate;
		const monthlyContribution = (this.state.earnings - this.state.spending) * (investingRate/100);
		const yearsToInvest = 70 - this.state.age;
		const {years, data} = this.produceData(monthlyContribution, yearsToInvest)

		this.setState({ labels: years, dataset: data, show: true, investingRate})
	}

	produceData(monthlyContribution, numberOfYears){
		const years = this.getDates(numberOfYears)
		const data = this.createData(monthlyContribution, years.length)
		
		return {years, data}
	}

	createData(monthlyContribution, years) {
		// NOTE: compounding frequency is monthly, is this correct?
		const monthlyInvestmentValues = [];
		const yearlyInvestmentValues = []
		const annualRate = 8/100;
		const monthlyRate = annualRate/12;
		const months = years * 12;
		let investmentValue = 0;

		for(let i = 1; i <= months; i++) {
			// console.log("Value: ", investmentValue, "Contribution: ", monthlyContribution);
			investmentValue = (investmentValue + monthlyContribution) * (1 + monthlyRate);
			monthlyInvestmentValues.push(investmentValue);
			if (i % 12 === 0) yearlyInvestmentValues.push(investmentValue)
		}

		// console.log("YEARLY: ", yearlyInvestmentValues);
		return yearlyInvestmentValues;
	}

	getDates(years){
		// const today = new Date().getFullYear()
		// const retirement = today + years

		const age = parseInt(this.state.age);
		const retirement = age + years
    const dates = [];

		// for(let i = today; i <= retirement; i++) dates.push(i.toString());
		for(let i = age; i <= retirement; i++) dates.push(i);
		 
		return dates;
	}

	// formatCurrency(number){
	// 	console.log("NUMBER: ", number, typeof number);
	// 	return parseInt(number).toFixed(2)
	// }


	render() {
		console.log("STATE", this.state);
		const {labels, dataset, show, earnings, spending, investingRate, newInvestingRate} = this.state;
		// console.log("CLOSING", dataset[dataset.length - 1]);
		let message = ""
		const options = {
			tooltips: {
				callbacks: {
					title: function(tooltipItem, data) {
						return `Age: ${tooltipItem[0].label}`
					},
					label: (tooltipItem, data) => {
						return formatter.format(tooltipItem.value)
					}
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						callback: function(value) {
							return formatter.format(value)
						}
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Age'
					}
				}]
			}
		}

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
				<h3>How You Could Invest</h3>
				<p>You earn {formatter.format(earnings)} a month and spend {formatter.format(spending)} a month. Great, you're living within your means. This is an important part of growing your wealth.</p>
				<p>That gives you {formatter.format(earnings - spending)} to save and invest on a monthly basis. We'll call this your surplus income.</p>
				<p>By investing <span className="highlight">{investingRate}%</span> of your surplus income, you'll have <span className="highlight">{formatter.format(((earnings - spending) * investingRate)/100)}</span> to invest on a monthly basis. It may not seem like a lot to start, but bit by bit that <span className="highlight">{formatter.format(((earnings - spending) * investingRate)/100)}</span> will grow, as shown in the graph above. And by the time you retire, that investment will be worth <span className="highlight">{formatter.format(dataset[dataset.length - 1])}</span>.</p>
			</div>
		} else {
			message = <div>
				<h3>Hold Your Horses</h3>
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
						<iframe title="show me the money scene in Jerry Maguire" height="315" src="https://www.youtube.com/embed/FCgy0dphOGc?modestbranding=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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

							<p className="smaller">Please note, we do not save any of your personal information.</p>
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
							// maintainAspectRatio: false
							options={options}
						/>
					</div>
					<div>
						{message}
						<div className="slidecontainer">
							<h3>Change Your Investing</h3>
							<p>Edit your investing style below and press the button to recalculate your outcomes.</p>
							<label htmlFor="newInvestingRate">Investing Rate - {newInvestingRate}% <span className="smaller">(previously: {investingRate}%)</span></label>
							<input name="newInvestingRate" type="range" min="1" max="50" value={newInvestingRate} onChange={this.handleChange} className="slider" id="myRange" />
							{/* TODO: salary increase */}

							<div className="button-container">
								<button onClick={this.handleSubmit}>Show me the money!</button>
							</div>
						</div>
					</div>
				</div>}				
			</Layout>
		);
		}
	}

	export default IndexPage

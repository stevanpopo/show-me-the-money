import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Bar, defaults } from 'react-chartjs-2';

defaults.global.defaultFontFamily = "'Lato', sans-serif"
// defaults.global.defaultFontColor = 'backgroundColor: "rgba(7,144,230,0.4)"';

class IndexPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			scroll: false,
			compare: false,
			earnings: 1000,
			spending: 1000,
			age: 21,
			labels: ["2020", "2021", "2022", "2023", "2024"],
			dataset: [2, 3, 4.5, 6, 10],
			investingRate: 20,
			newInvestingRate: 20,
			compareInvestingRate: 0,
			newCompareInvestingRate: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showCompare = this.showCompare.bind(this);
		this.scrollRef = React.createRef()  
	}

	showCompare(){
		this.setState({compare: true})
	}

	handleChange(e) {
		const field = e.target.name;
		this.setState({[field]: e.target.value})
	}

	handleSubmit(e) {
		e.preventDefault();

		// first chart
		const investingRate = this.state.newInvestingRate;
		const monthlyContribution = (this.state.earnings - this.state.spending) * (investingRate/100);
		const yearsToInvest = 70 - this.state.age;
		const originalChart = this.produceData(monthlyContribution, yearsToInvest)

		// second chart
		if (this.state.compareInvestingRate !== investingRate) {
			const compareInvestingRate = this.state.newCompareInvestingRate;
			const compareMonthlyContribution = (this.state.earnings - this.state.spending) * (compareInvestingRate/100);
			const compareChart = this.produceData(compareMonthlyContribution, yearsToInvest)

			this.setState({ labels: originalChart.years, dataset: originalChart.data, compareDataset: compareChart.data, investingRate, compareInvestingRate, show: true, scroll: true})
			return
		}

		this.setState({ labels: originalChart.years, dataset: originalChart.data, investingRate, show: true, scroll: true})
	}

	updateChart(){
		const investingRate = this.state.newInvestingRate;
		const monthlyContribution = (this.state.earnings - this.state.spending) * (investingRate/100);
		const yearsToInvest = 70 - this.state.age;
		const originalChart = this.produceData(monthlyContribution, yearsToInvest)

		// second chart
		if (this.state.compareInvestingRate !== investingRate) {
			const compareInvestingRate = this.state.newCompareInvestingRate;
			const compareMonthlyContribution = (this.state.earnings - this.state.spending) * (compareInvestingRate/100);
			const compareChart = this.produceData(compareMonthlyContribution, yearsToInvest)

			this.setState({ labels: originalChart.years, dataset: originalChart.data, compareDataset: compareChart.data, investingRate, compareInvestingRate})
			return
		}

		this.setState({ labels: originalChart.years, dataset: originalChart.data, investingRate})
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
			investmentValue = (investmentValue + monthlyContribution) * (1 + monthlyRate);
			monthlyInvestmentValues.push(investmentValue);
			if (i % 12 === 0) yearlyInvestmentValues.push(investmentValue)
		}

		return yearlyInvestmentValues;
	}

	getDates(years){
		const age = parseInt(this.state.age);
		const retirement = age + years
    const dates = [];

		for(let i = age; i <= retirement; i++) dates.push(i);
		 
		return dates;
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.scroll) {
			window.scrollTo(0, this.scrollRef.current.offsetTop)
			this.setState({scroll: false})
		}
		
		if (prevState.earnings !== this.state.earnings || prevState.spending !== this.state.spending || prevState.age !== this.state.age){
			this.updateChart();
		}
  }

	render() {
		// console.log("STATE: ", this.state);
		const {labels, dataset, compareDataset, show, compare, earnings, spending, investingRate, newInvestingRate, compareInvestingRate, newCompareInvestingRate} = this.state;
		const canInvest = parseInt(earnings) > parseInt(spending);
		const showChart = show && canInvest;
		let result = "";

		const chartOptions = {
			tooltips: {
				callbacks: {
					title: (tooltipItem, data) => {
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
						callback: (value) => {
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
				label: "Your Wealth",
				data: dataset,
				backgroundColor: "rgba(7,144,230,0.4)", 
			}]
		}
		
		// add second dataset to chart
		if(compare && compareDataset){
			chartData.datasets[0].label = `Investing Rate ${newInvestingRate}%`
			chartData.datasets.push({
				label: `Investing Rate ${compareInvestingRate}%`,
				data: compareDataset,
				backgroundColor: "rgba(7,230,205,0.4)"
			})
		}

		const formatter = new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency: 'GBP',
			minimumFractionDigits: 2
		})

		if (showChart) {
			let change = ""
			if (newInvestingRate > investingRate){
				change = <p>This would increase your monthly contribution from <span className="highlight">{formatter.format(((earnings - spending) * investingRate)/100)}</span> to <span className="highlight">{formatter.format(((earnings - spending) * newInvestingRate)/100)}</span>.</p>
			} else if (investingRate > newInvestingRate){
				change = <p>This would decrease your monthly contribution from <span className="highlight">{formatter.format(((earnings - spending) * investingRate)/100)}</span> to <span className="highlight">{formatter.format(((earnings - spending) * newInvestingRate)/100)}</span>.</p>
			} else {
				change = <p>You haven't changed your investing rate. Your monthly contribution will stay at <span className="highlight">{formatter.format(((earnings - spending) * investingRate)/100)}</span>.</p>
			}

			result = <section>
				<div>
					<h3>How You Could Invest</h3>
					<p>You earn {formatter.format(earnings)} a month and spend {formatter.format(spending)} a month. Great, you're living within your means. This is an important part of growing your wealth.</p>
					<p>That gives you {formatter.format(earnings - spending)} to save and invest on a monthly basis. We'll call this your surplus income.</p>
					{chartData.datasets.length > 1 && <h4>Scenario 1 - Investment Rate {investingRate}%</h4>}
					<p>By investing <span className="highlight">{investingRate}%</span> of your surplus income, you'll have <span className="highlight">{formatter.format(((earnings - spending) * investingRate)/100)}</span> to invest on a monthly basis. It may not seem like a lot to start, but bit by bit that <span className="highlight">{formatter.format(((earnings - spending) * investingRate)/100)}</span> will grow, as shown in the graph above. And by the time you retire, that investment will be worth <span className="highlight">{formatter.format(dataset[dataset.length - 1])}</span>.</p>
					{chartData.datasets.length > 1 && <h4>Scenario 2 - Investment Rate {compareInvestingRate}%</h4>}
					{chartData.datasets.length > 1 && <p>By investing <span className="highlight">{compareInvestingRate}%</span> of your surplus income, you'll have <span className="highlight">{formatter.format(((earnings - spending) * compareInvestingRate)/100)}</span> to invest on a monthly basis. That <span className="highlight">{formatter.format(((earnings - spending) * compareInvestingRate)/100)}</span> will grow, as shown in the graph above. By the time you retire, that investment will be worth <span className="highlight">{formatter.format(compareDataset[compareDataset.length - 1])}</span>.</p>}
					<p className="smaller">Investing comes with risk. 8% is the <em>average</em> return over long time periods. In the short term, your investment may decrease in value.</p>
				</div>
				<div className="slidecontainer">
					<h3>Change Your Investing</h3>
					<p>Edit your investing style below and press the button to recalculate your outcomes.  Or, <span role="button" className="highlight compare" onClick={this.showCompare} onKeyDown={this.showCompare} tabIndex={0}>compare two investments rates</span> on the same chart.</p>
					<label htmlFor="newInvestingRate">Investing Rate - {newInvestingRate}% <span className="smaller">(previously: {investingRate}%)</span></label>
					{change}
					<input name="newInvestingRate" type="range" min="1" max="80" value={newInvestingRate} onChange={this.handleChange} className="slider" id="myRange" />
					{
						compare && <div>
								<label htmlFor="newCompareInvestingRate">Investing Rate - {newCompareInvestingRate}% <span className="smaller">(previously: {compareInvestingRate}%)</span></label>
								<p>Your second chart will show a monthly contribution of <span className="highlight">{formatter.format(((earnings - spending) * newCompareInvestingRate)/100)}</span>.</p>
								<input name="newCompareInvestingRate" type="range" min="1" max="80" value={newCompareInvestingRate} onChange={this.handleChange} className="slider slider-two" id="myRange" />
						</div>
					}

					<div className="button-container">
						<button onClick={this.handleSubmit}>Show me the money!</button>
					</div>
				</div>
			</section>
		} else {
			result = <div>
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
						<div className="iframe-container">
							<iframe title="show me the money scene in Jerry Maguire" height="315" src="https://www.youtube.com/embed/FCgy0dphOGc?modestbranding=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
						</div>
					</div>
				</div>

				<div className="questions container">
					<form onSubmit={this.handleSubmit}>
						<div>
							<label>
								How much do you earn per month?
								<div><span className="currency">£</span><input type="number" name="earnings" value={this.state.earnings} onChange={this.handleChange} /></div>
							</label>
							<label>
								How much do you spend per month?
								<div><span className="currency">£</span><input type="number" name="spending" value={this.state.spending} onChange={this.handleChange} /></div>
							</label>
							<label>
								How old are you?
								<div><input type="number" name="age" value={this.state.age} onChange={this.handleChange} /></div>
							</label>

							<p className="smaller">Please note, we do not save any of your personal information.</p>
						</div>
						<div>
							<button>Show me the money!</button>
						</div>
					</form>
				</div>

				<div className="show container" ref={this.scrollRef}>
					<div className="results">
						{showChart &&
							<div className="chart">
								<Bar
									data={chartData}
									options={chartOptions}
									// maintainAspectRatio: false
								/>
								<p className="smaller chart-annotation">We calculate returns using monthly compounding and 8% average growth.</p>
							</div>
						}	
						{show && 
							result
						}	
					</div>
					
					{showChart && <div className="tools">
						<h3>Tools for Investing</h3>
						<p>You can invest in the stock market in a number of ways. Below we list some tools to help you do so.</p>
						<ul>
							<a href="https://nutmeg.mention-me.com/m/ol/ll4jr-stevan-popovic" className="nutmeg">Nutmeg</a>
							<li>Create a diversified portfolio or ISA.</li>
							<a href="https://www.vanguardinvestor.co.uk/" className="vanguard">Vanguard</a>
							<li>Invest in a range of low-cost index funds and ETFs.</li>
							<a href="https://freetrade.io/" className="freetrade">Freetrade</a>
							<li>Pick and choose ETFs or individual stocks with no-fees.</li>
							<a href="https://www.hl.co.uk/" className="hl">Hargreaves Lansdown</a>
							<li>Choose funds, ETFs or individual stocks.</li>
							< a href="https://www.finimize.com/" className="finimize">Finimize</a>
							<li>A bite-sized newsletter highlighting market news.</li>
							<a href="https://blog.mywallst.com/stock-club/" className="mywallst">The Stock Club</a>
							<li>An excellent podcast discussing markets and individual companies.</li>
						</ul>
					</div>}
					
				</div>				
			</Layout>
		);
		}
	}

	export default IndexPage

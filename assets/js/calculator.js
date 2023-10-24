function calculate(){
	const amount = input.get('loan_amount').gt(0).val();
	const years = input.get('loan_term_year').gt(0).val();
	const monthlyPayment = input.get('monthly_payment').gt(0).val();
	if(!input.valid()) return;
	if(amount > monthlyPayment * years * 12){
		return input.error(['monthly_payment'], 'Monthly payment is too low', true);
	}
	const interestRate = calculateInterest(amount, years * 12, monthlyPayment);
	const schedule = calculateAmortization(amount, years * 12, interestRate);
	output.val('Interest Rate: 3.74%').replace('3.74%', +interestRate.toFixed(2) + '%').set('interest-rate');
	output.val('Total Interest Paid: $20,000.00').replace('$20,000.00', currencyFormat(monthlyPayment * years * 12 - amount)).set('total-interest');
	output.val('Total of 120 Monthly Payments: $120,000.00').replace('120', years * 12).replace('$120,000.00', currencyFormat(monthlyPayment * years * 12)).set('total-payment');
	let chartLegendHtml = '';
	for(let i = 0; i <= years / 5; i++){
		chartLegendHtml += `<p class="result-text result-text--small">${i * 5} yr</p>`;
	}
	if(years % 5 !== 0){
		chartLegendHtml += `<p class="result-text result-text--small">${years} yr</p>`;
	}
	_('chart__legend').innerHTML = chartLegendHtml;
	let annualResults = [];
	let annualInterest = 0;
	let annualPrincipal = 0;
	schedule.forEach((item, index) => {
		annualInterest += item.paymentToInterest;
		annualPrincipal += item.paymentToPrinciple;
		 if((index + 1) % 12 === 0 || (index + 1) === schedule.length){
			annualResults.push({
				"interest": annualInterest,
				"paymentToPrinciple": annualPrincipal,
				"principle": item.principle,
			});
			annualInterest = 0;
			annualPrincipal = 0;
		}
	});
	const totalPayment = monthlyPayment * years * 12;
	const principalPercent = +((totalPayment - amount) / totalPayment* 100).toFixed(0);
	const interestPercent = +(amount / totalPayment * 100).toFixed(0);
	const donutData = [interestPercent, principalPercent];
	const chartData = [[], [], [], []];
	let prevPrincipal = 0;
	let prevInterest = 0;

	annualResults.forEach((item, index) => {
		prevPrincipal = item.paymentToPrinciple + prevPrincipal;
		prevInterest = item.interest + prevInterest;
		chartData[0].push((index + 1));
		chartData[1].push(item.principle.toFixed(0));
		chartData[2].push(prevInterest.toFixed(0));
		chartData[3].push(prevPrincipal.toFixed(0));
	});
	changeChartData(donutData, chartData);
}

function calculateInterest(finAmount, finMonths, finPayment){
	var result = 0;

	var min_rate = 0, max_rate = 100;
	while(min_rate < max_rate - 0.0001){
		var mid_rate = (min_rate + max_rate) / 2,
			j = mid_rate / 1200,
			guessed_pmt = finAmount * (j / (1 - Math.pow(1 + j, finMonths * -1)));

		if(guessed_pmt > finPayment){
			max_rate = mid_rate;
		}
		else {
			min_rate = mid_rate;
		}
	}
	return mid_rate;
}

calculatePayment = function(finAmount, finMonths, finInterest){
	var result = 0;

	if(finInterest == 0){
		result = finAmount / finMonths;
	}
	else {
		var i = ((finInterest / 100) / 12),
			i_to_m = Math.pow((i + 1), finMonths),
			p = finAmount * ((i * i_to_m) / (i_to_m - 1));
		result = Math.round(p * 100) / 100;
	}

	return result;
}

function calculateAmortization(finAmount, finMonths, finInterest){
	var payment = calculatePayment(finAmount, finMonths, finInterest),
		balance = finAmount,
		interest = 0.0,
		totalInterest = 0.0,
		schedule = [],
		currInterest = null,
		currPrinciple = null;

	for(var i = 0; i < finMonths; i++){
		currInterest = balance * finInterest / 1200;
		totalInterest += currInterest;
		currPrinciple = payment - currInterest;
		balance -= currPrinciple;
		if(balance < 0 ) {
			balance = 0;
		}
		schedule.push({
			principle: balance,
			interest: totalInterest,
			payment: payment,
			paymentToPrinciple: currPrinciple,
			paymentToInterest: currInterest,
		});

	}

	return schedule;
}

function currencyFormat(price){
	return '$' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

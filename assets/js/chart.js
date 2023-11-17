// CHART_DONUT_SMALL CHART_LOAN
'use strict'

let switchTheme = null;

import("./assets/js/lib/chartjs/chart.js").then((e) => {
	let Chart = e.Chart
	let registerables = e.registerables
	Chart.register(...registerables)
	const theme = localStorage.getItem('theme') !== 'system' ? localStorage.getItem('theme') : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	const colors = {
		light: {
			purple: '#A78BFA',
			yellow: '#FBBF24',
			sky: '#7DD3FC',
			blue: '#1D4ED8',
			textColor: '#6B7280',
			yellowGradientStart: 'rgba(250, 219, 139, 0.33)',
			purpleGradientStart: 'rgba(104, 56, 248, 0.16)',
			skyGradientStart: 'rgba(56, 187, 248, 0.16)',
			tealGradientStart: 'rgba(56, 248, 222, 0.16)',
			yellowGradientStop: 'rgba(250, 219, 139, 0)',
			purpleGradientStop: 'rgba(104, 56, 248, 0)',
			skyGradientStop: 'rgba(56, 248, 222, 0.16)',
			gridColor: '#DBEAFE',
			tooltipBackground: '#fff',
			fractionColor: '#EDE9FE',
		},
		dark: {
			purple: '#7C3AED',
			yellow: '#D97706',
			sky: '#0284C7',
			blue: '#101E47',
			textColor: '#fff',
			yellowGradientStart: 'rgba(146, 123, 67, 0.23)',
			purpleGradientStart: 'rgba(78, 55, 144, 0.11)',
			skyGradientStart: 'rgba(56, 187, 248, 0.16)',
			tealGradientStart: 'rgba(56, 248, 222, 0.16)',
			yellowGradientStop: 'rgba(250, 219, 139, 0)',
			purpleGradientStop: 'rgba(104, 56, 248, 0)',
			skyGradientStop: 'rgba(56, 248, 222, 0.16)',
			gridColor: '#162B64',
			tooltipBackground: '#1C3782',
			fractionColor: '#41467D',
		},
	};

	// DONUT CHART

	let data = [
		{
			data: [83, 17],
			labels: ['83%', '17%'],
			backgroundColor: [colors[theme].purple, colors[theme].yellow, colors[theme].sky],
			borderColor: '#DDD6FE',
			borderWidth: 0,
		},
	];

	let options = {
		rotation: 0,
		cutout: '37%',
		hover: {mode: null},
		responsive: false,
		layout: {
			padding: 30,
		},
		plugins: {
			tooltip: {
				enabled: false,
			},
			legend: {
				display: false,
			},
		},
	};

	const customDataLabels = {
		id: 'customDataLabel',
		afterDatasetDraw(chart, args, pluginOptions) {
			const {
				ctx,
				data,
				chartArea: { top, bottom, left, right, width, height },
			} = chart;
			ctx.save();

			data.datasets[0].data.forEach((datapoint, index) => {
				const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();

				ctx.textAlign = 'center';
				ctx.font = '14px Inter';
				ctx.fillStyle = '#fff';
				ctx.textBaseline = 'middle';
				let toolTipText = datapoint != '0' ? datapoint + '%' : '';
				ctx.fillText(toolTipText, x, y);
			});
		},
	};

	let donutSmall = new Chart(document.getElementById('chartDonutSmall'), {
		type: 'doughnut',
		data: {
			datasets: data,
		},
		options: options,
		plugins: [customDataLabels],
	});

	let switchThemeDonut = function(theme) {
		donutSmall.destroy()

		const customDataLabels = {
			id: 'customDataLabel',
			afterDatasetDraw(chart, args, pluginOptions) {
				const {
					ctx,
					data,
					chartArea: { top, bottom, left, right, width, height },
				} = chart;
				ctx.save();

				data.datasets[0].data.forEach((datapoint, index) => {
					const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();

					ctx.textAlign = 'center';
					ctx.font = '14px Inter';
					ctx.fillStyle = '#fff';
					ctx.textBaseline = 'middle';
					let toolTipText = datapoint != '0' ? datapoint + '%' : '';
					ctx.fillText(toolTipText, x, y);
				});
			},
		};

		donutSmall = new Chart(document.getElementById('chartDonutSmall'), {
			type: 'doughnut',
			data: {
				datasets: data,
			},
			options: options,
			plugins: [customDataLabels],
		});

		donutSmall.data.datasets[0].backgroundColor = [colors[theme].purple, colors[theme].yellow, colors[theme].sky];
		donutSmall.update()
	}

	// LOAN CHART

	let ctx = document.getElementById('chartLoan').getContext('2d');

	let yellowGradient = ctx.createLinearGradient(0, 0, 0, 1024);
	yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
	yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);

	let purpleGradient = ctx.createLinearGradient(0, 0, 0, 1024);
	purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
	purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);


	let skyGradient = ctx.createLinearGradient(0, 0, 0, 1024);
	skyGradient.addColorStop(0, colors[theme].skyGradientStart);
	skyGradient.addColorStop(1, colors[theme].skyGradientStop);

	let tooltip = {
		enabled: false,
		external: function (context) {
			let tooltipEl = document.getElementById('chartjs-tooltip');

			// Create element on first render
			if (!tooltipEl) {
				tooltipEl = document.createElement('div');
				tooltipEl.id = 'chartjs-tooltip';
				tooltipEl.innerHTML = '<table></table>';
				document.body.appendChild(tooltipEl);
			}

			// Hide if no tooltip
			const tooltipModel = context.tooltip;
			if (tooltipModel.opacity === 0) {
				tooltipEl.style.opacity = 0;
				return;
			}

			// Set caret Position
			tooltipEl.classList.remove('above', 'below', 'no-transform');
			if (tooltipModel.yAlign) {
				tooltipEl.classList.add(tooltipModel.yAlign);
			} else {
				tooltipEl.classList.add('no-transform');
			}

			function getBody(bodyItem) {
				return bodyItem.lines;
			}

			if (tooltipModel.body) {
				const bodyLines = tooltipModel.body.map(getBody);

				let innerHtml = '<thead>';

				let year = +(Number(tooltipModel.title) * 12).toFixed(0);
				let months = +(year % 12).toFixed(0);
				let yearText = `Year ${(year - months) / 12}`;
				let monthText = months === 0 ? '' : `, Month ${months}`;
				innerHtml += '<tr><th class="loan-chart__title">' + yearText + monthText + '</th></tr>';

				innerHtml += '</thead><tbody>';
				bodyLines.forEach(function (body, i) {
					innerHtml += '<tr><td class="loan-chart__text">' + body + '</td></tr>';
				});
				innerHtml += '</tbody>';

				let tableRoot = tooltipEl.querySelector('table');
				tableRoot.innerHTML = innerHtml;
			}

			const position = context.chart.canvas.getBoundingClientRect();

			// Display, position, and set styles for font
			tooltipEl.style.opacity = 1;
			tooltipEl.style.position = 'absolute';
			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight / 2 + 'px';
			// tooltipEl.style.font = bodyFont.string;
			tooltipEl.classList.add('loan-chart');
		},
	};

	const dataCharts = {
		labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		datasets: [
			{
				data: ['91594', '82868', '73811', '64409', '54650', '44520', '34005', '23090', '11760', '0'],
				type: 'line',
				order: 1,
				label: 'Balance',
				pointHoverBackgroundColor: '#FFFFFF',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBorderColor: '#5045E5',
				stacked: true,
				borderColor: colors[theme].sky,
				backgroundColor: skyGradient,
				fill: true,
			},
			{
				label: 'Interest',
				data: ['3594', '6868', '9811', '12409', '14650', '16520', '18005', '19090', '19760', '20000'],
				type: 'line',
				order: 1,
				pointHoverBackgroundColor: '#FFFFFF',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBorderColor: '#5045E5',
				stacked: true,
				borderColor: colors[theme].yellow,
				backgroundColor: yellowGradient,
				fill: true,
			},
			{
				label: 'Principal',
				data: [
					"8406",
					"17132",
					"26189",
					"35591",
					"45350",
					"55480",
					"65995",
					"76910",
					"88240",
					"100000"
				],
				type: 'line',
				order: 1,
				pointHoverBackgroundColor: '#FFFFFF',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBorderColor: '#5045E5',
				stacked: true,
				borderColor: colors[theme].purple,
				backgroundColor: purpleGradient,
				fill: true,
			},
		],
	};

	let chartLoan = new Chart(document.getElementById('chartLoan'), {
		data: dataCharts,
		options: {
			stepSize: 1,
			response: true,
			elements: {
				point: {
					radius: 0,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: tooltip,
			},
			interaction: {
				mode: 'index',
				intersect: false,
			},
			scales: {
				y: {
					grid: {
						tickLength: 0,
						color: colors[theme].gridColor,
					},
					ticks: {
						display: false,
						stepSize: 1,
					},
					border: {
						color: colors[theme].gridColor,
					},
				},
				x: {
					border: {
						color: colors[theme].gridColor,
					},
					ticks: {
						display: false,
						color: colors[theme].gridColor,
						stepSize: 1,
					},
					grid: {
						tickLength: 0,
						color: colors[theme].gridColor,
					},
				},
			},
		},
	});

	let switchThemeLoan = function(theme) {
		yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
		yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);
		purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
		purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);
		chartLoan.data.datasets[1].backgroundColor = yellowGradient;
		chartLoan.data.datasets[1].borderColor = colors[theme].yellow;
		chartLoan.data.datasets[2].backgroundColor = purpleGradient;
		chartLoan.data.datasets[2].borderColor = colors[theme].purple;
		chartLoan.data.datasets[0].backgroundColor = skyGradient;
		chartLoan.data.datasets[0].borderColor = colors[theme].sky;
		chartLoan.options.scales.y.grid.color = colors[theme].gridColor;
		chartLoan.options.scales.x.grid.color = colors[theme].gridColor;
		chartLoan.options.scales.y.ticks.color = colors[theme].gridColor;
		chartLoan.options.scales.x.ticks.color = colors[theme].gridColor;
		chartLoan.options.scales.y.border.color = colors[theme].gridColor;
		chartLoan.options.scales.x.border.color = colors[theme].gridColor;
		chartLoan.update()
	}

	window.changeChartData = function(values, values_two) {
		donutSmall.data.datasets[0].data = values
		donutSmall.data.datasets[0].labels = values.map(value => `${value}%`)
		donutSmall.update()

		chartLoan.data.labels = values_two[0]
		chartLoan.data.datasets[0].data = values_two[1]
		chartLoan.data.datasets[1].data = values_two[2]
		chartLoan.data.datasets[2].data = values_two[3]
		chartLoan.update()
	}

	switchTheme = [switchThemeLoan, switchThemeDonut]
})

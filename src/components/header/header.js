import API from '../../API.js';
import Chart from 'chart.js';
import axios from 'axios';
import Diagramm from '../diagramm/Diagramm.vue';
export default {
	components: {
		Diagramm
	},
	data() {
		return {
			isShown: false,
			api_key: 'c9f562aaffcdefaf40f2ed808d202c9b',
			url_base: 'https://api.openweathermap.org/data/2.5/',
			query: '',
			weather: {},
			/*weather in next days */
			weathers: [],
			PREFERRED_TIME: '12:00:00',
			DAYS: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
			/*Chart*/
			chart: null,

			dates: [],
			temps: [],
			loading: false,
			errored: false,

		}
	},
	methods: {
		removeType(event) {
			this.query = ''
		},
		/* current location weather forecast */
		currentCity() {
			console.log('meo');
			fetch(`${this.url_base}weather?q=Leipzig&units=metric&APPID=${this.api_key}`)
				.then(res => {
					return res.json();
				}).then(this.setResultsCurrentWeather);
		},
		setResultsCurrentWeather(results) {
			this.weather = results;
		},

		/* today temperature */
		fetchWeather() {
			//console.log('fetchWeather', event);			
			fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
				.then(res => {
					return res.json();
				}).then(this.setResults);
		},
		setResults(results) {
			this.weather = results;
		},
		/* days (Sunday, Monday,..) in next days */
		getDayName(unix) {
			const date = new Date(unix * 1000);
			return this.DAYS[date.getDay()];
		},
		fetchWeatherForecast() {
			//console.log('fetchWeatherForecast');
			axios
				.get(`${this.url_base}forecast?APPID=${this.api_key}&q=${this.query}&units=metric`)
				.then(response => {
					this.weathers = response.data.list.filter(weather => {
						return weather["dt_txt"].includes(this.PREFERRED_TIME);
					})
				})
			//this.weather.splice(0, this.weather.length); // weather in 5 days not repeat per hour
		},
		nextDays() {
			let d = new Date();
			let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
			let dates = d.getDate();
			let month = months[d.getMonth()];
			/*for (i = 0; i < 5;i++) {
				let nextdays = new Date(dates+i, month );
				console.log(nextdays);
			}*/
			return ` ${dates} / ${month} `;

		},

		/* chart */
		getData() {
			//console.log('getData');
			this.loading = true;

			if (this.chart != null) {
				this.chart.destroy();
			}

			axios
				.get(`${this.url_base}forecast/hourly?q=${this.query}&units=metric&appid=${this.api_key}`)
				.then(res => {
					this.dates = response.data.list.map(list => {
						return list.dt_txt;
					});
					this.temps = response.data.list.map(list => {
						return list.main.temp;
					});
					var ctx = document.getElementById('myChart');
					this.chart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: this.dates,
							datasets: [
								{
									label: 'Avg. Temp',
									borderColor: 'black',
									pointBorderColor: 'black',
									pointBackgroundColor: 'black',
									fill: false,
									data: this.temps
								}
							]
						},
						options: {
							title: {
								display: true,
								text: 'Hourly weather forecast'
							},
							tooltips: {
								callbacks: {
									label: function (tooltipItem, data) {
										var label = data.datasets[tooltipItem.datasetIndex].label || '';

										if (label) {
											label += ':';
										}

										label += Mathfloor(tooltipItem.yLabel);
										return label + '°C';
									}
								}
							},
							scales: {
								xAxes: [
									{
										type: 'time',
										time: {
											unit: 'hour',
											displayFormats: {
												hour: 'M/DD @ hA'
											},
											tooltipFormat: 'MMM. DD @ hA'
										},
										scaleLabel: {
											display: true,
											labelString: 'Date/Time'
										}
									}
								],
								yAxes: [
									{
										scaleLabel: {
											display: true,
											labelString: 'Temperature (°C)'
										},
										ticks: {
											callback: function (value, index, values) {
												return value + '°C';
											}
										}
									}
								]
							}
						}
					})
				})
				.catch(error => {
					console.log(error);
					this.errored = true;
				})
				.finally(() => (this.loading = false));
		}

	},

	mounted() {
		this.fetchWeather(); /* today temperature */
	}

};


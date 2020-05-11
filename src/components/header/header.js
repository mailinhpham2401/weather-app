import API from '../../API.js';
import Chart from 'chart.js';
import axios from 'axios';
import Diagramm from '../diagramm/Diagramm.vue';
import moment from 'moment';
import 'chartjs-plugin-datalabels';


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
			icons: {
				'Rain': require('../../assets/regnerisch.png'),
				'Clear': require('../../assets/sonne.png'),
				'Clouds': require('../../assets/wolkig.png'),
				'Snow': require('../../assets/schnee.png'),
				'Drizzle':require('../../assets/regnerisch.png'),
				'Thunderstorm':require('../../assets/regnerisch.png')
			},
			/*weather in next days */
			weathers: [],
			PREFERRED_TIME: '12:00:00',
			DAYS: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
			/*Chart*/
			dates: [],
			temps: [],
			scaleFontColor:'white'


		}
	},
	methods: {
		removeType(event) {
			this.query = ''
		},
		/* current location weather forecast */
		currentCity() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position => {
					//console.log('meo');
					fetch(`${this.url_base}weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${this.api_key}`)
						.then(res => {
							return res.json();
						}).then(this.setResultsCurrentWeather);
					})
				};
	
			},	
					/*weatherId = this.weather[0].id;
			   
			   //change Background
			   if(weatherId >= 200 && weatherId < 550){
				   //rainy bg
				   removeClass('clear').addClass('rainy');
			   } else if (weatherId >= 600 && weatherId < 700){
				   //snow
				   removeClass('clear').addClass('snowy');
				   
			   } else if (weatherId >= 700 && weatherId < 800){
				   //mist smoke
				   removeClass('clear').addClass('snowy');
				   
			   } else {
				   //keep the default
				   console.log("BG image set to default");
				   
				   //TODO: Change BG based on time
			   }*/
			
		setResultsCurrentWeather(results) {
			this.weather = results;
		},

		/*createIcon(){
			var weatherId = this.weather.weather[0].id;
			if(weatherId >= 200 && weatherId < 550){
				//rainy bg
				$('p').removeClass('clear').addClass('rainy');
			} else if (weatherId >= 600 && weatherId < 700){
				//snow
				$('p').removeClass('clear').addClass('snowy');
				
			} else if (weatherId >= 700 && weatherId < 800){
				//mist smoke
				$('p').removeClass('clear').addClass('snowy');
				
			} else {
				//keep the default
				console.log("BG image set to default");
				
				//TODO: Change BG based on time
			}
		},*/
		/* today temperature */
		fetchWeather() {
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
			axios
				.get(`${this.url_base}forecast?APPID=${this.api_key}&q=${this.query}&units=metric`)
				.then(response => {
					this.weathers = response.data.list.filter(weather => {
						return weather["dt_txt"].includes(this.PREFERRED_TIME);
					})
				})
			//this.weather.splice(0, this.weather.length); // weather in 5 days not repeat per hour
		},

		ForeCastOfCurrentCity() {
			//console.log('fetchWeatherForecast');
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position => {
					axios
						.get(`${this.url_base}forecast?APPID=${this.api_key}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
						.then(response => {
							this.weathers = response.data.list.filter(weather => {
								return weather["dt_txt"].includes(this.PREFERRED_TIME);
							})
						})
				})
			};
		},
		nextDays(i) {
			let days = [];
			let daysRequired = 5;
			for (let i = 0; i < daysRequired; i++) {
				days.push(moment().add(i, 'days').format('D/MM '));
			}
			return days[0];

		},
		/* chart */
		getData() {
			axios
				.get(`${this.url_base}forecast?APPID=${this.api_key}&q=${this.query}&units=metric`)
				.then(res => {
					this.dates = res.data.list.map(list => {
						return list.dt_txt;
					});
					this.temps = res.data.list.map(list => {
						return list.main.temp;
					});
					var datatables_plugin = [
					Chart.defaults.global.plugins.datalabels.align = 'top',
					Chart.defaults.global.defaultFontColor = 'white'
				    ];
					var ctx = document.getElementById('myChart');
					datatables_plugin ;
					this.chart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: this.dates,
							datasets: [
								{
									label: 'Durchschnitttemp',
									borderColor: 'black',
									pointBorderColor: 'black',
									pointBackgroundColor: 'black',
									fill: false,
									data: this.temps
								}
							]
						},
						options: {
							legend:{
								labels:{
									fontColor:'white'
								}
							},
							scaleFontColor:'white',
							plugins:{
                               datalabels:{
								   formatter:function(value){
									   return value + '°C';
								   }
							   }
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
												hour: 'D MMM hA'
											},
											tooltipFormat: 'D MMM hA'
										},
										ticks: {
											fontColor:'white'
										}
									},	
								],
								yAxes: [
									{
										ticks: {
											callback: function (value, index, values) {
												return value + '°C';
											},
										fontColor:'white'
										}
									}
								]
							}
						}
					})
				})
		},

		ChartDefault() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position => {
					axios
						.get(`${this.url_base}forecast?APPID=${this.api_key}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
						.then(res => {
							this.dates = res.data.list.map(list => {
								return list.dt_txt;
							});
							this.temps = res.data.list.map(list => {
								return list.main.temp;
							});
							var datatables_plugin = [
								Chart.defaults.global.plugins.datalabels.align = 'top',
								Chart.defaults.global.defaultFontColor = 'white'
								];
								datatables_plugin ;
							var ctx = document.getElementById('myChart');
							this.chart = new Chart(ctx, {
								type: 'line',
								data: {
									labels: this.dates,
									datasets: [{
									label: 'Durchschnitttemp',
									borderColor: 'black',
									pointBorderColor: 'black',
									pointBackgroundColor: 'black',
									fill: false,
									data: this.temps
									}]
								},
								options: {
									legend:{
										labels:{
											fontColor:'white'
										}
									},
									scaleFontColor:'white',
									plugins:{
									   datalabels:{
										   formatter:function(value){
											   return value + '°C';
										   }
									   }
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
														hour: 'D MMM hA'
													},
													tooltipFormat: 'D MMM hA'
												},
												ticks: {
													fontColor:'white'
												}
											},	
										],
										yAxes: [
											{
												ticks: {
													callback: function (value, index, values) {
														return value + '°C';
													},
												fontColor:'white'
												}
											}
										]
									}
								}
							})
						})
				})
			};
		}
	},
	mounted() {
		this.fetchWeather(); /* today temperature */
		this.currentCity();
		this.ForeCastOfCurrentCity();
		/*this.createIcon();*/
	}


};


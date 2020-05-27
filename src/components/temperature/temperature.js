
export default {
  name: 'temperature',
  components: {},
  props: [
	  'weather'
  ],
  data() {
	return{
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
			}
		
	}
},
  methods:{
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
	setResultsCurrentWeather(results) {
			this.weather = results;
		},
	fetchWeather() {
			fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
				.then(res => {
					return res.json();
				}).then(this.setResults);
		},
	setResults(results) {
			this.weather = results;
		}	
  },
  mounted() {
	this.fetchWeather(); /* today temperature */
	this.currentCity();
}
}



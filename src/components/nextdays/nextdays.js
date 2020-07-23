import axios from 'axios';
import moment from 'moment';
export default {
	name: 'nextdays',
	components: {},
	props: [
		'weather'
	],
	data() {
		return {
			isShown: false,
			api_key: 'c9f562aaffcdefaf40f2ed808d202c9b',
			url_base: 'https://api.openweathermap.org/data/2.5/',
			query: '',
			weather: {},
			icons:{
				'Rain':require('../../assets/regnerisch.png'),
				'Clear': require('../../assets/sonne.png'),
				'Clouds':require('../../assets/wolkig.png'),
			},
			weathers: [],
			PREFERRED_TIME: '12:00:00',
			DAYS: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],

		}
	},
	methods: {
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
		},		
		ForeCastOfCurrentCity(lon,lat) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position=>{
				  axios
				.get(`${this.url_base}forecast?APPID=${this.api_key}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
				.then(response => {
					this.weathers = response.data.list.filter(weather => {
						return weather["dt_txt"].includes(this.PREFERRED_TIME);
					})
				})
				})};				
		},
		 /* nextDays() {
			let d = new Date();
			let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
			let dates = d.getDate();
			let month = months[d.getMonth()];
			return ` ${dates} / ${month} `;

		} */
		nextDays() {
			let days = [];
			
			let daysRequired = 5;
			for (let i = 0; i < daysRequired; i++) {
				days.push(moment().add(i, 'days').format('D/MM '));	
			}
			return days[0];
			}    
	},

	mounted() {
		this.fetchWeatherForecast();
		this.ForeCastOfCurrentCity();
		
	}
};
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		weather:{},
		api_key: 'c9f562aaffcdefaf40f2ed808d202c9b',
		url_base: 'https://api.openweathermap.org/data/2.5/',
		query: '',
		icons: {
			'Rain': require('../assets/regnerisch.png'),
			'Clear': require('../assets/sonne.png'),
			'Clouds': require('../assets/wolkig.png'),
			'Snow': require('../assets/schnee.png'),
			'Drizzle':require('../assets/regnerisch.png'),
			'Thunderstorm':require('../assets/regnerisch.png')
		},			
	},
	 actions:{
		currentCity({commit}) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position => {
					axios
					fetch(`${this.url_base}weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${this.api_key}`)
						.then(res => {
							commit('CUR_CITY',res.json()) ;
						}).then(this.setResultsCurrentWeather);
					})
				};
	
			},	
			
		setResultsCurrentWeather(results) {
			this.weather = results;
		},
	 },
	 mutations:{
		 CUR_CITY (state, weather){
			 state.weather = weather
		 }
	 }
})
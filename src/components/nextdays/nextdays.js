
export default {
  name: 'nextdays',
  components: {},
  props: [],
  data() {
	return{
		api_key: 'c9f562aaffcdefaf40f2ed808d202c9b',
		url_base: 'https://api.openweathermap.org/data/2.5/',
		query: '',
		weather:{},
		weathers: [],
		PREFERRED_TIME : '06:00:00',
		DAYS : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		
	}
},
  methods:{
	  formatTemperature(temperature) {
	  return Math.round(temperature);
	  },
	  getDayName(unix){
	  const date = new Date(unix * 1000);
	   return DAYS[date.getDay()];
	  },
	  fetchWeatherForecast() {
	  axios
	  .get(`${this.url_base}forecast?APPID=${this.api_key}&q=${this.query},ca&units=metric`)
	  .then(response => {
		this.weathers = response.data.list.filter(weather => {
		  return weather["dt_txt"].includes(PREFERRED_TIME);
		})
	  })
  },
		  submit() {
	this.fetchWeatherForecast();	
	   },
	  dateBuilder (unix) {
	let d = new Date(unix * 1000);
	let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	let dates = d.getDate();
	let month = months[d.getMonth()];
	return ` ${dates} / ${month} `;
  }
  },
   mounted () {
  this.fetchWeatherForecast();
   }
}



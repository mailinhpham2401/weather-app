
export default {
  name: 'temperature',
  components: {},
  props: [],
  data() {
	return{
		api_key: 'c9f562aaffcdefaf40f2ed808d202c9b',
		url_base: 'https://api.openweathermap.org/data/2.5/',
		query: '',
		weather:{},
		
	}
},
  methods:{
	  fetchWeather (e) {
		  if (e.key == "Enter"){
			  fetch(`https://api.openweathermap.org/data/2.5/forecast?APPID=${api_key}&q=${this.city},ca&units=metric`)
			  .then(res => {
				  return res.json();
			  }).then(this.setResults);
		  }	
	  },
	  setResults (results){
		  this.weather = results;
	  }
  }
}



import API from '../../API.js';
import Chart from 'chart.js';
import axios from 'axios';
import Diagramm from '../diagramm/Diagramm.vue';
export default {
	
	 components:{
		 Diagramm
	 },



	data() {
	  return{
		  api_key: 'c9f562aaffcdefaf40f2ed808d202c9b',
		  url_base: 'https://api.openweathermap.org/data/2.5/',
		  query: '',
		  weather:{},
		  /*weather in next days */
		  weathers: [],
		  PREFERRED_TIME : '12:00:00',
		  DAYS : ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
		  
		  /*Chart*/
		 chart:null,
		 
		 dates:[],
		 temps:[],
		 loading: false,
		 errored: false,
		  
		  /* map */
		 
		 embedURL: '',
         location: localStorage.location || '',
         address: localStorage.address || '',
         forecast: null,
         icons: {
         rain: '😐',
         snow: '⛄️',
         wind: '💨',
         cloudy: '☁️',
         } 
		  
		  
	  }
  },
    methods:{
		

		removeType(event){
             this.query=''
		},
		/* current location weather forecast */
        currentCity () {
			
				fetch(`${this.url_base}weather?q=Leipzig&units=metric&APPID=${this.api_key}`)
				.then(res => {
					return res.json();
				}).then(this.weather);
				
		},
		
         /* today temperature */
		fetchWeather (e) {
			if (e.key == "Enter"){
				fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
				.then(res => {
					return res.json();
				}).then(this.setResults);
			}	
		},
		setResults (results){
			this.weather = results;
		},
	    /* days (Sunday, Monday,..) in next days */
		getDayName(unix){
        const date = new Date(unix * 1000);
         return this.DAYS[date.getDay()];
        },
         fetchWeather2() {
        axios
        .get(`${this.url_base}forecast?APPID=${this.api_key}&q=${this.query}&units=metric`)
        .then(response => {
          this.weathers = response.data.list.filter(weather => {
            return weather["dt_txt"].includes(this.PREFERRED_TIME);
          })
		})
		//this.weather.splice(0, this.weather.length); // weather in 5 days not repeat per hour
    },
		submit() {
      this.fetchWeather2();	
		 },
		dateBuilder () {
      let d = new Date();
      let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      let dates = d.getDate();
      let month = months[d.getMonth()];
      return ` ${dates} / ${month} `;
	},  
	
	    /* chart */
        getData: function(){
		   this.loading = true;

		   if(this.chart != null){
			   this.chart.destroy();
		   }
		   
		   axios
		   .get(`${this.url_base}forecast/hourly?q=${this.query}&units=metric&appid=${this.api_key}`)
		   .then(res =>{
			   this.dates = response.data.list.map(list => {
				   return list.dt_txt;
			   });
			   this.temps = response.data.list.map(list =>{
				   return list.main.temp;
			   });
			   var ctx = document.getElementById('myChart');
			   this.chart = new Chart(ctx,{
				   type: 'line',
				   data:{
					   labels: this.dates,
					   datasets:[
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
				   options:{
					   title:{
							display:true,
							text:'Hourly weather forecast'
					   },
					   tooltips:{
                            callbacks:{
								label: function(tooltipItem, data){
									var label = data.datasets[tooltipItem.datasetIndex].label || '';

									if (label){
										label += ':';
									}

									label += Mathfloor(tooltipItem.yLabel);
									return label + '°C';
								}
							}
					   },
				   scales:{
                        xAxes:[
							{
							type: 'time',
							time:{
								unit: 'hour',
								displayFormats: {
									hour:'M/DD @ hA'
								},
								tooltipFormat: 'MMM. DD @ hA'
							},
							scaleLabel: {
								display: true,
								labelString: 'Date/Time'
							}
							}
						],
						yAxes:[
							{
								scaleLabel:{
									display: true,
									labelString: 'Temperature (°C)'
								},
								ticks:{
									callback: function(value, index, values){
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
		   .finally(()=> (this.loading = false));
		}

	},

	loadWeather(lat, lng) {
      localStorage.lat = lat;
      localStorage.lng = lng;
      this.embedURL = API.getEmbedURL(lat, lng);
      API.getAddress(lat, lng).then((result) => {
        this.address = [result.name, result.street].join(' ');
        localStorage.address = this.address;
      });
      API.getForecast(lat, lng).then((result) => {
        this.forecast = result;
      });
    },
    updateLocation() {
      localStorage.location = this.location;
      API.getCoordinates(this.location).then((result) => {
        this.loadWeather(result.latitude, result.longitude);
      });
	},
	
	 mounted () {
	this.fetchWeather(); /* today temperature */
	this.loadWeather(localStorage.lat || '37.8267', localStorage.lng || '-122.4233');
	 }
            
};


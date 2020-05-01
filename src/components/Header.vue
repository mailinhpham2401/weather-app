<template>
  <div>
	  <!--Navbar-->
    <div class="row d-flex justify-content-between menu-leiste">
      <a href="#/menu" v-b-toggle.sidebar-1>
        <img src="../assets/menu_button.png" class="menu-button" />
      </a>
      <div class="city" v-if="typeof weather.main !='undefined'">
        <strong>{{ weather.name }}</strong>
      </div>
	  <div class="city" v-else>
        <strong>Leipzig</strong>
      </div>
      <a href="#/suchen" v-b-toggle.sidebar-right>
        <img src="../assets/suchen.png" class="suchen" />
      </a>
    </div>
    <!-- sidebar left-->
    <b-sidebar id="sidebar-1" title="WEATHER" shadow bg-variant="black" text-variant="white" >
      <div class="px-3 py-2">
        <router-link to="/">
          <p id="first-line">
            <img src="../assets/wetter_setting.png" class="wetter-setting-icon" />Wetter
          </p>
        </router-link>
        <hr style="background-color:white" class="hr" />
        <router-link to="/radar">
          <p>
            <img src="../assets/radar.png" class="radar-icon" />Radar
          </p>
        </router-link>
        <hr style="background-color:white" class="hr" />
        <router-link to="/about">
          <p>
            <img src="../assets/information.png" class="info-icon" />Über diesen App
          </p>
        </router-link>
        <hr style="background-color:white" class="hr" />
      </div>
    </b-sidebar>
    <!--sidebar right-->
    <b-sidebar
      id="sidebar-right"
      right
      shadow
      bg-variant="black"
      img
      src="../assets/suchen.png"
      class="suchen-icon"
      text-variant="white"
    >
      <div slot="title">
        <img src="../assets/suchen.png" class="suchen-icon" />
      </div>
      <div class="px-3 py-2">
        <img src="../assets/close_white.png" class="close-white-icon" @click="removeType()" />
        <input class="input" 
		v-model="query"
		@keypress="fetchWeather" 
		v-on:keyup.enter="submit(), getData(), updateLocation()"
		  />

        <hr style="background-color:white" class="hr2" />
      </div>
    </b-sidebar>

    <p>
      <strong>
        <div class="row heute">Heute</div>
      </strong>
    </p>

    <!-- appTemperatur-->
	
    <b-row v-if="typeof weather.main != 'undefined'">
      <b-col cols="8" sm="8" md="9" lg="9" xl="9" class="number">
        <b-row>
          <b-col cols="6" sm="6" lg="7" xl="7"></b-col>
          <b-col cols="6" sm="6" lg="5" xl="4">
            <b-col cols="4" sm="8" lg="2"></b-col>
            <b-col cols="2" sm="4" lg="10">
              <p class="main-temp">{{ Math.round(weather.main.temp)}}</p>
              <img src="../assets/regnerisch.png" class="wetter-icon" />
              <p class="max-temp">{{ Math.round(weather.main.temp_max) }}°C</p>
              <p class="min-temp">{{ Math.round(weather.main.temp_min) }}°C</p>
              <b-row>
                <img src="../assets/humidity.png" class="humidity-icon" />
              </b-row>
              <b-row>
                <img src="../assets/wind.png" class="wind-icon" />
              </b-row>
            </b-col>
            <b-col class="humidity">%</b-col>
            <b-col class="humidity-number">{{ Math.round(weather.main.humidity) }}</b-col>
            <b-col class="wind-number"><p>{{ Math.round(weather.wind.speed) }}<p><p class="nph"> nph</p></b-col>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="1" sm="1" md="1" lg="1" xl="2" class="grad">
        <img src="../assets/grad.png" class="grad-size" />
      </b-col>

      <b-col cols="3" sm="3" md="2" lg="2" xl="1" class="sonne"></b-col>
    </b-row>
    <div v-else >
		<div :class="currentCity" v-if="typeof weather.main != 'undefined'">
			<b-col cols="8" sm="8" md="9" lg="9" xl="9" class="number">
        <b-row>
          <b-col cols="6" sm="6" lg="7" xl="7"></b-col>
          <b-col cols="6" sm="6" lg="5" xl="4">
            <b-col cols="4" sm="8" lg="2"></b-col>
            <b-col cols="2" sm="4" lg="10">
              <p class="main-temp">{{ Math.round(weather.main.temp)}}</p>
              <img src="../assets/regnerisch.png" class="wetter-icon" />
              <p class="max-temp">{{ Math.round(weather.main.temp_max) }}°C</p>
              <p class="min-temp">{{ Math.round(weather.main.temp_min) }}°C</p>
              <b-row>
                <img src="../assets/humidity.png" class="humidity-icon" />
              </b-row>
              <b-row>
                <img src="../assets/wind.png" class="wind-icon" />
              </b-row>
            </b-col>
            <b-col class="humidity">%</b-col>
            <b-col class="humidity-number">{{ Math.round(weather.main.humidity) }}</b-col>
            <b-col class="wind-number"><p>{{ Math.round(weather.wind.speed) }}<p><p class="nph"> nph</p></b-col>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="1" sm="1" md="1" lg="1" xl="2" class="grad">
        <img src="../assets/grad.png" class="grad-size" />
      </b-col>

      <b-col cols="3" sm="3" md="2" lg="2" xl="1" class="sonne"></b-col>
		</div>
	</div>
    <!-- end: appTemperatur -->

    <!--appDiagramm-->
   
    <div>
		<div class="alert alert-info" v-show="loading">
			Loading...
		</div>
		<div v-show="chart!=null">
			<canvas id="myChart" ></canvas>
		</div>
	</div>


    <!--appNextdays-->
	<p><strong><div class="row heute">Nächste 5 Tage</div></strong></p>
    <b-row class="text-center" v-if="typeof weather.main != 'undefined'">
      <b-col class="background" v-for="weather in weathers" :key="weather.dt" >
        <div class="top">
          <p class="main-temperature">
            <b>{{ Math.round(weather.main.temp) }}°C</b>
          </p>
          <img src="../assets/regnerisch.png" class="icon" />
          <p class="max-grad">
            <b>{{ Math.round(weather.main.temp_max) }}°C</b>
          </p>
          <p class="min-grad">
            <b>{{ Math.round(weather.main.temp_min) }}°C</b>
          </p>
          <p class="day">
            <b>{{ getDayName(weather.dt) }}</b>
          </p>
          <p class="day-month">
            <i>
              <b>{{ dateBuilder(weather.dt) }}</b>
            </i>
          </p>
        </div>
      </b-col>
    </b-row>
    <div v-else style="margin-top: 40px">
		<h1>Error: Seite nicht gefunden</h1>
	</div>
	
	<!--radar-->
    <div class="container">
		<iframe 
		id="map-embed-iframe"
          frameborder="0"
          height="500px"
          width="100%"
          :src='embedURL'></iframe>
		  <!-- :v-model="location" -->
	</div>
  </div>
</template>

<script>
import API from '../API.js'
import Chart from 'chart.js';
import axios from 'axios';
import Diagramm from './Diagramm'
export default {
	 
	 


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
		 location:'',
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
</script>

<style >
.menu-leiste {
  margin-top: 20px;
}
.menu-button {
  width: 30px;
  height: 20px;
}
.city {
  margin: 0 auto;
  color: white;
  font-size: 20px;
}
.suchen {
  width: 25px;
  height: 23px;
}
.heute {
  background-color: #f37320;
  font-size: 18px;
  margin-top: 10px;
  padding-left: 5px;
}
#sidebar-right,
#sidebar-1 {
  background-color: black;
  padding-left: 10px;
}
.wetter-setting-icon {
  width: 13px;
  height: 13px;
  margin-right: 20px;
  margin-top: -2px;
}
.radar-icon {
  width: 14px;
  height: 14px;
  margin-right: 20px;
  margin-top: -3px;
}
.info-icon {
  width: 18px;
  height: 18px;
  margin-right: 17px;
  margin-top: -3px;
  margin-left: -2px;
}

#first-line {
  margin-top: 30px;
}

.hr {
  margin-top: -15px;
  margin-right: 10px;
}
.suchen-icon {
  margin-right: 120px;
  width: 30px;
  height: 30px;
}
.close-white-icon {
  margin-left: 250px;
  margin-top: 30px;
  margin-bottom: -20px;
}

.hr2 {
  margin-top: 8px;
  margin-right: 20px;
  margin-left: 20px;
}

.input {
  margin-right: 20px;
  margin-left: 35px;
  width: 200px;
  background-color: black;
  border: none;
  color: white;
}

.main-temp {
  margin-left: -60px;
}

/* nextday */
.background{
	background-color: #80ceff;
	padding: 0;
    margin: 0;
    width: 100%;
    min-height: 30vh;
	
}

.top{
	margin-top: 10px
}

.feuchtigkeit{
    margin-left: 5px;
}

.icon{
    margin-top:-10px;
	margin-bottom: 7px;
}

.max-grad{
     margin-left: 4px;
	 font-size: 23px;
}

.min-grad{
     margin-top: -17px;
	 margin-left: -2px;
	 
}

.day{
    margin-top: -8px;
}

.day-month{
    margin-top: -3px;
	margin-left: -2px;
	
}
.nph{
	margin-top: -45px;
	margin-left: 28px;
}
</style>
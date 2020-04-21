<template>
<div>
	<!--<p><strong><div class="row heute">Nächste 5 Tage</div></strong></p>
	<b-row class="text-center" >
		<b-col  class="background">
			<div class="top ">
			<p class="feuchtigkeit"><b >56% </b></p>
			<img src="../assets/regnerisch.png" class="icon">
			<p  class="max-grad"><b >5°C</b></p>
			<p  class="min-grad"><b >-1°C</b></p>
			<p  class="day"><b >Morgen</b></p>
			<p  class="day-month"><i><b>12/12</b></i></p>
			</div>
		</b-col>

		<b-col  class="background">
			<div class="top">
			<p  class="feuchtigkeit"><b>	56% </b></p>
			<img src="../assets/regnerisch.png" class="icon">
			<p class="max-grad"><b>5°C</b></p>
			<p  class="min-grad"><b>-1°C</b></p>
			<p class="day"><b >Morgen</b></p>
			<p  class="day-month"><i><b>12/12</b></i></p>
			</div>
		</b-col>

		<b-col  class="background">
			<div class="top">
			<p  class="feuchtigkeit"><b>	56% </b></p>
			<img src="../assets/regnerisch.png" class="icon">
			<p class="max-grad"><b>5°C</b></p>
			<p  class="min-grad"><b>-1°C</b></p>
			<p class="day"><b >Morgen</b></p>
			<p  class="day-month"><i><b>12/12</b></i></p>
			</div>
		</b-col>
          
	</b-row>
	<b-row class="text-center" v-for="weather in weathers" :key="weather.dt">
      <b-col class="background">
        <div class="top">
          <p class="main-temperature">
            <b>{{ formatTemperature(weather.main.temp) }}  °C</b>
          </p>
          <img src="../assets/regnerisch.png" class="icon" />
          <p class="max-grad">
            <b>{{ formatTemperature(weather.main.temp_max) }} °C</b>
          </p>
          <p class="min-grad">
            <b>{{ formatTemperature(weather.main.temp_min) }}  °C</b>
          </p>
          <p class="day">
            <b>{{ getDayName(weather.dt) }}</b>
          </p>
          <p class="day-month">
            <i>
              <b>{{ dateBuilder }}</b>
            </i>
          </p>
        </div>
      </b-col>
    </b-row>-->
</div>
</template>

<script>

export default {
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
         fetchWeather2() {
        axios
        .get(`${this.url_base}forecast?APPID=${this.api_key}&q=${this.query},ca&units=metric`)
        .then(response => {
          this.weathers = response.data.list.filter(weather => {
            return weather["dt_txt"].includes(PREFERRED_TIME);
          })
        })
    },
			submit() {
      this.fetchWeather2();	
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
	this.fetchWeather();
	 }
	};

</script>

<style >


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
</style>
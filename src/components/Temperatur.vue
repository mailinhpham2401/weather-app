<template>
<div>
  <!--<b-row v-if="typeof weather.main != 'undefined'">
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
            <b-col class="wind-number">{{ Math.round(weather.wind.speed) }} nph</b-col>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="1" sm="1" md="1" lg="1" xl="2" class="grad">
        <img src="../assets/grad.png" class="grad-size" />
      </b-col>

      <b-col cols="3" sm="3" md="2" lg="2" xl="1" class="sonne"></b-col>
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
	
};
</script>

<style >
.grad {
  padding:0;  
}
.grad-size {
  width: 60px;
  height: 140px;
}
.number {
  padding-left: 3%;
  font-size: 200px;
  color: white; 
} 


.sonne {
  /*width: 120px;*/
     padding-left: 5%;
     margin-top: 50px;
     height:200px;
     width:45px;
     border-radius: 200px 0 0 200px;
     background: #faa918;
	 border-left: 15px solid white;
	 border-top: 15px solid white;
	 border-bottom: 15px solid white;	 
}

.wrap {
  background-color: red;
}
.wetter-icon{
	
	margin-top:-400px;
     width:90px;
}
.max-temp{
   font-size: 24px;
   color:black;
   margin-top: -289px;
   margin-left: 27px;   
}
.min-temp{
	font-size: 15px;
    color:black;
	margin-top: -18px;
	margin-left: 27px;
}
.humidity{
	font-size: 21px;
    color:black;
	margin-top: -50px;
	margin-left: 73px;
	z-index:1;
}

.humidity-icon{
	margin-top: -10px;
	margin-left:12px;
	width:14px;
	height: 25px;
	
}
.wind-icon{
	margin-top: 10px;
	margin-left:12px;
	width:14px;
	height: 15px;
}
.humidity-number{
	color:black;
	font-size: 20px;
	margin-left: 27px;
	margin-top: -30px;
}
.wind-number{
	color:black;
	font-size: 20px;
	margin-left: 27px;
	margin-top: -3px;
	z-index: 1;
}
</style>
<template >
<b-row v-if="typeof weather.main != 'undefined'">
      <b-col cols="8" sm="8" md="9" lg="9" xl="8" class="number">
        <b-row>
          <b-col cols="4" sm="5" lg="6" xl="7"></b-col>
          <b-col cols="6" sm="6" lg="5" xl="4">
            <b-col cols="4" sm="8" lg="2"></b-col>
            <b-col cols="2" sm="4" lg="10">
              <p class="main-temp">{{ Math.round(weather.main.temp)}}</p>
			  <img :src="icons[weather.weather[0].main]" class="main-icon"/>
              <p class="max-temp">{{ Math.round(weather.main.temp_max) }}°C</p>
              <p class="min-temp">{{ Math.round(weather.main.temp_min) }}°C</p>
              <b-row>
                <img src="@/assets/humidity.png" class="humidity-icon" />
              </b-row>
              <b-row>
                <img src="@/assets/wind.png" class="wind-icon" />
              </b-row>
            </b-col>
            <b-col class="humidity">%</b-col>
            <b-col class="humidity-number">{{ Math.round(weather.main.humidity) }}</b-col>
            <b-col class="wind-number">
              <p>{{ Math.round(weather.wind.speed) }}</p>
              <p></p>
              <p class="nph">nph</p>
            </b-col>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="1" sm="1" md="1" lg="1" xl="3" class="grad">
        <img src="@/assets/grad.png" class="grad-size" />
      </b-col>

      <b-col cols="3" sm="3" md="2" lg="2" xl="1" class="sonne"></b-col>
    </b-row>
    <div v-else>
      <div :currentCity="currentCity()" v-if="typeof weather.main != 'undefined'">
        <b-col cols="8" sm="8" md="9" lg="9" xl="9" class="number">
          <b-row>
            <b-col cols="6" sm="6" lg="7" xl="7"></b-col>
            <b-col cols="6" sm="6" lg="5" xl="4">
              <b-col cols="4" sm="8" lg="2"></b-col>
              <b-col cols="2" sm="4" lg="10">
                <p class="main-temp">{{ Math.round(weather.main.temp)}}</p>
                <img :src="icons[weather.weather[0].main]" class="main-icon"/>
                <p class="max-temp">{{ Math.round(weather.main.temp_max) }}°C</p>
                <p class="min-temp">{{ Math.round(weather.main.temp_min) }}°C</p>
                <b-row>
                  <img src="@/assets/humidity.png" class="humidity-icon" />
                </b-row>
                <b-row>
                  <img src="@/assets/wind.png" class="wind-icon" />
                </b-row>
              </b-col>
              <b-col class="humidity">%</b-col>
              <b-col class="humidity-number">{{ Math.round(weather.main.humidity) }}</b-col>
              <b-col class="wind-number">
                <p>{{ Math.round(weather.wind.speed) }}</p>
                <p></p>
                <p class="nph">nph</p>
              </b-col>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="1" sm="1" md="1" lg="1" xl="2" class="grad">
          <img src="@/assets/grad.png" class="grad-size" />
        </b-col>

        <b-col cols="3" sm="3" md="2" lg="2" xl="1" class="sonne"></b-col>
      </div>
    </div>
</template>
<script src="./temperature.js"></script>
<style src="./temperature.scss" scoped lang="scss"></style>


<template >
<div>
    <b-row class="text-center" v-if="typeof weather.main != 'undefined'">
      <b-col class="background" v-for="weather in weathers" :key="weather.dt">
        <div class="top">
          <p class="main-temperature">
            <b>{{ Math.round(weather.main.temp) }}°C</b>
          </p>
          <img :src="icons[weather.weather[0].main]" class="nextday-icon"/>
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
              <b>{{ nextDays(weather.dt) }}</b>
            </i>
          </p>
        </div>
      </b-col>
    </b-row>
    <div v-else>
      <b-row
        :ForeCastOfCurrentCity="ForeCastOfCurrentCity()"
        class="text-center"
        v-if="typeof weather.main != 'undefined'"
      >
        <b-col class="background" v-for="weather in weathers" :key="weather.dt">
          <div class="top">
            <p class="main-temperature">
              <b>{{ Math.round(weather.main.temp) }}°C</b>
            </p>
            <img :src="icons[weather.weather[0].main]" class="nextday-icon"/>
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
                <b>{{ nextDays(weather.dt) }}</b>
              </i>
            </p>
          </div>
        </b-col>
      </b-row>
    </div>
 </div>

</template>
<script src="./nextdays.js"></script>
<style src="./nextdays.scss" scoped lang="scss"></style>


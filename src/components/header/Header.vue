<template>
  <div>
    <!--Navbar-->
    <div class="row d-flex justify-content-between menu-leiste">
      <a href="#/menu" v-b-toggle.sidebar-1>
        <img src="@/assets/menu_button.png" class="menu-button" />
      </a>
      <div class="city" v-if="typeof weather.main !='undefined'">
        <strong>{{ weather.name }}</strong>
      </div>
      <div class="city" v-else>
        <strong>Leipzig</strong>
      </div>
      <a href="#/suchen" v-b-toggle.sidebar-right>
        <img src="@/assets/suchen.png" class="suchen" />
      </a>
    </div>
    <!-- sidebar left-->
    <b-sidebar id="sidebar-1" title="WEATHER" shadow bg-variant="black" text-variant="white">
      <div class="px-3 py-2">
        <router-link to="/">
          <p id="first-line">
            <img src="@/assets/wetter_setting.png" class="wetter-setting-icon" />Wetter
          </p>
        </router-link>
        <hr style="background-color:white" class="hr" />
        <router-link to="/radar">
          <p>
            <img src="@/assets/radar.png" class="radar-icon" />Radar
          </p>
        </router-link>
        <hr style="background-color:white" class="hr" />
        <router-link to="/about">
          <p>
            <img src="@/assets/information.png" class="info-icon" />Über diesen App
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
      src="@/assets/suchen.png"
      class="suchen-icon"
      text-variant="white"
    >
      <div slot="title">
        <img src="@/assets/suchen.png" class="suchen-icon" />
      </div>
      <div class="px-3 py-2">
        <img src="@/assets/close_white.png" class="close-white-icon" @click="removeType()" />
        <input
          class="input"
          v-model="query"
          v-on:keyup.enter="fetchWeather(), fetchWeatherForecast(), getData(), updateLocation()"
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
              <img src="@/assets/regnerisch.png" class="wetter-icon" />
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
    </b-row>
    <div v-else>
      <div :class="currentCity" v-if="typeof weather.main != 'undefined'">
        <b-col cols="8" sm="8" md="9" lg="9" xl="9" class="number">
          <b-row>
            <b-col cols="6" sm="6" lg="7" xl="7"></b-col>
            <b-col cols="6" sm="6" lg="5" xl="4">
              <b-col cols="4" sm="8" lg="2"></b-col>
              <b-col cols="2" sm="4" lg="10">
                <p class="main-temp">{{ Math.round(weather.main.temp)}}</p>
                <img src="@/assets/regnerisch.png" class="wetter-icon" />
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
    <!-- end: appTemperatur -->

    <!--appDiagramm-->

    <div>
      <div class="alert alert-info" v-show="loading">Loading...</div>
      <div v-show="chart!=null">
        <canvas id="myChart"></canvas>
      </div>
    </div>

    <!--appNextdays-->
    <p>
      <strong>
        <div class="row heute">Nächste 5 Tage</div>
      </strong>
    </p>
    <b-row class="text-center" v-if="typeof weather.main !== 'undefined'">
      <b-col class="background" v-for="weather in weathers" :key="weather.dt">
        <div class="top">
          <p class="main-temperature">
            <b>{{ Math.round(weather.main.temp) }}°C</b>
          </p>
          <img src="@/assets/regnerisch.png" class="icon" />
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
      <span>Error: Seite nicht gefunden</span>
    </div>

    <!--radar-->
    <div class="container">
      <!-- <iframe id="map-embed-iframe" frameborder="0" height="500px" width="100%" :src="embedURL"></iframe> -->
    </div>
  </div>
</template>
<script src="./header.js"></script>
<style src="./header.scss" scoped lang="scss"></style>


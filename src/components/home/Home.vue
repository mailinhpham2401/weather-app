<template>
<b-container fluid >
	<div>
    <!--Navbar-->
    <div class="row d-flex justify-content-between menu-leiste">
      <b-button v-b-toggle.sidebar-left style="background:transparent; border:none">
        <img src="@/assets/menu_button.png" class="menu-button" />
      </b-button>
      <div class="city" v-if="typeof weather.main !='undefined'">
        <strong>{{ weather.name }}</strong>
      </div>
      <div class="city" v-else :currentCity="currentCity()">
        <strong>{{ weather.name }}</strong>
      </div>
      <b-button v-b-toggle.sidebar-right style="background:transparent; border:none">
        <img src="@/assets/suchen.png" class="suchen" />
      </b-button>
    </div>
    <!-- sidebar left-->
    <b-sidebar id="sidebar-left" title="WEATHER" shadow bg-variant="black" text-variant="white">
      <div class="px-3 py-2">
        <router-link to="/">
          <p id="first-line">
            <img src="@/assets/wetter_setting.png" class="wetter-setting-icon" />Wetter
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
      text-variant="white"
    >
      <div slot="title">
        <img src="@/assets/suchen.png" class="search-icon" />
      </div>
      <div class="px-3 py-2">
        <img src="@/assets/close_white.png" class="close-white-icon" @click="removeType()" />
        <input
          class="input"
          v-model="query"
          v-on:keyup.enter="fetchWeather(), fetchWeatherForecast(), getData()"
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
    <Temperature  :weather="weather"></Temperature>
    <!-- end: appTemperatur -->
    <!--appDiagramm-->   
	  <div v-if="typeof weather.main != 'undefined'" :getData="getData">		
        <canvas id="myChart"></canvas>
		</div>
      <div v-else>
		  <div v-if="typeof weather.main != 'undefined'"  :ChartDefault="ChartDefault()">
        <canvas id="myChart"></canvas>
		</div>
	  </div>
   
<Diagramm v-if="typeof weather.main != 'undefined'" :query="query"></Diagramm>
    <!--appNextdays-->
    <p>
      <strong>
        <div class="row heute">Nächste 5 Tage</div>
      </strong>
    </p>
    <b-row class="text-center" v-if="typeof weather.main != 'undefined'">
      <b-col class="background" v-for="weather in weathers" :key="weather.dt">
        <div class="top">
          <p class="main-temperature">
            <b>{{ Math.round(weather.main.temp) }}°C</b>
          </p>
          <img :src="icons[weather.weather[0].main]" class="nextday-icon"/>
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
            <p class="day">
              <b>{{ getDayName(weather.dt) }}</b>
            </p>
            <p class="day-month">
              <i>
                <b >{{ nextDays(weather.dt) }}</b>
              </i>
            </p>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
  	<NextDays></NextDays>
</b-container>
</template>

<script src="./home.js"></script>
<style src="./home.scss" scoped lang="scss"></style>
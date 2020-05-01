<template>
<b-container fluid >
		<!--menu button-->
           <div class="row d-flex justify-content-end menu-leiste">
		<!--sidebar-->
		<a href="#/radar-menu" v-b-toggle.sidebar-right><img src="@/assets/menu_button.png" class="menu-button" /></a>
           </div>
		<b-sidebar id="sidebar-right" title="WEATHER" right shadow bg-variant="black" text-variant="white">
      <div class="px-3 py-2">
        <router-link to="/"><p id="first-line"><img src="@/assets/wetter_setting.png" class="wetter-setting-icon">Wetter</p></router-link>
		<hr style="background-color:white" class="hr">
		<router-link to="/radar"><p><img src="@/assets/radar.png" class="radar-icon">Radar</p></router-link>
		<hr style="background-color:white" class="hr">
		<router-link to="/about"><p><img src="@/assets/information.png" class="info-icon">Über diesen App</p></router-link>
        <hr style="background-color:white" class="hr">
      </div>
    </b-sidebar>
	</b-container>

</template>
<script src="./radar.js"></script>
<style src="./radar.scss" scoped lang="scss"></style>


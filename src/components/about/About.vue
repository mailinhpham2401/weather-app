<template >
<b-container fluid >
	<!--menu button-->
	   <div class="row d-flex justify-content-between menu-leiste">
	<!--sidebar-->
	<b-row> 
		<b-col><img src="@/assets/information.png" class="info-icon"></b-col>
		<b-col class="about"><strong>About</strong></b-col>
	</b-row>
	<b-button v-b-toggle.sidebar-right style="background:transparent; border: none"><img src="@/assets/menu_button.png" class="menu-button" /></b-button>
	   </div>
	<b-sidebar id="sidebar-right" title="WEATHER" right shadow bg-variant="black" text-variant="white">
  <div class="px-3 py-2">
	<router-link to="/"><p id="first-line"><img src="@/assets/wetter_setting.png" class="wetter-setting-icon">Wetter</p></router-link>
	<hr style="background-color:white" class="hr">
	<router-link to="/about"><p><img src="@/assets/information.png" class="info-icon">Über diesen App</p></router-link>
	<hr style="background-color:white" class="hr">
  </div>
</b-sidebar>

<!-- content-->
	<b-row class="text-center" style="margin-top: 30px">
		<b-col >
			<img src="@/assets/logo_wetterapp.png" alt="Wetterapp_logo" style="background-color: white; border: 4px solid black;">
			<p style="margin-top: 10px">A free app</p>
		</b-col>
	</b-row>
	<b-row class="application" style="margin-top: 10px; margin-left: 100px; opacity: 50%">APPLICATION</b-row>
		<b-row style=" margin-left: 85px" >
			<b-col><strong>Version</strong></b-col>
			<b-col><div>1.0</div></b-col>
		</b-row>
		<b-row style=" margin-left: 85px">
			<b-col><strong>Author</strong></b-col>
			<b-col><div>Mai Linh Pham</div></b-col>
	</b-row>


	<b-row class="credits" style="margin-top: 10px; margin-left: 100px; opacity: 50%">CREDITS</b-row>
	<div style=" margin-left: 100px">
		<b-row>
			<b-col><strong>Forecast Data</strong></b-col>
			<b-col><a href="https://darksky.net" target="_blank">DarkSky</a></b-col>
		</b-row>
		<b-row>
			<b-col><strong>Maps/Geocoding</strong></b-col>
			<b-col><a href="https://www.mapbox.com" target="_blank">Mapbox</a></b-col>
		</b-row>
		<b-row>
			<b-col><strong>Map Tiles</strong></b-col>
			<b-col><a href="https://www.rainviewer.com" target="_blank">RainViewer</a></b-col>
		</b-row>
		<b-row>
			<b-col><strong>Logo Design</strong></b-col>
			<b-col><p>Mai Linh Pham</p></b-col>
		</b-row>
		<b-row>
			<b-col><strong>Icons Design</strong></b-col>
			<b-col><p>Mai Linh Pham</p></b-col>
		</b-row>
		</div>	
</b-container>
</template>
<script src="./about.js"></script>
<style src="./about.scss" scoped lang="scss"></style>


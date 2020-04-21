<template>
	<b-container fluid >
		<!--menu button-->
           <div class="row d-flex justify-content-end menu-leiste">
		<!--sidebar-->
		<a href="#/radar-menu" v-b-toggle.sidebar-right><img src="../assets/menu_button.png" class="menu-button" /></a>
           </div>
		<b-sidebar id="sidebar-right" title="WEATHER" right shadow bg-variant="black" text-variant="white">
      <div class="px-3 py-2">
        <router-link to="/"><p id="first-line"><img src="../assets/wetter_setting.png" class="wetter-setting-icon">Wetter</p></router-link>
		<hr style="background-color:white" class="hr">
		<router-link to="/radar"><p><img src="../assets/radar.png" class="radar-icon">Radar</p></router-link>
		<hr style="background-color:white" class="hr">
		<router-link to="/about"><p><img src="../assets/information.png" class="info-icon">Über diesen App</p></router-link>
        <hr style="background-color:white" class="hr">
      </div>
    </b-sidebar>
	</b-container>
</template>

<script>
export default {
	
}
</script>

<style >
.menu-leiste {
  margin-top: 20px;
}
#sidebar-right{
	background-color: black;
	padding-left: 10px;
	
}
.wetter-setting-icon{
	width: 13px;
	height: 13px;
	margin-right: 20px;
	margin-top: -2px;
}
.radar-icon{
	width: 14px;
	height: 14px;
	margin-right: 20px;
	margin-top: -3px;
}
.info-icon{
	width: 18px;
	height: 18px;
	margin-right: 17px;
	margin-top: -3px;
	margin-left: -2px;
	
}

#first-line{
	margin-top: 30px;
}

.hr{
	margin-top: -15px;
	margin-right: 10px;
}

</style>
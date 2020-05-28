<template>
<div v-if="typeof weather.main != 'undefined'" :getData="getData">		
        <canvas id="myChart"></canvas>
		</div>
      <div v-else>
		  <div v-if="typeof weather.main != 'undefined'"  :ChartDefault="ChartDefault()">
        <canvas id="myChart"></canvas>
		</div>
	  </div>
</template>
<script src="./diagramm.js"></script>
<style src="./diagramm.scss" scoped lang="scss"></style>




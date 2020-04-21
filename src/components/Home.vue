<template>
<b-container fluid >
	<Header></Header>
	<Temperatur></Temperatur>
	<Diagramm></Diagramm>
	<NextDays></NextDays>
</b-container>
</template>

<script>
import Header from './Header.vue';
import Diagramm from './Diagramm.vue';
import Temperatur from './Temperatur.vue';
import NextDays from './NextDays.vue';


export default {
	
	components: {
		Header,
		Diagramm,
		Temperatur,
		NextDays
	}
	
}
</script>

<style >
html body {
	background-color: #2e81c4
}
</style>
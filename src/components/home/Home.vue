<template>
<b-container fluid >
	<Header></Header>
	<Temperature></Temperature>
	<Diagramm></Diagramm>
	<NextDays></NextDays>
</b-container>
</template>

<script>
import Header from '../header/Header.vue';
import Diagramm from '../diagramm/Diagramm.vue';
import Temperature from '../temperature/Temperature.vue';
import NextDays from '../nextdays/NextDays.vue';


export default {
	
	components: {
		Header,
		Diagramm,
		Temperature,
		NextDays
	}
	
}
</script>

<style >

</style>
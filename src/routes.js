import Home from './components/home/Home.vue';
import Header from './components/header/Header.vue';
import Diagramm from './components/diagramm/Diagramm.vue';
import Radar from './components/radar/Radar.vue';
import Temperatur from './components/temperature/Temperatur.vue';
import NextDays from './components/nextdays/NextDays.vue';
import Error from './components/error/Error.vue';
import About from './components/about/About.vue';

export const routes = [
	{path: '', component: Home},
	{path: '/header', component: Header},
	{path: '/diagramm', component: Diagramm},
	{path: '/radar', component: Radar},
	{path: '/temperatur', component: Temperatur},
	{path: '/nextdays', component: NextDays},
	{path: '/about', component: About},
	{path: '*', component: Error}
	
]
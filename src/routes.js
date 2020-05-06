import Home from './components/home/Home.vue';
import Header from './components/header/Header.vue';
import Diagramm from './components/diagramm/Diagramm.vue';
import Temperature from './components/temperature/Temperature.vue';
import NextDays from './components/nextdays/NextDays.vue';
import Error from './components/error/Error.vue';
import About from './components/about/About.vue';

export const routes = [
	{path: '', component: Home},
	{path: '/header', component: Header},
	{path: '/diagramm', component: Diagramm},
	{path: '/temperature', component: Temperature},
	{path: '/nextdays', component: NextDays},
	{path: '/about', component: About},
	{path: '*', component: Error}
	
]
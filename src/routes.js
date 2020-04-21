import Home from './components/Home.vue';
import Header from './components/Header.vue';
import Diagramm from './components/Diagramm.vue';
import Radar from './components/Radar.vue';
import Temperatur from './components/Temperatur.vue';
import NextDays from './components/NextDays.vue';
import Error from './components/Error.vue';
import About from './components/About.vue';

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
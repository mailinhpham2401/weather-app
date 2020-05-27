import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueRouter from 'vue-router';
import App from './App.vue';
import {routes} from './routes';
import './custom.scss';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import moment from 'moment';
import store from './store/store'

Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'history',
	routes
});

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);
Vue.prototype.moment = moment

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')

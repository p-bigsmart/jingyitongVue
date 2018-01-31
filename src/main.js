// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
import Echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(Vuex);
Vue.prototype.$echarts = Echarts


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
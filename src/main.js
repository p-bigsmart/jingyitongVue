// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex';
import Echarts from 'echarts'
import VueCordova from 'vue-cordova'

Vue.use(VueCordova)
Vue.config.productionTip = false
Vue.use(Vuex);
Vue.prototype.$echarts = Echarts
console.log("555")
    /* eslint-disable no-new */
console.log(Vue.cordova);

Vue.cordova.on('deviceready', () => {
    alert('Cordova : device is ready !');
    console.log(Vue.cordova.barcodescanner)
});


// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
    var cordovaScript = document.createElement('script')
    cordovaScript.setAttribute('type', 'text/javascript')
    cordovaScript.setAttribute('src', 'cordova.js')
    document.body.appendChild(cordovaScript)
}

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    data: function() {
        return {
            cordova: Vue.cordova
        }
    }
})
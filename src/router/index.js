import Vue from 'vue'
import Router from 'vue-router'
import Index from 'src/components/index'
import Login from 'src/components/login'
import Welcome from 'src/components/welcome'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'welcome',
            component: Welcome
        },
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})
import Vue from 'vue'
import Router from 'vue-router'
import Index from 'src/components/index'
import Login from 'src/components/login'
import Welcome from 'src/components/welcome'
import Stationed from 'src/components/Stationed'
import GetStationed from 'src/components/GetStationed'
import SwitchEstate from 'src/components/switchEstate'

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
        },
        {
            path: '/stationed',
            name: 'stationed',
            component: Stationed
        },
        {
            path: '/getStationed',
            name: 'getStationed',
            component: GetStationed
        },
        {
            path: '/switchEstate',
            name: 'switchEstate',
            component: SwitchEstate
        }
    ]
})
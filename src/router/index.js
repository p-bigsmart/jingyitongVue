import Vue from 'vue'
import Router from 'vue-router'
import Index from 'src/components/index'
import Login from 'src/components/login'
import Welcome from 'src/components/welcome'
import Stationed from 'src/components/Stationed'
import GetStationed from 'src/components/GetStationed'
import SwitchEstate from 'src/components/switchEstate'
import ContractApproval from 'src/components/contractApproval'
import ContractDetails from 'src/components/contractDetails'
import Complaints from 'src/components/complaints'
import ComplaintsDetails from 'src/components/complaintsDetails'
import RepairProcessing from 'src/components/repairProcessing'
import RepairDetails from 'src/components/repairDetails'
import LicensePlate from 'src/components/licensePlate'
import ScanCodeReading from 'src/components/scanCodeReading'
import Count from 'src/components/count'

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
        },
        {
            path: '/count',
            name: 'count',
            component: Count
        },
        {
            path: '/contractApproval',
            name: 'contractApproval',
            component: ContractApproval
        },
        {
            path: '/contractDetails',
            name: 'contractDetails',
            component: ContractDetails
        },
        {
            path: '/complaints',
            name: 'complaints',
            component: Complaints
        },
        {
            path: '/complaintsDetails',
            name: 'complaintsDetails',
            component: ComplaintsDetails
        },
        {
            path: '/repairProcessing',
            name: 'repairProcessing',
            component: RepairProcessing
        },
        {
            path: '/repairDetails',
            name: 'repairDetails',
            component: RepairDetails
        },
        {
            path: '/licensePlate',
            name: 'licensePlate',
            component: LicensePlate
        },
        {
            path: '/scanCodeReading',
            name: 'scanCodeReading',
            component: ScanCodeReading
        }
    ]
})
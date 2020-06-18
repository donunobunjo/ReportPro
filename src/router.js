import Dashboard from './components/Dashboard.vue'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import DashboardHome from './components/DashboardHome.vue'
import Subject from './components/Subject.vue'
import Opt1 from './components/OptionOne.vue'
import Class from './components/Class.vue'
export default [
    {
        name:'home',
        path:'/',
        component:Home
    },
    {
        name:'register',
        path:'/register',
        component:Register
    },
    {
        name:'login',
        path:'/login',
        component:Login
    },
    {
        name:'dashboard',
        path:'/dashboard',
        component:Dashboard,
        children:[
            {path:'opt1',component:Opt1},
            {path:'/',component:DashboardHome},
            { path: 'subject', component:Subject },
            { path: 'class', component:Class }
        ]
    }
]
import Dashboard from './components/Dashboard.vue'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import DashboardHome from './components/DashboardHome.vue'
import Subject from './components/Subject.vue'
import Student from './components/Student.vue'
import Class from './components/Class.vue'
import Session from './components/Session.vue'
import Score from './components/Score.vue'
import ReportSheet from './components/ReportSheet.vue'
import SubjectSheet from './components/SubjectSheet.vue'
import Search from './components/Search.vue'
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
        // component:DashboardHome,
        children:[
            {path:'',component:DashboardHome},
            {path:'student',component:Student},
            { path: 'subject', component:Subject},
            { path: 'class', component:Class},
            { path:'session', component:Session},
            { path:'score', component:Score},
            { path:'termlyreport' ,component:ReportSheet},
            { path:'subjectsheet' ,component:SubjectSheet},
            { path:'search', component:Search}
        ],
        beforeEnter:function(to,from,next){
            if (localStorage.getItem('token')==null){
                //next(false)
                next({name:'login'})
            }
            else{
              next()
            }
        }
    }
]
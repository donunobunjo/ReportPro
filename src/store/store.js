import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import baseurl from '../components/baseURL'
Vue.use(Vuex)
Vue.use(VueAxios,Axios)

export default new Vuex.Store({
    state:{
        subjects:[],
        classes:[],
        sessions:[],
        students:[]
    },
    getters:{

    },
    mutations:{
        LOAD_SUBJECTS(state,payload){
            // console.log(payload.data.subjects)
            state.subjects=payload.data.subjects
        },
        LOAD_CLASSES(state,payload){
            // console.log(payload.data.classes)
            state.classes=payload.data.classes
        },
        LOAD_SESSIONS(state,payload){
            // console.log(payload.data.sessions)
            state.sessions= payload.data.sessions
            // console.log(state.sessions)
        },
        LOAD_STUDENTS(state,payload){
            state.students=payload.data.students
        }
    },
    actions:{
        async getSubjects({commit}){
            return commit('LOAD_SUBJECTS', await Axios.get(baseurl+'/subject'))
        },
        async getClasses({commit}){
            return commit('LOAD_CLASSES', await Axios.get(baseurl+'/class'))
        },
        async getSessions({commit}){
            // console.log('action')
            return commit('LOAD_SESSIONS', await Axios.get(baseurl+'/session'))
        },
        async getStudents({commit}){
            return commit('LOAD_STUDENTS', await Axios.get(baseurl+'/student'))
        }

    }
})
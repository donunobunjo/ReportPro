import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import baseurl from '../components/baseURL'
Vue.use(Vuex)
Vue.use(VueAxios,Axios)
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    state:{
        subjects:[],
        classes:[],
        sessions:[],
        students:[],
        scores:[],
        token: localStorage.getItem('token')||null,
        name : localStorage.getItem('name')||null,
        role : localStorage.getItem('role')||null,
        // token:'',
        // name:'',
        // role:'',
        // logged:false
    },
    getters:{

    },
    mutations:{
        LOAD_SUBJECTS(state,payload){
            state.subjects=payload.data.subjects
        },
        LOAD_CLASSES(state,payload){
            state.classes=payload.data.classes
        },
        LOAD_SESSIONS(state,payload){
            state.sessions= payload.data.sessions
        },
        LOAD_STUDENTS(state,payload){
            state.students=payload.data.students
        },
        LOAD_SCORES(state, payload){
            state.scores=payload.data.scores
        },
        REGISTER(state, payload){
            // console.log(payload.data.name)
            state.name=payload.data.name
            state.token=payload.data.token
            state.role=payload.data.role
        },
        LOGIN(state,payload){
            state.name=payload.data.name
            state.token=payload.data.token
            state.role=payload.data.role
        },
        LOGOUT(state){
            state.token = null
            state.name= null
            state.role=null
        },
        ADD_SUBJECT(state,payload){
            state.subjects.splice(0,0,payload.data.subject)
            state.subjects.sort((a, b) => (a.subject > b.subject) ? 1 :-1)
        },
       
    },
    actions:{
        async getSubjects({commit}){
            return commit('LOAD_SUBJECTS', await Axios.get(baseurl+'/subject'))
        },
        async getClasses({commit}){
            return commit('LOAD_CLASSES', await Axios.get(baseurl+'/class'))
        },
        async getSessions({commit}){
            return commit('LOAD_SESSIONS', await Axios.get(baseurl+'/session'))
        },
        async getStudents({commit}){
            return commit('LOAD_STUDENTS', await Axios.get(baseurl+'/student'))
        },
        async getScores({commit}){
            return commit('LOAD_SCORES', await Axios.get(baseurl+'/score'))
        },
        async addSubject({commit},subject){
            return commit('ADD_SUBJECT', await Axios.post(baseurl+'/subject',subject))
        },
        async updateSubject({commit},subject){
            return commit('UPDATE_SUBJECT', await Axios.put(baseurl+'/subject',subject))
        },
        register({commit},profile){
            return new Promise((resolve, reject) => {
                Axios.post(baseurl+'/register', profile)
                .then(resp => {
                  const token = resp.data.token
                  const name = resp.data.name
                  const role = resp.data.role
                  localStorage.setItem('token', token)
                  localStorage.setItem('name',name)
                  localStorage.setItem('role',role)
                  Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token
                  commit('REGISTER', resp)
                  resolve(resp)
                })
                .catch(err => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('name')
                  localStorage.removeItem('role')
                  reject(err)
                })
              })
            },
            login({commit},credentials){
                return new Promise((resolve, reject) => {
                    Axios.post(baseurl+'/login', credentials)
                    .then(resp => {
                      const token = resp.data.token
                      const name = resp.data.name
                      const role = resp.data.role
                      localStorage.setItem('token', token)
                      localStorage.setItem('name',name)
                      localStorage.setItem('role',role)
                      Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token
                      commit('LOGIN', resp)
                      resolve(resp)
                    })
                    .catch(err => {
                      localStorage.removeItem('token')
                      localStorage.removeItem('name')
                      localStorage.removeItem('role')
                      reject(err)
                    })
                  })
            },
            logout({commit}){
                return new Promise((resolve, reject) => {
                    commit('LOGOUT')
                    localStorage.removeItem('token')
                    localStorage.removeItem('name')
                    localStorage.removeItem('role')
                    delete Axios.defaults.headers.common['Authorization']
                    resolve()
                    reject()
                  })
            }
        },
    strict: debug
});
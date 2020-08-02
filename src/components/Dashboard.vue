<template>
    <div>
        <div class="container">
            <div class="row">
                <hr>
                <div class="dropdown">
                    <a id="dLabel" role="button" class="btn btn-primary" data-target="#" href="/">
                        Home
                        <span class="caret"></span>
                    </a>
                </div>
                <div class="dropdown">
                    <a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-primary" data-target="#"
                        href="/page.html">
                        Register
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                        <li>
                            <a href="/dashboard/student">New Student</a>
                        </li>
                    </ul>
                </div>
                <div class="dropdown">
                    <a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-primary" data-target="#"
                        href="#">
                        Setup
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                        <li>
                            <a href="/dashboard/subject">Subject</a>
                        </li>
                        <li>
                            <a href="/dashboard/class">Class</a>
                        </li>
                        <li>
                            <a href="/dashboard/session">Session</a>
                        </li>
                    </ul>
                </div>
                <div class="dropdown">
                    <a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-primary" data-target="#"
                        href="/page.html">
                        Exam/C.A.
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                        <li>
                            <a href="/dashboard/score">Enter Score</a>
                        </li>
                        
                    </ul>
                </div>
                <div class="dropdown">
                    <a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-primary" data-target="#"
                        href="/page.html">
                        Report
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                        <li>
                            <a href="/dashboard/termlyreport">Termly Report</a>
                        </li>
                        <li>
                            <a href="/dashboard/subjectsheet">Subject Sheet</a>
                        </li>
                    </ul>
                </div>
                <div class="dropdown">
                    <a id="dLabel" role="button" class="btn btn-primary" data-target="#" href="/dashboard/search">
                        Search
                        <span class="caret"></span>
                    </a>
                </div>
            </div>
        </div>
        <div>
             <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
  data(){
    return {
      routing:true,
      // spinner:true
    }
  },
  computed:{
    ...mapState(['scores'])
  },
  methods:{
    ...mapActions(['getStudents','getClasses','getSubjects','getSessions','getScores'])
  },
  beforeMount() {
      let token = localStorage.getItem('token')
        this.axios.defaults.headers.common['Content-Type'] = 'application/json'
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  mounted(){
      // if (this.scores.length<1){
            this.spinner=true
            this.getClasses()
              .then(()=>{
                this.getStudents()
              })
                .then(()=>{
                  this.getSubjects()
                })
                  .then(()=>{
                    this.getSessions()
                  })
                    .then(()=>{
                      this.getScores()
                    })
                      .then(()=>{
                        this.spinner=false
                      })
        // console.log('not loaded')                
      // }
      // else{
      //   console.log('loaded')
      // }
     
  }
}
</script>

<style scoped>
   .container{
       height: 100px;
   }
   #header .logo {
        color: #f6755e;
        font-family: "Pacifico", cursive;
        font-size: 2.5em;
        letter-spacing: 2px;
        margin-top: -5px;
        text-decoration: none;
        display: inline-block;
        /* font-size: 1.25em; */
        font-size: 2.50em;
        text-align: left;
    }
</style>
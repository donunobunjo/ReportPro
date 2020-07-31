<template>
  <div id="app">
    <div id="login">
      <!-- <router-link to="/login" class="cred">Login</router-link>
      <router-link to="/register" class="cred">Register</router-link> -->
    </div>
    <header id="header">
				<nav class="left">
          <!-- <a href="index.html" class="logo">ReportPro</a> -->
          <a href="/" class="logo">ReportPro</a>
          <router-link to="/login" class="cred" v-if="!token">Sign In</router-link>
          <router-link to="/register" class="cred" v-if="!token">Sign Up</router-link>
          <span v-if="token">Welcome, {{name}}</span>
          <router-link to="/dashboard" class="cred" v-if="token">DashBoard</router-link>
          <button @click.prevent="logout" class="btn btn-link" v-if="token">logout</button>
					<!-- <a href="#menu"><span>Menu</span></a> -->
				</nav>
				<!-- <a href="index.html" class="logo">ReportPro</a> -->
				<nav class="right">
					<!-- <router-link to="/login" class="cred" v-if="!token">Sign In</router-link>
          <router-link to="/register" class="cred" v-if="!token">Sign Up</router-link>
          <span v-if="token">Welcome, {{name}}</span>
          <router-link to="/dashboard" class="cred" v-if="token">DashBoard</router-link>
          <button @click.prevent="logout" class="btn btn-link" v-if="token">logout</button> -->
        </nav>
		</header>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'App',
    data(){
      return{
        
      }
    },
    computed:{
      ...mapState(['name','token','role', 'logged'])
    },
    methods:{
      logout(){
           this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({name:'home'})
        })
      }
    },
    // mounted(){
    //   console.log(this.name)
    // },
    beforeRouteEnter (to, from, next) { 
            if (localStorage.getItem('token')) {
                return next('/dashboard');
            }
            next();
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#login{
  text-align: right;
}
.cred{
  margin: 5px;
}
</style>

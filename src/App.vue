<template>
  <div id="app">
    <div id="login">
      <!-- <router-link to="/login" class="cred">Login</router-link>
      <router-link to="/register" class="cred">Register</router-link> -->
    </div>
    <header id="header">
				<nav class="left">
          <a href="index.html" class="logo">ReportPro</a>
					<!-- <a href="#menu"><span>Menu</span></a> -->
				</nav>
				<!-- <a href="index.html" class="logo">ReportPro</a> -->
				<nav class="right">
					<!-- <a href="#" class="button alt">Log in</a> -->
          <router-link to="/login" class="cred">Login</router-link>
          <router-link to="/register" class="cred">Register</router-link>
				</nav>
		</header>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
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

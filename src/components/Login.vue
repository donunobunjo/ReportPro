<template>
    <div class="container">
		<!-- <b-spinner type="grow" label="Busy" v-if="spinner"></b-spinner> -->
	<div class="d-flex justify-content-center h-h00">
		<div class="card" id="main">
			<div class="card-header">
				<h3>Sign In</h3>
				<!-- <b-spinner type="grow" label="Busy" v-if="spinner"></b-spinner> -->
				<span v-if="error.errMsg" class="err">{{error.errMsg}}</span>
			</div>
			<div class="card-body">
				<form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="icon fa-envelope input-group-text"></span>
						</div>
						<input type="email" class="form-control" placeholder="email" v-model="credentials.email"><br>
						<span v-if="error.errEmail" class="err">{{error.errEmail}}</span>
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="icon input-group-text fa-lock"></span>
						</div>
						<input type="password" class="form-control" placeholder="password" v-model="credentials.password"><br>
						<span v-if="error.errPassword" class="err">{{error.errPassword}}</span>
					</div>
					<div class="form-group">
						<!-- <input type="button" value="Sign In" class="btn btn-primary float-right" @click.prevent="login"> -->
						<button class="btn btn-primary float-right" @click.prevent="login">{{isSigningIn ? 'please Wait ...' : 'Sign In'}}</button>
					</div>
				</form>
			</div>
			
		</div>
	</div>
</div>
</template>


<script>
// import {mapActions} from 'vuex'
export default {
	data(){
		return{
			credentials:{
				email:'',
				password:''
			},
			error:{
				errEmail:'',
				errPassword:'',
				errMsg:''
			},
			// spinner:false,
			isSigningIn:false,
			// reg: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/'
		}
	},
	methods:{
		// ...mapActions(['login']),
		login(){
			if(this.credentials.email==''||this.credentials.email.trim()==''){
                this.error.errEmail='Enter your email'
                setTimeout(()=>{
                    this.error.errEmail=''
                },4000)
                return false 
			}
			// eslint-disable-next-line
			if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.credentials.email))
			{
				this.error.errEmail='Enter a valid email'
                setTimeout(()=>{
                    this.error.errEmail=''
                },4000)
                return false 
			}
			if(this.credentials.password==''||this.credentials.password.trim()==''){
                this.error.errPassword='Enter your password'
                setTimeout(()=>{
                    this.error.errPassword=''
                },4000)
				return false 
			}
			this.isSigningIn=true
			// this.spinner=true
			this.$store.dispatch('login', this.credentials)
                    .then((resp) => {
						if (resp.data.msg=='success'){
							// this.spinner=false
							this.$router.push({name:'dashboard'})
						}
					})
                    .catch(() => {
						//Invalid credentials
						this.error.errMsg='Unauthorized user'
						setTimeout(()=>{
							this.error.errMsg=''
						},10000)
						// this.spinner=false
						this.isSigningIn=false
					})
		}
	}
}
</script>

<style scoped>
/* #main{
    background-image: url("../assets/milkyway.jpeg");
} */
.err{
    color: red;
}
</style>
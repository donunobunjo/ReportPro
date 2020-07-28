<template>
    <div class="container">
		<b-spinner type="grow" label="Busy" v-if="spinner"></b-spinner>
		<span v-if="error.errMsg" class="err">{{error.errMsg}}</span>
	<div class="d-flex justify-content-center h-100">
		<div class="card" id="main">
			<div class="card-header">
				<h3>Sign Up</h3>
				
			</div>
			<div class="card-body">
				<form>
                    <div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="icon fa-user input-group-text"></span>
						</div>
						<input type="text" class="form-control" placeholder="user name" v-model="profile.name">
						<span v-if="error.errName" class="err">{{error.errName}}</span>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="icon fa-envelope input-group-text"></span>
						</div>
						<input type="email" class="form-control" placeholder="email" v-model="profile.email">
						<span v-if="error.errEmail" class="err">{{error.errEmail}}</span>
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="icon input-group-text fa-lock"></span>
						</div>
						<input type="password" class="form-control" placeholder="password" v-model="profile.password">
						<span v-if="error.errPassword" class="err">{{error.errPassword}}</span>
					</div>
                    <div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="icon input-group-text fa-lock"></span>
						</div>
						<input type="password" class="form-control" placeholder="confirm password" v-model="profile.cpassword">
						<span v-if="error.errCPassword" class="err">{{error.errCPassword}}</span>
					</div>
					<div class="form-group">
						<input type="button" value="Sign Up" class="btn btn-primary float-right" @click.prevent="register">
					</div>
				</form>
			</div>
			
		</div>
	</div>
</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	data(){
		return{
			profile:{
				name:'',
				email:'',
				password:'',
				cpassword:'',
				role:'user'
			},
			spinner:false,
			error:{
				errMsg:'',
				errName:'',
				errEmail:'',
				errPassword:'',
				errCPassword:''
			}
		}
	},
	methods:{
		...mapActions(['register']),
		register(){
			if(this.profile.name==''||this.profile.name.trim()==''){
                this.error.errName='Enter your name'
                setTimeout(()=>{
                    this.error.errName=''
                },4000)
                return false 
			}
			if(this.profile.email==''||this.profile.email.trim()==''){
                this.error.errEmail='Enter your email'
                setTimeout(()=>{
                    this.error.errEmail=''
                },4000)
                return false 
			}
			// eslint-disable-next-line
			if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.profile.email))
			{
				this.error.errEmail='Enter a valid email'
                setTimeout(()=>{
                    this.error.errEmail=''
                },4000)
                return false 
			}
			if(this.profile.password==''||this.profile.password.trim()==''){
                this.error.errPassword='Enter your password'
                setTimeout(()=>{
                    this.error.errPassword=''
                },4000)
                return false 
			}
			if(this.profile.password==''||this.profile.password.trim()==''){
                this.error.errPassword='Enter your password'
                setTimeout(()=>{
                    this.error.errPassword=''
                },4000)
                return false 
			}
			if(this.profile.cpassword==''||this.profile.cpassword.trim()==''){
                this.error.errCPassword='Confirm your password'
                setTimeout(()=>{
                    this.error.errCPassword=''
                },4000)
                return false 
			}
			if(this.profile.password!=this.profile.cpassword){
                this.error.errCPassword='Confirm does not match password'
                setTimeout(()=>{
                    this.error.errCPassword=''
                },4000)
                return false 
			}
			this.spinner=true
			this.$store.dispatch('register', this.profile)
            .then((resp) => {
				if(resp.data.msg=='success')
				{
					this.spinner=false
					console.log('no wahala')
					this.$router.push({name:'dashboard'})
				}
				else{
					this.spinner=false
					console.log('yawa don gassss 1')
				}
            })
            .catch(() => {
				//duplicates
				this.error.errMsg='A user with this email already exist'
                setTimeout(()=>{
                    this.error.errMsg=''
                },10000)
				this.spinner=false
            })
		}
	}
}
</script>
<style scoped>
	/* #main{ */
    /* height: 700px; */
    /* background-image: url("../assets/milkyway.jpeg"); */
    /* background-repeat: repeat-y; */
/* } */
.err{
    color: red;
}
</style>
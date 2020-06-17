<template>
    <div class="container">
	<div class="d-flex justify-content-center h-h00">
		<div class="card" id="main">
			<div class="card-header">
				<h3>Sign In</h3>
				
			</div>
			<div class="card-body">
				<form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="icon fa-envelope input-group-text"></span>
						</div>
						<input type="text" class="form-control" placeholder="email">
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="icon input-group-text fa-lock"></span>
						</div>
						<input type="password" class="form-control" placeholder="password">
					</div>
					<div class="form-group">
						<input type="submit" value="Login" class="btn btn-primary float-right login_btn">
					</div>
				</form>
			</div>
			
		</div>
	</div>
</div>
</template>


<script>
export default {
	
}
</script>

<style scoped>
#main{
    /* height: 700px; */
    background-image: url("../assets/milkyway.jpeg");
    /* background-repeat: repeat-y; */
}
</style>
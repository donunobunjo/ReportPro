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
						<input type="button" value="Login" class="btn btn-primary float-right">
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
    background-image: url("../assets/milkyway.jpeg");
}
</style>
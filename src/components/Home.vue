<template>
    <div>
        <!-- <h1>Home</h1> -->
        <section id="banner">
			<div class="content">
				<h1>Reporting made easy ...</h1>
				<p>With ReportPro & Examination Management System, <br />eliminate the unnecessary cost and paper wastage incurred during the examination process.</p>
				<ul class="actions">
					<li><a href="#one" class="button scrolly">Get Started</a></li>
				</ul>
			</div>
		</section>
        <section id="one" class="wrapper">
				<div class="inner flex flex-3">
					<div class="flex-item left">
						<div>
							<h3>About ReportPro</h3>
							<p>Easy, quick assessment and publishing of exam reports with instant alerts & notifications to parents.<br /> Flexibility for teachers to enter marks and update it whenever necessary..</p>
						</div>
						<div>
							<h3>Links to the repo</h3>
							<!-- <p>Tristique yonve cursus jam nulla quam<br /> loreipsu gravida adipiscing lorem</p> -->
							<ul>
								<li><a href="https://github.com/donunobunjo/ReportProAPI.git" target="_blank" >The API </a> with Laravel</li>
								<li><a href="https://github.com/donunobunjo/ReportPro.git" target="_blank">The Front end </a> with Vue </li>
							</ul>
						</div>
					</div>
					<div class="flex-item image fit round">
						<img src="../assets/pic01.jpg" alt="" />
					</div>
					<div class="flex-item right">
						<div>
							<h3>Work around</h3>
							<!-- <p>Sign Up<br /> Create Profiles for Subjects, Classes and School Sessions<br />Register Students<br />Enter student Continous assessments and exam scores</p> -->
							<ul>
								<li>Sign Up</li>
								<hr>
								<li>Create Profiles for Subjects, Classes and School Session</li>
								<hr>
								<li>Register Students</li>
								<hr>
								<li>Enter student Continous assessments and exam scores</li>
								<hr>
								<li>Generate termly or cummulative student's report</li>
							</ul>
						</div>
						<div>
							<h3>Tech Stack used to create ReportPro</h3>
							<ul>
								<li>Laravel</li>
								<hr>
								<li>VueJS</li>
								<hr>
								<li>Passport</li>
								<hr>
								<li>Rest API's</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    #banner {
		padding: 14em 0 12em 0;
		background-image: url(../assets/banner.jpg);
		background-size: cover;
		background-position: center top;
		background-repeat: no-repeat;
		text-align: center;
	}
</style>
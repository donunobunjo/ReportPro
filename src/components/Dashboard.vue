<template>
    <el-container style="height: 500px; border: 1px solid #eee">
      <!-- <b-spinner type="grow" label="Busy" v-if="spinner"></b-spinner> -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <!-- <el-menu :default-openeds="['1', '3']" :router="routing"> -->
    <el-menu :router="routing">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-custom"></i>Registration</template>
        <el-menu-item-group>
          <template slot="title">New</template>
          <el-menu-item index="1-1" route="/dashboard/student">Student</el-menu-item>
          <!-- <el-menu-item index="1-2" route="/dashboard/subject">Subject</el-menu-item>
          <el-menu-item index="1-3" route="/dashboard/class">Class</el-menu-item>
          <el-menu-item index="1-4" route="/dashboard/session">Session</el-menu-item> -->
          
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-setting"></i>Setup</template>
        <el-menu-item-group>
          <template slot="title">Settings</template>
          <el-menu-item index="2-1" route="/dashboard/subject">Subject</el-menu-item>
          <el-menu-item index="2-2" route="/dashboard/class">Class</el-menu-item>
          <el-menu-item index="2-3" route="/dashboard/session">Session</el-menu-item>
          <!-- <el-menu-item index="3-2">Option 2</el-menu-item> -->
        </el-menu-item-group>
        
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-notebook-1"></i>Exam/C.A.</template>
        <el-menu-item-group>
          <template slot="title">Score</template>
          <el-menu-item index="3-1" route="/dashboard/score">Enter Scores</el-menu-item>
          <!-- <el-menu-item index="2-2">Option 2</el-menu-item> -->
        </el-menu-item-group>
        <!-- <el-menu-item-group title="Group 2">
          <el-menu-item index="2-3">Option 3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">Option 4</template>
          <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-view"></i>Result</template>
        <el-menu-item-group>
          <template slot="title">Termly</template>
          <el-menu-item index="4-1" route="/dashboard/termlyreport">Termly Report</el-menu-item>
          <el-menu-item index="4-2" route="/dashboard/subjectsheet">Subject Sheet</el-menu-item>
          <!-- <el-menu-item index="3-2">Option 2</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>
    
    <el-main>
      <!-- <el-table :data="tableData">
        <el-table-column prop="date" label="Date" width="140">
        </el-table-column>
        <el-table-column prop="name" label="Name" width="120">
        </el-table-column>
        <el-table-column prop="address" label="Address">
        </el-table-column>

      </el-table> -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      routing:true,
      // spinner:true
    }
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
      this.spinner=true
      this.getClasses()
        .then(
          this.getStudents()
            .then(
              this.getSubjects()
                .then(
                  this.getSessions()
                    .then(
                      this.getScores()
                        .then(
                          this.spinner=false
                        )
                    )
                )
            )
        )
      
  }
}
</script>

<style scoped>
     .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
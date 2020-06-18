<template>
    <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <!-- <el-menu :default-openeds="['1', '3']" :router="routing"> -->
    <el-menu :router="routing">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>Registration</template>
        <el-menu-item-group>
          <template slot="title">New</template>
          <el-menu-item index="1-1" route="/dashboard/opt1">Student</el-menu-item>
          <el-menu-item index="1-2" route="/dashboard/subject">Subject</el-menu-item>
          <el-menu-item index="1-2" route="/dashboard/class">Class</el-menu-item>
          
        </el-menu-item-group>
        <!-- <el-menu-item-group title="Exam/C.A.">
          <el-menu-item index="1-3">Option 3</el-menu-item>
        </el-menu-item-group> -->
        <!-- <el-submenu index="1-4">
          <template slot="title">Option4</template>
          <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>Exam/C.A.</template>
        <el-menu-item-group>
          <template slot="title">Score</template>
          <el-menu-item index="2-1">Enter Scores</el-menu-item>
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
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>Result</template>
        <el-menu-item-group>
          <template slot="title">Termly</template>
          <el-menu-item index="3-1">Termly Report</el-menu-item>
          <!-- <el-menu-item index="3-2">Option 2</el-menu-item> -->
        </el-menu-item-group>
        <el-menu-item-group title="Cummulative">
          <el-menu-item index="3-3">Cummulative Report</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">Option 4</template>
          <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
        </el-submenu>
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
export default {
  data(){
    return {
      routing:true
    }
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
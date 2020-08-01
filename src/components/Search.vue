<template>
    <div>
        <!-- <h1>Search</h1> -->
        <div class="row justify-content-center">
            <div class="card card-default col-md-8">
                <div class="card-header">
                    <h3>Search</h3>
                     <div>
                        <el-input
                            placeholder="Search ..."
                            suffix-icon="el-icon-search"
                            v-model="searchQuery">
                        </el-input>
                    </div>
                </div>
                <div class="card-body">
                    <!-- <form>
                         <div class="wrapper" style="position: relative;">
                            <i class="fa fa-search" style="position: absolute; top: 10px; left: 165px;"></i>
                            <input type="text" placeholder="Search ..." v-model="searchQuery">
                        </div>
                    </form> -->
                   
                    
                    <hr>
                    <div class="tbl table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        Roll Number
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                     <th>
                                        Class
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="student in temp" :key='student.id'>
                                    <td>{{student.roll_num}}</td>
                                    <td>{{student.fullname}}</td>
                                    <td>{{student.class}}</td>
                                    <td>
                                        <el-button type="primary" icon="el-icon-info" circle @click.prevent="studInfo(student)"></el-button>
                                        <el-button type="primary" icon="el-icon-files" circle  @click.prevent="studScore(student)"></el-button>
                                    </td>
                                    <el-dialog v-if="viewID" :visible.sync="viewDialogVisible">
                                        <form>
                                            <div class="row form-group">
                                                <label for="activeStudRollNum">Roll Number</label>
                                                <input type="text" id="activeStudRollNum" class="form-control frminput" v-model='activeStudent.roll_num' readonly>
                                            </div>
                                            <div class="row form-group">
                                                <label for="activeStudName">Name</label>
                                                <input type="text" id="activeStudName" class="form-control frminput" v-model='activeStudent.fullname' readonly>
                                            </div>
                                            <div class="row form-group">
                                                <label for="activeStudGender">Gender</label>
                                                <input type="text" id="activeStudGender" class="form-control frminput" v-model='activeStudent.gender' readonly>
                                            </div>
                                            <div class="row form-group">
                                                <label for="activeStudDOB">Date of Birth(YYYY-MM-DD)</label>
                                                <input type="text" id="activeStudDOB" class="form-control frminput" v-model='activeStudent.dob' readonly>
                                            </div>
                                        </form>
                                    </el-dialog>
                                    <el-dialog v-if="scoreID" :visible.sync="scoreDialogVisible">
                                        <form>
                                            <div class="row form-group">
                                                <label for="activeScoreRollNum">Roll Number</label>
                                                <input type="text" id="activeScoreRollNum" class="form-control frminput" v-model='activeStudent.roll_num' readonly>
                                            </div>
                                            <div class="row form-group">
                                                <label for="activeScoreName">Name</label>
                                                <input type="text" id="activeScoreName" class="form-control frminput" v-model='activeStudent.fullname' readonly>
                                            </div>
                                        </form>
                                        <div class="tbl table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Session
                                                        </th>
                                                        <th>
                                                            Term
                                                        </th>
                                                        <th>
                                                            Class
                                                        </th>
                                                        <th>
                                                            Subject
                                                        </th>
                                                        <th>
                                                            1st CA
                                                        </th>
                                                        <th>
                                                            2nd CA
                                                        </th>
                                                        <th>
                                                            Exam
                                                        </th>
                                                        <th>
                                                            Total
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="score in activeScore" :key='score.id'>
                                                        <td>{{score.session}}</td>
                                                        <td>{{score.term}}</td>
                                                        <td>{{score.class}}</td>
                                                        <td>{{score.subject}}</td>
                                                        <td>{{score.first_ca}}</td>
                                                        <td>{{score.second_ca}}</td>
                                                        <td>{{score.exam}}</td>
                                                        <td>{{score.total}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-dialog>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            searchQuery:'',
            temp:[],
            viewDialogVisible:false,
            viewID:'',
            scoreDialogVisible:false,
            scoreID:'',
            activeStudent:{},
            activeScore:{}
        }
    },
    computed:{
        ...mapState(['students','scores'])
    },
    methods:{
        studInfo(student){
           // console.log(student)
           this.activeStudent=student
           this.viewID= student.id
           this.viewDialogVisible=true
        },
        studScore(student){
            // this.activeScore=student
            const studentsScore = this.scores.filter(score=>score.roll_num==student.roll_num)
            const studentScoreSum=studentsScore.map(score=>{
                return{
                    ...score,
                    total:score.first_ca+score.second_ca+score.exam
                }
            })
            // console.log(studentScoreSum)
            studentScoreSum.sort((a, b) => (a.session > b.session) ? 1 : (a.term === b.term) ? ((a.subject > b.subject) ? 1 : -1) : -1 )
            // console.log(studentScoreSum)
            this.activeScore=studentScoreSum
            this.activeStudent=student
            // console.log(this.activeScore)
            this.scoreID=student.id
            this.scoreDialogVisible=true
        }
    },
    created(){
        this.temp=this.students
    },
    watch:{
      searchQuery(){
          if(this.searchQuery.length>0){
              this.temp=this.students.filter((stud)=>{
                  //return prod.productname.toUpperCase().indexOf(this.searchQ.toUpperCase())>-1
                  return Object.keys(stud).some((key)=>{
                      let string = String(stud[key])
                      return string.toUpperCase().indexOf(this.searchQuery.toUpperCase())>-1
                  })
              })
          }
          else
          {
              this.temp=this.students
          }
      }
  }
   
}
</script>
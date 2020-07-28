<template>
    <div>
        <!-- <h1>Search</h1> -->
        <div class="row justify-content-center">
            <div class="card card-default col-md-12">
                <div class="card-header">
                    <h3>Search</h3>
                </div>
                <div class="card-body">
                    <form>
                         <div class="wrapper" style="position: relative;">
                            <i class="fa fa-search" style="position: absolute; top: 10px; left: 165px;"></i>
                            <input type="text" placeholder="Search ..." v-model="searchQuery">
                        </div>
                        <!-- <div class="form-row">
                            <div class="form-group col-md-8">
                                <input type="text" placeholder="Search ...">
                            </div>
                        </div> -->
                    </form>
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
                                        <el-button type="primary" icon="el-icon-search" circle @click.prevent="studInfo(student)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle  @click.prevent="studScore(student)"></el-button>
                                    </td>
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
        }
    },
    computed:{
        ...mapState(['students','scores'])
    },
    methods:{
        studInfo(student){
            console.log(student)
        },
        studScore(student){
            const studentsScore = this.scores.filter(score=>score.roll_num==student.roll_num)
            const studentScoreSum=studentsScore.map(score=>{
                return{
                    ...score,
                    total:score.first_ca+score.second_ca+score.exam
                }
            })
            // console.log(studentScoreSum)
            studentScoreSum.sort((a, b) => (a.session > b.session) ? 1 : (a.term === b.term) ? ((a.subject > b.subject) ? 1 : -1) : -1 )
            console.log(studentScoreSum)
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
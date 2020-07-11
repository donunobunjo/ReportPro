<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-12">
                <div class="card-header">
                    <h3>Termly Report Sheet</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <span v-if="error.errParameter" class="err">{{error.errParameter}}</span>
                    </div>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                Session
                                <select id="state" class="form-control" v-model="session">
                                    <option selected disabled value="">Session ...</option>
                                    <option v-for="sesion in sessions" :key="sesion.id">
                                        {{sesion.session}}
                                    </option>
                                </select>
                            </div>
                             <div class="form-group col-md-3">
                                Term
                                <select id="state" class="form-control" v-model="term">
                                    <option selected disabled value="">Term ...</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                             <div class="form-group col-md-3">
                                Class
                                <select id="classs" class="form-control" v-model="clas">
                                    <option selected disabled value="">Class ...</option>
                                    <option v-for="classs in classes" :key="classs.id">
                                        {{classs.class}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <el-button type="success" icon="el-icon-check"  @click="generate" circle class="float-right">Generate</el-button>
                            </div>
                        </div>
                    </form>
                    <hr>
                    <hr>
                    <div class="tbl table-responsive">
                        
                        <table class="table" v-for="stud in report" :key="stud.roll_num">
                            <hr style="height:4px;border-width:0;color:blue;background-color:blue">
                            <thead>
                               <!-- <tr style="text-align:center;">
                                    <th>.</th>
                                    <th>.</th>
                                    <th>.</th>
                                    <th>.</th>
                                    <th>.</th>
                                    <th>.</th>
                                </tr> -->
                            </thead>
                            <tbody>
                              <tr>
                                  <td>Roll Number:</td>
                                  <td>{{stud.roll_num}}</td>
                              </tr>
                              <tr>
                                  <td>Name:</td>
                                  <td>{{stud.fullname}}</td>
                              </tr>  
                              <tr>
                                  <td>Session:</td>
                                  <td>{{stud.session}}</td>
                                  <td>Term:</td>
                                  <td>{{stud.term}}</td>
                              </tr>
                              <tr>
                                  <td>Class</td>
                                  <td>{{stud.class}}</td>
                              </tr>
                              <tr>
                                  <table>
                                        <thead>
                                          <tr style="text-align:center;">
                                            <th>
                                                Subject
                                            </th>
                                            <th>
                                                FirstCA
                                            </th>
                                            <th>
                                                SecondCA
                                            </th>
                                            <th>
                                                Exam
                                            </th>
                                            <th>
                                                Total
                                            </th>
                                            <th>
                                                Position
                                            </th>
                                          </tr>
                                        </thead>
                                      <tbody>
                                          <tr v-for="score in stud.scores" :key="score.subject">
                                              <td>{{score.subject}}</td>
                                              <td>{{score.first_ca}}</td>
                                              <td>{{score.second_ca}}</td>
                                              <td>{{score.exam}}</td>
                                              <td>{{score.total}}</td>
                                              <td>{{score.position}}/{{score.numOfStudent}}</td>
                                          </tr>
                                      </tbody>
                                  </table>
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
import {mapActions,mapState} from 'vuex'
// import baseurl from './baseURL'
// import swal from 'sweetalert';
export default {
    data(){
        return {
           term:'',
           session:'',
           clas:'',
           error:{
               errParameter:''
           },
           report:[]
            
        }
    },
    computed:{
        ...mapState(['students','classes','subjects','sessions','scores'])
    },
    mounted(){
        this.getClasses()
        this.getStudents()
        this.getSubjects()
        this.getSessions()
        this.getScores()
    },
    methods:{
        ...mapActions(['getStudents','getClasses','getSubjects','getSessions','getScores']),
        
        generate(){
            if (this.session==''||this.term==''||this.clas==''){
                // this.error.errParameter='oppppppppps'
                this.error.errParameter='You need to select from all the parameters'
                setTimeout(()=>{
                    this.error.errParameter=''
                },4000)
                return false 
            }
            else{
                const studentsScore = this.scores.filter(score=>score.session==this.session && score.class==this.clas && score.term==this.term) 
                const studentsInClass = this.students.filter(stud=>stud.class==this.clas)
                // // const subjects = this.subjects
                const trimStudentsInClass= studentsInClass.map(stud=>{
                    return {
                       id:stud.id,
                       roll_num:stud.roll_num,
                       fullname:stud.fullname,
                       class:stud.class,
                       scores:[]
                    }
                })
                const sumStudentsScore=studentsScore.map(score=>{
                     return{
                         roll_num:score.roll_num,
                         fullname:score.fullname,
                         subject:score.subject,
                         session:score.session,
                         term:score.term,
                         first_ca:score.first_ca,
                         second_ca:score.second_ca,
                         exam:score.exam,
                         total:score.first_ca+score.second_ca+score.exam
                     }
                 })
                // console.log(sumStudentsScore)
                this.subjects.forEach(function(subject){
                    let position = 1
                    // let numOfStudent
                    const subjTaken = sumStudentsScore.filter(score=>score.subject==subject.subject)
                    if(subjTaken.length>0){
                        subjTaken.sort((a, b) => {return b.total -a.total})
                        // console.log(subjTaken)
                        const numOfStudent=subjTaken.length
                        subjTaken.forEach(function(scr){
                            let student= trimStudentsInClass.find(stud=>stud.roll_num==scr.roll_num)
                            let scrs={}
                            scrs.subject=scr.subject
                            scrs.first_ca=scr.first_ca
                            scrs.second_ca=scr.second_ca
                            scrs.exam=scr.exam
                            scrs.total=scr.total
                            scrs.position = position
                            scrs.numOfStudent=numOfStudent
                            student.session=scr.session
                            student.term=scr.term
                            student.scores.push(scrs)
                            position= position+1
                        })
                    }
                })
                //  console.log(trimStudentsInClass)
                this.report=trimStudentsInClass
                console.log(this.report)
            }
        }
        
    }
}
</script>

<style scoped>
    .frminput{
            border-radius: 30px;
    }
    .err{
        color: red;
    }
    .right{
        text-align: right;
    }
    .left{
        text-align: left;
    }
</style>
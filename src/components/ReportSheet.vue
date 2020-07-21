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
                    <div v-for="stud in report" :key="stud.roll_num">
                        Roll Number:{{stud.roll_num}}<br>
                        Name:{{stud.fullname}}<br>
                        Session:{{stud.session}}<br>
                        Term:{{stud.term}}<br>
                        Class:{{stud.class}}<br>
                        Total Score:{{stud.gTotal}}<br>
                        Overall Position:{{stud.grandPosition}}&nbsp;&nbsp;of&nbsp;&nbsp;{{stud.noInClass}}
                                <div class="tbl table-responsive">    
                                    <table class="table">
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
                                              <td>{{score.position}}&nbsp;&nbsp;of&nbsp;&nbsp;{{score.numOfStudent}}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                                </div>  
                    <hr style="height:4px;border-width:0;color:blue;background-color:blue">
                    </div>
                    <hr style="height:4px;border-width:0;color:blue;background-color:blue">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
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
    // mounted(){
    //     this.getClasses()
    //     this.getStudents()
    //     this.getSubjects()
    //     this.getSessions()
    //     this.getScores()
    // },
    methods:{
        // ...mapActions(['getStudents','getClasses','getSubjects','getSessions','getScores']),
        
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
                    let currentPosition = 0
                    let counter=1
                    let currentTotal=-1
                    let bracket=false
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


                            if (currentTotal== scr.total){
                                bracket=true
                                counter=counter+1
                                scrs.position=currentPosition
                            }
                            else{
                                if(bracket){
                                    scrs.position=currentPosition+counter
                                    counter=1
                                }
                                else{
                                    scrs.position=currentPosition+1
                                }
                                
                            }
                            currentPosition=scrs.position
                            currentTotal = scrs.total

                            // scrs.position = position
                            scrs.numOfStudent=numOfStudent
                            student.session=scr.session
                            student.term=scr.term
                            student.scores.push(scrs)
                        })
                    }
                })
                let gCurrentPosition = 0
                let gCounter=1
                let gCurrentTotal=-1
                let gBracket=false
                let gPosition=0
                let noInClass= trimStudentsInClass.length
                const grandTotal = trimStudentsInClass.map(stud=>{
                    let gTot = stud.scores.reduce(function(previous,next){
                        return previous+next.total
                    },0)
                    return{
                        ...stud,
                        gTotal:gTot,
                        noInClass:noInClass
                    }
                })
                grandTotal.sort((a,b)=>{return b.gTotal-a.gTotal})
                const reportSheet = grandTotal.map(score=>{
                    if (gCurrentTotal==score.gTotal){
                        gBracket=true
                        gCounter=gCounter+1
                        gPosition=gCurrentPosition
                    }
                    else{
                        if(gBracket){
                            gPosition=gCurrentPosition+gCounter
                            gCounter=1
                        }
                        else{
                            gPosition=gCurrentPosition+1
                        }
                    }
                    gCurrentPosition=gPosition
                    gCurrentTotal=score.gTotal
                    return{
                        ...score,
                        grandPosition:gPosition
                    }
                })
                this.report=reportSheet

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
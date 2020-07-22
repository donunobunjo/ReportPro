<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-12">
                <div class="card-header">
                    <h3>Subject Score Sheet</h3>
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
                             <div class="form-group col-md-2">
                                Term
                                <select id="state" class="form-control" v-model="term">
                                    <option selected disabled value="">Term ...</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                Class
                                <select id="classs" class="form-control" v-model="clas">
                                    <option selected disabled value="">Class ...</option>
                                    <option v-for="classs in classes" :key="classs.id">
                                        {{classs.class}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                Subject
                                <select id="classs" class="form-control" v-model="subject">
                                    <option selected disabled value="">Subject ...</option>
                                    <option v-for="subject in subjects" :key="subject.id">
                                        {{subject.subject}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <el-button type="success" icon="el-icon-check"  @click="generate" circle class="float-right">Generate</el-button>
                            </div>
                        </div>
                    </form>
                    <hr>
                        <div class="tbl table-responsive">    
                                    <table class="table">
                                        <thead>
                                          <tr style="text-align:center;">
                                            <th>
                                                Roll Number
                                            </th>
                                            <th>
                                                Name
                                            </th>
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
                                          <tr v-for="score in report" :key="score.roll_num">
                                              <td>{{score.roll_num}}</td>
                                              <td>{{score.fullname}}</td>
                                              <td>{{score.subject}}</td>
                                              <td>{{score.first_ca}}</td>
                                              <td>{{score.second_ca}}</td>
                                              <td>{{score.exam}}</td>
                                              <td>{{score.total}}</td>
                                              <td>{{score.position}}&nbsp;&nbsp;of&nbsp;&nbsp;{{score.noInClass}}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                                </div> 
                    <hr>
                       
                                
                    <!-- <hr style="height:4px;border-width:0;color:blue;background-color:blue"> -->
                    </div>
                    <!-- <hr style="height:4px;border-width:0;color:blue;background-color:blue"> -->
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
           term:'',
           session:'',
           clas:'',
           subject:'',
           error:{
               errParameter:''
           },
           report:[]
        }
    },
    computed:{
        ...mapState(['students','classes','subjects','sessions','scores'])
    },
    methods:{
        generate(){
            if (this.session==''||this.term==''||this.clas==''||this.subject==''){
                this.error.errParameter='You need to select from all the parameters'
                setTimeout(()=>{
                    this.error.errParameter=''
                },4000)
                return false 
            }
            else{
                const studentsScore = this.scores.filter(score=>score.session==this.session && score.class==this.clas && score.term==this.term && score.subject==this.subject)
                // console.log(studentsScore)
                const studentsTotalScore=studentsScore.map(score=>{
                    return {
                        ...score,
                        total:score.first_ca+score.second_ca+score.exam
                    }

                })
                studentsTotalScore.sort((a,b)=>{return b.total-a.total})
                let currentPosition = 0
                let counter=1
                let currentTotal=-1
                let bracket=false
                let position=0
                let noInClass= studentsScore.length
                const studentsPosition = studentsTotalScore.map(score=>{
                    if (currentTotal==score.total){
                        bracket=true
                        counter=counter+1
                        position=currentPosition
                    }
                    else{
                        if(bracket){
                            position=currentPosition+counter
                            counter=1
                        }
                        else{
                            position=currentPosition+1
                        }
                    }
                    currentPosition=position
                    currentTotal=score.total
                    return {
                        ...score,
                        position:position,
                        noInClass:noInClass
                    }
                })
                // console.log(studentsPosition)
                studentsPosition.sort((a,b)=>{return a.fullname-b.fullname})
                this.report = studentsPosition
            }
        }
    }
}
</script>

<style scoped>
     .err{
        color: red;
    }
</style>
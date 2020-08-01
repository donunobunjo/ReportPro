<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-8">
                <div class="card-header">
                    <h3>Enter Students Scores</h3>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                Session
                                <select id="state" class="form-control" @change="change" v-model="Sscore.session">
                                    <option selected disabled value="">Session ...</option>
                                    <option v-for="sesion in sessions" :key="sesion.id">
                                        {{sesion.session}}
                                    </option>
                                </select>
                            </div>
                             <div class="form-group col-md-2">
                                Term
                                <select id="state" class="form-control" @change="change" v-model="Sscore.term">
                                    <option selected disabled value="">Term ...</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                             <div class="form-group col-md-2">
                                Class
                                <select id="classs" class="form-control" @change="change" v-model="Sscore.clas">
                                    <option selected disabled value="">Class ...</option>
                                    <option v-for="classs in classes" :key="classs.id">
                                        {{classs.class}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                Subject
                                <select id="subject" class="form-control" @change="change" v-model="Sscore.subject">
                                    <option selected disabled value="">Subject ...</option>
                                    <option v-for="subject in subjects"  :key="subject.id">
                                        {{subject.subject}}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <span v-if="error.errParameters" class="err">{{error.errParameters}}</span>
                            </div>
                            <!-- <div class="form-group col-md-2">
                                <el-button type="success" icon="el-icon-check" circle class="float-right"></el-button>
                            </div> -->
                        </div>
                    </form>
                    <hr>
                    <form id="frm">
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="rollNum">Roll Number</label>
                                <input type="text" class="form-control" id="rollNum" @blur="rollLeave" @focus="rollEnter" v-model="Sscore.rollNumber" placeholder="Roll number ..." @input="Sscore.rollNumber=$event.target.value.toUpperCase()">
                                <span v-if="error.errRollNum" class="err">{{error.errRollNum}}</span>
                            </div>
                             <div class="form-group col-md-8">
                                <label>Name</label>
                                <input type="text" readonly v-model="Sscore.studentName">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="firstassessment">1st Assessment</label>
                                <input type="number" class="form-control" id="firstassessment" v-model.number="Sscore.first_ca" placeholder="1st Assessment ...">
                                <span v-if="error.errFirstCA" class="err">{{error.errFirstCA}}</span>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="secondassessment">2nd Assessment</label>
                                <input type="number" class="form-control" id="secondassessment" v-model.number="Sscore.second_ca" placeholder="2nd Assessment ...">
                                <span v-if="error.errSecondCA" class="err">{{error.errSecondCA}}</span>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="exam">Exam</label>
                                <input type="number" class="form-control" id="exam" v-model.number="Sscore.exam" placeholder="Exam ...">
                                <span v-if="error.errExam" class="err">{{error.errExam}}</span>
                            </div>
                            <!-- <span v-if="error.errEmpty" class="err">{{error.errEmpty}}</span> -->
                            <div class="col-md-3">
                                <el-button type="success" @click="add" icon="el-icon-check" circle class="float-right">Add</el-button>
                            </div>
                        </div>
                    </form>
                    

                    <hr>
                    <div class="tbl table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        Roll#
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        1st Assessment
                                    </th>
                                    <th>
                                        2nd Assessment
                                    </th>
                                    <th>
                                        Exam
                                    </th>
                                    <th>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="score in subjectScores" :key="score.id">
                                    <td>
                                        {{score.roll_num}}
                                    </td>
                                     <td>
                                        {{score.fullname}}
                                    </td>
                                    <td>
                                        {{score.first_ca}}
                                    </td>
                                    <td>
                                        {{score.second_ca}}
                                    </td>
                                    <td>
                                        {{score.exam}}
                                    </td>
                                     <td>
                                        <el-button type="primary" icon="el-icon-edit" circle @click.prevent="edit(score)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle  @click.prevent="destroy(score)"></el-button>
                                    </td>
                                    <el-dialog v-if="editID" :visible.sync="editDialogVisible">
                                        <h3>Edit student score</h3>
                                        <form>
                                            <div class="row form-group">
                                                <label for="currentFirstCA">First Assessment</label>
                                                <input type="number" id="currentFirstCA" class="form-control frminput" placeholder="First Assessment ..." v-model.number='currentScore.first_ca'>
                                                <span v-if="error.errCurrentFirstCA" class="err">{{error.errCurrentFirstCA}}</span>
                                            </div>
                                            <div class="row form-group">
                                                <label for="currentSecondCA">Second Assessment</label>
                                                <input type="number" id="currentSecondCA" class="form-control frminput" placeholder="Second Assessment ..." v-model.number='currentScore.second_ca'>
                                                <span v-if="error.errCurrentSecondCA" class="err">{{error.errCurrentSecondCA}}</span>
                                            </div>
                                             <div class="row form-group">
                                                <label for="currentExam">Exam</label>
                                                <input type="number" id="currentExam" class="form-control frminput" placeholder="Exam ..." v-model.number='currentScore.exam'>
                                                <span v-if="error.errCurrentExam" class="err">{{error.errCurrentExam}}</span>
                                            </div>
                                            <div>
                                                <el-button type="primary" icon="el-icon-close" circle class="float-right dia" @click.prevent='cancel'></el-button>
                                                <el-button type="primary" icon="el-icon-check" circle class="float-right dia" @click.prevent="update(currentScore)"></el-button>
                                            </div>
                                        </form>
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
import baseurl from './baseURL'
import swal from 'sweetalert';
export default {
    data(){
        return {
           
            // current scores being entered
            subjectScores:[],
            Sscore:{
                session:'',
                term:'',
                clas:'',
                subject:'',
                rollNumber:'',
                studentName:'',
                first_ca:'',
                second_ca:'',
                exam:''
            },
            error:{
                errRollNum:'',
                // errEmpty:''
                errFirstCA:'',
                errSecondCA:'',
                errExam:'',
                errCurrentFirstCA:'',
                errCurrentSecondCA:'',
                errCurrentExam:'',
                errParameters:''
            },
            spinner:false,
            editID:'',
            initialScore:{},
            currentScore:{},
            editDialogVisible:false
        }
    },
    computed:{
        ...mapState(['students','classes','subjects','sessions','scores'])
    },
    methods:{
        change(){
            // console.log(this.scores)
            if (this.Sscore.session==''||this.Sscore.term==''||this.Sscore.clas==''||this.Sscore.subject==''){
                return false
            }
            else{
                this.subjectScores = this.scores.filter(score=>score.session==this.Sscore.session && score.term==this.Sscore.term && score.class==this.Sscore.clas && score.subject==this.Sscore.subject)
            }
        },
        add(){
            if (this.Sscore.session==''||this.Sscore.term==''||this.Sscore.clas==''||this.Sscore.subject==''){
                this.error.errParameters='Select from all the parameters above'
                setTimeout(()=>{
                    this.error.errParameters=''
                },4000)
                return false
            }

            if(this.Sscore.rollNumber==''||this.Sscore.rollNumber.trim()==''){
                this.error.errRollNum='Enter a Roll number'
                setTimeout(()=>{
                    this.error.errRollNum=''
                },4000)
                return false 
            }
            const rollNumInput = this.students.filter(stud=>stud.roll_num==this.Sscore.rollNumber && stud.class==this.Sscore.clas)
            if(rollNumInput.length<1){
                this.error.errRollNum='This roll number those not belong to this class'
                setTimeout(()=>{
                    this.error.errRollNum=''
                },4000)
                return false
            }
            const scoreInput = this.scores.filter(score=>score.roll_num==this.Sscore.rollNumber && score.class==this.Sscore.clas && score.session==this.Sscore.session && score.term==this.Sscore.term && score.subject==this.Sscore.subject)
            if(scoreInput.length>0){
                this.error.errRollNum='Score for this student has been entered, you can go and edit'
                setTimeout(()=>{
                    this.error.errRollNum=''
                },4000)
                return false
            }

            if(this.Sscore.first_ca==''||this.Sscore.first_ca.trim=='')
            {
                this.Sscore.first_ca=0
                
            }
            else if(this.Sscore.first_ca<0||this.Sscore.first_ca>20){
                this.error.errFirstCA='First C.A. can only be between 0 and 20'
                setTimeout(()=>{
                    this.error.errFirstCA=''
                },4000)
                return false
            }

            if(this.Sscore.second_ca==''||this.Sscore.second_ca.trim=='')
            {
                this.Sscore.second_ca=0
            }
            else if(this.Sscore.second_ca<0||this.Sscore.second_ca>20){
                this.error.errSecondCA='Second C.A. can only be between 0 and 20'
                setTimeout(()=>{
                    this.error.errSecondCA=''
                },4000)
                return false
            }

            if(this.Sscore.exam==''||this.Sscore.exam.trim=='')
            {
                this.Sscore.exam=0
            }
            else if(this.Sscore.exam<0||this.Sscore.exam>60){
                this.error.errExam='Exam can only be between 0 and 60'
                setTimeout(()=>{
                    this.error.errExam=''
                },4000)
                return false
            }
            
            this.axios.post(baseurl+'/score',this.Sscore)
            .then((res)=>{
                this.scores.splice(0,0,res.data.score)
                this.subjectScores.splice(0,0,res.data.score)
                this.Sscore.rollNumber=''
                this.Sscore.studentName=''
                this.Sscore.first_ca =''
                this.Sscore.second_ca=''
                this.Sscore.exam=''
            })
        },
        edit(score){
            this.editID= score.id
            this.initialScore=score
            this.currentScore.id =score.id
            this.currentScore.first_ca= score.first_ca
            this.currentScore.second_ca = score.second_ca
            this.currentScore.exam = score.exam
             this.editDialogVisible=true
            
        },
        update(score){
            if(this.currentScore.first_ca==''||this.currentScore.first_ca.trim=='')
            {
                this.currentScore.first_ca=0
            }
            else if(this.currentScore.first_ca<0||this.currentScore.first_ca>20){
                this.error.errCurrentFirstCA='First C.A. can only be between 0 and 20'
                setTimeout(()=>{
                    this.error.errCurrentFirstCA=''
                },4000)
                return false
            }

            if(this.currentScore.second_ca==''||this.currentScore.second_ca.trim=='')
            {
                this.currentScore.second_ca=0
            }
            else if(this.currentScore.second_ca<0||this.currentScore.second_ca>20){
                this.error.errCurrentSecondCA='Second C.A. can only be between 0 and 20'
                setTimeout(()=>{
                    this.error.errCurrentSecondCA=''
                },4000)
                return false
            }

            if(this.currentScore.exam==''||this.currentScore.exam=='')
            {
                this.currentScore.exam=0
            }
            else if(this.currentScore.exam<0||this.currentScore.exam>60){
                this.error.errCurrentExam='Second C.A. can only be between 0 and 60'
                setTimeout(()=>{
                    this.error.errCurrentExam=''
                },4000)
                return false
            }
            this.axios.put(baseurl+'/score/'+score.id,this.currentScore)
            .then(res=>{
                this.scores.splice(this.scores.indexOf(this.initialScore), 1,res.data.newscore)
                this.subjectScores.splice(this.subjectScores.indexOf(this.initialScore),1,res.data.newscore)
                this.editDialogVisible=false
            })
        },
        destroy(score){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this score!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    this.axios.delete(baseurl+'/score/'+score.id)
                    .then((res)=>{
                       if (res.data.message=='Score deleted successfully'){
                         this.scores.splice(this.scores.indexOf(score), 1)
                         this.subjectScores.splice(this.subjectScores.indexOf(score), 1)
                        }
                    })
                    swal("Student deleted successfully!", {
                    icon: "success",
                    });
                }
               
            });
        },
        cancel(){
            this.editDialogVisible=false
        },
        rollLeave(){
            const rollNum = this.students.filter(stud=>stud.roll_num==this.Sscore.rollNumber && stud.class==this.Sscore.clas)
            if (rollNum.length>0){
                this.Sscore.studentName= rollNum[0].fullname
            }
            else{
                this.error.errRollNum='This roll number those not belong to this class'
                setTimeout(()=>{
                    this.error.errRollNum=''
                },4000)
                return false 
            }
        },
        rollEnter(){
            this.Sscore.studentName = ''
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
</style>
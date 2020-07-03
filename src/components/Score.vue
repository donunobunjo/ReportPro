<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-12">
                <div class="card-header">
                    <h3>Enter Students Scores</h3>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                Session
                                <select id="state" class="form-control" @change="change" v-model="Sscore.session">
                                    <option selected disabled value="">Select the session ...</option>
                                    <option v-for="sesion in sessions" :key="sesion.id">
                                        {{sesion.session}}
                                    </option>
                                </select>
                            </div>
                             <div class="form-group col-md-2">
                                Term
                                <select id="state" class="form-control" @change="change" v-model="Sscore.term">
                                    <option selected disabled value="">Select the term ...</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                             <div class="form-group col-md-2">
                                Class
                                <select id="classs" class="form-control" @change="change" v-model="Sscore.clas">
                                    <option selected disabled value="">Select the class ...</option>
                                    <option v-for="classs in classes" :key="classs.id">
                                        {{classs.class}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                Subject
                                <select id="subject" class="form-control" @change="change" v-model="Sscore.subject">
                                    <option selected disabled value="">Select the subject ...</option>
                                    <option v-for="subject in subjects"  :key="subject.id">
                                        {{subject.subject}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <el-button type="success" icon="el-icon-check" circle class="float-right"></el-button>
                            </div>
                        </div>
                    </form>
                    <hr>
                    <form id="frm">
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="rollNum">Roll Number</label>
                                <input type="text" class="form-control" id="rollNum" @blur="rollLeave" @focus="rollEnter" v-model="Sscore.rollNumber" placeholder="Roll number ...">
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
                            </div>
                            <div class="form-group col-md-3">
                                <label for="secondassessment">2nd Assessment</label>
                                <input type="number" class="form-control" id="secondassessment" v-model.number="Sscore.second_ca" placeholder="2nd Assessment ...">
                            </div>
                            <div class="form-group col-md-3">
                                <label for="exam">Exam</label>
                                <input type="number" class="form-control" id="exam" v-model.number="Sscore.exam" placeholder="Exam ...">
                            </div>
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
                                            </div>
                                            <div class="row form-group">
                                                <label for="currentSecondCA">Second Assessment</label>
                                                <input type="number" id="currentSecondCA" class="form-control frminput" placeholder="Second Assessment ..." v-model.number='currentScore.second_ca'>
                                            </div>
                                             <div class="row form-group">
                                                <label for="currentExam">Exam</label>
                                                <input type="number" id="currentExam" class="form-control frminput" placeholder="Exam ..." v-model.number='currentScore.exam'>
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
import {mapActions,mapState} from 'vuex'
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
    mounted(){
        this.getClasses()
        this.getStudents()
        this.getSubjects()
        this.getSessions()
        this.getScores()
    },
    methods:{
        ...mapActions(['getStudents','getClasses','getSubjects','getSessions','getScores']),
        change(){
            if (this.Sscore.session==''||this.Sscore.term==''||this.Sscore.clas==''||this.Sscore.subject==''){
                return false
            }
            else{
                this.subjectScores = this.scores.filter(score=>score.session==this.Sscore.session && score.term==this.Sscore.term && score.class==this.Sscore.clas && score.subject==this.Sscore.subject)
                // console.log(test)
            }
        },
        add(){
            this.axios.post(baseurl+'/score',this.Sscore)
            .then((res)=>{
                // console.log(res.data.student)
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
            //  console.log(score)
            this.editID= score.id
            this.initialScore=score
            this.currentScore.id =score.id
            // this.currentScore.rollNumber = score.rollNumber
            // this.currentScore.studentName = score.studentName
            this.currentScore.first_ca= score.first_ca
            this.currentScore.second_ca = score.second_ca
            this.currentScore.exam = score.exam
            this.editDialogVisible=true
        },
        update(score){
            console.log(score)
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
            console.log(this.initialScore)
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
            console.log(this.currentScore)


            // this.axios.put(baseurl+'/score/'+score.id,this.currentScore)
            // .then(res=>{
            //     this.scores.splice(this.scores.indexOf(this.initialScore), 1,res.data.newscore)
            //     this.subjectScores.splice(this.subjectScores.indexOf(this.initialScore),1,res.data.newscore)
            //     this.editDialogVisible=false
            // })
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
                // console.log('found')
                this.Sscore.studentName= rollNum[0].fullname
            }
            else{
                // console.log('not found')
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
</style>
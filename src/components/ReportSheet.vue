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
           }
            // // current scores being entered
            // subjectScores:[],
            // Sscore:{
            //     session:'',
            //     term:'',
            //     clas:'',
            //     subject:'',
            //     rollNumber:'',
            //     studentName:'',
            //     first_ca:'',
            //     second_ca:'',
            //     exam:''
            // },
            // error:{
            //     errRollNum:'',
            //     // errEmpty:''
            //     errFirstCA:'',
            //     errSecondCA:'',
            //     errExam:'',
            //     errCurrentFirstCA:'',
            //     errCurrentSecondCA:'',
            //     errCurrentExam:''
            // },
            // spinner:false,
            // editID:'',
            // initialScore:{},
            // currentScore:{},
            // editDialogVisible:false
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
                // const studentsInClass = this.students.filter(stud=>stud.class==this.clas)
                // const subjects = this.subjects
                console.log(studentsScore)
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
</style>
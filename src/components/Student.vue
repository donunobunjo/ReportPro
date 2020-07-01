<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-12">
                <div class="card-header">
                    <h3>Register Student</h3>
                </div>
                <div class="card-body">
                    <form id="frm">
                        <div class="row form-group">
                            <label for="rollNum">Roll Number</label>
                            <input type="text" id="rollNum" class="form-control frminput" placeholder="Roll Number ..." v-model='student.roll_num'>
                        </div>
                        <div class="row form-group">
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" class="form-control frminput" placeholder="Full Name ..." v-model='student.fullname'>
                        </div>
                        <div class="row form-group">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="male" value="Male" v-model="student.gender">
                                <label class="form-check-label" for="male">Male</label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="female" value="Female" v-model="student.gender">
                                <label class="fo    rm-check-label" for="female">Female</label>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label for="dob">Date of Birth</label>
                            <input type="date" id="dob" class="form-control frminput" v-model="student.dob" >
                        </div>
                        <div class="row form-group">
                            <label for="class">Class</label>
                            <select id="state" class="form-control" @change="change" v-model='student.class' >
                                <option selected disabled value="">Select a class ...</option>
                                <option v-for="classs in classes" :value="classs.class" :key="classs.class">
                                    {{classs.class}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <el-row>
                                <b-spinner type="grow" label="Busy" v-if="spinner"></b-spinner>
                                <el-button type="success" @click="add" icon="el-icon-check" circle class="float-right">Add</el-button>
                            </el-row>>
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
                                        Class
                                    </th>
                                    <th>
                                        DOB(yyyy-mm-dd)
                                    </th>
                                    <th>
                                        Gender
                                    </th>
                                     <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="student in studs" :key="student.id">
                                    <td>
                                        {{student.roll_num}}
                                    </td>
                                     <td>
                                        {{student.fullname}}
                                    </td>
                                    <td>
                                        {{student.class}}
                                    </td>
                                    <td>
                                        {{student.dob}}
                                    </td>
                                    <td>
                                        {{student.gender}}
                                    </td>
                                     <td>
                                        <el-button type="primary" icon="el-icon-edit" circle @click.prevent="edit(student)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle  @click.prevent="destroy(student)"></el-button>
                                    </td>
                                    <el-dialog v-if="editID" :visible.sync="editDialogVisible">
                                        <h3>Edit student information</h3>
                                        <form>
                                            <div class="row form-group">
                                                <label for="currentRollNum">Roll Number</label>
                                                <input type="text" id="currentRollNum" class="form-control frminput" placeholder="Roll Number ..." v-model='currentStudent.roll_num'>
                                            </div>
                                            <div class="row form-group">
                                                <label for="currentFullName">Full Name</label>
                                                <input type="text" id="currentFullName" class="form-control frminput" placeholder="Full Name ..." v-model='currentStudent.fullname'>
                                            </div>
                                            <div class="row form-group">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="currentGender" id="currentMale" value="Male" v-model="currentStudent.gender">
                                                    <label class="form-check-label" for="currentMale">Male</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="currentGender" id="currentFemale" value="Female" v-model="currentStudent.gender">
                                                    <label class="fo    rm-check-label" for="currentFemale">Female</label>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <label for="currentDob">Date of Birth</label>
                                                <input type="date" id="currentDob" class="form-control frminput" v-model="currentStudent.dob" >
                                            </div>
                                            <div class="row form-group">
                                                <label for="currentClass">Class</label>
                                                <select id="currentClass" class="form-control" @change="change" v-model='currentStudent.class' >
                                                    <option selected disabled value="">Select a class ...</option>
                                                    <option v-for="classs in classes" :value="classs.class" :key="classs.class">
                                                        {{classs.class}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <el-button type="primary" icon="el-icon-close" circle class="float-right dia" @click.prevent='cancel'></el-button>
                                                <el-button type="primary" icon="el-icon-check" circle class="float-right dia" @click.prevent="update(currentStudent)"></el-button>
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
            student:{
                roll_num:'',
                fullname:'',
                dob:'',
                class:'',
                gender:'Male',
                active:1
            },
            //current students being registered
            studs:[],
            spinner:false,
            editID:'',
            initialStudent:{},
            currentStudent:{},
            editDialogVisible:false
        }
    },
    computed:{
        ...mapState(['students','classes'])
    },
    mounted(){
        this.getClasses()
        this.getStudents()
        
    },
    methods:{
        ...mapActions(['getStudents','getClasses']),
        change(){
            // console.log('changeeeeee')
        },
        add(){
            // console.log(this.students)
            this.axios.post(baseurl+'/student',this.student)
            .then((res)=>{
                // console.log(res.data.student)
                this.students.splice(0,0,res.data.student)
                this.studs.splice(0,0,res.data.student)
                this.student.roll_num=''
                this.student.fullname=''
                this.student.dob =''
                this.student.class=''
                this.student.gender='Male'
            })
        },
        edit(student){
            // console.log('edit')
            this.editID= student.id
            this.initialStudent=student
            this.currentStudent.id =student.id
            this.currentStudent.roll_num = student.roll_num
            this.currentStudent.fullname = student.fullname
            this.currentStudent.dob = student.dob
            this.currentStudent.class = student.class
            this.currentStudent.gender = student.gender
            this.editDialogVisible=true
        },
        update(student){
            this.axios.put(baseurl+'/student/'+student.id,this.currentStudent)
            .then(res=>{
                this.students.splice(this.students.indexOf(this.initialStudent), 1,res.data.newstudent)
                this.studs.splice(this.studs.indexOf(this.initialStudent),1,res.data.newstudent)
                this.editDialogVisible=false
            })
        },
        destroy(student){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this student!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    this.axios.delete(baseurl+'/student/'+student.id)
                    .then((res)=>{
                       if (res.data.message=='Student deleted successfully'){
                         this.students.splice(this.students.indexOf(student), 1)
                         this.studs.splice(this.studs.indexOf(student), 1)
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
        }
    }
}
</script>

<style scoped>
    .frminput{
            border-radius: 30px;
    }
</style>
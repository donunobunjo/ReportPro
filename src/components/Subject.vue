<template>
    <div>
        <!-- <div class="row col-md-12">
            .
        </div> -->
        <div class="row justify-content-center">
            <div class="card card-default col-md-10">
                <div class="card-header">
                    <h3>Setup new subject</h3>
                </div>
                <div class="card-body">
                    <form id="frm">
                        <div class="row form-group">
                            <label for="subject">Subject</label>
                            <span class="ast">*</span>
                            <input type="text" id="subject" class="form-control frminput" placeholder="New subject ..." v-model.trim='subject.subject' @input="subject.subject=$event.target.value.toUpperCase()">
                            <span v-if="error.errSubject" class="err">{{error.errSubject}}</span>
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
                                <tr style="text-align:center;">
                                    <th>
                                        Available Subjects
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="subject in subjects" :key='subject.id'>
                                    <td>
                                        {{subject.subject}}
                                    </td>
                                    <td>
                                        <el-button type="primary" icon="el-icon-edit" circle @click.prevent="edit(subject)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle  @click.prevent="destroy(subject)"></el-button>
                                    </td>
                                    <el-dialog v-if="editID" :visible.sync="editDialogVisible">
                                        <form>
                                            <div class="row form-group">
                                                <label for="currentSubject">Subject</label>
                                                <input type="text" id="currentSubject" class="form-control frminput" placeholder="Subject ..." v-model='currentSubject.subject' @input="currentSubject.subject=$event.target.value.toUpperCase()">
                                                <span v-if="error.errCurrentSubject" class="err">{{error.errCurrentSubject}}</span>
                                            </div>
                                            <div>
                                                <el-button type="primary" icon="el-icon-close" circle class="float-right dia" @click.prevent='cancel'></el-button>
                                                <el-button type="primary" icon="el-icon-check" circle class="float-right dia" @click.prevent="update(currentSubject)"></el-button>
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
import baseurl from './baseURL';
import swal from 'sweetalert';
import {mapState,mapActions} from 'vuex'
export default {
    data () {
        return {
            subject:{
                subject:''
            },
            error:{
                errSubject:'',
                errCurrentSubject:''
            },
            spinner:false,
            editID:'',
            initialSubject:{},
            currentSubject:{},
            editDialogVisible:false
        }
    },
    computed:{
        ...mapState(['subjects']),
        
    },
    methods:{
        ...mapActions(['addSubject']),
        add(){
            if(this.subject.subject==''||this.subject.subject.trim()==''){
                this.error.errSubject='Enter a subject'
                setTimeout(()=>{
                    this.error.errSubject=''
                },4000)
                return false 
            }
            const subjectInput = this.subjects.filter(sub=>sub.subject==this.subject.subject.trim())
            if(subjectInput.length>0){
                this.error.errSubject='Subject already exist'
                setTimeout(()=>{
                    this.error.errSubject=''
                },4000)
                return false 
            }
            this.spinner=true
            // this.axios.post(baseurl+'/subject',this.subject)
            // .then((res)=>{
            //     this.subjects.splice(0,0,res.data.subject)
            //     this.subjects.sort((a, b) => (a.subject > b.subject) ? 1 :-1)
            //     this.subject.subject=''
            //     this.spinner=false
            // })
            this.addSubject(this.subject)
             .then(()=>{
                 this.spinner=false
                 this.subject.subject=''
             })
        },
        edit(subject){
            this.editID= subject.id
            this.initialSubject=subject
            this.currentSubject.id =subject.id
            this.currentSubject.subject = subject.subject
            this.editDialogVisible=true
        },
        update(subject){
            if(this.currentSubject.subject==''||this.currentSubject.subject.trim()==''){
                this.error.errCurrentSubject='Enter a subject'
                setTimeout(()=>{
                    this.error.errCurrentSubject=''
                },4000)
                return false 
            }
            const subjectInput = this.subjects.filter(sub=>sub.subject==this.currentSubject.subject.trim())
            if(subjectInput.length>0){
                this.error.errCurrentSubject='Subject already exist'
                setTimeout(()=>{
                    this.error.errCurrentSubject=''
                },4000)
                return false 
            }
            this.axios.put(baseurl+'/subject/'+subject.id,this.currentSubject)
            .then(res=>{
                this.subjects.splice(this.subjects.indexOf(this.initialSubject), 1,res.data.newsubject);
                this.editDialogVisible=false
            })
        },
        cancel(){
            this.editDialogVisible=false
        },
        destroy(subject){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this subject!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    this.axios.delete(baseurl+'/subject/'+subject.id)
                    .then((res)=>{
                       if (res.data.message=='Subject Deleted successfully'){
                         this.subjects.splice(this.subjects.indexOf(subject), 1);
                        }
                    })
                    swal("Subject deleted successfully!", {
                    icon: "success",
                    });
                } 
            });

        },
    },

}
</script>

<style scoped>
    .frminput{
            border-radius: 30px;
    }
    .err,.ast{
        color: red;
    }
    .dia{
        margin-bottom: 20px;
    }
    .success{
        color: green;
    }
</style>
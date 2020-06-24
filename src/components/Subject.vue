<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-8">
                <div class="card-header">
                    <h3>Register new subject</h3>
                </div>
                <div class="card-body">
                    <form id="frm">
                        <div class="row form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" class="form-control frminput" placeholder="New subject ..." v-model='subject.subject' ref="subj">
                            <span v-if="error.errSubject" class="err">{{error.errSubject}}</span>
                        </div>
                        <div class="form-group">
                            <!-- <input type="button" value="Add" @click="add" class="btn btn-primary float-right"> -->
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
                                        <el-button type="primary" icon="el-icon-edit" circle></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle  @click="destroy(subject)"></el-button>
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
import baseurl from './baseURL';
import swal from 'sweetalert';
export default {
    data () {
        return {
            subject:{
                subject:''
            },
            error:{
                errSubject:''
            },
            subjects:[],
            spinner:false
        }
    },
    methods:{
        add(){
            if(this.subject.subject==''){
                this.error.errSubject='Enter a subject'
                setTimeout(()=>{
                    this.error.errSubject=''
                },4000)
                return false 
            }
            this.spinner=true
            this.axios.post(baseurl+'/subject',this.subject)
            .then((res)=>{
                this.subjects.splice(0,0,res.data.subject)
                this.subject.subject=''
                this.spinner=false
                this.$refs.subj.focus()
                
            })
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
                } else {
                    //swal("Your imaginary file is safe!");
                }
            });

        }
    },
    mounted(){
        this.axios.get(baseurl+'/subject')
        .then((res)=>{
            this.subjects = res.data.subjects
        })
        .catch((err)=>{
            console.log(err)
        })
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
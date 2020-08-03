<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-10">
                <div class="card-header">
                    <h3>Setup new class</h3>
                </div>
                <div class="card-body">
                    <form id="frm">
                        <div class="row form-group">
                            <label for="class">Class</label><span class="ast">*</span>
                            <input type="text" id="class" class="form-control frminput" placeholder="New class ..." v-model='classs.classs' @input="classs.classs=$event.target.value.toUpperCase()">
                            <span v-if="error.errClass" class="err">{{error.errClass}}</span>
                        </div>
                        <div class="form-group">
                            <el-row>
                                <b-spinner type="grow" label="Busy" v-if="spinner"></b-spinner>
                                <el-button type="success" @click="add" icon="el-icon-check" circle class="float-right">{{isSaving ? 'please Wait ...' : 'Save'}}</el-button>
                            </el-row>>
                        </div>
                    </form>
                    <hr>
                    <div class="tbl table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr style="text-align:center;">
                                    <th>
                                        Available Classes
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="classs in classes" :key='classs.id'>
                                   <td>{{classs.class}}</td>
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
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            classs:{
                classs:''
            },
             error:{
                errClass:'',
                errCurrentClass:''
            },
            editID:'',
            initialClass:{},
            currentClass:{},
            editDialogVisible:false,
            spinner:false,
            isSaving:false
        }   
    },
    computed:{
        ...mapState(['classes'])
    },
    methods:{
        ...mapActions(['getClasses']),
        add(){
            if(this.classs.classs==''||this.classs.classs.trim()==''){
                this.error.errClass='Enter a class'
                setTimeout(()=>{
                    this.error.errClass=''
                },4000)
                return false 
            }
            const classInput = this.classes.filter(sub=>sub.class==this.classs.classs.trim())
            if(classInput.length>0){
                this.error.errClass='Class already exist'
                setTimeout(()=>{
                    this.error.errClass=''
                },4000)
                return false 
            }
            this.spinner=true
            this.isSaving=true
            this.axios.post(baseurl+'/class',this.classs)
            .then((res)=>{
                this.classes.splice(0,0,res.data.class)
                this.classes.sort((a, b) => (a.class > b.class) ? 1 :-1)
                this.classs.classs=''
                this.spinner=false
                this.isSaving=false
            })
        },
    }
    
}
</script>

<style scoped>
    .frminput{
            border-radius: 30px;
    }
    .err,.ast{
        color: red;
    }
</style>
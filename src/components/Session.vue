<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-8">
                <div class="card-header">
                    <h3>Setup new session</h3>
                </div>
                <div class="card-body">
                    <form id="frm">
                        <div class="row form-group">
                            <label for="subject">Session</label>
                            <input type="text" id="session" class="form-control frminput" placeholder="New session ..." v-model='sesion.sesion' @input="sesion.sesion=$event.target.value.toUpperCase()"> 
                            <span v-if="error.errSession" class="err">{{error.errSession}}</span>
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
                                        Available Sessions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="sesion in sessions" :key="sesion.id">
                                    {{sesion.session}}
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
import {mapState} from 'vuex'
export default {
    data(){
        return{
             sesion:{
                sesion:''
            },
             error:{
                errSession:'',
                errCurrentSession:''
            },
            editID:'',
            initialSession:{},
            currentSession:{},
            editDialogVisible:false,
            spinner:false,
        }
    },
    computed:{
        ...mapState(['sessions'])
    },
    methods:{
        add(){
            if(this.sesion.sesion==''||this.sesion.sesion.trim()==''){
                this.error.errSession='Enter a Session'
                setTimeout(()=>{
                    this.error.errSession=''
                },4000)
                return false 
            }
            const sessionInput = this.sessions.filter(sub=>sub.session==this.sesion.sesion.trim())
            if(sessionInput.length>0){
                this.error.errSession='session already exist'
                setTimeout(()=>{
                    this.error.errSession=''
                },4000)
                return false 
            }
            this.spinner=true
            this.axios.post(baseurl+'/session',this.sesion)
            .then((res)=>{
                this.sessions.splice(0,0,res.data.session)
                this.sessions.sort((a, b) => (a.session > b.session) ? 1 :-1)
                this.sesion.sesion=''
                this.spinner=false
            })
        },
    },
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
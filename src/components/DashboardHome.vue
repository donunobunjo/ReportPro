<template>
    <div id='main'>
        <h1>DashBoard</h1>
        <b-spinner type="grow" label="Busy" v-if="spinner"></b-spinner>
        <span v-if="msg">Please wait ...</span>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            spinner:true,
            msg:true
        }
    },
    methods:{
    ...mapActions(['getStudents','getClasses','getSubjects','getSessions','getScores'])
  },
  mounted(){
      this.spinner=true
      this.getClasses()
        .then(
          this.getStudents()
            .then(
              this.getSubjects()
                .then(
                  this.getSessions()
                    .then(
                      this.getScores()
                        .then(()=>{
                            this.spinner=false
                            this.msg=false
                            // console.log('hahaha')
                        })
                    )
                )
            )
        )
      
  }
}
</script>

<style scoped>
#main{
    height: 700px;
    /* background-image: url("../assets/milkyway.jpeg"); */
    /* background-repeat: repeat-y; */
}
</style>
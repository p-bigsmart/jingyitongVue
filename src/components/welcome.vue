<template>
  <div class="height100 ">
      <div class="welcomBg">
          <span  class="dataTime" @click="tiaoguo">{{dataTime}} 跳过</span>
      </div>
  </div>
</template>

<script>

import axios from "axios"

export default {
  components:{
      axios
  },
  data(){
      return{
          dataTime : 5
      }
  },
  created(){
    let interval = setInterval(()=>{
        this.dataTime--;
        if(this.dataTime == 0){
            this.tiaoguo()
            console.log(1)
            clearInterval(interval)
        }
    },1000);
  },
  methods:{
      tiaoguo(){
          if(localStorage.getItem('user') != null && localStorage.getItem('pass') != null){
              this.$router.push('./index')
          }else{
              this.$router.push('./login')
          }
      }
  }
}
</script>

<style scoped>
 
 .welcomBg{
    background:url("../assets/welcomeBanner.jpg") no-repeat;
    background-size: cover;
    height:100%;
    position: relative;
} 
.dataTime{
    display: block;
    color:white;
    position: absolute;
    right: 10px;
    top:10px;
    font-size:13px;
}
</style>


<template>
  <div class="height100 ">
      <div class="welcomBg">
          <span  class="dataTime">{{dataTime}} 退出</span>
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
    var interval = setInterval(()=>{
        this.dataTime--;
        if(this.dataTime == 0){
            this.$router.push('./login')
            clearInterval(interval)
        }
    },1000);
  }
}
</script>

<style scoped>
 
 .welcomBg{
    background:url("../img/welcomeBanner.jpg") no-repeat;
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


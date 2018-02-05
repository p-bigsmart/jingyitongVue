<template>
  <div>
      <x-header title="精易通物管助手--抄表详情"></x-header>
      <div class="content">
          <template>
               <group>
                   <datetime v-model="dataVal" format="YYYY年MM月" title="出单月份：" placeholder="请选择出单月份"></datetime>
               </group>
           </template>
           <template>
               <group>
               <div class='list'>
                   <h3>抄表号：{{chaobiaoValue}}</h3>
                   <p>业户：{{allList.yhname}}</p>
                   <p>房号：{{allList.wyname}}</p>
                   <p>换表读数：{{allList.maxds}}</p>
                   <p>上次抄表：{{allList.syds}}</p>
                   <p>本期抄表：{{allList.byds}}</p>
                   <p>实际用量：{{allList.sjyl}}</p>
               </div>
               </group>
           </template>
           <template>
               <div class="padding10">
                <x-button class="button" link="./meterReadingList">返回清单</x-button>
            </div>
           </template>
      </div>
      <commonFooter></commonFooter>
  </div>
</template>

<script>

import {XButton, XHeader, Radio, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, XTextarea, Datetime, Swiper} from 'vux'

import { p_alert, p_alert_error } from 'src/util/alert'
import { postData , baseURL } from 'src/util/base'
import commonFooter from 'src/common/footer'
import {formatDate} from 'src/util/date'


export default {
   components:{
        XButton,
        XHeader,
        Group,
        Flexbox,
        p_alert,
        p_alert_error,
        commonFooter,
        Selector,
        Radio,
        FlexboxItem,
        XDialog,
        XInput,
        XTextarea,
        Datetime,
        Swiper,
        baseURL,
        postData
  },
  data(){
      return{
        dataVal:localStorage.getItem('opMonth')
        ,allList:[]
        ,chaobiaoValue :localStorage.getItem('menterName')
      }
  },
  created(){
      postData('/mrding/getMeterReading',{
            code : localStorage.getItem('jinzhuma'),
            fdno : localStorage.getItem('fdno'),
            xmflno : localStorage.getItem('chaobiaoValue'),
            opMonth : localStorage.getItem('opMonth'),
            meterName : localStorage.getItem('menterName')
      }).then(res =>{
          console.log(res)
          this.allList = res.data
      }).catch(err =>{
          p_alert_error()
      })
  }
}
</script>

<style scoped>
.list *{
    padding:5px 10px;
}
</style>

<template>
  <div>
      <x-header title="精易通物管助手--抄表详情"></x-header>
      <div class="content">
          <template>
               <group>
                   <datetime v-model="dateVal" format="YYYY-MM-DD HH:mm" title="出单月份：" placeholder="请选择出单月份"></datetime>
               </group>
           </template>
           <template>
               <group>
               <div class='list'>
                   <h3>抄表号：2017110101</h3>
                   <p>业务：张大先</p>
                   <p>房号：三栋中梯301</p>
                   <p>换表读数：0</p>
                   <p>上次抄表：3000</p>
                   <p>本期抄表：3200</p>
                   <p>实际用量：200</p>
               </div>
               </group>
           </template>
           <template>
               <div class="padding10">
                <x-button class="button" @click.native="shoukuan">返回清单</x-button>
            </div>
           </template>
      </div>
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
        baseURL
  },
}
</script>

<style scoped>
.list *{
    padding:5px 10px;
}
</style>

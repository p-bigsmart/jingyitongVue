<template>
  <div>
       <x-header title="精易通物管助手--车牌查询"></x-header>
        <div class="content ">
          <group>
              <datetime v-model="DateTime" placeholder="请选择截止时间"  format="YYYY-MM-DD HH:mm"   title="截止时间"></datetime>
          </group>
          <template >
              <div class="title padding10">
                  
              <p>业户：中山职业学院</p>
              <p>联系人：张三</p>
              <p>联系手机：13812345678 <img src="../assets/phone.png"></p>
              </div>
          </template>
          
        </div>
        <template>
            <group>
                <selector title="title" v-model="value"></selector>
            </group>
          </template>
  </div>
</template>

<script>

import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, XTextarea, Datetime, Swiper} from 'vux'

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
        FlexboxItem,
        XDialog,
        XInput,
        XTextarea,
        Datetime,
        Swiper,
        baseURL
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
}
</script>

<style scoped>
    .title p{
        height:28px;
        line-height:28px;
    }
    .title img{
        vertical-align: middle;
    }
    .padding10{
        padding:10px;
    }
</style>

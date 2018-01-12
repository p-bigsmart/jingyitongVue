<template>
  <div>
        <x-header title="精易通物管助手--欠费查询"></x-header>
        <div class="content">
          <group>
              <datetime v-model="dateTime" placeholder="请选择截止时间"  format="YYYY-MM-DD HH:mm"   title="截止时间"></datetime>
          </group>
          <group title="精确搜索" class="weui-cells_form">
            <x-input placeholder="物业\业户\招牌或简称" class="weui-vcode">
              <x-button slot="right" type="primary" mini>查找</x-button>
            </x-input>
        </group>
       <div class="marginTop10">
         
          <flexbox>
          <flexboxItem :span="9"></flexboxItem>
          <flexboxItem :span="3"><x-button type="primary" link="./arrearsDetails" mini>详情</x-button></flexboxItem>
        </flexbox>
       </div>
      <div>
        <div class="marginTop10" cellspacing="0">
          <table width="100%">
          <thead>
            <tr>
              <td>业户名称</td>
              <td>物业名称</td>
              <td>欠费金额</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>张三</td>
              <td>A座401</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>张三</td>
              <td>A座401</td>
              <td>1000</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
        </div>
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
    data(){
      return {
        dateTime:''
      }
    }
}
</script>

<style scoped>
  table tr td{
    text-align: center;
  }
  table {
  border-right: 1px solid #804040;
  border-bottom: 1px solid #804040;
  border-collapse:collapse;
}

table td {
  border-left: 1px solid #804040;
  border-top: 1px solid #804040;
  padding:10px 5px;
}
  table tbody  tr:nth-child(odd){
    background:#e4e4e4;
  }
  
</style>

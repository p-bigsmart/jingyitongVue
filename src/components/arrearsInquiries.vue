<template>
  <div>
        <x-header title="精易通物管助手--欠费查询"></x-header>
        <div class="content">
          <group>
              <datetime v-model="dateTime" placeholder="请选择截止时间"  format="YYYY-MM-DD HH:mm"   title="截止时间"></datetime>
          </group>
          <group title="单击一行查看详细信息" class="weui-cells_form">
            <x-input placeholder="物业\业户\招牌或简称" class="weui-vcode" v-model="wuyeNum">
              <x-button slot="right" type="primary" mini @click.native="search">查找</x-button>
            </x-input>
        </group>
       <div class="marginTop10">
         
          <!-- <flexbox>
          <flexboxItem :span="9">&nbsp;</flexboxItem>
          <flexboxItem :span="2"><x-button type="primary" link="./arrearsDetails" mini>详情</x-button></flexboxItem>
        </flexbox> -->
       </div>
      <div>
        <group title="精确搜索">
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
             
             <template v-if="dataFlag" v-for="item in allList">
                <tr :key="list.yhno" v-for="list in item" @click="show(list.yhno)">
                <td>{{list.yhname}}</td>
                <td>{{list.wyname}}</td>
                <td>{{list.yhno}}</td>
              </tr>
              </template>
              <template v-else>
                  <tr colspan='3'>
                    <td colspan='3'>暂无数据</td>
                  </tr>
              </template>
            </tbody>
              
          </table>
        </div>
        </group>
      </div>
        </div>
  </div>
</template>

<script>
import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, XTextarea, Datetime, Swiper} from 'vux'

import { p_alert, p_alert_error } from 'src/util/alert'
import { postData , baseURL } from 'src/util/base'
import commonFooter from 'src/common/footer'

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
        baseURL,
        postData
  },
    data(){
      return {
        dateTime:'',
        dataFlag:'',
        allList:[],
        wuyeNum:''
      }
    },
    beforeCreate(){
      postData('/arrear/selectArrearList',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
      }).then(res =>{
        console.log(res.data.length)
        if(res.data.length){
          this.dataFlag = true
          this.allList.push(res.data)
          console.log(this.allList)
        }else{
          this.dataFlag = false
        }
        console.log(this.dataFlag)
      })
    },
    methods:{
      search(){
        if(!this.dateTime){
          p_alert('未填写完整','请选择截止时间')
          return false
        }else if(!this.wuyeNum){
          p_alert('未填写完整','请输入关键字')
          return false
        }else{
          postData('/arrear/search',{
            code : localStorage.getItem('jinzhuma'),
            fdno : localStorage.getItem('fdno'),
            closingData : this.dateTime,
            keyword : this.wuyeNum
          }).then(res =>{
            console.log(res)
          }).catch(err =>{
            p_alert_error()
          })
        }
      },
      show(yhno){
        localStorage.setItem('arrYhno',yhno)
        this.$router.push('./arrearsDetails')
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

<template>
  <div>
       <x-header title="精易通物管助手--抄表清单"></x-header>
       <div class="content">
           
           <template>
               <group>
                   <datetime v-model="dateVal" format="YYYY年MM月" title="出单月份：" placeholder="请选择出单月份"></datetime>
               </group>
               
        <group>
            <selector title="抄表类型" placeholder="请选择抄表类型" :options="chaobiaolist" v-model="chaobiaoValue"></selector>
        </group>
        <div class="marginTop15 marginBottom10">
            <x-button type="primary" @click.native="search">查询</x-button>
        </div>
           </template>
        <div v-show="tableShow">
          <div class="marginTop10">
           <template>
               <group title="精确搜索" class="weui-cells_form">
            <x-input placeholder="物业\业户\抄表号" class="weui-vcode" v-model="exactValue">
              <x-button slot="right" type="primary" mini @click.native="exactSearch">搜索</x-button>
            </x-input>
        </group>
           </template> 
          </div>
             <div class="marginTop10" cellspacing="0">
          <table width="100%">
          <thead>
            <tr>
              <td>业户</td>
              <td>物业</td>
              <td>抄表号</td>
              <td>本期读数</td>
            </tr>
          </thead>
          <tbody>
            <template v-if="allListShow" v-for="item in allList">
              <tr :key="item.id" @click="trClick(item.meterName)">
              <td>{{item.yhname}}</td>
              <td>{{item.wyname}}</td>
              <td>{{item.meterName}}</td>
              <td>{{item.byds}}</td>
            </tr>
            </template>
          </tbody>
        </table>
        </div>
        
        <div class="textCenter">
            <x-button type="primary"  v-if="fenye.pageIndex>1" @click.native="prev"  mini>上一页</x-button>
            当前第{{fenye.pageIndex}}页/共{{fenye.yeshu / 10}}页 
            <x-button type="primary" @click.native="next"  mini>下一页</x-button>
         
        </div>
        </div>

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
        baseURL,
        
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    data(){
        return{
            dateVal:'',
            chaobiaolist:[{key: '0501', value: '水表'}, {key: '0502', value: '电表'}, {key: '0503', value: '气表'}],
            chaobiaoValue:'',
            allListShow:false,
            allList:[],
            tableShow:false,
            fenye:{
              pageIndex:1,
              pageSize:10,
              yeshu:0
            },
            exactValue:''
        }
    },
    methods:{
      search(){
        if(this.dateVal && this.chaobiaoValue){
          postData('/mrding/getMetersList',{
            code : localStorage.getItem('jinzhuma'),
            fdno : localStorage.getItem('fdno'),
            xmflno : this.chaobiaoValue,
            opMonth : this.dateVal,
            pageIndex : this.fenye.pageIndex,
            pageSize : this.fenye.pageSize
          }).then(res =>{
            console.log(res)
            if(res.data.code == 500){
              p_alert('系统错误',res.data.msg)
            }else if(res.data.code == 200 || res.data.code == 201){
              this.allList = res.data.data.list
              this.tableShow = true
              this.allListShow = true
              this.fenye.yeshu = res.data.data.total
              console.log(this.allList,'./....')
            }
          }).catch(err =>{
            console.log(err)
          })
        }else{
          p_alert('缺少数据','请选择完数据再查询')
        }
      },
      next(){
        this.fenye.pageIndex++;
        this.search()
      },
      prev(){
        this.fenye.pageIndex--;
        this.search()

      },
      trClick(menterName){
        localStorage.setItem('menterName',menterName)
        localStorage.setItem('opMonth',this.dateVal)
        localStorage.setItem('chaobiaoValue',this.chaobiaoValue)
        this.$router.push('./meterReadingDetails')
      },
      exactSearch(){
        if(this.exactValue){
          
        }else{
          p_alert('填写错误','请输入要查找的物业\业户\抄表号')
        }

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
  .textCenter{
    text-align: center;
    margin:10px 0;
    padidng:15px 0;
    height:29px;
  }
  .weui-btn + .weui-btn{
    margin-top:0;
  }
</style>

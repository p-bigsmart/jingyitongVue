<template>
  <div class="height100">
        <x-header>
            <input type="text" placeholder="单号\物业\业户" v-model="searchVal" class="searchVal" />
            <button class="searchBtn" @click="search">搜索</button>
            <span slot="right">
                <select @change="selectChange" ref="selectValue">
                    <option value="2">全部</option>
                    <option value="1">已处理</option>
                    <option value="0">未处理</option>
                </select>
                </span>
        </x-header>
          <div class="content" :key="array[0].id" v-for="array in listAll" >
            <nav :key="contact.id" v-for="contact in array">
                <flexbox>
                    <flexboxItem :span="7"><div class="marginTop10" style="font-size:15px"><b>投诉单号：{{contact.tsno}}</b></div></flexboxItem>
                    <flexboxItem :span="3"><div class="text_right  marginTop10 fontSize14">投诉方式:{{contact.tsfs}}</div></flexboxItem>
                    <flexboxItem ><div class="text_right color_red marginTop10 fontSize14"><b >{{contact.iscl ? '已处理' : '未处理'}}</b></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">投诉人:{{contact.wyname}}</div></flexboxItem>
                     <flexboxItem :span="2"><div class="fontSize14 text_right marginTop10">{{contact.wyno}}</div></flexboxItem>
                     <flexboxItem :span="2"><div class="fontSize14 text_right marginTop10"><img src="../assets/GPS.png" alt=""></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem>
                        <div class="fontSize14 marginTop10">
                            联系人：{{contact.tsry}}{{contact.yhtel}} 
                        <img style="vertical-align:middle" src="../assets/phone.png" alt="" >
                        </div>
                    </flexboxItem>
                    <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10" style="height:28px;">接待人：{{contact.jdry}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">投诉时间：{{contact.curbxdate | formatDate}}</div></flexboxItem>
                     <flexboxItem :span="5"><div class="fontSize14 text_right marginTop10">投诉类型：{{contact.tsclass}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">{{contact.tsxm}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">处理负责人:{{contact.clry}}</div></flexboxItem>
                    <flexboxItem :span="8"><div class="fontSize14  text_right">处理日期:{{contact.cldate | formatDate}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem>
                            <div class="marginTop10 text_right marginBottom10">
                                <XButton text="查看详情" mini type="primary" link="./complaintsDetails" @click.native="xiangqing(contact.tsno)"></XButton>
                            </div>
                    </flexboxItem>
                </flexbox>
            </nav>
          </div>
            <common-footer></common-footer>
  </div>
</template>

<script>
import {
  XButton,
  XHeader,
  XInput,
  Group,
  Flexbox,
  FlexboxItem,
  Selector,
  XDialog,
  TransferDomDirective as TransferDom
} from "vux";

import { p_alert, p_alert_error, p_alert_hide } from "src/util/alert";
import { postData } from "src/util/base";
import commonFooter from "src/common/footer";
import { formatDate } from 'src/util/date'
export default {
  components: {
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
    XInput
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
  /* 一进来就获取到列表 插入到listAll里面循环输出 */
  created(){
    postData('/tstable/selectListAll',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
            iscl:2
    }).then(res =>{
        if(res.data.length){
                this.listAll.push(res.data)
                console.log(this.listAll)
            }else{
                p_alert_hide('暂无数据','暂无投诉数据',function(){history.go(-1)})
          }
    })
  },
  data() {
    return {
      searchVal: "",
      status: "未处理",
      // 投诉清单数组
      listAll:[]
    };
  },
  methods: {
    search(){
            console.log(this.selectValue)
            postData('/tstable/search',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
            iscl:this.selectValue ? this.selectValue : 2,
            keyword:this.searchVal
            }).then(res =>{
                this.listAll = []
                this.listAll.push(res.data)
                if(!this.listAll.length){
                this.listAll = []
                    p_alert('无此记录','暂无此记录！')
                }
            }).catch(err =>{
                console.log(err)
            })
        },
    /* 点击查看详情，将单号传入到前端数据库中 */
    xiangqing(tsno){
      localStorage.setItem('tsno',tsno)
    },
        selectChange(ele){
            this.selectValue = ele.target.value
            
        }
  }
};
</script>

<style scoped>
.searchVal {
  height: 30px;
  border: none;
  border-radius: 3px;
  padding-left: 5px;
  outline: none;
}
.searchBtn {
  height: 30px;
  padding: 0 3px;
  border-radius: 50%;
  border: none;
  outline: none;
}
nav {
  margin-top: 10px;
  background: white;
  padding: 0 10px;
}
.border_bottom {
  border-bottom: 1px soli red;
}
.fontSize14 {
  font-size: 14px;
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  white-space: nowrap;
  text-overflow: ellipsis; /* IE 专有属性，当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.marginTop10 {
  margin-top: 6px;
}
.marginBottom10 {
  margin-bottom: 6px;
}
</style>

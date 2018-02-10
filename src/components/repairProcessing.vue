<template>
  <div class="height100">
      <view-box ref="viewBox" >
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
          <div class="content" :key="array.bxdate" v-for="array in listAll">
            <nav :key="contact.bxno" v-for="contact in array">
                <flexbox>
                    <flexboxItem :span="7"><div class="marginTop10 fontSize14"><b>报修单号：{{contact.bxno}}</b></div></flexboxItem>
                    <!-- {{contact.isyh ? <img src="../assets/contactName.png"> : <img src="../assets/house.png">}}</div> -->
                    <flexboxItem :span="3"><div class="  marginTop10 fontSize14" style="text-align:center">
                        <span v-if="contact.isyh">
                            <img src="../assets/contactName.png">
                        </span>
                        <span v-else>
                            <img src="../assets/house.png">
                        </span>
                        </div>
                    </flexboxItem>
                    <flexboxItem ><div class="text_right color_red marginTop10 fontSize14" ><b>{{contact.iscl ? '已处理' : '未处理'}}</b></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10"><span v-if="contact.isyh">业户:</span><span v-else>报修人：</span>{{contact.wyname}}</div></flexboxItem>
                     <flexboxItem :span="3"><div class="fontSize14 text_right marginTop10">{{contact.wyno}}</div></flexboxItem>
                     <flexboxItem :span="2"><div class="fontSize14 text_right marginTop10"><img src="../assets/GPS.png" alt=""></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">联系人：{{contact.bxry}}{{contact.yhtel}}</div></flexboxItem>
                     <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10">报修类型：{{contact.bxtype ? contact.bxtype : '暂无'}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">报修时间：{{contact.curbxdate | formatDate }}</div></flexboxItem>
                     <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10">优先级：{{contact.priority}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">{{contact.bxxm}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">处理负责人:{{contact.wxry ? contact.wxry : '暂无'}}</div></flexboxItem>
                    <flexboxItem :span="8" v-show="contact.iscl"><div class="fontSize14  text_right">处理日期:{{contact.kgdate | formatDate }}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem :span="7" v-show="contact.iscl"><div class="fontSize14">维修费：{{contact.totalje}}元</div></flexboxItem>
                    <flexboxItem>
                            <div class="marginTop10 text_right marginBottom10">
                                <XButton text="查看详情" mini type="primary" link="./repairDetails" @click.native="details(contact.bxno)"></XButton>
                            </div>
                    </flexboxItem>
                </flexbox>
            </nav>
            <common-footer></common-footer>
        </div>
      </view-box>
  </div>
</template>

<script>
import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom} from 'vux'

import { p_alert, p_alert_error } from 'src/util/alert'
import { postData } from 'src/util/base'
import commonFooter from 'src/common/footer'
import {formatDate} from 'src/util/date'
export default{
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
        XInput
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    data(){
        return {
            // 默认等于2(全部)
            searchVal:'',
            status:'未处理',
            // 报修清单数组
            listAll:[]
        }
    },
    created(){
    postData('/bxtable/selectListAll',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
            iscl:2
    }).then(res =>{
        console.log(res)
        if(res.data.length){
                this.listAll.push(res.data)
                console.log(this.listAll)
            }else{
                p_alert('暂无数据','暂无报修处理')
          }
    }).catch(err =>{
        console.log(err)
    })
  },
    methods:{
        search(){
            console.log(this.selectValue)
            postData('/bxtable/search',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
            iscl:this.selectValue ? this.selectValue : 2,
            keyword:this.searchVal
            }).then(res =>{
                this.listAll = []
                this.listAll.push(res.data)
                console.log(this.listAll[0])
                if(!this.listAll.length){
                    p_alert('无此记录','暂无此记录！')
                }
            }).catch(err =>{
                console.log(err)
            })
        },
        details(bxno){
            // 获取到单号 传到前端数据库中
            localStorage.setItem('bxno',bxno)
        },
        selectChange(ele){
            this.selectValue = ele.target.value
            
        }
    }
}
</script>

<style scoped>
.searchVal{
    height:30px;
    border:none;
    border-radius: 3px;
    padding-left:5px;
    outline: none;
}
.searchBtn{
    height:30px;
    padding:0 3px;
    border-radius: 50%;
    border:none;
    outline:none;
}
nav{
    margin-top:10px;
    background:white;
    padding:0 10px;
}
.border_bottom{
    border-bottom: 1px soli red;
}
.fontSize14{
    font-size:14px;
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    white-space:nowrap;
text-overflow:ellipsis;/* IE 专有属性，当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.marginTop10{
    margin-top:6px;
}
.marginBottom10{
    margin-bottom:6px;
}
</style>

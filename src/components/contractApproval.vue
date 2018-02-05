<template>
  <div class="height100">
        <x-header>
            <input type="text" placeholder="物业\租户\合同号" v-model="searchVal" class="searchVal" />
            <button class="searchBtn" @click="search">搜索</button>
            <span slot="right">
                <select >
                    <option value="0">全部</option>
                    <option value="1">已生效</option>
                    <option value="2">待生效</option>
                </select>
                </span>
        </x-header>
        <div class="content" v-for="array in contactList">
            <nav v-for="contact in array">
                <flexbox>
                    <flexboxItem :span="9"><div class="marginTop10"><b>合同号：{{contact.htno}}</b></div></flexboxItem>
                    <flexboxItem ><div class="text_right color_red marginTop10" ><b>{{contact.htzt}}</b></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">租户:{{contact.yhname}}</div></flexboxItem>
                     <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10">手机:{{contact.moblie?contact.mobile:'暂无'}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">物业：{{contact.wyname}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem :span="8"><div class="fontSize14 marginTop10">面积：{{contact.zymj}}方;月租：{{contact.mmje?contact.mmje:0}}元 </div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_right">押金：{{contact.bzj}}元</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem :span="7"><div class="fontSize14 marginTop10">租期:{{contact.htbdate | formatDate}}至{{contact.edate | formatDate}}</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_right">起租日:{{contact.bdate | formatDate}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem>
                            <div class="marginTop10 text_right marginBottom10 BtnDiv">
                                <div v-if="contact.htzt == '未生效' || contact.htzt == '已初审'">
                                    <XButton mini type="warn" @click.native="alertShow(contact,'批准生效')" >批准生效</XButton>
                                </div>
                                <div v-else-if="contact.htzt == '已生效'">
                                    <XButton mini type="warn" @click.native="alertShow(contact,'批准终止')">终止合同</XButton>
                                </div>
                                <div v-else="contact.htzt == '已终止'">
                                    <XButton  mini type="warn" @click.native="alertShow(contact,'反终止')">启用合同</XButton>
                                </div>
                                <XButton v-text="btnText2" mini type="primary" link="./contractDetails" @click.native="details(contact.htno,contact.htzt)"></XButton>
                            </div>
                    </flexboxItem>
                </flexbox>
                
            </nav>
            <div v-transfer-dom>
            <x-dialog v-model="showScrollBox" class="dialog-demo"  hide-on-blur>
                <h3 class="dialog-title marginTop10" v-text="alertTitle"></h3>
                <div class="hr"></div>
                <!-- 点击时候要获取到河东编号 然后赋值过来 -->
                <div>合同号：<span v-text="alertNumber"></span></div>
                <div class="marginTop10">租户：<span v-text="alertContact"></span></div>
                <div class="alertCentent">
                    <group>
                        <x-input  :placeholder="placeholder1" v-model="shview">
                            <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                        </x-input>
                    </group>
                    <group>
                        <x-input  :placeholder="placeholder2" v-model="pass" type="password">
                            <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                        </x-input>
                    </group>
                    <div style="margin-top:20px"><x-button :text="alertBtnValue" type="primary" @click.native="alertTijiao()"></x-button></div>
                </div>
            </x-dialog>
            </div>
            
            
            <common-footer></common-footer>
        </div>
  </div>
</template>

<script>
import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, AlertModule} from 'vux'

import { p_alert, p_alert_error } from 'src/util/alert'
import { postData } from 'src/util/base'
import { formatDate } from 'src/util/date'
import commonFooter from 'src/common/footer'
export default {
    directives: {
    TransferDom
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    data(){
          return{
            list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
            defaultValue:'',
            // header上面searchValue
            searchVal:'',
            // 合同编号
            contractNumber:'HEDKLLK3434',
            // 合同状态
            status:'已注册',
            // 批准生效或者终止按钮文字
            btnText1:'批准生效',
            // 查看详情
            btnText2:'查看详情',
            // 控制是否弹出弹框
            showScrollBox:false,
            // 弹框编号
            alertNumber:'DFDSFD4845464',
            // 弹框地址
            alertContact:'中山市工业进出口开发有限公司',
            // 弹框button文字
            alertBtnValue:'批准生效',
            // 第一个input框placeholder
            placeholder1:'请输入审批意见',
            // 第二个input框placeholder
            placeholder2:'请输入登录密码',
            // 弹框Title
            alertTitle:'合同审批',
            // 进驻码
            jinzhuma:'',
            // 获取到的合同数组
            contactList:[],
            // 弹框密码
            pass:'',
            // 合同装填
            htzt:'',
            // 合同审批意见
            shview:''
          }
    },
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
        postData,
        AlertModule
    },
    beforeCreate(){
        postData('/httable/selectListAll',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
            issh:2
        }).then(res =>{
            console.log(typeof res.data)
            if(res.data.length){
                this.contactList.push(res.data)
                console.log(this.contactList)
            }else{
                p_alert('暂无数据','该楼盘暂无数据')
            }
        }).catch(err =>{
            console.log(err.data)
        })
    },
    methods:{
        search(){
            console.log(1)
        },
        // 点击批准生效等btn
        alertShow(contact,btnName){
            // 获取到btn的名字，后面作为判断
            this.alertBtnValue = btnName
            // 合同编号
            this.alertNumber = contact.htno
            // 业户名称
            this.alertContact = contact.yhname
            // 弹框显示出来
            this.showScrollBox = true
            // 获取到合同状态
            this.htzt = contact.htzt
        },
        // 弹框出来后下面的的btn
        alertTijiao(){
                // 密码正确
            if(this.pass == localStorage.getItem('pass')){
                this.showScrollBox = false;
                if(this.htzt == '未生效' || this.htzt == '已初审' || this.htzt == '已终止'){
                    postData('/httable/operation',{
                        code : localStorage.getItem('jinzhuma'),
                        fdno : localStorage.getItem('fdno'),
                        issh : 0,
                        password : this.pass,
                        htno : this.alertNumber,
                        shview : this.shview
                    }).then(res =>{
                        console.log('批准生效')
                        console.log(res)
                        window.location.reload()
                    }).catch(err =>{
                        console.log('出问题了')
                        console.error(err)
                    })
                }else if(this.htzt == '已生效'){
                    postData('/httable/operation',{
                        code : localStorage.getItem('jinzhuma'),
                        fdno : localStorage.getItem('fdno'),
                        issh : 1,
                        password : this.pass,
                        htno : this.alertNumber,
                        shview : this.shview
                    }).then(res =>{
                        console.log('取消生效')
                        console.log(res)
                        window.location.reload()
                    }).catch(err =>{
                        console.log('出问题了')
                        console.error(err)
                    })
                }

                // 密码错误
            }else{  
                let that = this
                this.showScrollBox = false;
                AlertModule.show({
                    title: "密码错误",
                    content: "请输入正确的密码.",
                    onHide(){
                        that.showScrollBox = true;
                    }
                })
            }
        },
        details(htno,htzt){
            // 获取到合同编号，然后将合同编号传入到localStorage
            localStorage.setItem('htno',htno)
            // 将合同状态写到localStorage
            localStorage.setItem('htzt',htzt)
        }
    },
    created(){
        this.jinzhuma = localStorage.getItem('jinzhuma')
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
.dialog-title{
    text-align: center;
    font-weight: 500;
}
.alertCentent{
    height:190px;
    overflow:scroll;
    -webkit-overflow-scrolling:touch;
}
.BtnDiv > *{
    display: inline;
}
.vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>


<template>
  <div class="height100">
    <view-box ref="viewBox" >
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
        <div class="content">
            <nav >
                <flexbox>
                    <flexboxItem :span="9"><div class="marginTop10">合同号：HTAB20171101</div></span></flexboxItem>
                    <flexboxItem ><div class="text_right color_red marginTop10" v-text="status">123</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">租户:中山市工业进出口开发有限公司</div></flexboxItem>
                     <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10">18316188803</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">物业：A001，A002</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem :span="8"><div class="fontSize14 marginTop10">面积：300方;月租：1560元 </div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_right">押金：4200元</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem :span="7"><div class="fontSize14 marginTop10">租期:2017-11-01至2019-10-31</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_right">起租日:2017-12-01</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem>
                            <div class="marginTop10 text_right marginBottom10">
                                <XButton v-text="btnText1" mini type="warn" @click.native="alertShow"></XButton>
                                <XButton v-text="btnText2" mini type="primary" link="./contractDetails"></XButton>
                            </div>
                    </flexboxItem>
                </flexbox>
            </nav>
            
            <div v-transfer-dom>
            <x-dialog v-model="showScrollBox" class="dialog-demo">
                <h3 class="dialog-title marginTop10" v-text="alertTitle"></h3>
                <div class="hr"></div>
                <!-- 点击时候要获取到河东编号 然后赋值过来 -->
                <div>合同号：<span v-text="alertNumber"></span></div>
                <div class="marginTop10">租户：<span v-text="alertContact"></span></div>
                <div class="alertCentent">
                    <group>
                        <x-input  :placeholder="placeholder1">
                            <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                        </x-input>
                    </group>
                    <group>
                        <x-input  :placeholder="placeholder2">
                            <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                        </x-input>
                    </group>
                    <div style="margin-top:20px"><x-button :text="alertBtnValue" type="primary" @click.native="alertTijiao"></x-button></div>
                </div>
                
            </x-dialog>
            </div>
            
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
export default {
    directives: {
    TransferDom
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
            placeholder2:'请输入数字签名',
            // 弹框Title
            alertTitle:'合同生效审批',
            // 进驻码
            jinzhuma:''
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
        XInput
    },
    methods:{
        search(){
            console.log(1)
        },
        alertShow(){
            this.showScrollBox = true
        },
        alertTijiao(){
            this.showScrollBox = false;
        }
    },
    created(){
        // 这里还缺少楼盘编号
        this.jinzhuma = localStorage.getItem('jinzhuma')
        // postData("/httable/selectListAll",{
        //     code:this.jinzhuma,

        // })
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
</style>


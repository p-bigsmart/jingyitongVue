<template>
  <div class="height100">
    <view-box>
          <!-- 扫码抄表 -->
    <x-header>精易通物管助手--扫码抄表</x-header>
    <div class="content">
        
        <div class="marginTop10" style="height:30px;overflow:hidden;margin-right:10px;">
            <x-button mini style="float:right;" type="primary" link="./meterReadingList">抄表清单</x-button>
        </div>
        <group>
              <datetime v-model="selectValue"  title="出单月份" placeholder="请选择出单日期" format="YYYY年MM月"  ></datetime>
          </group>
        
        
        <group>
            <selector title="抄表类型" placeholder="请选择抄表类型" :options="chaobiaolist" v-model="chaobiaoValue"></selector>
        </group>
        <flexbox>
            <flexbox-item>
                <div class="text_center erweimaDiv" @click="scan"><img src="../assets/123.png" alt=""></div>
            </flexbox-item>
        </flexbox>
        <group>
            <x-input title="" class="weui-vcode"  placeholder="请点上面扫描或直接输入抄表号" v-model="erweimaTest">
                    <x-button slot="right" type="primary" mini @click.native="search">搜索</x-button>
                </x-input>
        </group>
        <template v-if="listShow" >
            <template  >
        <!-- <table  v-for="abc in searchValue"> -->
            <table id="list">
            <tr>
                <td><b>抄表号：</b></td>
                <td class="color_red "><b>{{erweimaTest}}</b></td>
            </tr>
            <tr>
                <td>业户：</td>
                <td>{{searchValue.yhname}}</td>
            </tr>
            <tr>
                <td>房号：</td>
                <td>{{searchValue.wyname}}</td>
            </tr>
            <tr>
                <td>上期抄表：</td>
                <td>{{searchValue.syds}}</td>
            </tr>
            <tr>
                <td>实际用量：</td>
                <td>{{searchValue.sjyl}}</td>
            </tr>
        </table>
        <group>
            <x-input title="本期抄表：" class="weui-vcode"  placeholder="请输入本期抄表数" v-model="benqichaobiao"></x-input>
        </group>
        <table width="100%">
                <tr>
                <td>
                    <group>
                        <datetime v-model="startDate" class="fontSize14" placeholder='开始年月日' format="YYYY-MM-DD"   title="抄表期间"></datetime>
                    </group>
                </td>
                <td>
                    <group>
                        <datetime v-model="endDate" class="fontSize14" placeholder='结束年月日' format="YYYY-MM-DD"   title=""></datetime>
                    </group>
            </td>
            </tr>
            </table>
        </template>
        </template>
        <div class="marginTop15 marginBottom10">
            <x-button type="primary" @click.native="tijiao">提交抄表</x-button>
        </div>
        <div v-transfer-dom>
            <x-dialog v-model="showScrollBox" class="dialog-demo"  hide-on-blur>
                <h3 class="dialog-title marginTop10">绑定抄表号</h3>
                <div class="hr"></div>
                <!-- 点击时候要获取到河东编号 然后赋值过来 -->
                <div>查无此抄表号的业户，如果需要绑定此抄表号，
                    请在以下搜索对应业户后进行绑定。
                </div>
                <div class="marginTop10"><b>抄表号：<red>{{erweimaTest}}</red></b></div>
                <div class="alertCentent">
                    <group>
                        <x-input  placeholder="请输入房号搜索" v-model="fanghao">
                           <x-button slot="right" type="primary" mini @click.native="searchCaobiao">搜索</x-button>
                        </x-input>
                    </group>
                </div>
                <div v-show="searchCaobiaoShow">
                    <div class="marginTop10">业户：{{fanghaoValue.yhname}}</div>
                    <div class="marginTop10">房号：{{fanghaoValue.wyname}}</div>
                    <group>
                        <selector title="" placeholder="请选择水电项目" :options="searchList" :value-map="['xmno','xmname']"  v-model="searchListValue"></selector>
                    </group>
                </div>
                   <group>
                        <x-button type="primary" @click.native="bangding">绑定</x-button>
                   </group>
            </x-dialog>
            </div>
        
            <common-footer></common-footer>
    </div>
    </view-box>
  </div>
</template>

<script>

import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, Datetime} from 'vux'
import {postData} from 'src/util/base'
import {p_alert,p_alert_error,p_alert_hide} from 'src/util/alert'
import commonFooter from 'src/common/footer'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

export default {
    directives: {
    TransferDom
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
        Datetime,
        p_alert_hide,
  },
  data(){
      return {
          minuteListValue:'',
          selectValue:'',
          startDate:'',
          endDate:'',
          list: [{key: '2010年10月', value: '2010年10月'}, {key: '2010年11月', value: '2010年11月'}],
          chaobiaolist:[{key: '0501', value: '水表'}, {key: '0502', value: '电表'}, {key: '0503', value: '气表'}],
          chaobiaoValue:'',
          erweimaTest:'',
          listShow:false,
          searchValue:[],
        //   本期抄表
          benqichaobiao:'',
          fanghao:'',
          showScrollBox:false,
          searchCaobiaoShow:false,
          fanghaoValue:'',
          searchList:[{key: '0501', value: '水表'}, {key: '0502', value: '电表'}, {key: '0503', value: '气表'}],
          searchListValue:''
      }
  },
  methods:{
    //   调用二维码插件
    scan(){
        var that = this
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                that.erweimaTest = result.text 
            },
            function (error) {
                p_alert_error('网络错误',"请退出软件重进一次");
            },
            {
                preferFrontCamera : true, // iOS and Android
                showFlipCameraButton : true, // iOS and Android
                showTorchButton : true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt : "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations : true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
    },
    check(cehck){
        
        if(!this.selectValue){ p_alert('未填写完整','请选择出单月份'); return false}
        else if(cehck && !this.startDate) {p_alert('未填写完整','请选择抄表开始时间'); return false}
        else if(cehck && !this.endDate) {p_alert('未填写完整','请选择抄表结束时间'); return false}
        else if(!this.chaobiaoValue) {p_alert('未填写完整','请选择抄表类型'); return false}
        else if(!this.erweimaTest) {p_alert('未填写完整','请输入抄表号或扫描抄表号'); return false}
        else return true
        
    },
    // 提交按钮的方法
    tijiao(){
        if(this.check(true)){
            // 根据出单月份和抄表类型判定是否可以抄表
            
            postData('/mrding/queryOpmonth',{
                code : localStorage.getItem('jinzhuma'),
                fdno : localStorage.getItem('fdno'),
                xmflno : this.chaobiaoValue,
                opMonth : this.selectValue
            }).then(res =>{
                console.log(res,'是否可以抄表')
                if(res.data){
                    postData('/mrding/setMeterReading',{
                        code : localStorage.getItem('jinzhuma'),
                        fdno : localStorage.getItem('fdno'),
                        xmflno : this.chaobiaoValue,
                        opMonth : this.selectValue,
                        meterName : this.erweimaTest,
                        byds : this.benqichaobiao,
                        maxDs : 0,
                        fromDate : this.startDate,
                        toDate : this.endDate
                    }).then(res =>{
                        console.log(res)
                        if(res.data.success == 0){
                            p_alert('成功','抄表成功！')
                        }else{
                            p_alert('抄表失败',res.data.errinfo)
                        }
                    }).catch(err =>{
                        p_alert_error()
                    })
                }else{
                    p_alert('已抄表','这个月份已经抄表过了，不能再抄表')
                }
            }).catch(error =>{
                p_alert('网络故障',error)
            })
        }
    },
    // 查询按钮的方法
    search(){
        if(this.check(false)){
            postData('/mrding/getMeterReading',{
                code : localStorage.getItem('jinzhuma'),
                fdno : localStorage.getItem('fdno'),
                xmflno : this.chaobiaoValue,
                opMonth : this.selectValue,
                meterName : this.erweimaTest
            }).then(res => {
                let that = this
                // 方法在这里
                console.log(res,'888888888')
                if(res.data.id > 0){
                    that.listShow = true
                    that.searchValue = res.data
                    console.log(that.searchValue)
                }else{
                    
                    p_alert_hide('暂无数据','抄表号未绑定业户',()=>{this.showScrollBox = true})
                }
            }).catch(error =>{
                p_alert('网络故障',error)
            })
            postData('/mrding/searchForXm',{
                code : localStorage.getItem('jinzhuma'),
                fdno : localStorage.getItem('fdno'),
                xmflno : this.chaobiaoValue
            }).then(res =>{
                console.log(res)
                this.searchList = []
                this.searchList = res.data.data.list

            }).catch(err =>{
                p_alert_error()
            })
        }
    },
    // 通过房号搜索
    searchCaobiao(){
        if(this.fanghao.length != 0){
            postData('/mrding/searchForWy',{
                code : localStorage.getItem('jinzhuma'),
                fdno : localStorage.getItem('fdno'),
                aKey : this.fanghao
            }).then(res =>{
                if(res.data){
                    this.searchCaobiaoShow = true
                    this.fanghaoValue = res.data
                }else{
                    this.showScrollBox = false
                    this.searchCaobiaoShow = false
                    this.fanghaoValue = ''
                    p_alert_hide('房号错误','请输入正确的房号',()=>{this.showScrollBox = true})
                }
            }).catch(err =>{
                p_alert_error()
            })
        }
    },
    /* 绑定抄表号 */
    bangding(){
        console.log(this.searchListValue)
        if(this.fanghaoValue){
            postData('/mrding/bandingMeterName',{
                code : localStorage.getItem('jinzhuma'),
                fdno : localStorage.getItem('fdno'),
                wyno : this.fanghaoValue.wyno,
                xmno : this.chaobiaoValue,
                meterName : this.erweimaTest
            }).then(res =>{
                console.log(res)
                if(res.data.success == 0){
                    this.showScrollBox = false
                    p_alert('绑定成功','绑定成功！')
                }else{
                    this.showScrollBox = false
                    p_alert('绑定失败',res.data.errinfo)
                }
            }).catch(err =>{
                p_alert_error()
            })
        }else{
                    this.showScrollBox = false
            p_alert_hide('绑定失败','请先输入房号查询出相应数据.',()=>{this.showScrollBox = true})
        }
    }
  }
}
</script>

<style scoped>
.weui-cell {
    font-size:14px !important;
}
.erweimaDiv img{
    border-radius: 100%;
}
.erweimaDiv{
    margin-top:10px;
}
table#list{
    margin:10px;
}
table tr td{
    padding-top:6px;
}
table tr td:nth-child(1){
    text-align: right;
}
table tr td input{
    height:100%;
}
red{
    color:red;
}
</style>

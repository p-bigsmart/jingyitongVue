<template>
  <div class="height100">
    <view-box>
          <!-- 扫码抄表 -->
    <x-header>精易通物管助手--扫码抄表</x-header>
    <div class="content">
        
        <group>
            <selector title="出单月份" placeholder="请选择出单日期" :options="list" 
            v-model="selectValue"></selector>
        </group>
        
        <flexbox :gutter="0">
            <flexbox-item :span="6">
                <group>
                    <datetime v-model="startDate" class="fontSize14" placeholder='开始年月日' format="YYYY-MM-DD"   title="抄表期间"></datetime>            
                </group>
            </flexbox-item>
            <flexbox-item :span="6">
                <flexbox :gutter="0">
                    <flexbox-item><div style="height:59px;line-height:75px;text-align:center;">--</div></flexbox-item>
                <flexbox-item :span="10">
                    <group>
                    <datetime v-model="endDate" class="fontSize14" placeholder='结束年月日' format="YYYY-MM-DD"   title=""></datetime>            
                </group>
                </flexbox-item>
                </flexbox>
            </flexbox-item>
        </flexbox>
        <group>
            <selector title="抄表类型" placeholder="请选择抄表类型" :options="chaobiaolist" v-model="chaobiaoValue"></selector>
        </group>
        <div class="hr"></div>
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
        <template v-if="listShow">
        <div class="hr"></div>
        <table>
            <tr>
                <td><b>抄表号：</b></td>
                <td class="color_red "><b>2017010101</b></td>
            </tr>
            <tr>
                <td>业户：</td>
                <td>张大仙</td>
            </tr>
            <tr>
                <td>房号：</td>
                <td>三栋中梯301</td>
            </tr>
            <tr>
                <td>换表读数：</td>
                <td><input type="text" placeholder="换表是输入旧表读数"></td>
            </tr>
            <tr>
                <td>上期抄表：</td>
                <td>3000</td>
            </tr>
            <tr>
                <td>本期抄表：</td>
                <td><input type="text" placeholder="请输入本期抄表数"></td>
            </tr>
            <tr>
                <td>实际用量：</td>
                <td>0</td>
            </tr>
        </table>
        </template>
        <div class="marginTop15 marginBottom10">
            <x-button type="primary" @click.native="tijiao()">提交抄表</x-button>
        </div>
        
            <common-footer></common-footer>
    </div>
    </view-box>
  </div>
</template>

<script>

import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, Datetime} from 'vux'
import {postData} from 'src/util/base'
import {p_alert,p_alert_error} from 'src/util/alert'
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
        Datetime
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
          listShow:false
      }
  },
  methods:{
    //   调用二维码插件
    scan(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                var erweimaTest =  result.text 
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
    check(){
        
        if(!this.selectValue){ p_alert('未填写完整','请选择出单月份'); return false}
        else if(!this.startDate) {p_alert('未填写完整','请选择抄表开始时间'); return false}
        else if(!this.endDate) {p_alert('未填写完整','请选择抄表结束时间'); return false}
        else if(!this.chaobiaoValue) {p_alert('未填写完整','请选择抄表类型'); return false}
        else if(!this.erweimaTest) {p_alert('未填写完整','请输入抄表号或扫描抄表号'); return false}
        else return true
        
    },
    // 提交按钮的方法
    tijiao(){
        if(this.check()){
            // 根据出单月份和抄表类型判定是否可以抄表
            postData('/mrding/queryOpmonth',{
                code : localStorage.getItem('jinzhuma'),
                fdno : localStorage.getItem('fdno'),
                xmflno : this.chaobiaoValue,
                opMonth : this.selectValue
            }).then(res =>{
                if(res.data){
                    postData('/')
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
        if(this.check()){
            postData('/mrding/getMeterReading',{
                code : localStorage.getItem('jinzhuma'),
                fdno : localStorage.getItem('fdno'),
                xmflno : this.chaobiaoValue,
                opMonth : this.selectValue,
                meterName : this.erweimaTest
            }).then(res => {
                console.log(res)
            }).catch(error =>{
                p_alert('网络故障',error)
            })
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
table{
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
</style>

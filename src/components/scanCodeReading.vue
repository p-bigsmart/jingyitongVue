<template>
  <div class="height100">
    <view-box>
          <!-- 扫码抄表 -->
    <x-header>精易通物管助手--扫码抄表</x-header>
    <div class="content">
        
        
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
          erweimaTest:'水表001',
          listShow:false,
          searchValue:[],
        //   本期抄表
          benqichaobiao:''
      }
  },
  methods:{
    //   调用二维码插件
    scan(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                var erweimaTest = result.text 
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
                if(res.data){
                    postData('/mrding/setMeterReading',{
                        
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
                console.log(res.data)
                if(res.data.id > 0){
                    that.listShow = true
                    that.searchValue = res.data
                    console.log(that.searchValue)
                }else{
                    p_alert('暂无数据','请输入正确的抄表号和出单月份')
                }
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
</style>

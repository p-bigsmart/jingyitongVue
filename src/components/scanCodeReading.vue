<template>
  <div class="height100">
    <view-box>
          <!-- 扫码抄表 -->
    <x-header>精易通物管助手--扫码抄表</x-header>
    <div class="content">
        
        <group>
            <selector title="出单月份" placeholder="请选择出单日期" :options="list" v-model="selectValue"></selector>
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
                <div class="text_center erweimaDiv"><img src="" alt="" width="80" height="80"></div>
            </flexbox-item>
        </flexbox>
        <group>
            <x-input title="" class="weui-vcode"  placeholder="请点上面扫描或直接输入抄表号">
                    <x-button slot="right" type="primary" mini>搜索</x-button>
                </x-input>
        </group>
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
        <div class="marginTop15 marginBottom10">
            <x-button type="primary">提交抄表</x-button>
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
          list: [{key: 'gd', value: '2010年十月'}, {key: 'gx', value: '广西'}],
          chaobiaolist:[{key: 'gd', value: '水表'}, {key: 'gx', value: '电表'}],
          chaobiaoValue:''
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

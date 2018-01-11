<template>
  <div class="height100">
      <view-box>
          <x-header title="精易通物管助手--车牌查询"></x-header>
          <div class="content ">
            <div class="padding15">
                <group>
                <x-input placeholder="请输入车牌号" v-model="chepaiNum">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/user.png" width="24" height="24">
                </x-input>
            </group>
            <div class="marginTop10">
                <x-button type="primary" @click.native="search">查询</x-button>
            </div>
                <div class="hr"></div>
                <table>
                    <tr>
                        <td class="orange weight">联系手机：</td>
                        <td class="orange weight">13812345678</td>
                    </tr>
                    <tr>
                        <td class="weight">联系人：</td>
                        <td class="weight">张丽</td>
                    </tr>
                    <tr>
                        <td>业户名称：</td>
                        <td>佛山精拓信息科技有限公司</td>
                    </tr>
                    <tr>
                        <td>房号：</td>
                        <td>5号楼410</td>
                    </tr>
                </table>
            </div>
          </div>    
      </view-box>
  </div>
</template>

<script>

import {ViewBox, XHeader,Flexbox, FlexboxItem, XButton, XInput, Group, Cell, Selector} from 'vux'
import {postData} from 'src/util/base'
import {p_alert,p_alert_error} from 'src/util/alert'

export default {
    components:{
      ViewBox,
      XHeader,
      Flexbox,
      FlexboxItem,
      XButton,
      XInput,
      Group,
      Cell,
      Selector,
      postData,
      p_alert,
      p_alert_error
    },
    data(){
        return {
            // 车牌号
            chepaiNum,
        }
    },
    methods:{
        // 点击查询
        search(){
            postData('/arrear/queryLicensePlate',{
                code : localStorage.getItem('jinzhuma'),
                drno : this.chepaiNum
            }).then(res =>{
                console.log(res)
            }).catch(err =>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.orange{
    color:orange;
}
table tr td{
    padding-top:10px;
}
table tr td:nth-child(1){
    text-align: right;
}
.weight{
    font-weight: bold;
}
</style>

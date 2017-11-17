<template>
  <div class="width100">
      <view-box>
          <x-header>
              精易通物管助手--申请进驻
          </x-header>
          <div class="content">
            <group>
                <x-input placeholder='请输入公司名称' type="text">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/companyName.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入公司简称' type="text">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/companyName2.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入公司地址' type="text">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/address.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入联系人名称' type="text">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/contactName.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入联系人手机' type="tel" :max="13">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/phone.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入验证码' type="text">
                    <img slot="label" style="padding-right:10px;display:block;"  src="../assets/code.png" width="24" height="24">
                    <x-button slot="right" type="primary" mini>获取验证码</x-button>
                </x-input>
            </group>
            <group :title="XTextareaTitle">
                <x-textarea  v-model="XTextareaValue" placeholder="请简单介绍物业项目的情况，如业态、规模、主要需求有哪些等。"></x-textarea>
            </group>

                    <group>
                        <x-button  type="primary" >申请进驻</x-button>
                    </group>
          </div>
      </view-box>
  </div>
</template>

<script>

import {XButton, XHeader, XInput, Group, ViewBox, XTextarea} from 'vux'

export default {
  components:{
    XButton,
    XHeader,
    XInput,
    Group,
    ViewBox,
    XTextarea
  },
  data(){
      return{
          XTextareaTitle:"进驻物业详细情况描述:",
          XTextareaValue:''
      }
  }

}
</script>
<style scoped>

</style>

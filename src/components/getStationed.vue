<template>
  <div class="width100">
      <view-box>
          <x-header>
              精易通物管助手--申请进驻
          </x-header>
          <div class="content">
            <group>
                <x-input placeholder='请输入公司名称' type="text" v-model="companyName">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/companyName.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入公司简称' type="text" v-model="companyNameMini">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/companyName2.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入公司地址' type="text" v-model="companyAddress">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/address.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入联系人名称' type="text" v-model="contactName">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/contactName.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入联系人手机' type="tel" :max="13" v-model="contactPhone" mask="999 9999 9999">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/phone.png" width="24" height="24">
                </x-input>
            </group>
            <group>
                <x-input placeholder='请输入验证码' type="number" v-model="code">
                    <img slot="label" style="padding-right:10px;display:block;"  src="../assets/code.png" width="24" height="24">
                    <x-button slot="right" type="primary" mini @click.native="getCode"  :disabled="disabledCode" :text="getCodeText"></x-button>
                </x-input>
            </group>
            <group :title="XTextareaTitle">
                <x-textarea  v-model="XTextareaValue" placeholder="请简单介绍物业项目的情况，如业态、规模、主要需求有哪些等。"></x-textarea>
            </group>

                    <group>
                        <x-button  type="primary" @click.native="jinzhu">申请进驻</x-button>
                    </group>
          </div>
      </view-box>
  </div>
</template>

<script>

import {XButton, XHeader, XInput, Group, ViewBox, XTextarea, AlertModule} from 'vux'
import axios from 'axios'

export default {
  components:{
    XButton,
    XHeader,
    XInput,
    Group,
    ViewBox,
    XTextarea,
    AlertModule,
    axios
  },
  data(){
      return{
        //   公司名称
          companyName:"",
        //   公司名称缩写
          companyNameMini:"",
        //   公司地址
          companyAddress:"",
        //   联系人姓名
          contactName:"",
        //   联系人手机
          contactPhone:"",
        //   手机正则
          contactPhoneReg:"",
        //   验证码
          code:"",
        //   下面textarea的title
          XTextareaTitle:"进驻物业详细情况描述:",
        //   textarea的value
          XTextareaValue:'',
        //   验证码是否不能点击
          disabledCode:false,
          wait:60,
          getCodeText:'获取验证码'
      }
  },
  methods:{
      //点击进驻 判断信息是否填写完整
      jinzhu(){
          if(check(this.companyName,this.companyNameMini,this.companyAddress,this.contactName,this.contactPhone)){
              if(!(/^1[34578]\d{9}$/.test(this.contactPhone.replace(/\s+/g,"")))){
                  console.log(this.contactPhone.replace(/\s+/g,""))
                  AlertModule.show({
                  title:"手机号错误",
                  content:"请输入正确的手机号！"
                  })
                  return false;
              }else if(this.code == ""){
                AlertModule.show({
                  title:"请输入验证码",
                  content:"验证码不能为空！"
              })
              return false;
              }
              axios.post("http://192.168.1.108/public/garrison",{
                  companyName:this.companyName,
                  companyAbbreviation:this.companyNameMini,
                  companyAddress:this.companyAddress,
                  contactName:this.contactName,
                  contactMobile:this.contactPhone
                //   这里还差下面的额描述
              })
          }
          
      },
    //   获取验证码方法
      getCode(){
          if(check(this.companyName,this.companyNameMini,this.companyAddress,this.contactName,this.contactPhone)){
              if(!(/^1[34578]\d{9}$/.test(this.contactPhone.replace(/\s+/g,"")))){
                  console.log(this.contactPhone.replace(/\s+/g,""))
                  AlertModule.show({
                  title:"手机号错误",
                  content:"请输入正确的手机号！"
              })
              return false;
              }else{
                  this.disabledCode = true
                  let wait = 10;
                  if(this.disabledCode){
                      axios.post('http://192.168.1.108/public/getIdentifyingCode',{
                          phone:this.contactPhone,
                          type:'garrison',
                          random:Math.floor(Math.random() * 100 + 1)
                      }).then((respones)=>{
                          console.log(respones)
                      }).catch((error)=>{
                          console.log(error)
                      })
                   let close = setInterval(() =>{
                       if(wait != 0){
                        this.getCodeText = "重新发送("+ wait +")秒";
                         console.log(this.getCodeText)
                        wait--
                       }else{
                        this.disabledCode = false
                        console.log(this.disabledCode)
                        this.getCodeText = '获取验证码'
                        clearInterval(close)
                       }
                   },1000)
                }
              }
              
              
          }
          
      },
      
  }

}
// 判断数据是否填写完整
 function check (companyName,companyNameMini,companyAddress,contactName,contactPhone){
        if(companyName == ""){
              AlertModule.show({
                  title:"请输入公司名称",
                  content:"公司名不能为空！"
              })
              return false;
          }else if(companyNameMini == ""){
              AlertModule.show({
                  title:"请输入公司简称",
                  content:"公司简称不能为空！"
              })
              return false;
          }else if(companyAddress == ""){
              AlertModule.show({
                  title:"请输入公司地址",
                  content:"公司地址不能为空！"
              })
              return false;
          }else if(contactName == ""){
              AlertModule.show({
                  title:"请输入联系人姓名",
                  content:"联系人姓名不能为空！"
              })
              return false;
          }else if(contactPhone == ""){
              AlertModule.show({
                  title:"请输入联系人手机",
                  content:"联系人手机不能为空！"
              })
              return false;
          }
          return true
}

                  function time(o,wait,disabledCode) {  
                      console.log(wait)
                    
                }
</script>

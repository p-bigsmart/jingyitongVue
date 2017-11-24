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
import {getData, postData} from 'src/util/base.js'
export default {
  components:{
    XButton,
    XHeader,
    XInput,
    Group,
    ViewBox,
    XTextarea,
    AlertModule,
    getData,
    postData
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
          getCodeText:'获取验证码',
          ramdom:0
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
              console.log("申请进驻"+this.ramdom)
              postData("/public/garrison",{
                  companyName:this.companyName,
                  companyAbbreviation:this.companyNameMini,
                  companyAddress:this.companyAddress,
                  contractName:this.contactName,
                  contractMobile:this.contactPhone.replace(/\s+/g,""),
                  remark:this.XTextareaValue,
                  code:this.code,
                  random:this.ramdom
              }).then( res => {
                      console.log(res)
                  if(res.data == 0){
                    AlertModule.show({
                        title:"网络故障",
                        content:"请手动刷新页面！"
                    })
                  }else if(res.data == 1){
                      AlertModule.show({
                        title:"提交成功！",
                        content:"请等待管理员审核.",
                        onHide () {
                        window.history.go(-1)
                    }
                    })
                  }else if(res.data == 3){
                      AlertModule.show({
                        title:"验证码错误！",
                        content:"请重新输入验证码."
                    })
                  }else if(res.data == 4){
                      AlertModule.show({
                        title:"验证码失效！",
                        content:"请重新获取验证码."
                    })
                  }
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
                  let wait = 60;
                  if(this.disabledCode){
                      this.ramdom = Math.floor(Math.random() * 100 + 1)
                      
              console.log("获取验证码"+this.ramdom)
                      postData("/public/getIdentifyingCode",{
                            phone:this.contactPhone.replace(/\s+/g,""),
                            type:'garrison',
                            random:this.ramdom
                      }).then((res)=>{
                          console.log(res)
                          if(res.data == 0){
                              AlertModule.show({
                            title:"网络故障",
                            content:"请手动刷新页面！"
                            })
                            this.disabledCode = false
                          }else{
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
                      }}).catch((error)=>{
                          console.log(error)
                        this.disabledCode = false
                        AlertModule.show({
                            title:"网络故障",
                            content:"请手动刷新页面！"
                        })
                      })
                   
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
</script>

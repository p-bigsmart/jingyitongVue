<template>
    <div class="height100">
        <view-box>
            <x-header>
                精易通物管助手--进驻登记
            </x-header>
            <div class="content">
                
                <header>
                    <flexbox>
                    <flexbox-item :span="8">
                        <div class="flex-demo" style="text-align:center">
                            <h4>欢迎您使用精易通物管助手！</h4>
                            <span>如您还没有进驻码请点右边的 申请进驻</span>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <x-button type="warn" mini link="getStationed">申请进驻</x-button>
                        </div>
                    </flexbox-item>
                </flexbox>
                </header>

                     <group >
                        <x-input title='请输入进驻码' type="text" v-model="jinzhuma">
                            <img slot="left" class="weui-vcode-img" src="https://i.loli.net/2017/09/18/59bf7f32425d5.jpg">
                            <x-button slot="right" type="primary" mini @click.native="chaxun()">查询</x-button>
                        </x-input>
                    </group>
                    
                    <div v-show="companyFlag">
                        <!-- 公司名字 -->
                     <group style="margin-bottom:20px">
                         <Cell :title="compnayTitle+company" ></Cell>
                     </group>

                    <div class="hr"></div>

                    <group>
                        <selector :options="list"  ref="valueMap"  placeholder="请选择操作人员" v-model="defaultValue"></selector>
                    </group>
                    <group>
                        <x-input placeholder="请输入物业软件的登录账号" v-model="user" >
                            <img slot="label" style="padding-right:10px;display:block;" src="../assets/user.png" width="24" height="24">
                        </x-input>
                    </group>
                    <group style="margin-bottom:1.17647059em" >
                        <x-input placeholder="请输入物业软件的登录密码" v-model="pass" type="password">
                            <img slot="label" style="padding-right:10px;display:block;" src="../assets/pass.png" width="24" height="24">
                        </x-input>
                    </group>

                    <div class="hr"></div>
                    
                    <group>
                        <x-input placeholder="请绑定手机号(可作为登录账号)" mask="999 9999 9999" v-model="phoneNum" :max="13" >
                            <img slot="label" style="padding-right:10px;display:block;" src="../assets/phone.png" width="24" height="24">
                        </x-input>
                    </group>

                    <group>
                        <x-input placeholder="请输入验证码"  :max="6" v-model="code">
                            <img slot="label" style="padding-right:10px;display:block;" src="../assets/code.png" width="24" height="24">
                            <x-button slot="right" type="primary" mini :text="getCodeText" :disabled="disabledCode"  @click.native="getCode"></x-button>
                        </x-input>
                    </group>
                    
                    <group>
                        <x-button  type="primary"  @click.native="registration('valueMap')">进驻登记</x-button>
                    </group>
                    </div>
            </div>
        </view-box>
    </div>
</template>

<script>

import {ViewBox, XHeader,Flexbox, FlexboxItem, XButton, XInput, Group, Cell, Selector, AlertModule } from 'vux'
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
      p_alert_error,
      AlertModule 
  },
  data(){
      return {
          compnayTitle:'进驻公司：',
          company:"",
          companyFlag:false,
          phoneNum:'',
          defaultValue:'',
          list: [],
          jinzhuma:'',
          getCodeText:'获取验证码',
          code:null,
          disabledCode:false,
          user:"",
          pass:"",
          selectValue:"",
          random:0
      }
  },
  methods:{
      goGetStationed(){
         this.$router.push('./getStationed')
      },
      chaxun(){
          if(this.jinzhuma.length == 0){
              p_alert('进驻码错误','请输入进驻码！')
          }else{
              postData("/public/search",{
                  code:this.jinzhuma
              }).then(res => {
                  console.log(res)
                  if(res.data.info == 'success'){
                    this.company = res.data.companyName
                    for(let i = 0;i<res.data.list.length;i++){
                        this.list.push(res.data.list[i])
                    }
                    console.log(this.list[0])
                    this.companyFlag = true;
                  }else{
                      p_alert("进驻码错误！","并未查询到此进驻码，请申请进驻.")
                  }
              }).catch(error => {
                  console.log(error)
              })
          }
      },
      
      registration (ref) {
      if(this.$refs[ref].getFullValue() instanceof Object){
         this.selectValue = this.$refs[ref].getFullValue()[0].key
         console.log(this.selectValue)
      }else{
          p_alert('请选择操作人员','操作人员不能为空');
          return false;
      }
      if(check(this.user,this.pass,this.phoneNum)){
                var that = this
          console.log(this.phoneNum)
          if(this.phoneNum != ''){
              if(this.code != null){
            postData('/public/register',{
                workno : this.selectValue,
                username : this.user,
                md5psw : this.pass,
                bandmobile : this.phoneNum,
                random : this.random,
                verifyCode : this.code
            }).then(res => {
                if(res.data == 0){
                    p_alert_error()
                }else if(res.data == 1){
                    // 将搜索框的进驻码写入local 
                     localStorage.setItem('jinzhuma',this.jinzhuma)
                    AlertModule.show({
                        title: '进驻成功',
                        content: '点击确认跳转到登录',
                        onHide (){
                            that.$router.push('./login')
                        }
                    })
                }else if(res.data == 2){
                    p_alert('手机号冲突','手机号码已绑定其他用户')
                }else if(res.data == 3){
                    p_alert('验证码错误','请重新输入验证码')
                }else if(res.data == 4){
                    p_alert('验证码失效','请重新获取验证码')
                }else if(res.data == 5){
                    p_alert("账号或密码错误",'请检查账号和密码')
                }
            }).catch(error => {
                p_alert_error()
            })
            }else{
                p_alert("验证码错误","请填写验证码.")
            }
          }else{
              p_alert('请输入手机号','手机号不能为空')
          }
      }
    },
    // 获取验证码
    getCode(){
        if(check(this.user,this.pass,this.phoneNum)){
            if(this.phoneNum != ''){
                this.disabledCode = true
                let wait = 60;

                if(this.disabledCode){
                      this.random = Math.floor(Math.random() * 100 + 1)
            //   console.log("获取随机数"+this.random)
                    postData('/public/getIdentifyingCode',{
                        phone : this.phoneNum.replace(/\s+/g,""),
                        type : 'binding',
                        random : this.random
                    }).then((res)=>{
                          console.log(res)
                          if(res.data == 0){
                             p_alert_error()
                            this.disabledCode = false
                          }else{
                          let close = setInterval(() =>{
                            if(wait != 0){
                                this.getCodeText = "重新发送("+ wait +")秒";
                                wait--
                            }else{
                                this.disabledCode = false
                                this.getCodeText = '获取验证码'
                                clearInterval(close)
                            }
                          
                   },1000)
                      }}).catch((error)=>{
                        this.disabledCode = false
                        AlertModule.show({
                            title:"网络故障",
                            content:"请手动刷新页面！"
                        })
                      })
                   
                }

                
            }else{
                p_alert('请输入手机号','手机号不能为空.')
            }
        }
    }
      
  }

}

// 判断数据是否填写完整
 function check (user,pass,phoneNum){
        if(user == ""){
              p_alert("请输入登录账号","物业软件登录账号不能为空.")
              return false;
          }else if(pass == ""){
              p_alert("请输入登录密码","物业软件登录密码不能为空.")
              return false;
          } 
          if(phoneNum != ''){

              console.log("check:"+phoneNum)
              if(!(/^1[34578]\d{9}$/.test(phoneNum.replace(/\s+/g,"")))){
              p_alert("绑定手机错误","请输入正确的手机号.")
              return false;
              }
          }else if(phoneNum == ''){
              p_alert("请输入手机号","手机号不能为空.")
              return false
          }
          return true
}
</script>
<style scoped>
header{
    margin-top:10px;
}

</style>

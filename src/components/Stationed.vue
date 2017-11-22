<template>
    <div class="height100">
        <view-box>
            <x-header>
                精易通物管助手--进驻登记
            </x-header>
            <div class="content">
                
                <header>
                    <flexbox >
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
                        <x-input title='请输入进驻码' type="number" v-model="jinzhuma">
                            <img slot="left" class="weui-vcode-img" src="https://i.loli.net/2017/09/18/59bf7f32425d5.jpg">
                            <x-button slot="right" type="primary" mini @click.native="chaxun()">查询</x-button>
                        </x-input>
                    </group>
                    
                    <div v-show="companyFlag">
                        <!-- 公司名字 -->
                     <group >
                         <Cell :title="compnayTitle+company" ></Cell>
                     </group>

                    <div class="hr"></div>

                    <group>
                        <selector :options="list"  placeholder="请选择操作人员" v-model="defaultValue"></selector>
                    </group>
                    <group>
                        <x-input placeholder="请输入物业软件的登录账号" >
                            <img slot="label" style="padding-right:10px;display:block;" src="../assets/user.png" width="24" height="24">
                        </x-input>
                    </group>
                    <group style="margin-bottom:1.17647059em">
                        <x-input placeholder="请输入物业软件的登录密码" >
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
                        <x-input placeholder="请输入验证码"  :max="6" >
                            <img slot="label" style="padding-right:10px;display:block;" src="../assets/code.png" width="24" height="24">
                            <x-button slot="right" type="primary" mini>获取验证码</x-button>
                        </x-input>
                    </group>
                    
                    <group>
                        <x-button  type="primary"  >进驻登记</x-button>
                    </group>
                    </div>
            </div>
        </view-box>
    </div>
</template>

<script>

import {ViewBox, XHeader,Flexbox, FlexboxItem, XButton, XInput, Group, Cell, Selector, AlertModule} from 'vux'

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
      AlertModule
  },
  data(){
      return {
          compnayTitle:'进驻公司：',
          company:"",
          companyFlag:false,
          phoneNum:null,
          defaultValue:'',
          list: [{key: 'gd', value: '林总'}, {key: 'gx', value: '伟雄'},{key: 'gx', value: 'superpeng'}],
          jinzhuma:''
      }
  },
  methods:{
      goGetStationed(){
         this.$router.push('./getStationed')
      },
      chaxun(){
          if(this.jinzhuma.length == 0){
              AlertModule.show({
                  title:'进驻码错误',
                  content:'请输入进驻码！'
              })
          }else if(this.jinzhuma == 123){
              this.company = '佛山市永利达物业服务有限公司'
              this.companyFlag = true;
          }else if(this.jinzhuma != 123){
              this.companyFlag = false;
                AlertModule.show({
                  title:'进驻码错误',
                  content:'请输入正确的进驻码！'
              })
          }
      }
      
  }

}
</script>
<style scoped>
header{
    margin-top:10px;
}
.hr{
    height:1px;
    background: #bcacac;
    margin:10px 0;
}
</style>

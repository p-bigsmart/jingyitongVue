<template>
    <div>
        <x-header>
              精易通物管助手--切换楼盘
          </x-header>
          <div class="content">
              <header>
                    <flexbox>
                    <flexbox-item :span="8">
                        <div class="left20">
                             <h4>欢迎您使用精易通物管助手！</h4>
                        </div>
                    </flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item :span="8">
                        <div class="left20 flex-demo">
                            <span>您进驻的物业是：</span>
                            <h4>佛山市永利达物业服务有限公司</h4>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <x-button type="warn" mini link="">切换进驻</x-button>
                        </div>
                    </flexbox-item>
                </flexbox>
                </header>
                <div class="hr"></div>
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
                    <group>
                        <x-button  type="primary"  @click.native="registration('valueMap')">验证</x-button>
                    </group>

                <div v-show="yanzhengFlag">

                </div>
          </div>
    </div>
</template>

<script>
import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem} from 'vux'
import {p_alert,p_alert_error} from 'src/util/alert'
import {postData} from 'src/util/base'

export default {
  data(){
      return {
          user:"",
          pass:""
      }
  },
  components:{
      p_alert,
      p_alert_error,
      postData,
      XButton,
      XHeader,
      XInput,
      Flexbox,
      FlexboxItem,
      Group
  }
}
</script>
<style scoped>
header{
    margin-top:10px;
}
</style>

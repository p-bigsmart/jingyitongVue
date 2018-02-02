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
                            <h4 v-text="this.tStationedEnterprises"></h4>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="flex-demo">
                            <x-button type="warn" mini link="./stationed">切换进驻</x-button>
                        </div>
                    </flexbox-item>
                </flexbox>
                </header>
                <div class="hr"></div>
                <group>
                        <x-input placeholder="请输入物业软件的登录账号" v-model="user" mask="999 9999 9999">
                            <img slot="label" style="padding-right:10px;display:block;" src="../assets/user.png" width="24" height="24">
                        </x-input>
                    </group>
                    <group style="margin-bottom:1.17647059em" >
                        <x-input placeholder="请输入物业软件的登录密码" v-model="pass" type="password">
                            <img slot="label" style="padding-right:10px;display:block;" src="../assets/pass.png" width="24" height="24">
                        </x-input>
                    </group>
                    <group>
                        <x-button  type="primary"  @click.native="verification">验证</x-button>
                    </group>

                <div v-show="yanzhengFlag">
                    <h1 class="p_h1">欢迎您：<span>{{qiehuanName}}</span>先生，你已通过验证</h1>
                    <div class="hr"></div>
                    <group title="请选择您授权的楼盘：">
                         <selector :options="list" id="loupanSelect"  ref="valueMap"  :placeholder="loupanPlace" v-model="defaultValue"></selector>
                    </group>
                    
                    <group>
                        <x-button  type="primary"  @click.native="switchBtn('valueMap')">确定</x-button>
                    </group>
                </div>
          </div>
    </div>
</template>

<script>
import {
  XButton,
  XHeader,
  XInput,
  Group,
  Flexbox,
  FlexboxItem,
  Selector
} from "vux";
import { p_alert, p_alert_error, p_alert_hide } from "src/util/alert";
import { postData } from "src/util/base";

export default {
  components: {
    p_alert,
    p_alert_error,
    p_alert_hide,
    postData,
    XButton,
    XHeader,
    XInput,
    Flexbox,
    FlexboxItem,
    Group,
    Selector,
    
  },
  data() {
    return {
      user: "",
      pass: "",
      yanzhengFlag: false,
      list: [],
      defaultValue: "",
      //   进驻企业
      tStationedEnterprises:'',
    //   切换名字
      qiehuanName:'',
    //   楼盘placeholder
      loupanPlace:'请选择操作人员'
    };
  },
  methods: {
    verification() {
      if (this.user == "" && this.pass == "") {
        p_alert("请输入用户名密码", "用户名和密码不能为空.");
      } else {
        //   切换楼盘
        postData('/fdset/verifyIdentity',{
            username:this.user.replace(/(\s*$)/g, ""),
            password:this.pass.replace(/(\s+$)/g,""),
            code:localStorage.getItem('jinzhuma')
        }).then(res =>{
            console.log(res.data.name)
            switch(res.data.result){
                case 0:
                    p_alert_error()
                    break;
                case 1:
                    this.qiehuanName = res.data.name
                    postData('/fdset/selectListAll',{
                        code:localStorage.getItem('jinzhuma')
                    }).then(res =>{
                        console.log(res.data)
                        if(res.data.length){
                            this.list =res.data
                        }else{
                            this.loupanPlace = '此账号暂无可切换楼盘'
                        }
                    }).catch(err =>{
                        console.log(err)
                    })
                    this.yanzhengFlag = true;
                    break;
                case 3:
                    p_alert('进驻码出错','请从新申请进驻.')
                case 5:
                    p_alert('登录出错','账号或密码错误，请从新确认.')
            }
            console.log(res)
        })
        // this.yanzhengFlag = true;
      }
    },
    onChange(val) {
      console.log(val);
    },
    switchBtn(ref) {
      if (this.$refs[ref].getFullValue() instanceof Object) {
        this.selectValue = this.$refs[ref].getFullValue()[0].key;
        localStorage.setItem("fdno",this.selectValue);
        p_alert_hide('切换楼盘成功','返回首页',()=>{this.$router.push('./index')})
      } else {
        p_alert("请选择要切换的楼盘", "切换楼盘不能为空.");
        return false;
      }
    }
  },
  created() {
    //   进来就获取进驻企业名称
    postData("public/search", {
      code: localStorage.getItem("jinzhuma")
    })
      .then(res => {
        if (res.data.info == "success") {
            this.tStationedEnterprises = res.data.companyName
        }else{
            p_alert_error()
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
<style scoped>
header {
  margin-top: 10px;
}
</style>

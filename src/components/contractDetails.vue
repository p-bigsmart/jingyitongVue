<template>
  <div class="height100">
      <view-box body-padding-top="50px">
          <x-header  slot="header">精易通物管助手--合同详情</x-header>
          <div class="content"  slot="default">
              <div class="padding15" v-for="list in allList">
                  <flexbox>
                    <flexboxItem :span="9"><div class="marginTop10"><b>合同号：{{list[0].htno}}</b></div></flexboxItem>
                    <flexboxItem ><div class="text_right color_red marginTop10" ><b>{{htzt}}</b></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10"><b>租户:{{list[0].yhname}}</b></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">联系人：{{list[0].lxr ? list[0].lxr : '暂无'}}</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 text_right marginTop10">联系电话：{{list[0].mobile ? list[0].mobile : '暂无'}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">租期：{{list[0].htbdate | formatDate}}--{{list[0].edate | formatDate}}</div></flexboxItem>
                     
                </flexbox>
                <flexbox :gutter="0">
                   <flexboxItem><div class="fontSize14  marginTop10">起租日：{{list[0].bdate | formatDate}}</div></flexboxItem>
                     
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14  text_center">出租物业</div></flexboxItem>
                    <flexboxItem><div class="fontSize14  text_center">租金单价</div></flexboxItem>
                    <flexboxItem><div class="fontSize14  text_center">管理费单价</div></flexboxItem>
                    <flexboxItem><div class="fontSize14  text_center">租费合计</div></flexboxItem>
                </flexbox>
                <template v-for="money in list">
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize12 marginTop10 text_center">{{money.wyno}}({{money.zymj}}㎡)</div></flexboxItem>
                    <flexboxItem><div class="fontSize12 marginTop10 text_center">{{money.sqzj ? money.sqzj : 0}}元/平方/月</div></flexboxItem>
                    <flexboxItem><div class="fontSize12 marginTop10 text_center">{{money.sqglfy ? money.sqglfy : 0}}元/平方/月</div></flexboxItem>
                    <flexboxItem><div class="fontSize12 marginTop10 text_center">{{money.mmje}}
                        {{money.glmmje}}元/平方/月</div></flexboxItem>
                </flexbox>
                </template>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem :span="7"><div class="fontSize14 ">合同保证金：{{list.bzj ? list.bzj : 0}}元</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_right">其他押金：{{list.bzj_qt ? list.bzj_qt : 0}}元</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">                    
                    <flexboxItem><div class="fontSize14  text_center">其他周期项目</div></flexboxItem>
                    <flexboxItem><div class="fontSize14  text_center">周期</div></flexboxItem>
                    <flexboxItem><div class="fontSize14  text_center">金额</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize12 marginTop10 text_center">保洁费</div></flexboxItem>
                    <flexboxItem><div class="fontSize12 marginTop10 text_center">一月</div></flexboxItem>
                    <flexboxItem><div class="fontSize12 marginTop10 text_center">50元</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
            <!--     <flexbox :gutter="0">
                    <flexboxItem :span="7"><div class="fontSize14 marginTop10">计租周期：{{list.jzzq ? lsit.jzzq : 0}}个月</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_right">首期计租：{{list.sqnum ? list.sqnum : 0}}个月{{list.sqDays ? lis.sqnum : 0}}天</div></flexboxItem>
                </flexbox> -->
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">用途：{{list.wysy ? list.wysy : '未定'}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div style="font-size:14px" class=" marginTop10">合同备注： {{list.bz ? list.bz : '无'}}</div></flexboxItem>
                </flexbox>

                    <group>
                        <x-input  placeholder="请输入审批意见" v-model="shview">
                            <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                        </x-input>
                    </group>
                    <group>
                        <x-input  placeholder="请输入登录密码" v-model="password">
                            <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                        </x-input>
                    </group>
                                <div style="margin-top:20px">
                                    <div v-if="htzt == '未生效' || htzt == '已初审'">
                                    <XButton  type="primary" @click.native="alertShow(list,'批准生效')" >批准生效</XButton>
                                </div>
                                <div v-else-if="htzt == '已生效'">
                                    <XButton  type="primary" @click.native="alertShow(list,'批准终止')">终止合同</XButton>
                                </div>
                                <div v-else>
                                    <XButton   type="primary" @click.native="alertShow(list,'反终止')">启用合同</XButton>
                                </div>
                                </div>
              
                <common-footer slot="footer"></common-footer>
              </div>
          </div>
      </view-box>
  </div>
</template>

<script>

import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom} from 'vux'
import {postData} from 'src/util/base'
import {p_alert,p_alert_error,p_alert_hide} from 'src/util/alert'
import commonFooter from 'src/common/footer'
import { formatDate } from 'src/util/date'

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
        XInput
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
  data(){
    //   后台合同详情数据
      return{
          allList:[],
        //   合同状态
          htzt:'',
        //   判断合同状态转换为数字，传入后台.
          htztNum:'',
        //   密码
          password:'',
        //   审批意见
          shview:''
      }
  },
  beforeCreate(){
    //   获取到详细数据
      postData('/httable/getDetail',{
          code : localStorage.getItem('jinzhuma'),
          fdno : localStorage.getItem('fdno'),
          htno : localStorage.getItem('htno')
      }).then(res =>{
          this.allList.push(res.data)
          console.log(this.allList)
          this.htzt = localStorage.getItem('htzt')
          if(localStorage.getItem('htzt') ==  '未生效' || localStorage.getItem('htzt') == '已初审' || localStorage.getItem('htzt') == '已终止') this.htztNum = 0
            else this.htztNum = 1
            console.log('是否生效：'+this.htztNum)
      }).catch(err =>{
          console.log(err)
      })
  },
  methods:{
      alertShow(){
          if(this.password == localStorage.getItem('pass')){
            postData('/httable/operation',{
                code : localStorage.getItem('jinzhuma'),
                fdno : localStorage.getItem('fdno'),
                issh : this.htztNum,
                password : this.password,
                htno : localStorage.getItem('htno'),
                shview : this.shview
            }).then(res =>{
                switch(res.data){
                    case 0:
                        p_alert_error()
                        break;
                    case 1:
                        p_alert_hide('操作成功','合同状态已修改！',function(){history.go(-1)})
                        break;
                    case 2:
                        p_alert('密码错误','请输入正确的密码')
                        break;
                }
            }).catch(err =>{
                console.log(err) 
            })
          }else{
              p_alert('密码错误','请输入正确的密码')
          }
      }
  }
}
</script>

<style scoped>
.border_bottom{
    border-bottom: 1px soli red;
}
.fontSize14{
    font-size:14px;
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    white-space:nowrap;
text-overflow:ellipsis;/* IE 专有属性，当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.fontSize14{
    font-size:14px;
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    white-space:nowrap;
text-overflow:ellipsis;/* IE 专有属性，当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.fontSize12{
    font-size:10px;
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    white-space:nowrap;
text-overflow:ellipsis;/* IE 专有属性，当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}


</style>

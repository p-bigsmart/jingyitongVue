<template>
  <div class="height100">
      <view-box body-padding-top="50px">
          <x-header  slot="header">精易通物管助手--合同详情</x-header>
          <div class="content"  slot="default">
              <div class="padding15">
                  <flexbox>
                    <flexboxItem :span="9"><div class="marginTop10">合同号：HTAB20171101</div></span></flexboxItem>
                    <flexboxItem ><div class="text_right color_red marginTop10" >待生效</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">租期：2017.11.01--2019.10.31</div></flexboxItem>
                     <flexboxItem :span="5"><div class="fontSize14 text_right marginTop10">起租日：2017.12..01</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">租户:中山市工业进出口开发有限公司</div></flexboxItem>
                     
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">联系人：黄先生</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 text_right marginTop10">联系电话：18316188803</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14  text_center">出租物业</div></flexboxItem>
                    <flexboxItem><div class="fontSize14  text_center">租金单价</div></flexboxItem>
                    <flexboxItem><div class="fontSize14  text_center">管理费单价</div></flexboxItem>
                    <flexboxItem><div class="fontSize14  text_center">租费合计</div></flexboxItem>
                </flexbox>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10 text_center">A1101</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_center">45元/方/月</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_center">15元/方/月</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_center">60元/方/月</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10 text_center">A1201</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_center">1200元/方/月</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_center">200元/方/月</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_center">1400元/方/月</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem :span="7"><div class="fontSize14 ">保证金：4200元</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_right">水电押金：1200元</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem :span="7"><div class="fontSize14 marginTop10">计租周期：3个月</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 marginTop10 text_right">首期计租：3个月15天</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">用途：办公</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div style="font-size:14px" class=" marginTop10">合同备注： Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nihil ea molestias mollitia beatae! Minima asperiores, cupiditate impedit ipsam consequatur provident, amet, saepe officia suscipit magni itaque labore doloremque odio!</div></flexboxItem>
                </flexbox>

                    <group>
                        <x-input  placeholder="请输入审批意见">
                            <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                        </x-input>
                    </group>
                    <group>
                        <x-input  placeholder="请输入登录密码">
                            <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
                        </x-input>
                    </group>
                    <div style="padding:20px 0"><x-button text="批准生效" type="primary" @click.native="alertTijiao"></x-button></div>
                    
                <common-footer></common-footer>
              </div>
          </div>
      </view-box>
  </div>
</template>

<script>

import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom} from 'vux'
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
        XInput
  },
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
.marginTop10{
    margin-top:6px;
}
.marginBottom10{
    margin-bottom:6px;
}
.padding15{
    padding: 0 15px;

}

</style>

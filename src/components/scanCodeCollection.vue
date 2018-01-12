<template>
  <div>
    <x-header title="精易通物管助手--扫码收款"></x-header>
    <div class="content">
        <template>
            <div class="padding10">
                <h3>本欠收款：1020元.</h3>  
            </div>  
                <group title="选择支付方式">
                    <radio :options="radio001" @on-change="change" :selected-label-style="{color: '#46bd26'}" v-model="redioVal"></radio>
                </group>
        </template> 
        <template>
            <div class="imgDiv">
              <img class="erweima"  />     
            </div>
        </template>
        <template>
            <div class="padding10">
                <x-button class="button" @click.native="shoukuan">扫描收款</x-button>
            </div>
          </template>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>

import {XButton, XHeader, Radio, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, XTextarea, Datetime, Swiper} from 'vux'

import { p_alert, p_alert_error } from 'src/util/alert'
import { postData , baseURL } from 'src/util/base'
import commonFooter from 'src/common/footer'
import {formatDate} from 'src/util/date'

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
        Radio,
        FlexboxItem,
        XDialog,
        XInput,
        XTextarea,
        Datetime,
        Swiper,
        baseURL
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    data(){
        return {
            radio001: [ '支付宝收款码', '微信收款码' ],
            redioVal:'支付宝收款码'
        }
    },
    methods:{
        change (value, label) {
            console.log('change:', value, label)
        }
    }
}
</script>


<style scoped>
.imgDiv{
    text-align: center;

}
.erweima{
    height: 200px;
    width:50%;
    margin:20px 0;
}
</style>

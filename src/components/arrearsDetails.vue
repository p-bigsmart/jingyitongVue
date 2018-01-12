<template>
  <div>
       <x-header title="精易通物管助手--欠费详情"></x-header>
        <div class="content ">
          <template >
              <div class="title padding10">
                <p>业户：中山职业学院</p>
                <p>联系人：张三</p>
                <p>联系手机：13812345678 <img src="../assets/phone.png"></p>
              </div>
          </template>
          <template>
            <group>
                <selector title="物业楼盘：" v-model="value" :options="list"></selector>
            </group>
          </template>
          <template>
              <group title="费用详情">
                  <table width="100%">
                      <thead>
                          <tr>
                            <td>所属月份</td>
                            <td>物业名称</td>
                            <td>项目名称</td>
                            <td>应收金额</td>
                            <td><input type="checkbox" /></td>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td>2017.9</td>
                            <td>A座401</td>
                            <td>租金</td>
                            <td>1000</td>
                            <td><input type="checkbox" /></td>
                          </tr>
                      </tbody>
                  </table>
              </group>
          </template>
          <template>
              <group title="合计">
                  <div class="padding10">
                      <flexbox>
                  <flexbox-item :span="6">应收合计：2350元</flexbox-item>
                  <flexbox-item ><div class="textRight">本欠收款：0元</div></flexbox-item>
                </flexbox>
                  </div>
              </group>
          </template>
          <template>
            <div class="padding10">
                <x-button class="button" @click.native="shoukuan">扫描收款</x-button>
            </div>
          </template>
        </div>
        <commonFooter></commonFooter>
  </div>
</template>

<script>

import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, XTextarea, Datetime, Swiper} from 'vux'

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
            list:[{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
            value:''
        }
    },
    methods:{
        // 点击收款
        shoukuan(){

        }
    }
}
</script>

<style scoped>
    .title p{
        height:28px;
        line-height:28px;
    }
    .title img{
        vertical-align: middle;
    }
    
    table td{
        text-align: center
    }
    .textRight{
        text-align: right;
    }
    
</style>

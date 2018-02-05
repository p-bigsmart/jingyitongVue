<template>
  <div>
       <x-header title="精易通物管助手--欠费详情"></x-header>
        <div class="content ">
                
          <template  v-for="item in allList">
              <div class="title padding10">
                <p>业户：{{item.yhname}}</p>
                <p>联系人：{{item.lxr}}</p>
                <p>联系手机：{{item.mobile}} <img src="../assets/phone.png"></p>
              </div>
          </template>
          <template>
            <group>
                <selector title="物业楼盘：" placeholder="请选择物业楼盘" v-model="value" :options="list"></selector>
            </group>
          </template>
          <template>
              <group title="费用详情">
                          <flexbox>
                            <flexbox-item ><div class="flex-demo">所属月份</div></flexbox-item>
                            <flexbox-item><div class="flex-demo">物业名称</div></flexbox-item>
                            <flexbox-item><div class="flex-demo">项目名称</div></flexbox-item>
                            <flexbox-item><div class="flex-demo">应收金额</div></flexbox-item>
                            <flexbox-item :span="1"></flexbox-item>
                          </flexbox>
                          <template v-for="item in allList2">
                              <label :for="item.mid"  >
                            <flexbox >
                                <flexbox-item ><div class="flex-demo">{{item.djdate | formatDate}}</div></flexbox-item >
                                <flexbox-item ><div class="flex-demo">{{item.wyname}}</div></flexbox-item >
                                <flexbox-item ><div class="flex-demo">{{item.xmname}}</div></flexbox-item >
                                <flexbox-item ><div class="flex-demo">{{item.wsje}}</div></flexbox-item >
                                <flexbox-item :span="1"><input type="checkbox" v-model="checkedBox" :id="item.mid" :value="item.wsje" @click="checkClick(item.wsje,$event)"/></flexbox-item >
                            </flexbox>
                            </label>
                          </template>
              </group>
          </template>
          <template>
              <group title="合计">
                  <div class="padding10">
                      <flexbox>
                  <flexbox-item :span="6">应收合计：{{this.allMoney}}元</flexbox-item>
                  <flexbox-item ><div class="textRight">本次收款：{{this.money}}元</div></flexbox-item>
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
        baseURL,
        postData
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM');
        }
    },
    data(){
        return {
            list:[{}],
            value:'',
            /* 接收到的数组 */
            allList:[],
            allList2:[],
            allMoney:0,
            checked:false,
            checkedBox:[],
            money:0
        }
    },
    created(){
        /* 获取物业楼盘信息 */
        postData('/arrear/selectPropertyList',{
            code : localStorage.getItem('jinzhuma'),
            fdno : localStorage.getItem('fdno'),
            yhno : localStorage.getItem('arrYhno')
        }).then(res =>{
            for(let i = 0; i<res.data.length;i++){
                this.list[i].key = res.data.toString()
                this.list[i].value = res.data.toString()
                console.log(this.list,)
            }
        }).catch(err =>{
            p_alert_error()
        }),
        /* 获取详情 */
        postData('/arrear/selectArrearDetail',{
            code : localStorage.getItem('jinzhuma'),
            fdno : localStorage.getItem('fdno'),
            yhno : localStorage.getItem('arrYhno')
        }).then(res =>{
            console.log(res)
            this.allList = res.data.slice(0,1)
            this.allList2 = res.data
            for(let i = 0;i<this.allList2.length;i++){
               this.allMoney +=  parseInt(this.allList2[i].wsje)
            }
        }).catch(err =>{
            p_alert_error()
        })
        
    },
    methods:{
        // 点击收款
        shoukuan(){
            localStorage.setItem('money',this.money)
            this.$router.push('./scanCodeCollection')
        },
        checkClick(money,event){
            if(event.target.checked) 
            this.money +=Math.floor(money)
            else
            this.money -=Math.floor(money)
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
    .flex-demo {
  text-align: center;
  font-size:15px;
  height:30px;
  line-height:30px;
}
</style>

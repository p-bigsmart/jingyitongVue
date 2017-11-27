<template>
  <div class="height100">
    <view-box ref="viewBox">
        <x-header>
            <input type="text" placeholder="物业\租户\合同号" v-model="searchVal" class="searchVal" />
            <button class="searchBtn" @click="search">搜索</button>
            <span slot="right">
                <select >
                    <option value="0">全部</option>
                    <option value="1">已生效</option>
                    <option value="2">待生效</option>
                </select>
                </span>
        </x-header>
        <div class="content">
            <nav>
                <flexbox>
                    <flexboxItem >合同号:<span v-text="contractNumber"></span></flexboxItem>
                    <flexboxItem ><div class="text_right color_red" v-text="status">123</div></flexboxItem>
                </flexbox>
                <flexbox>
                    <flexboxItem><div class="fontSize14">租户：中山市工业进出口开发有限公司</div></flexboxItem>
                    <flexboxItem>18316188803</flexboxItem>
                </flexbox>
                </flexbox>
                <flexbox>
                    <flexboxItem></flexboxItem>
                    <flexboxItem></flexboxItem>
                </flexbox>
                </flexbox>
                <flexbox>
                    <flexboxItem></flexboxItem>
                    <flexboxItem></flexboxItem>
                </flexbox>
                </flexbox>
                <flexbox>
                    <flexboxItem></flexboxItem>
                    <flexboxItem></flexboxItem>
                </flexbox>
                </flexbox>
                <flexbox>
                    <flexboxItem></flexboxItem>
                    <flexboxItem></flexboxItem>
                </flexbox>
            </nav>
            <common-footer></common-footer>
        </div>
    </view-box>
  </div>
</template>

<script>
import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector} from 'vux'

import { p_alert, p_alert_error } from 'src/util/alert'
import { postData } from 'src/util/base'
import commonFooter from 'src/common/footer'
export default {
    data(){
          return{
            list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
            defaultValue:'',
            // header上面searchValue
            searchVal:'',
            // 合同编号
            contractNumber:'HEDKLLK3434',
            // 合同状态
            status:'已注册',

          }
    },
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
    },
    methods:{
        search(){
            console.log(1)
        }
    }
}
</script>

<style scoped>
.searchVal{
    height:30px;
    border:none;
    border-radius: 3px;
    padding-left:5px;
    outline: none;
}
.searchBtn{
    height:30px;
    padding:0 3px;
    border-radius: 50%;
    border:none;
    outline:none;
}
nav{
    margin-top:15px;
    background:white;
    padding:0 10px;
}
.border_bottom{
    border-bottom: 1px soli red;
}
.fontSize14{
    font-size:14px;
}
</style>


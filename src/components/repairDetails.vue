<template>
  <div class="height100">
      <view-box ref="viewBox" >
        <x-header>
            <input type="text" placeholder="单号\物业\业户" v-model="searchVal" class="searchVal" />
            <button class="searchBtn" @click="search">搜索</button>
            <span slot="right">
                <select >
                    <option value="0">全部</option>
                    <option value="1">已处理</option>
                    <option value="2">未处理</option>
                </select>
                </span>
        </x-header>
        <div class="content">
            <nav >
                <flexbox>
                    <flexboxItem :span="7"><div class="marginTop10">报修单号：BXAB20171101</div></span></flexboxItem>
                    <flexboxItem :span="3"><div class="text_right  marginTop10 fontSize14">业户图标</div></flexboxItem>
                    <flexboxItem ><div class="text_right color_red marginTop10 fontSize14" v-text="status"></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">业户:中山市工业进出口开发有限公司</div></flexboxItem>
                     <flexboxItem :span="2"><div class="fontSize14 text_right marginTop10">A座301</div></flexboxItem>
                     <flexboxItem :span="2"><div class="fontSize14 text_right marginTop10">tubiao</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">联系人：张先生13834488888</div></flexboxItem>
                     <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10">报修类型：A类</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">报修时间：2017-11-01 10:30</div></flexboxItem>
                     <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10">优先级：加急</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div style="font-size:14px;">门锁坏了...辅导费看来得佛挡杀佛多久饭放得开离开了(1515)</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">派单时间:2017-11-01 10:30</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">接单人:陈工</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">现场图片：</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 text_right marginTop10">上传图片</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem :span="3"><div class="imgDiv marginTop10"><img src="" alt=""></div></flexboxItem>
                    <flexboxItem :span="3"><div class="imgDiv marginTop10"><img src="" alt=""></div></flexboxItem>
                    <flexboxItem :span="3"><div class="imgDiv marginTop10"><img src="" alt=""></div></flexboxItem>
                    <flexboxItem :span="3"><div class="imgDiv marginTop10"><img src="" alt=""></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">开工时间:2017-11-01 10:30</div></flexboxItem>
                </flexbox>
                <group>
                    <x-textarea title="处理结果" placeholder="请输入处理结果"  :show-counter="false" :rows="1" autosize></x-textarea>
                </group>
                <group>
                    <datetime v-model="minuteListValue" placeholder='请选择处理完成时间' format="YYYY-MM-DD HH:mm"   title="完成时间"></datetime>
                </group>
                <group>
                    <x-input title="材料费" type="number"></x-input>
                </group>
                <group>
                    <x-input title="服务费" type="number"></x-input>
                </group>
                <flexbox :gutter="0">
                    <flexboxItem>
                        <h4 class="marginTop10">合计：60元</h4>
                    </flexboxItem>
                </flexbox>
                    <div style="margin-top:20px"><x-button text="处理完成" type="primary"></x-button></div>

            </nav>
            <common-footer></common-footer>
        </div>
      </view-box>
  </div>
</template>

<script>
import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, XTextarea, Datetime, Swiper} from 'vux'

import { p_alert, p_alert_error } from 'src/util/alert'
import { postData } from 'src/util/base'
import commonFooter from 'src/common/footer'

const imgList = [
  'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]

export default{
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
        Swiper
    },
    data(){
        return {
            searchVal:'',
            status:'未处理',
            minuteListValue:"",
            demo04_list: imgList,
        }
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
    margin-top:10px;
    background:white;
    padding:0 10px;
}
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
.imgDiv img{
    border:1px solid;
    width:100%;
    height:50px;
}
</style>

<template>

   <div class="height100">
     
   <view-box ref="viewBox">

     <x-header >
       精易通物管助手
       <span slot="right">注销登陆</span>
     </x-header> 

     <div class="content">
       <search
    @result-click="resultClick"
    @on-change="getResult"
    :results="results"
    v-model="value"
    auto-scroll-to-top top="46px"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
       <swiper auto  style="width:100%;margin-top:10px" height="200px" dots-class="custom-bottom" dots-position="center">
        <swiper-item><div id="myChart" :style="{width: '100%', height: '200px'}"></div></swiper-item>
        <swiper-item><div id="myChart2" :style="{width: '100%', height: '200px'}"></div></swiper-item>
       </swiper>
      <grid  :cols="3">
      <grid-item label="合同审批">
        <img slot="icon" src="../assets/shengpi.png">
      </grid-item>
      <grid-item label='报修'>
        <img slot="icon" src="../assets/baoxiu.png">
      </grid-item>
      <grid-item label='投诉'>
        <img slot="icon" src="../assets/tousu.png">
      </grid-item>
      <grid-item label='车牌查询'>
        <img slot="icon" src="../assets/chaxun.png">
      </grid-item>
      <grid-item label='安保设备'>
        <img slot="icon" src="../assets/jiancha.png">
      </grid-item>
      <grid-item label='清洁绿化'>
        <img slot="icon" src="../assets/jifei.png">
      </grid-item>
      <grid-item label='扫码抄表'>
        <img slot="icon" src="../assets/saoma.png">
      </grid-item>
      <grid-item label='欠费查询'>
        <img slot="icon" src="../assets/qianfei.png">
      </grid-item>
      <grid-item label='现场缴费'>
        <img slot="icon" src="../assets/jiaofei.png">
      </grid-item>
      </grid>
     <common-footer></common-footer>
     </div>
    
   </view-box>
 </div>
</template>


<script>

import {Search, XButton, Swiper, SwiperItem, ViewBox, XHeader, CellFormPreview, Group, Cell, Grid, GridItem } from 'vux'
import axios from 'axios'
import commonFooter from 'src/common/footer'

export default {
  components: {
    CellFormPreview,
    Group,
    Cell,
    XHeader,
    ViewBox,
    Swiper,
    SwiperItem,
    Grid,
    GridItem,
    commonFooter,
    Search,
    XButton
  },
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }],
      chartArr1 : [1,2,3,4,5,6,7],
      chartData2 :[30,75,84,24,68,60,10],
      results:[],
      value: ''
    }
  },
  mounted(){
    this.drawLine();
    this.aaa();
  },
  methods:{
     charts(id,title,subtext,subNumber,type,xAxisData,seriesname,seriestype,seriesData){
  // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(id))
        // 绘制图表
        myChart.setOption({
            title: { 
              text: title,
              left:"center",
              subtext: subtext+subNumber,
              subtextStyle:{
                verticalAlign:"top"
              }
            },
            tooltip: {trigger: 'none',
            axisPointer: {
                type: type
            }},
            xAxis: {
                data: xAxisData 
            },
            yAxis: {},
            series: [{
                name: seriesname,
                type: seriestype,
                data: seriesData
            }]
        });
},
    drawLine(){
        this.charts('myChart','永利达收缴率','今日收款','7854元','cross',this.chartArr1,'收缴率','line',this.chartData2)
    },
    aaa(){
        this.charts('myChart2','永利达出租率','今日签订合同',5,'cross',this.chartArr1,'收缴率','bar',this.chartData2)
    },
    resultClick (item) {
      alert('you click the result item: ' + JSON.stringify(item))
      document.getElementsByClassName('vux-slider')[0].style.marginTop = '10px'
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      
    },
    onFocus () {
      console.log('on focus')
      document.getElementsByClassName('vux-slider')[0].style.marginTop = '54px'
    },
    onCancel () {
      console.log('on cancel')
      document.getElementsByClassName('vux-slider')[0].style.marginTop = '10px'
    }
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 10; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: 'bb'
    })
  }
  return rs
}

</script>

<style lang="less">

@import '../css/reset.less';

.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}

</style>
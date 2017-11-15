<template>

   <div style="height:100%;">
     <link rel="stylesheet" href="http://at.alicdn.com/t/font_475813_9og1rj53a2az6w29.css">
   <view-box ref="viewBox">
     <x-header  style="width:100%;position:absolute;left:0;top:0;z-index:100;">精易通物管助手</x-header>
     <router-view></router-view>
     <div class="content">
        
       <swiper auto  style="width:100%;margin:10px 0 0 10px" height="200px" dots-class="custom-bottom" dots-position="center">
        <swiper-item><div id="myChart" :style="{width: '100%', height: '200px'}"></div></swiper-item>
        <swiper-item><div id="myChart2" :style="{width: '100%', height: '200px'}"></div></swiper-item>
       </swiper>
      <grid  :cols="3">
      <grid-item label="合同审批">
        <img slot="icon" src="../assets/123.png">
      </grid-item>
      <grid-item label='报修'>
        <img slot="icon" src="../assets/123.png">
      </grid-item>
      <grid-item label='投诉'>
        <img slot="icon" src="../assets/123.png">
      </grid-item>
      <grid-item label='车牌查询'>
        <img slot="icon" src="../assets/123.png">
      </grid-item>
      <grid-item label='设备巡检'>
        <img slot="icon" src="../assets/123.png">
      </grid-item>
      <grid-item label='扫码超表'>
        <img slot="icon" src="../assets/123.png">
      </grid-item>
      <grid-item label='计费查询'>
        <img slot="icon" src="../assets/123.png">
      </grid-item>
      <grid-item label='欠费查询'>
        <img slot="icon" src="../assets/123.png">
      </grid-item>
      <grid-item label='现场缴费'>
        <img slot="icon" src="../assets/123.png">
      </grid-item>
      </grid>
     
     </div>
    <tabbar  style="width:100%;position:absolute;left:0;bottom:0;z-index:100;">
      <tabbar-item>
        
       <i class="iconfont icon-biaoqian" slot="icon"></i>
        <span slot="label">办事项目</span>
      </tabbar-item>
      <tabbar-item show-dot>
       <i class="iconfont icon-tixing" slot="icon"></i>
        <span slot="label">公司公告</span>
      </tabbar-item>
      <tabbar-item selected link="">
       <i class="iconfont icon-shouye" slot="icon"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item badge="2">
       <i class="iconfont icon-jiankong" slot="icon"></i>
        <span slot="label">租控图</span>
      </tabbar-item>
      <tabbar-item badge="2">
       <i class="iconfont icon-VPN" slot="icon"></i>
        <span slot="label">切换楼盘</span>
      </tabbar-item>
    </tabbar>
   </view-box>
 </div>
</template>


<script>
import { Swiper,SwiperItem,ViewBox,XHeader, Tabbar, TabbarItem, CellFormPreview, Group, Cell,Grid,GridItem } from 'vux'
import axios from 'axios'

export default {
  components: {
    CellFormPreview,
    Group,
    Cell,
    XHeader,
    Tabbar,
    TabbarItem,
    ViewBox,
    Swiper,
    SwiperItem,
    Grid,
    GridItem
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
      chartData2 :[30,75,84,24,68,60,10]
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
              subtext: subtext+subNumber
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
        this.charts('myChart','superpeng','今日收缴率：',5000,'cross',this.chartArr1,'收缴率','line',this.chartData2)
    },
    aaa(){
        this.charts('myChart2','永利达','今日收缴率：',7854,'cross',this.chartArr1,'收缴率','bar',this.chartData2)
    }
  }
}


</script>

<style >
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
 html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
.content{
  padding-top:46px;
}
</style>
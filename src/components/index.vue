<template>

   <div class="height100">
     
   <view-box ref="viewBox">

     <x-header >
       精易通物管助手
       <span slot="right" @click="quit()">注销登陆</span>
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
       <swiper auto  style="width:100%;margin-top:10px" height="200px" dots-class="custom-bottom" dots-position="center" v-show="swiperDis">
        <swiper-item><div id="myChart" :style="{width: '100%', height: '200px'}"></div></swiper-item>
        <swiper-item><div id="myChart2" :style="{width: '100%', height: '200px'}"></div></swiper-item>
       </swiper>
       <div id="null" v-show="nullDis">
         暂无数据
       </div>
      <grid  :cols="3">
      <grid-item label="合同审批" link="./contractApproval">
        <img slot="icon" src="../assets/shengpi.png">
      </grid-item>
      <grid-item label='报修' link="./repairProcessing">
        <img slot="icon" src="../assets/baoxiu.png">
      </grid-item>
      <grid-item label='投诉' link="./complaints">
        <img slot="icon" src="../assets/tousu.png">
      </grid-item>
      <grid-item label='车牌查询' link="./licensePlate">
        <img slot="icon" src="../assets/chaxun.png">
      </grid-item>
      <grid-item label='安保设备' link="">
        <img slot="icon" src="../assets/jiancha.png">
      </grid-item>
      <grid-item label='清洁绿化'>
        <img slot="icon" src="../assets/jifei.png">
      </grid-item>
      <grid-item label='扫码抄表' link="./scanCodeReading">
        <img slot="icon" src="../assets/saoma.png">
      </grid-item>
      <grid-item label='欠费查询' link="./arrearsInquiries">
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
import {
  Search,
  XButton,
  Swiper,
  SwiperItem,
  ViewBox,
  XHeader,
  CellFormPreview,
  Group,
  Cell,
  Grid,
  GridItem
} from "vux";
import commonFooter from "src/common/footer";
import axios from "axios";
import { postData, allData } from "src/util/base";
import { p_alert, p_alert_error } from "src/util/alert";
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
    XButton,
    axios,
    postData,
    allData,
    p_alert,
    p_alert_error
  },
  data() {
    return {
      list: [
        {
          label: "Apple",
          value: "3.29"
        },
        {
          label: "Banana",
          value: "1.04"
        },
        {
          label: "Fish",
          value: "8.00"
        }
      ],
      chartArr1: [1, 2, 3, 4, 5, 6, 7],
      aCollectionRate: [],
      results: [],
      value: "",
      // 楼盘名称
      realEstate: "",
      // 轮播图名称
      lunboTitle: "",
      // 今日收款数
      gathering: 0,
      // 收缴率List,包含天数和收缴率
      aCollectionRateMonth: [],
      // 今天签订合同数
      signNum: "",
      // 出租楼层名称
      aOccupancyName: [],
      // 出租率
      aOccupancyRate: [],
      swiperDis:true,
      nullDis:false
    };
  },
  created() {
    // 获取楼盘名称
    function getbuildingName() {
      return axios.post("/fdset/getBuildingName", {
        //这里的01要换成null
        fdno: localStorage.getItem("fdno")
          ? localStorage.getItem("fdno")
          : "01",
        code: localStorage.getItem("jinzhuma")
      });
    }
    // 获取收缴率与今天收款数
    function getCollectionRate() {
      return axios.post("/skdtb/getCollectionRate", {
        //这里的01要换成null
        fdno: localStorage.getItem("fdno")
          ? localStorage.getItem("fdno")
          : "01",
        code: localStorage.getItem("jinzhuma")
      });
    }

    // 获取出租率与今天签订合同数
    function getRentalRate() {
      return axios.post("/wyfl/getRentalRate", {
        //这里的01要换成null
        fdno: localStorage.getItem("fdno")
          ? localStorage.getItem("fdno")
          : "01",
        code: localStorage.getItem("jinzhuma")
      });
    }
    axios.all([getbuildingName(), getCollectionRate(), getRentalRate()]).then(
      axios.spread((name, colle, rental) => {
        console.log(name.data.value, colle, rental);
        if (name.status != 200 || colle.status != 200 || rental.status != 200) {
          p_alert_error();
        } else {
          if(!name.data.value){
            this.swiperDis = false;
            this.nullDis = true
          }else{
            this.swiperDis = true
            this.nullDis = false
          // 轮播图title
          this.lunboTitle = name.data.value;
          // 今日收款数
          this.gathering = colle.data.gathering;
          // 收缴率list，有月份和金额
          for (let i = 0; i < colle.data.list.length; i++) {
            this.aCollectionRateMonth.push(parseInt(colle.data.list[i].key));
            this.aCollectionRate.push(parseInt(colle.data.list[i].value));
          }
          // 今天签订合同数
          this.signNum = rental.data.signNum;
          // 出租率list，有楼栋名称和楼栋的出租率
          for (let i = 0; i < rental.data.list.length; i++) {
            this.aOccupancyName.push(rental.data.list[i].key);
            this.aOccupancyRate.push(parseInt(rental.data.list[i].value));
          }
          // 调用echarts方法
          this.drawLine();
          this.aaa();
          // 将楼盘编号写入local
          localStorage.setItem("fdno", name.data.key);
          }
        }
      })
    );
  },
  methods: {
    charts(
      id,
      title,
      subtext,
      subNumber,
      type,
      xAxisData,
      seriesname,
      seriestype,
      seriesData
    ) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption({
        title: {
          text: title,
          left: "center",
          subtext: subtext + subNumber,
          subtextStyle: {
            verticalAlign: "top"
          }
        },
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: type
          }
        },
        xAxis: {
          data: xAxisData
        },
        yAxis: {},
        series: [
          {
            name: seriesname,
            type: seriestype,
            data: seriesData
          }
        ]
      });
    },
    drawLine() {
      this.charts(
        "myChart",
        this.lunboTitle + "收缴率",
        "今日收款:",
        this.gathering,
        "cross",
        this.aCollectionRateMonth,
        "收缴率",
        "line",
        this.aCollectionRate
      );
    },
    aaa() {
      this.charts(
        "myChart2",
        this.lunboTitle + "出租率",
        "今日签订合同:",
        this.signNum,
        "cross",
        this.aOccupancyName,
        "收缴率",
        "bar",
        this.aOccupancyRate
      );
    },
    resultClick(item) {
      alert("you click the result item: " + JSON.stringify(item));
      document.getElementsByClassName("vux-slider")[0].style.marginTop = "10px";
    },
    getResult(val) {
      console.log("on-change", val);
      this.results = val ? getResult(this.value) : [];
    },
    onSubmit() {
      this.$refs.search.setBlur();
    },
    onFocus() {
      console.log("on focus");
      document.getElementsByClassName("vux-slider")[0].style.marginTop = "54px";
    },
    onCancel() {
      console.log("on cancel");
      document.getElementsByClassName("vux-slider")[0].style.marginTop = "10px";
    },
    quit(){
      // 换了环境，也要修改这个地址
      localStorage.removeItem('user')
      localStorage.removeItem('pass')
      this.$router.push('./login')
      
    }
  }
};

function getResult(val) {
  let rs = [];
  for (let i = 0; i < 10; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: "bb"
    });
  }
  return rs;
}
</script>

<style lang="less" scoped>
@import "../css/reset.less";

.popup0 {
  padding-bottom: 15px;
  height: 200px;
}
.popup1 {
  width: 100%;
  height: 100%;
}
#null{
  text-align: center;
  height: 150px;
  line-height:150px;
  font-size:22px;
}
</style>
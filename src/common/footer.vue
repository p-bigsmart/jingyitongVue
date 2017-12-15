<template>
  <div style="height:53px">
      <tabbar  style="width:100%;position:absolute;left:0;bottom:0;z-index:100;height:53px">
      <tabbar-item link="/login" badge="2">
       <i class="iconfont icon-biaoqian" slot="icon"></i>
        <span slot="label">待办事项</span>
      </tabbar-item>
      <tabbar-item  badge="2">
       <i class="iconfont icon-tixing" slot="icon"></i>
        <span slot="label">公司公告</span>
      </tabbar-item>
      <tabbar-item selected link="">
       <i class="iconfont icon-shouye" slot="icon"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item>
       <i class="iconfont icon-jiankong" slot="icon"></i>
        <span slot="label">租控图</span>
      </tabbar-item>
      <tabbar-item link="./switchEstate">
       <i class="iconfont icon-VPN" slot="icon"></i>
        <span slot="label">切换楼盘</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>

import {Tabbar,TabbarItem} from 'vux'

export default{
    components:{
        Tabbar,
        TabbarItem
    }
}
</script>
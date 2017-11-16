<template>
  <div>
      <tabbar  style="width:100%;position:absolute;left:0;bottom:0;z-index:100;">
      <tabbar-item link="/login">
        
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
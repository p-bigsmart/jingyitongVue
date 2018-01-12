<template>
  <div class="height100">
      <view-box ref="viewBox" >
        <x-header>
            精易通物管助手--报修详情
        </x-header>
        <div class="content">
            <nav :key="arr.wyname" v-for="arr in allList">
                <flexbox >
                    <flexboxItem :span="7" ><div class="marginTop10">报修单号：{{arr.bxno}}</div></flexboxItem>
                    <flexboxItem :span="3"><div class="text_center  marginTop10 fontSize14">
                        <span v-if="arr.isyh">
                            <img src="../assets/contactName.png">
                        </span>
                        <span v-else>
                            <img src="../assets/house.png">
                        </span>
                        </div></flexboxItem>
                    <flexboxItem ><div class="text_right color_red marginTop10 fontSize14">{{arr.iscl ? '已处理' : '未处理'}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">业户:{{arr.wyname | dataVal}}</div></flexboxItem>
                     <flexboxItem :span="2"><div class="fontSize14 text_right marginTop10">{{arr.wyno | dataVal}}</div></flexboxItem>
                     <flexboxItem :span="2"><div class="fontSize14 text_right marginTop10"><img src="../assets/GPS.png" alt=""></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">联系人：{{arr.bxry | dataVal}}{{arr.yhtel | dataVal}}</div></flexboxItem>
                     <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10">报修类型：{{arr.bxtype | dataVal}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">报修时间：{{arr.curbxdate | formatDate}}</div></flexboxItem>
                     <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10">优先级：{{arr.priority ? '加急' : '普通'}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div style="font-size:14px;">{{arr.bxxm | dataVal}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">派单时间:{{arr.pddate | formatDate}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">接单人:{{arr.wxry | dataVal}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">现场图片：</div></flexboxItem>
                    <flexboxItem>
                        <div class="fontSize14 text_right marginTop10">
                            <a href="javascript:;" class="file">
                                <input type="file" ref="upImg"  id="file" @change="fileUp($event)"  />
                            </a>
                        </div>
                    </flexboxItem>
                </flexbox>
                <template v-if="photoList[0].length">
<<<<<<< HEAD
                <!-- <flexbox :gutter="0" v-if="array[0].filename"  v-for="array in photoList">
                    
=======
                <flexbox :gutter="0" :key="array[0].filename"  v-for="array in photoList">>
>>>>>>> 91d4449c4976a1c049b11374cd5f030a89213d05
                    <flexboxItem :span="3" ><div class="imgDiv marginTop10"><img :src="`${base}/bxupfile/`+array[0].filename" alt=""></div></flexboxItem>
                </flexbox> -->
                </template>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">开工时间:{{arr.kgdate | formatDate}}</div></flexboxItem>
                </flexbox>
                <group>
                    <x-textarea title="处理结果" placeholder="请输入处理结果" text-align="right"  :show-counter="false" :readonly="arr.iscl" :rows="1" autosize :value="arr.bz | dataVal"></x-textarea>
                </group>
                <group>
                    <datetime v-model="minuteListValue" :placeholder="arr.wcdate | formatDate " :readonly="arr.iscl" format="YYYY-MM-DD HH:mm"   title="完成时间"></datetime>
                </group>
                <group>
                    <x-input title="材料费" type="number" :value="arr.clje ? arr.clje : '0'" :readonly="arr.iscl">
                        <span slot="right">元</span>
                    </x-input>
                </group>
                <group>
                    <x-input title="服务费" type="number"  :value="arr.wxje ? arr.wxje : '0'" :readonly="arr.iscl" v-model="ServiceFee">
                        <span slot="right">元</span>
                    </x-input>
                </group>
                <flexbox :gutter="0">
                    <flexboxItem>
                        <h4 class="marginTop10">合计：{{arr.totalje}}元</h4>
                    </flexboxItem>
                </flexbox>
                    <div v-if="!arr.iscl" style="margin:20px 0"><x-button text="处理完成" type="primary" @click.native="tijiao(arr)"></x-button></div>
                
                <!-- 如果没有回访人姓名，那就不显示回访记录 -->
                <template v-if="arr.hfry">
                    <flexbox :gutter="0" >
                    <flexboxItem ><div class="fontSize14 marginTop10"><b>回访：</b></div></flexboxItem>
                    <flexboxItem><div class="fontSize14 text_right marginTop10">回访时间:{{arr.hfdate | formatDate}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0" >
                    <flexboxItem ><div class="fontSize14 marginTop10">回访人：{{arr.hfry | dataVal}}</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 text_right marginTop10">回方式：{{arr.hffs | dataVal}}</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 text_right marginTop10">满意程度：{{arr.approve | dataVal }}</div></flexboxItem>
                </flexbox>
                </template>
            </nav>
            <common-footer></common-footer>
        </div>
      </view-box>
  </div>
</template>

<script>
import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, XTextarea, Datetime, Swiper} from 'vux'

import { p_alert, p_alert_error } from 'src/util/alert'
import { postData , baseURL } from 'src/util/base'
import commonFooter from 'src/common/footer'
import {formatDate} from 'src/util/date'
import axios from 'axios'
import Exif from 'exif-js'  

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
        Swiper,
        baseURL,
        axios,
        Exif
    },
    data(){
        return {
            searchVal:'',
            status:'未处理',
            minuteListValue:"",
            // 报修详细数据
            allList:[],
            // 报修图片
            photoList:[],
            // 服务费
            ServiceFee : '' ,
            base:'',
            fileVal:'',
            ImgHttp: ''
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        },
        dataVal(data){
            if(data){
                return data
            }else{
                return '无'
            }
        }
    },
    beforeCreate(){
        postData('/bxtable/getDetail',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
            bxno:localStorage.getItem('bxno')
        }).then(res =>{
            this.allList.push(res.data)
            console.log(this.allList)
        }).catch(err =>{
            console.log(err)
        })
        postData('/wxupfile/getImage',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
            bxno:localStorage.getItem('bxno')
        }).then(res =>{
                this.base = baseURL
                this.base = this.base.slice(7)
                this.photoList.push(res.data)
                console.log(this.photoList[0])
        }).catch(err =>{
            console.log(err)
        })
        
    },
    methods:{
        search(){
            console.log(1)
        },
        super1(){
            console.log(11)
        },
        tijiao(arr){
            console.log(this.ServiceFee,'服务费')
            
        },
        // 图片上传
        fileUp(e){
            let upImg = this.$refs.upImg[0].files[0]
            let param = new FormData()
            param.append('file', upImg)
          axios.post('/wxupfile/upload', param)
          .then(response=>{
            //   http://120.76.203.34:8081/tsupfile/5e015048.png
            console.log(response.data, '图片上传成功');
            this.ImgHttp = baseURL+ '/tsupfile/' +response.data.image
          }).catch(err =>{
              console.log(err)
          })

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
    width:100%;
    height:50px;
}
a.file {
  width:25px;
  height:30px;
  line-height:30px;
  background:url('../assets/paizhao.png') no-repeat;
  text-align:center;
  display:inline-block;/*具有行内元素的视觉，块级元素的属性 宽高*/
  overflow:hidden;/*去掉的话，输入框也可以点击*/
  position:relative;/*相对定位，为 #file 的绝对定位准备*/
  top:5px;
}
a{
  text-decoration:none;
  color:#FFF;
}
#file{
   opacity:0;/*设置此控件透明度为零，即完全透明*/
   filter:alpha(opacity=0);/*设置此控件透明度为零，即完全透明针对IE*/
   width:100%;
   position:absolute;/*绝对定位，相对于 .input */
   top:0;
   right:0;
}
</style>

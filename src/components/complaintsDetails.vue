<template>
  <div class="height100">
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
                    <flexboxItem :span="7"><div class="marginTop10" style="font-size:15px;"><b>投诉单号：{{allList.tsno}}</b></div></flexboxItem>
                    <flexboxItem :span="3"><div class="text_right  marginTop10 fontSize14">投诉方式:{{allList.tsfs}}</div></flexboxItem>
                    <flexboxItem ><div class="text_right color_red marginTop10 fontSize14" ><b>{{allList.iscl ? '已处理' : '未处理'}}</b></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">投诉人:{{allList.wyname}}</div></flexboxItem>
                     <flexboxItem :span="2"><div class="fontSize14 text_right marginTop10">{{allList.wyno}}</div></flexboxItem>
                     <flexboxItem :span="2"><div class="fontSize14 text_right marginTop10"><img src="../assets/GPS.png" alt=""></div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">联系人：{{allList.tsry}}{{allList.yhtel}} <img style="vertical-align:middle" src="../assets/phone.png" alt=""></div></flexboxItem>
                     <flexboxItem :span="4"><div class="fontSize14 text_right marginTop10" style="height:28px;">接待人：{{allList.jdry}}</div></flexboxItem>
                </flexbox>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 marginTop10">投诉时间：{{allList.curbxdate}}</div></flexboxItem>
                     <flexboxItem :span="5"><div class="fontSize14 text_right marginTop10">投诉类型：{{allList.tsclass}}类</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0">
                    <flexboxItem><div style="font-size:14px;">{{allList.tsxm}}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <group>
                    <x-textarea title="接单处理人" placeholder="请输入处理结果" v-model="allList.clry" :readonly="allList.iscl" :show-counter="false" :rows="1" autosize></x-textarea>
                </group>
                <flexbox :gutter="0">
                    <flexboxItem><div class="fontSize14 ">现场图片：</div></flexboxItem>
                    <flexboxItem>
                        <div class="fontSize14 text_right marginTop10">
                            <a href="javascript:;" class="file">
                                <input type="file" ref="upImg"  id="file" @change="fileUp($event)"  />
                            </a>
                        </div>
                    </flexboxItem>
                </flexbox>
                <template >
                <flexbox :gutter="0">
                    <flexboxItem ><div class="imgDiv marginTop10 floatLeft" :key="item" v-for="item in ImgHttp">
                            <img style="width:50px;height:50px;"   :key="item" :src="item" alt="">
                        </div></flexboxItem>
                </flexbox>
                </template>
                <group>
                    <x-textarea title="处理结果" placeholder="请输入处理结果" v-model="allList.clxm" :readonly="allList.iscl" :show-counter="false" :rows="1" autosize></x-textarea>
                </group>
                <group>
                    <datetime placeholder='请选择处理完成时间' v-model="allList.cldate" format="YYYY-MM-DD HH:mm"   title="处理时间" :readonly="allList.iscl"></datetime>
                </group>
                    <div  v-if="!allList.iscl" style="margin-top:20px"><x-button text="处理完成" type="primary" @click.native="tijiao(allList)"></x-button></div>
                <!-- 如果没有回访人姓名，那就不显示回访记录 -->
                <template v-if="allList.iscl">
                    <flexbox :gutter="0" >
                    <flexboxItem ><div class="fontSize14 marginTop10"><b>回访：</b></div></flexboxItem>
                    <flexboxItem><div class="fontSize14 text_right marginTop10">回访时间:{{allList.hfdate }}</div></flexboxItem>
                </flexbox>
                <div class="hr"></div>
                <flexbox :gutter="0" >
                    <flexboxItem ><div class="fontSize14 marginTop10">回访人：{{allList.hfry }}</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 text_right marginTop10">回访方式：{{allList.hffs }}</div></flexboxItem>
                    <flexboxItem><div class="fontSize14 text_right marginTop10">满意程度：{{allList.approve  }}</div></flexboxItem>
                </flexbox>
                <div class="marginTop10"></div>
                </template>
            </nav>
            <common-footer></common-footer>
        </div>
  </div>
</template>

<script>
import {XButton, XHeader, XInput, Group, Flexbox, FlexboxItem, Selector, XDialog, TransferDomDirective as TransferDom, XTextarea, Datetime, Swiper} from 'vux'

import { p_alert, p_alert_error,p_alert_hide } from 'src/util/alert'
import { postData, baseURL } from 'src/util/base'
import commonFooter from 'src/common/footer'
import { formatDate } from 'src/util/date'
import Exif from 'exif-js'  
import axios from 'axios'

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
        Exif,
        axios,
        baseURL
    },
    data(){
        return {
            searchVal:'',
            status:'未处理',
            minuteListValue:"",
            ImgHttp:[],
            allList:null
        }
    },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    created(){
        
        postData('/tstable/getDetail',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
            tsno:localStorage.getItem('tsno')
        }).then(res =>{
            if(res.data){
                this.allList = res.data
                let date = new Date(this.allList.cldate);
                this.allList.cldate = formatDate(date, 'yyyy-MM-dd hh:mm')
            }
            else
            p_alert_hide('暂无数据','返回前一页确认数据',function(){history.go(-1)})
        }).catch(err =>{
            p_alert_error()
        })

        postData('tsupfile/getImage',{
            code:localStorage.getItem('jinzhuma'),
            fdno:localStorage.getItem('fdno'),
            bxno:localStorage.getItem('tsno')
        }).then(res =>{
            console.log(res)
                 if(res.data.length){
                    for(let i = 0;i<res.data.length;i++){
                        this.ImgHttp.push(baseURL+ '/wxupfile/' + res.data[i].filename)
                    }
                }
        }).catch(err =>{
            p_alert_error()
        })
    },
    methods:{
        search(){
            console.log(1)
        },
        // 图片上传 
        fileUp(e){
            let upImg = this.$refs.upImg.files[0]
            let param = new FormData()
            /* 一次上传多张图片 */
            /* this.upImg.forEach(item =>{
                param.append('file',upImg)
            }) */
            param.append('file', upImg)
            param.append('code',localStorage.getItem('jinzhuma'))
            param.append('fdno',localStorage.getItem('fdno'))
            param.append('tsno',localStorage.getItem('tsno'))
          axios.post('tsupfile/upload', param)
          .then(response=>{
            console.log(response.data, '图片上传成功');
            this.ImgHttp.push(baseURL+ '/tsupfile/' +response.data.image)
            
          }).catch(err =>{
              console.log(err)
          })

        },
        tijiao(list){
            if(list.clxm && list.cldate && list.clry){
                postData('/tstable/operation',{
                    code : localStorage.getItem('jinzhuma'),
                    tsno : list.tsno,
                    clry : list.clry,
                    clxm : list.clxm,
                    cldate : list.cldate,
                    iscl : true
                }).then(res =>{
                    if(res.data) p_alert_hide('处理成功','点击确认返回投诉列表',function(){history.go(-1)})
                    else p_alert('处理失败','请检查一下数据或刷新页面')
                }).catch(err =>{
                    p_alert_error()
                })
            }else{
                p_alert('数据不完整','请输入完整信息再提交')
            }
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

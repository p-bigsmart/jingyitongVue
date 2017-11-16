<template>
  <div class="height100">
      <view-box ref="viewBox">
          <x-header :left-options="{showBack: false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
                  <a slot="left">退出</a>
                    精易通物管助手
                  <a slot="right">进驻登记</a>
          </x-header>
            <div class="content">
                   <div class="bgImg"></div>
                    <div class="relative">
                        <div class="logincontent">
                            <p>请输入你的账号和密码</p>
                            <div class="login-input">
                                <input type="text" v-model="name" placeholder="请输入用户名" />
                                <input type="password" v-model="pass" placeholder="请输入密码" />
                            </div>
                            <button class="submit" @click="submit()">登录</button>
                            <p style="margin-top:0;"><a href="">忘记密码</a> | <a href="">立即注册</a></p>
                        </div>
                    </div>
                    <footer>
			<p>&copy;版权所有 -精拓软件科技有限公司所有</p>
		        </footer>
            </div>
      </view-box>
  </div>
</template>

<script>
import {ViewBox,XHeader,} from 'vux'

export default {
    components:{
        ViewBox,
        XHeader,

    },
    data(){
        return{
            showBack:true,
            name:'',
            pass:''
        }
    },
    created(){
        
    },
    methods: {
     submit(){
         if(this.name == 1 && this.pass == 1){
             this.$router.push('./index')
         }else{
             console.log('密码错误')
         }
        }
    }

}
</script>
<style scoped lang="less">

@import '../css/reset.less';

.relative{
    position: relative;
    height:246px;
}

.bgImg{
        background: url('../img/loginBanner.png') no-repeat;
        background-size: cover;
        width:100%;
        height:200px
}

.logincontent{
	width:90%;
	text-align: center;
	margin:0 auto;
	border-radius:10px;
	position: absolute;
	left:5%;
	top:-50px;
	background:white;
}
.logincontent > *{
	margin:20px 0;
}
.logincontent p{
	color:#8d8d8d; 
	font-size:16px;
	margin:20px 0 30px 0;
}
.logincontent .login-input input{ 
	height:40px;
	width:75%;
	border:1px solid #dadada;
	padding-left:40px;
	background: url(../assets/userBg.png) no-repeat;
	background-position:8px 10px ; 
	outline: none;
}
.logincontent .login-input input+input{
	margin-top:15px;
	background:url(../assets/passBg.png) no-repeat;
	background-position:8px 10px ; 
} 
.logincontent button{
	height:40px;
	width:90%;
	margin-top:10px;
	background: #3c97e6;
	border:none;
	border-radius: 5px;
	color:white;
	letter-spacing: 5px;;
	outline: none;
}
.logincontent p a{
	font-size:14px;
	color:#f9a687;
	text-decoration: none;;
}
.logincontent p a:nth-child(2){
	color:#5ab754;
}
footer{
	position: absolute;
	bottom:10px;
	text-align: center;
	font-size:12px;
	width:100%;
	color:#8d8d8d; 
}
</style>

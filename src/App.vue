<template>
  <div id="app">
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_475813_9og1rj53a2az6w29.css">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0,  user-scalable=0;" name="viewport" />
    <router-view/>
  </div>
</template>

<script>



export default {
  name: 'app'
}
</script>
<style lang="less">
@import '../src/css/reset.less';
#app{
  height:100%;
}
</style>

<template>
  <div :class="{'circle-drawer-form':true,'circle-drawer-form-appear':!Hidden}" :style="{'background':OutterBackground}">
      <div class="content-container" :style="{'background':InnerBackground}">
            <slot></slot>
      </div>

  </div>
</template>
<script>
  export default {
    name:'CircleDrawerForm',
    props:{
      OutterBackground:String,
      InnerBackground:String,
      Hidden:Boolean
    }
  }
</script>
<style scoped>
  .circle-drawer-form {
      position: absolute;
      height: 80vh;
      width:80vh;
      top:0;
      right: 0;
      z-index:3000;
      border-radius: 0 0 0 100%;
      transform: rotateZ(90deg);
      transform-origin: 100% 0%;
      transition: all 0.4s;
  }

  .circle-drawer-form-appear{
      transform: rotateZ(0deg);
  }

  .circle-drawer-form .content-container{
      width:50vh;
      height:50vh;
      position: absolute;
      top:0;
      right: 12vh;
  }
</style>
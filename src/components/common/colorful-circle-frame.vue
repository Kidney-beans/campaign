<template>
  <div class='colorful-circle-frame' :style="{'width':SideLength + 'px','height':SideLength + 'px'}">
      <div :class="{'outter-circle':true,'animation-reverse':Reverse}" :style="{'width':SideLength + 'px','height':SideLength + 'px'}">
        <div :class="{'inner-circle':true,'animation-reverse':Reverse}" :style="{'width':SideLength - SideWidth + 'px','height':SideLength - SideWidth + 'px'}">
        </div>
      </div>
      <div class="content-container" :style="{'width':SideLength + 'px','height':SideLength + 'px'}">
          <slot></slot>
      </div>
      
  </div>
</template>
<script>
  export default {
    name:'ColorfulCircleFrame',
    props:{
      SideLength:Number,
      SideWidth:Number,
      Reverse:{
        type:Boolean,
        default:false
      }
    },
    mounted(){

    }
  }
</script>
<style scoped>
  .colorful-circle-frame{
      position: relative;       
  }

  .colorful-circle-frame .outter-circle{
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      filter: brightness(1.4);
      background: linear-gradient(235deg,#0250c5,#d43f8d);
      animation: linear back-rot 2s infinite;
    
  }

  .colorful-circle-frame .outter-circle::after{
      position:absolute;
      content:'';
      top:-10px;
      bottom: -10px;
      left:-10px;
      right:-10px;
      filter: blur(15px) brightness(0.8);
      z-index: -2;
      background: linear-gradient(235deg,#0250c5,#d43f8d);
      animation: linear back-rot 2s infinite;
      border-radius: 50%;
  }

  .animation-reverse{
    animation: linear back-rot 2s infinite reverse !important;
  }

  .animation-reverse::after{
    animation: linear back-rot 2s infinite reverse !important;
  }

  .colorful-circle-frame .outter-circle .inner-circle{
      border-radius: 50%;
      background-color: black;
  }

  .colorful-circle-frame .content-container{
      position: absolute;
      top:0;
      left:0;
      border-radius: 50%;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
  }

  @keyframes back-rot {
      0%{
          transform: rotateZ(0);
      }
      100%{
          transform: rotateZ(360deg);
      }
  }
</style>
<template>
  <h1 class='spot-lamp' :style="{'font-size':FontSize,'color':BackTextColor}" :textstr="Text">
    {{Text}}
  </h1>
</template>
<script>
  export default {
    name:'SpotLamp',
    props:{
      FontSize:String,
      Text:String,
      BackTextColor:String
    }
  }
</script>
<style scoped>
  .spot-lamp{
      color:#333;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-family:'COCOGOOSE';
      position: relative;
  }

  .spot-lamp::after{
      content: attr(textstr);
      position: absolute;
      left:50%;
      top:50%;
      transform: translateX(-50%) translateY(-50%);
      color:transparent;
      background: linear-gradient(to right,#c23616,#192a56,#00d2d3,yellow,#6d214f,#2e86de,#4cd137,#e84118);
      background-clip: text;
      animation: move 5s infinite;
  }

  @keyframes move {
     0%{
        clip-path: circle(30% at 10% 50%);
     }
     50%{
        clip-path: circle(30% at 90% 50%);
     }
     100%{
        clip-path: circle(30% at 10% 50%);
     }
  }
</style>
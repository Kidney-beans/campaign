<template>
  <div @click="btnClick" class='cool-button' :style="{'width':Width,'height':Height,'line-height':Height,'border-radius':BorderRadius,'font-size':FontSize}" :borra="parseInt(Height)/2 + 'px'">
      {{Text}}
  </div>
</template>
<script>
  export default {
    name:'CoolButton',
    props:{
      Width:String,
      Height:String,
      Text:String,
      BorderRadius:String,
      FontSize:String
    },
    methods:{
        btnClick(){
            this.$emit("btn-click")
        }
    }
  }
</script>
<style scoped>
  .cool-button{
      font-family:'Bauhaus-Bold';
      background: linear-gradient(to right,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
      text-align: center;
      color: white;
      text-transform: uppercase;
      background-size: 400%;
      animation: back_move 7s infinite linear;
      position:relative;
      z-index:0;
      cursor: pointer;
  }
  .cool-button::before{
      content:'';
      position: absolute;
      top:0px;
      bottom:0px;
      left:0px;
      right:0px;
      background: linear-gradient(to right,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
      background-size: 400%;
      animation: back_move 7s infinite linear;
      z-index:-1;
      border-radius: 50px;
  }

  .cool-button:hover::before{
      filter: blur(20px);
      top:-10px;
      bottom:-10px;
      left:-10px;
      right:-10px;
      transition: all 0.4s;
  }

  @keyframes back_move{
      0%{
          background-position: left;
      }
      50%{
          background-position: right;
      }
      100%{
          background-position: left;
      }
  }
</style>
<template>
  <div class='colorful-clock' :style="{'width':Width,'height':Height}">
      <div class="hour block">
          <div class="value" :style="{'font-size':ValueSize}">{{hour}}</div>
          <div class="descri" :style="{'font-size':DescriSize}">hour</div>
        </div>
      <div class="minute block">
          <div class="value" :style="{'font-size':ValueSize}">{{minute}}</div>
          <div class="descri" :style="{'font-size':DescriSize}">minute</div>
        </div>
      <div class="second block">
          <div class="value" :style="{'font-size':ValueSize}">{{second}}</div>
          <div class="descri" :style="{'font-size':DescriSize}">second</div>
        </div>
  </div>
</template>
<script>
  export default {
    name:'ColorfulClock',
    props:{
      Width:String,
      Height:String,
      ValueSize:String,
      DescriSize:String
    },
    data(){
        return{
            hour:'',
            minute:'',
            second:''
        }
    },
    mounted(){
        setInterval(()=>{
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            this.hour = h < 10?'0' + h:h;
            this.minute = m < 10?'0' + m:m;
            this.second = s < 10?'0' + s:s;
        },1000);
    }
  }
</script>
<style scoped>
  .colorful-clock{
      color:white;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

  }

  .block{
      width:25%;
      height:90%;
      margin:2%;
      background: linear-gradient(#d43f8d,#0250c5);
      -webkit-box-reflect: below 16px -webkit-linear-gradient(transparent,transparent 50%,rgba(255,255,255,0.6));
  }

  .block:hover{
      transform: translateY(-10px);
      transition: all 0.3s;
  }

  .block .value{
      height:70%;
      border-bottom: 1px solid #fff;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-family:'DS-Digital';
      
  }

  .block .descri{
      height:30%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      letter-spacing: 0.2em;
  }
</style>
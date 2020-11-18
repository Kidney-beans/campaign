<template>
  <div class='circle-percent-show'>
      <div class="half-transparent-side" :style="{'background-color':OutterColor}">
        <div class="real-show" :style="{'background':backgroundDescri}">
            <div class="inner-mask" :style="{'font-size':FontSize,'background-color':innerColor}" :text-sh="valueShow + '%'">
                {{valueShow}}%
            </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name:'CirclePercentShow',
    props:{
      value:Number,
      FontSize:String,
      innerColor:String,
      OutterColor:String
    },
    data(){
        return {
            backgroundDescri:'background: conic-gradient(#0250c5 0,#d43f8d 0,transparent 0,transparent 100%)',
            valueShow:0
        }
    },
    computed:{
        valueTrans(){
            if(typeof (this.value) != 'number' || this.value > 1){
                return 100
            }
            if(this.value < 0){
                return 0
            }
            return this.value * 100
        }
    },
    mounted(){
        let side_value = this.valueTrans.toFixed(0);
        let dynamic_value = 0
        let inter = setInterval(()=>{
            if(dynamic_value > side_value){
                clearInterval(inter)
                return 
            }
            this.valueShow = dynamic_value
            this.backgroundDescri = `conic-gradient(#0250c5 0,#d43f8d ${dynamic_value}%,transparent ${dynamic_value+0.3}%,transparent 100%)`;
            dynamic_value++;
        },15)
        
    }
  }
</script>
<style scoped>
  .circle-percent-show{
      width:100%;
      height: 100%;
      animation: circle-percent-show-appeat 0.4s; 
      transform: scale(0.9);
      transition: 0.2s all;
  }

  .circle-percent-show:hover{
      transform: scale(1);
  }

  .circle-percent-show .half-transparent-side{
      width:100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.15);
  }

  .circle-percent-show .half-transparent-side .real-show{
      width:100%;
      height: 100%;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      /* background: conic-gradient(#0250c5 0,#d43f8d 0,transparent 0,transparent 100%); */
      transition: all 0.4s;
  }

  .circle-percent-show .half-transparent-side .real-show .inner-mask{
      width:85%;
      height: 85%;
      border-radius: 50%;
      background-color: black;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      /* color: white; */
      font-family:'Humanist777Black';
      position: relative;

  }
  .circle-percent-show .half-transparent-side .real-show .inner-mask::after{
      content: attr(text-sh);
      position: absolute;
      top:50%;
      left:50%;
      transform: translateX(-50%) translateY(-50%);
      background: linear-gradient(to right,#03a9f4,#f441a5);
      background-size: 400%;
      color: transparent;
      background-clip: text;
      animation: back-mov 5s infinite;
      -webkit-box-reflect: below -10px -webkit-linear-gradient(transparent,transparent 50%,rgba(255,255,255,0.6));
  }

  @keyframes back-mov {
      0%{
          background-position: left;
      }
      50%{
          background-position: right;
      }
      0%{
          background-position: left;
      }
  }

  @keyframes circle-percent-show-appeat {
      0%{
          transform: scale(0);
      }
      100%{
          transform: scale(1);
      }
  }
</style>
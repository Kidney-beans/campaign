<template>
  <div class='volumn-control' :style="{'width':SideLength,'height':SideLength,'left':Left,'top':Top}">
      <img src="~assets/music/volumn.png" mean="main" @click="barShow = !barShow"/>
      <div class="adaptor-bar-block" :style="{'top':TopOffset,'height':BarHeight}" v-if="barShow" @mouseup="volumnChange = false" >
          <div class="empty-bar" 
            @mouseup="volumnChange = false" 
                >
              <div class="bar-button" :style="{'top':barBtnTopOff+'px'}"
                @mousedown="volumnChange = true" 
                @mouseup="volumnChange = false" 
                @mouseout="volumnChange = false"
                @mousemove="changeVolumn"
              >
                <div class="bar-button-visual"></div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
  export default {
    name:'VolumnControl',
    props:{
      SideLength:String,
      Left:String,
      Top:String,
      TopOffset:String,
      BarHeight:String,
      
    },
    data(){
        return {
            volumnChange:false,
            barBtnTopOff:0,
            barShow:false
        }
    },
    methods:{
        changeVolumn(e){
            if(!this.volumnChange){
                return
            }
            let offY = e.movementY
            this.barBtnTopOff += offY
            this.$emit("change",1 - this.barBtnTopOff / parseInt(this.BarHeight))
        }
    }
  }
</script>
<style scoped>
  .volumn-control{
      position: absolute;
      z-index: 1000;
  }

  .volumn-control img[mean=main]{
      display: block;
      width: 100%;
      height:100%;
      cursor: pointer;
  }

  .volumn-control img[mean=main]:hover{
      filter: brightness(2);
  }

  .volumn-control .adaptor-bar-block{
      position: absolute;
      width:100%;
      background-color: rgba(0,0,0,0.5);
      border: 1px solid #617af0;
      border-bottom: none;
      animation: adaptor-bar-block-show 0.4s forwards;
  }

  .volumn-control .adaptor-bar-block .empty-bar{
      position: relative;
      margin:auto;
      width:5%;
      background-color: #617af0;
      height:100%;
  }

  .volumn-control .adaptor-bar-block .empty-bar .bar-button{
      position: absolute;
      width:30px;
      height: 30px;
      border-radius: 50%;
      background-color: transparent;
      left: calc(50% - 30px / 2);
      cursor: pointer;
      padding: 6px;
      box-sizing: border-box;
  }

  .volumn-control .adaptor-bar-block .empty-bar .bar-button .bar-button-visual{
      width:100%;
      height:100%;
      background: radial-gradient(black,#617af0);
      border-radius: 50%;
  }

  .volumn-control .adaptor-bar-block .empty-bar .bar-button:hover .bar-button-visual{
      filter: brightness(2); 
  }
  
  @keyframes  adaptor-bar-block-show{
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
  }
</style>
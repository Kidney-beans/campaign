<template>
  <div id='diary'>
    <div class="cardImgBgc" :style="{'opacity':cardImgBgcOpacity,'filter':'blur('+cardImgBgcBlur+'px)'}">
      <div class="mask"></div>
    </div>
    <div class="cardBox" :style="{'opacity':cardBoxOpacity,'display':cardBoxDisplay}">
      <div class="img">
        <div class="see" @click="seeClick">see</div>
      </div>
      <div class="card">
        <div class="title">标题</div>
      </div>
      <div class="time">
        <colorfulClock Width=30vw Height=13vh ValueSize=3vw></colorfulClock>
      </div>
      <div class="day">
        <div class="samllImg">
          {{this.day}}
        </div>
        <div class="bottom"> 
          <img src="../assets/diary/top.png" alt="">
        </div>
        <div class="top"> 
          <img src="../assets/diary/top.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import colorfulClock from '../components/common/colorful-clock'
  export default {
    name:'',
    props:{
      
    },
    data(){
      return{
        cardImgBgcOpacity:0.2,
        cardBoxOpacity:1,
        cardImgBgcBlur:2,
        cardBoxDisplay:'block',
        day:''
      }
    },
    methods:{
      seeClick(){
        let timer=setInterval(()=>{
          this.cardImgBgcOpacity+=0.1
          this.cardBoxOpacity-=0.1
          this.cardImgBgcBlur-=0.2
        },100)
        if(this.cardImgBgcOpacity>=1.2){
          this.cardBoxDisplay='none';
          clearInterval(timer);
        }
      }
    },
    components:{
      colorfulClock
    },
    mounted(){
      let date=new Date();
      let day=date.getDate();
      this.day=day>10?day:'0'+day;
    }
  }
</script>
<style scoped>
  @import '~css/diary.css';
</style>
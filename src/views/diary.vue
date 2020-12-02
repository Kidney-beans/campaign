<template>
  <div id='diary'>
    <h1 class="webTitle">DIARY</h1>
    <!-- 日记大背景 -->
    <div class="cardImgBgc" :style="{'opacity':cardImgBgcOpacity,'filter':'blur('+cardImgBgcBlur+'px)'}">
    </div>
    <!-- 日记盒子 -->
    <div class="cardBox" :style="{'opacity':cardBoxOpacity,'display':cardBoxDisplay}">
      <div class="myDairy">MY  DAIRY</div>
      <!-- 日记内小图片 -->
      <div class="img">
        <!-- 图片内see -->
        <div class="see" @click="seeClick">see</div>
      </div>
      <!-- 日记文字边框 -->
      <div class="card">
        <!-- 日记标题文字 -->
        <div class="title">标题</div>
      </div>
      <!-- 时间 -->
      <div class="time">
        <colorfulClock Width=30vw Height=13vh ValueSize=3vw></colorfulClock>
      </div>
      <!-- 天 -->
      <div class="day">
        <!-- 文字 -->
        <div class="samllImg">
          {{this.day}}
        </div>
        <!-- 上一天按钮 -->
        <div class="bottom"> 
          <img src="../assets/diary/top-2.png" alt="">
        </div>
        <!-- 下一天按钮 -->
        <div class="top"> 
          <img src="../assets/diary/top-2.png" alt="">
        </div>
      </div>
    </div>
    <!-- 日记内容 -->
    <div class="diatyContent">

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
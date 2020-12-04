<template>
  <div id='diary'>

    <top-nav></top-nav>
    <!-- 顶部DIARY文字 -->
    <h1 class="webTitle">DIARY</h1>
    <!-- 日记大背景 -->
    <div class="cardImgBgc" :style="{'opacity':cardImgBgcOpacity,'filter':'blur('+cardImgBgcBlur+'px)','background': 'url('+diary[day-1].img+')'}">
    </div>
    <!-- 返回按钮 -->
    <div class="backCardBox" :style="{'display':showDiaryDisplay,'opacity':showDiaryContent}"  @click="backCardBox">
      <div class="backFont">返 回</div>
      <img src="../assets/diary/back.png" alt="返回" >
    </div>
    <!-- 日记展示 -->
    <div class="diaryContent" :style="{'display':showDiaryDisplay,'opacity':showDiaryContent}">
      <!-- MY DAIRY文字 -->
      <div class="myDairy">MY  DAIRY</div>
      <!-- 日记内容 -->
      <div class="showContent">
        <div :contenteditable="false">{{diary[day-1].content}}</div>
      </div>
      <!-- 日记标题文字 -->
      <div class="title">{{this.diary[this.day-1].title}}</div>
      <!-- 年月显示 -->
      <div class="yearAndMonth">{{this.year}}.{{this.month+1>=10?this.month+1:"0"+(this.month+1)}}</div>
    </div>
    <!-- 日记盒子 -->
    <div class="cardBox" :style="{'opacity':cardBoxOpacity,'display':cardBoxDisplay}">
      <!-- MY DAIRY文字 -->
      <div class="myDairy">MY  DAIRY</div>
      <!-- 日记内小图片 -->
      <div class="img" :style="{'background': 'url('+diary[day-1].img+')'}">
        <!-- 图片内see -->
        <div class="see" @click="seeClick">see</div>
      </div>
      <!-- 日记文字边框 -->
      <div class="card">
        <!-- 日记标题文字 -->
        <div class="title">{{this.diary[this.day-1].title}}</div>
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
          <img src="../assets/diary/top-2.png" alt="上一天" @click="prevDay">
        </div>
        <!-- 下一天按钮 -->
        <div class="top"> 
          <img src="../assets/diary/top-2.png" alt="下一天" @click="nextDay">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import colorfulClock from '../components/common/colorful-clock'
  import topNav from '../components/own/top-nav'
  export default {
    name:'',
    props:{
      
    },
    data(){
      return{
        diary:[
          {
            title:'2020 做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/2.jpg"
          },
          {
            title:'篇一 ',
            content:'　　妈妈给了我和妹妹一人一块抹布，我们学着妈妈的样子，把抹布放在水里打湿，然后拿起抹布，就准备往货架上擦。妈妈一看，马上叫住我们：“停一停！”　　原来，看着简简单单的事情做起来细节要这么多啊！　　今天，我像往常一样走进了教室，一抬头，看见有位同学的桌子上放着一个漂亮的发卡，爱臭美的我喜欢极了。　　我微笑着走向那位同学：“可以借给我戴一下吗？”她没有答应，我垂头丧气地回到座位上，还不时地瞅上几眼发卡。',
            img:"http://118.25.144.69/public/imgs/1.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/3.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/4.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/5.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/6.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/7.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/8.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/9.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/10.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/11.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/12.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/13.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/14.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/15.jpg"
          },
           {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/16.jpg"
          },
           {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/17.jpg"
          },
           {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/18.jpg"
          },
           {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/19.jpg"
          },
           {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/20.jpg"
          },
           {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/21.jpg"
          },
          {
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/1.jpg"
          },{
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/2.jpg"
          },{
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/3.jpg"
          },{
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/4.jpg"
          },{
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/5.jpg"
          },{
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/6.jpg"
          },{
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/7.jpg"
          },{
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/8.jpg"
          },{
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/9.jpg"
          },{
            title:'今天做网页',
            content:'做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页做网页',
            img:"http://118.25.144.69/public/imgs/10.jpg"
          }
        ],
        showDiaryDisplay:'none',
        cardImgBgcOpacity:0.2,
        cardBoxOpacity:1,
        cardImgBgcBlur:2,
        cardBoxDisplay:'block',
        showDiaryContent:0,
        day:'01',
        year:2020,
        month:1
      }
    },
    methods:{
      seeClick(){
        this.showDiaryDisplay='block'
        let timer=setInterval(()=>{
          this.cardImgBgcOpacity+=0.1
          this.cardBoxOpacity-=0.1
          this.cardImgBgcBlur-=0.2
          this.showDiaryContent+=0.1
          if(this.cardImgBgcOpacity>=1.2){
          this.cardBoxDisplay='none';
          clearInterval(timer);
        }
        },100)
      },
      //获取当月天数
      getDays(){
        //闰年每月天数
        var monthOlympic=[31,29,31,30,31,30,31,31,30,31,30,31];
        //非闰年每月天数
        var monthNormal=[31,28,31,30,31,30,31,31,30,31,30,31];
        //判断是否为闰年
        if((this.year%100==0&&this.year%400==0)||(this.year%100!=0&&this.year%4==0))
        {
            return (monthOlympic[this.month]);
        }
        else
        {
            return (monthNormal[this.month]);
        }
      },
      // 切换上一天
      prevDay(){
        // console.log(1)
        
        let dayNow=parseInt(this.day)
        if(dayNow==this.getDays()){
          this.day='01'
          if(this.month==11){
            this.year+=1 
            this.month=0
          }else
            this.month+=1;
          // console.log(this.year,this.month,this.day)
        }else{
          this.day=parseInt(this.day)+1>=10?parseInt(this.day)+1:'0'+(parseInt(this.day)+1)
        }
      },
      // 切换下一天
      nextDay(){
        let dayNow=parseInt(this.day)
        if(dayNow==1){
          if(this.month==0){
            this.year-=1 
            this.month=11
          }else
            this.month-=1;
          // console.log(this.year,this.month,this.day)
          this.day=this.getDays();
        }else{
          this.day=dayNow-1>=10?dayNow-1:'0'+(dayNow-1)
        }
      },
      backCardBox(){
        this.cardBoxDisplay='block';
        let timer=setInterval(()=>{
          this.cardImgBgcOpacity-=0.1
          this.cardBoxOpacity+=0.1
          this.cardImgBgcBlur+=0.2
          this.showDiaryContent-=0.1
          if(this.cardImgBgcOpacity<=0.2){
            this.showDiaryDisplay='none'
            clearInterval(timer);
            timer=null;
        }
        },100)
      }
    },
    components:{
      colorfulClock,
      topNav
    },
    mounted(){
      let date=new Date();
      this.year=date.getFullYear();
      this.month=date.getMonth();
      let day=date.getDate();
      this.day=day>10?day:'0'+day;
    }
  }
</script>
<style scoped>
  @import '~css/diary.css';
</style>
<template>
  <div class="music">
    <h1 class="title-h1">music</h1>
    
    <audio controls @timeupdate="timeUpdate">
    <source src="../assets/music/临安初雨.mp3" type="audio/mpeg">
    </audio>
    <div class="music-box">
      <div class="music-bar" @mouseenter="mousdrop" @mouseleave="mousadd"></div>
     <div :class='[mubarShow,mubarstop]'>
     <ul class="music-bar-text">
       <!-- 注意注意 -->
       <li>lailll</li>
     </ul>
     </div>
      <input type="text" class="music-seek" value=""/>
      
      <div class="music-log"></div>
      <div class="min-box">
        <div class="minlog1"></div>
        <div class="minlog2"></div>
      </div> 
      <div class="progress-bar">
      <div class="music-porgre"></div>
      
      <span><img src="../assets/music/last.png" class="music-btn-last"></span>
      <span id="musicPause">
        <img src="../assets/music/play.png" class="music-btn-position music-btn-play" id="music-play">
      </span>
      <span id="musicPlay">
        <img src="../assets/music/pause.png" class="music-btn-position music-btn-pause" id="music-pause">
      </span>
      <span><img src="../assets/music/last.png" class="music-btn-next"></span>
        <!-- <span><img src="../assets/music/音量.png"></span> -->
      <div class="music-porgre-border">
         <span class="music-porgre-solid" :style="{'left':-100+((currentMusicTime / currentDuration) * 100) + '%'}"></span>
        </div>
      
      </div>
    </div>
  </div>
</template>
<script>
export default {
  

  props: {
    Abc: String,
  },
  data() {
    return { 
        mubarShow:'',
        mubarstop:'',
        currentMusicTime:0,
        currentDuration:1000000
    };
  },
  methods: {
    mousdrop:function(event){
     
       this.mubarShow='showbar';
       this.mubarstop='musicbartext'
    },
    mousadd:function(event){
      this.mubarShow=''
    
    },
    timeUpdate(e){
      let srcEle = e.srcElement;
      this.currentMusicTime = srcEle.currentTime
      this.currentDuration = srcEle.duration
      console.log("已更改：")
      console.log(this.currentMusicTime,this.currentDuration)
    }
  },
  computed: {},
  components: {},
  mounted() {
    // setTimeout(()=>{
    //     console.log("音乐时长：",document.getElementById("audio").duration);
    //   },1000);
      setTimeout(()=>{
        let musicpause=document.getElementById("music-play");
        let musicplay=document.getElementById("music-pause");
        let Play=document.getElementById("musicPlay");
        let Pause= document.getElementById("musicPause");
        Play.onclick=function(){
          musicplay.style.display="none"
          musicpause.style.display="block"
        }
        Pause.onclick=function(){
          musicplay.style.display="block"
          musicpause.style.display="none"
        }
      },1000);
  },
};
</script>
<style scoped>
@import "~css/music.css";
</style>

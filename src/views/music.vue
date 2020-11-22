<template>
  <div class="music">
    <h1 class="title-h1">music</h1>
    
    <audio controls @timeupdate="timeUpdate" id="audioSwitch" >
    <source src="../assets/music/临安初雨.mp3">
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
      <div id="SS">
      <span id="musicPause">
        <img src="../assets/music/play.png" class="music-btn-position music-btn-play" id="music-play" >
      </span>
    </div>
    <div id="BB">
      <span id="musicPlay">
        
        <img src="../assets/music/pause.png" class="music-btn-position music-btn-pause" id="music-pause">
      </span>
    </div>
      <span><img src="../assets/music/last.png" class="music-btn-next"></span>

      <volumn-control side-length="4vh" top="1.5vh" left="15%" top-offset="-16.5vh" bar-height="134px"></volumn-control>
        <!-- <span><img src="../assets/music/音量.png"></span> -->
      <div class="music-porgre-border">
         <span class="music-porgre-solid" :style="{'left':-100+((currentMusicTime / currentDuration) * 100) + '%'}"></span>
        </div>
      
      </div>
    </div>
  </div>
</template>
<script>

import VolumnControl from 'components/own/volumn-control.vue'

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
      console.log(srcEle)
      console.log(this.currentMusicTime,this.currentDuration)
    }
  },
  computed: {},
  components: {
    VolumnControl
  },
  mounted() {

      setTimeout(()=>{
        let musicpause=document.getElementById("music-play");
        let musicplay=document.getElementById("music-pause");
        let Play=document.getElementById("musicPlay");
        let Pause= document.getElementById("musicPause");
        // let img = document.createElement("AUDIO")
        var myMusic=document.getElementById("myMusic");
        Play.onclick=function(){
          musicplay.style.display="none"
          musicpause.style.display="block"
       
          // img.Play()不行
         
        }
        Pause.onclick=function(){
          musicplay.style.display="block"
          musicpause.style.display="none"
          // img.Pause()不行
          
        }
      },1000);

  },
};
</script>
<style scoped>
@import "~css/music.css";
</style>

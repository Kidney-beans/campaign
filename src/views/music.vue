<template>
  <div class="music">
    <h1 class="title-h1">music</h1>
    
<<<<<<< HEAD
    <audio controls @timeupdate="timeUpdate" id="audioSwitch" >
    <source src="../assets/music/临安初雨.mp3">
=======
    <audio controls @timeupdate="timeUpdate" id="audio" >
    <source src="../assets/music/临安初雨.mp3" type="audio/mpeg">
>>>>>>> fcdb87cfbd960f66a5c1b80c961c10d56fd111ee
    </audio>
    <div class="music-box">
      <div class="music-bar"></div>
     <div class="showbar musicbartext">
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
      
<<<<<<< HEAD
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
=======
      <span><img src="~assets/music/last.png" class="music-btn-last some-btns"></span>
      <span id="musicPause" v-show="!pause" @click="musicPause">
        <img src="~assets/music/pause.png" class="some-btns music-btn-position music-btn-play" id="music-play">
      </span>
      <span id="musicPlay" v-show="pause" @click="musicPlay">
        <img src="~assets/music/play.png" class="some-btns music-btn-position music-btn-pause" id="music-pause">
      </span>
      <span><img src="../assets/music/last.png" class="some-btns music-btn-next"></span>
>>>>>>> fcdb87cfbd960f66a5c1b80c961c10d56fd111ee

      <volumn-control side-length="4vh" top="1.5vh" left="15%" top-offset="-16.5vh" bar-height="134px" @change="changeV"></volumn-control>
        <!-- <span><img src="../assets/music/音量.png"></span> -->
      <div class="music-porgre-border" @click="adaptMusicTime" real="p">
         <span class="music-porgre-solid" real="s" :style="{'left':-100+((currentMusicTime / currentDuration) * 100) + '%'}"></span>
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
        currentMusicTime:0,
        currentDuration:1000000,
        pause:true
    };
  },
  methods: {
<<<<<<< HEAD

    mousdrop:function(event){
     
       this.mubarShow='showbar';
       this.mubarstop='musicbartext'
    },
    mousadd:function(event){
      this.mubarShow=''
    
    },
=======
>>>>>>> fcdb87cfbd960f66a5c1b80c961c10d56fd111ee
    timeUpdate(e){
      let srcEle = e.srcElement;
      this.currentMusicTime = srcEle.currentTime
      this.currentDuration = srcEle.duration
      console.log("已更改：")
      console.log(srcEle)
      console.log(this.currentMusicTime,this.currentDuration)
    },
    musicPlay(){
      document.getElementById('audio').play()
      this.pause = false
    },
    musicPause(){
      document.getElementById('audio').pause()
      this.pause = true
    },
    adaptMusicTime(e){
      console.log(e)
      let real = e.srcElement.getAttribute("real")
      if(real == 'p'){
        let positionX = e.offsetX
        let parentWidth = e.srcElement.offsetWidth
        console.log("parentWidth:",parentWidth)
        this.currentMusicTime = (positionX / parentWidth * this.currentDuration)
        this.musicPlay()
        this.setMusicTime()
      }
      else{
        let hiddenLength = -(-1 + this.currentMusicTime / this.currentDuration) * e.srcElement.offsetWidth
        let positionX = e.offsetX-hiddenLength
        console.log("hiddenLength:",hiddenLength)
        let parentWidth = e.srcElement.offsetWidth
        console.log("parentWidth:",parentWidth)
        this.currentMusicTime = (positionX / parentWidth * this.currentDuration)
        this.musicPlay()
        this.setMusicTime()
      }
    },
    setMusicTime(){
      document.getElementById('audio').currentTime = this.currentMusicTime
    },
    changeV(va){
      if(va < 0.15){
        va = 0.15
      }
      else if(va > 0.95){
        va = 0.95
      }
      document.getElementById('audio').volume = va
    }

  },
  computed: {},
  components: {
    VolumnControl
  },
  mounted() {
<<<<<<< HEAD

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

=======
    
>>>>>>> fcdb87cfbd960f66a5c1b80c961c10d56fd111ee
  },
};
</script>
<style scoped>
@import "~css/music.css";
</style>

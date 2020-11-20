<template>
  <div class="music">
    <h1 class="title-h1">music</h1>
    <div class="music-box">
      <div class="music-bar" @mouseenter="mousdrop" @mouseleave="mousadd"></div>
     <div :class='[mubarShow,mubarstop]'>
     <ul class="music-bar-text">
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
      <span><img src="../assets/music/play.png" class="music-btn-play"></span>
      <span><img src="../assets/music/last.png" class="music-btn-next"></span>
      <div class="music-porgre-border">
         <span class="music-porgre-solid"></span>
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
    };
  },
  methods: {
    hd: function(){
       this.mubarShow='';
       this.mubarstop='',
      console.log(1)
    },
    mousdrop:function(event){
     
       this.mubarShow='showbar';
       this.mubarstop='musicbartext',
      console.log(2)

    },
    mousadd:function(event){
      this.mubarShow='';
      console.log(1)
      
    },
 
  },
  computed: {},
  components: {},
  mounted() {
    setTimeout(()=>{
        console.log("音乐时长：",document.getElementById("audio").duration);
      },1000)
  },
};
</script>
<style scoped>
@import "~css/music.css";
</style>

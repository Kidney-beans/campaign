<template>
  <div id="music">
    <h1 class="title-h1">music</h1>
    <audio controls @timeupdate="timeUpdate" id="audio">
      <source src="~assets/music/临安初雨.mp3" type="audio/mpeg" />
    </audio>

    <div :class="{ bulletInput: true, 'bulletInput-hidden': !bullet }">
      <!-- Width:String,
      Height:String,
      Text:String,
      BorderRadius:String,
      FontSize:String-->
      <el-input v-model="bulletInputText" placeholder="请输入内容"> </el-input>
      <cool-button width="100px" height="35px" Text="发送" BorderRadius="3px" font-size="0.8em"></cool-button>
    </div>
    <div :class="{ 'music-box': true, 'music-box-far': bullet }">
      <div class="music-bar" @mouseenter="shouldShowBar = true"></div>
      <div @mouseleave="shouldShowBar = false" :class="{ showbar: true, 'showbar-hidden': !shouldShowBar }">
        <!-- 音乐列表组件 -->
        <el-table :data="musicData" height="60vh" border style="width: 100%">
          <el-table-column prop="author" label="歌手" width="100"></el-table-column>
          <el-table-column prop="name" label="歌曲" width="280"></el-table-column>
          <el-table-column><img src="../assets/music/play1.png"></el-table-column>

        </el-table>
      </div>
      <!-- 音乐搜索输入框 -->
      <input type="text" class="music-seek" v-model="musicSeekValue" value="{musicSeekValue}" />
      <!-- 搜索按钮 -->
      <div class="music-seek-img" @click="musicSeekBtn"><img src="~assets/music/music-seek.png" /></div>
      <!--音乐搜索列表 -->
      
      <!--log -->
      <div class="music-log"></div>
      <div class="min-box">
        <div class="minlog1"></div>
        <div class="minlog2"></div>
      </div>
      <div class="progress-bar">
        <div class="music-porgre"></div>

        <span><img src="~assets/music/last.png" class="music-btn-last some-btns" /></span>
        <span id="musicPause" v-show="!pause" @click="musicPause">
          <img src="~assets/music/pause.png" class="some-btns music-btn-position music-btn-play" id="music-play" />
        </span>
        <span id="musicPlay" v-show="pause" @click="musicPlay">
          <img src="~assets/music/play.png" class="some-btns music-btn-position music-btn-pause" id="music-pause" />
          <!-- 注意！注意！播放完歌后按钮没变暂停 -->
        </span>
        <span><img src="~assets/music/last.png" class="some-btns music-btn-next" /></span>
        <volumn-control side-length="4vh" top="1.5vh" left="15%" top-offset="-15.6vh" bar-height="134px" @change="changeV"></volumn-control>
        <!-- <span><img src="../assets/music/音量.png"></span> -->
        <div class="music-porgre-border" @click="adaptMusicTime" real="p">
          <span class="music-porgre-solid" real="s" :style="{ left: -100 + (currentMusicTime / currentDuration) * 100 + '%' }"></span>
        </div>
        <span class="bulletText">弹幕</span>
        <div class="bulletScreen">
          <el-switch v-model="bullet" active-color="#892cdc" inactive-color="#ff4949"> </el-switch>
        </div>
      </div>
        <!-- 渲染到屏幕弹幕标签 -->
      <ul class="bulletTextContent">
        <li>{{ bulletInputText }}</li>
      </ul>
    </div>
    <div class="supplement-components">
      <el-dialog title="搜索结果" :modal="false" :visible.sync="searchDialogShow" width="50%" top="17vh" custom-class="search-result-container">
        <div class="cuntent-container">
                      <!-- 搜索音乐结果 -->     
            <div class="musicPhotoMaxBox" v-for="(item, index)  in musicSeekArr" :key="item.musicphoto">
              <div class="musicPhotoBox"><img :src="item.photourl" @mouseenter="PhotoShadeShow(index)" ></div>
              <div class="musicPhotoBox-Shade" v-show="index == currentPhotoIndex" @mouseleave="PhotoShadeHidden(index)">
                      <!-- 搜索音乐播放 -->
                <img src="~assets/music/play1.png"  @click="seekMusicPlay()">
                      <!-- 搜索音乐添加 -->
                <img src="~assets/music/add.png" @click="addMusic(item.author,item.name)">
              </div>
              <span>{{item.name}}</span>---<span>{{item.author}}</span>
            </div>
        </div>
        <!--  -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import VolumnControl from "components/own/volumn-control.vue";
import CoolButton from "components/common/cool-button.vue";

export default {
  props: {
    Abc: String,
  },
  data() {
    return {
      currentPhotoIndex:-1,
      value: true,
      currentMusicTime: 0,
      currentDuration: 1000000,
      pause: true,
      bullet: false,
      bulletInputText: " ",
      shouldShowBar: false,
      musicSeekValue: "",
      SeekListShow: false,
      showPhoto:false,
      searchDialogShow:false,
      temp:4,
      musicData: [
        {
          author: "谢安琪",
          name: "喜帖街",
          url:'http://118.25.144.69/public/music/170.mp3'
        },
        {
          author: "谢安琪",
          name: "钟无艳",
          url:'http://118.25.144.69/public/music/171.mp3'
        },
        {
          author: "陈奕迅",
          name: "明年今日",
          url:'http://118.25.144.69/public/music/172.mp3'
        },
        {
          author: "陈奕迅",
          name: "浮夸",
          url:'http://118.25.144.69/public/music/173.mp3'
        },
        {
          author: "陈奕迅",
          name: "遥远的她",
          url:'http://118.25.144.69/public/music/174.mp3'
        },
        {
          author: "Twins",
          name: "风筝与风",
          url:'http://118.25.144.69/public/music/175.mp3'
        },
        {
          author: "Twins",
          name: "死性不改",
          url:'http://118.25.144.69/public/music/176.mp3'
        },
        {
          author: "容祖儿",
          name: "心淡",
          url:'http://118.25.144.69/public/music/177.mp3'
        },
        {
          author: "容祖儿",
          name: "痛爱",
          url:'http://118.25.144.69/public/music/178.mp3'
        },
        {
          author: "张国荣",
          name: "风继续吹",
          url:'http://118.25.144.69/public/music/179.mp3'
        }
      ],
      
      musicSeekArr:[
        {
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/150.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/151.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/152.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/153.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/154.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/155.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/156.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/157.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/158.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/159.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/160.mp3'
        },{
         photourl:"http://118.25.144.69/public/imgs/8.jpg",
          author:"容祖儿",
          name:"傻女",
          url:'http://118.25.144.69/public/music/161.mp3'
        },
      ]
    };
  },
  methods: {
    timeUpdate(e) {
      let srcEle = e.srcElement;
      this.currentMusicTime = srcEle.currentTime;
      this.currentDuration = srcEle.duration;
      if (srcEle.duration - srcEle.currentTime <= 0) {
        this.pause = true;
      }
      console.log("已更改：");
      console.log(srcEle);
      console.log(this.currentMusicTime, this.currentDuration);
    },
    musicPlay() {
      document.getElementById("audio").play();
      this.pause = false;
    },
    musicPause() {
      document.getElementById("audio").pause();
      this.pause = true;
    },
    adaptMusicTime(e) {
      console.log(e);
      let real = e.srcElement.getAttribute("real");
      if (real == "p") {
        let positionX = e.offsetX;
        let parentWidth = e.srcElement.offsetWidth;
        console.log("parentWidth:", parentWidth);
        this.currentMusicTime = (positionX / parentWidth) * this.currentDuration;
        this.musicPlay();
        this.setMusicTime();
      } else {
        let hiddenLength = -(-1 + this.currentMusicTime / this.currentDuration) * e.srcElement.offsetWidth;
        let positionX = e.offsetX - hiddenLength;
        console.log("hiddenLength:", hiddenLength);
        let parentWidth = e.srcElement.offsetWidth;
        console.log("parentWidth:", parentWidth);
        this.currentMusicTime = (positionX / parentWidth) * this.currentDuration;
        this.musicPlay();
        this.setMusicTime();
      }
    },
    setMusicTime() {
      document.getElementById("audio").currentTime = this.currentMusicTime;
    },
    changeV(va) {
      if (va < 0.15) {
        va = 0.15;
      } else if (va > 0.95) {
        va = 0.95;
      }
      document.getElementById("audio").volume = va;
    },
    musicSeekBtn() {
      // if (this.musicSeekValue == "") {
      //   this.SeekListShow = false;
      // } else {
      //   this.SeekListShow = true;
      //   console.log(2);
      // }
      this.searchDialogShow = true
    },
    PhotoShadeShow(index){
        this.currentPhotoIndex = index
    },
    PhotoShadeHidden(index){
      this.currentPhotoIndex = -1
    },
    //添加音乐
    addMusic(author,name){
      this.temp=this.musicData.length
          this.musicData[this.temp]=author
          console.log(this.musicData[this.temp])
    },
    seekMusicPlay(){


    },

  },
  computed: {},
  components: {
    VolumnControl,
    CoolButton,
  },
  mounted() {},
};
</script>
<style scoped>
@import "~css/music.css";
</style>

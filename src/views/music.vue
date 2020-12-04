<template>
  <div id="music">
    <h1 class="title-h1">music</h1>
    <top-nav></top-nav>
    <audio controls @timeupdate="timeUpdate" id="audio">
      <source :src="musicData[currentMusicIndex].url" type="audio/mpeg" />
    </audio>

    <div :class="{ bulletInput: true, 'bulletInput-hidden': !bullet }">

      <el-input v-model="bulletInputText" placeholder="请输入内容"> </el-input>
      <cool-button width="100px" height="35px" Text="发送" BorderRadius="3px" font-size="0.8em" @btn-click="sendBullet"></cool-button>
    </div>
    <div :class="{ 'music-box': true, 'music-box-far': bullet }">
      <div class="bullet-show-container" :style="{'opacity':bullet?1:0}">
        <bullet-show :bullets="bullets" :pause="pause"></bullet-show>
      </div>
      <div class="music-bar" @mouseenter="shouldShowBar = true"></div>
      <div @mouseleave="shouldShowBar = false" :class="{ showbar: true, 'showbar-hidden': !shouldShowBar }">
        <!-- 音乐列表 -->
         <div class="music-List-box">
            <div class="list-Head">
              <div>歌手</div>
              <div>歌名</div>
              <div>操作</div>
            </div>
            <div class="space-to-split"></div>
            <div class="music-List" v-for="(item ,index) in musicData" :key="item.url">
              <div>{{item.author}}</div>
              <div>{{item.name}}</div>
              <img src="~assets/music/play1.png" @click="musPlay(item.url,item.id)">
              <img src="~assets/music/delete.png" @click="deleteMusic(index)">
            </div>
         </div>
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
        <span><img src="~assets/music/last.png" class="music-btn-last some-btns"  @click="preMusic"/></span>
        <span id="musicPause" v-show="!pause" @click="musicPause">
          <img src="~assets/music/pause.png" class="some-btns music-btn-position music-btn-play" id="music-play" />
        </span>
        <span id="musicPlay" v-show="pause" @click="musicPlay">
          <img src="~assets/music/play.png" class="some-btns music-btn-position music-btn-pause" id="music-pause" />
          <!-- 注意！注意！播放完歌后按钮没变暂停 -->
        </span>
        <span><img src="~assets/music/last.png" class="some-btns music-btn-next"  @click="nextMusic"/></span>
        <volumn-control side-length="4vh" top="1.5vh" left="15%" top-offset="-15.6vh" bar-height="134px" @change="changeV"></volumn-control>
        <!-- <span><img src="../assets/music/音量.png"></span> -->
        <div class="music-porgre-border" @click="adaptMusicTime" real="p">
          <span class="music-porgre-solid" real="s" :style="{ left: -100 + (currentMusicTime / currentDuration) * 100 + '%' }"></span>
        </div>
        <span class="bulletText">弹幕</span>
        <div class="bulletScreen">
          <el-switch v-model="bullet" active-color="#892cdc" inactive-color="#ccc"> </el-switch>
        </div>
      </div>

    </div>
    <div class="supplement-components">
      <el-dialog title="搜索结果" :modal="false" :visible.sync="searchDialogShow" width="50%" top="17vh" custom-class="search-result-container">
        <div class="cuntent-container">
                      <!-- 搜索音乐结果 -->     
            <div class="musicPhotoMaxBox" v-for="(item, index)  in musicSeekArr" :key="item.url">
              <div class="musicPhotoBox"><img :src="item.photourl" @mouseenter="PhotoShadeShow(index)" ></div>
              <div class="musicPhotoBox-Shade" v-show="index == currentPhotoIndex" @mouseleave="PhotoShadeHidden(index)">
                      <!-- 搜索音乐播放 -->
                <img src="~assets/music/play1.png"  @click="seekMusicPlay(item)">
                      <!-- 搜索音乐添加 -->
                <img src="~assets/music/add.png" @click="addMusic(item)">
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
import BulletShow from 'components/common/bullet-show.vue';
import {post,get} from 'js/request/request.js';
import TopNav from 'components/own/top-nav.vue';

export default {
  props: {
    Abc: String,
  },
  data() {
    return {
      currentMusicId:-1,
      currentMusicIndex:0,
      currentMusicSrc:"http://118.25.144.69/public/music/172.mp3",
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
          author: "容祖儿",
          name: "心淡",
          url:'http://m7.music.126.net/20201204123158/e40066ee7a859aaf62b5220b5ae16d69/ymusic/e056/1f4c/9434/a1e451b55726a79905c28d90a892a7d9.mp3'
        },
        {
          author: "杨千嬅",
          name: "勇",
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
          author: "卢巧音&王力宏",
          name: "好心分手",
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
          name: "怯",
          url:'http://m7.music.126.net/20201204123158/e40066ee7a859aaf62b5220b5ae16d69/ymusic/e056/1f4c/9434/a1e451b55726a79905c28d90a892a7d9.mp3'
        },
        {
          author: "容祖儿",
          name: "痛爱",
          url:'http://118.25.144.69/public/music/178.mp3'
        },
        {
          author: "陈奕迅",
          name: "遥远的她",
          url:'http://118.25.144.69/public/music/179.mp3'
        },
        {
          author: "谢安琪",
          name: "钟无艳",
          url:'http://118.25.144.69/public/music/180.mp3'
        },
        {
          author: "张国荣",
          name: "风继续吹",
          url:'http://118.25.144.69/public/music/181.mp3'
        }
      ],
      
      musicSeekArr:[
        {
         photourl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606665580394&di=b9f72d368d4e74097429ee373b6aa530&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F6d44a33ef2ba96351a310bc33f9bffe4fbecdeda.jpg",
          author:"谢安琪",
          name:"喜帖街",
          url:'http://118.25.144.69/public/music/150.mp3'
        },{
         photourl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606666362258&di=6efab5420325693fa38e07b0f86e2f4d&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-5%2F2017531014305530.png",
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
      ],
      musicInn:[
          {
            author: " ",
            name: " ",
            url:''
          }

      ],
      bullets:[{
        content:"哈哈哈哈",
        icon:1,
        top:Math.floor(Math.random()*4)*2,
        z_distance:100,
        time:10
      },
      {
        content:"嘿嘿嘿",
        icon:2,
        top:Math.floor(Math.random()*4)*2,
        z_distance:0,
        time:2
      },{
        content:"律师费带来的三机房",
        icon:1,
        top:Math.floor(Math.random()*4)*2,
        z_distance:200,
        time:1
      },
      {
        content:"嘿嘿嘿",
        icon:3,
        top:Math.floor(Math.random()*4)*2,
        z_distance:400,
        time:5
      },
      {
        content:"lsdkfjglsdfj",
        icon:2,
        top:Math.floor(Math.random()*4)*2,
        z_distance:200,
        time:2
      },{
        content:"律师费带来的三机房",
        icon:1,
        top:Math.floor(Math.random()*4)*2,
        z_distance:100,
        time:4
      },
      {
        content:"嘿嘿嘿",
        icon:3,
        top:Math.floor(Math.random()*4)*2,
        z_distance:400,
        time:5
      }]
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
      // console.log("已更改：");
      // console.log(srcEle);
      // console.log(this.currentMusicTime, this.currentDuration);
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
        // console.log("parentWidth:", parentWidth);
        this.currentMusicTime = (positionX / parentWidth) * this.currentDuration;
        this.musicPlay();
        this.setMusicTime();
      } else {
        let hiddenLength = -(-1 + this.currentMusicTime / this.currentDuration) * e.srcElement.offsetWidth;
        let positionX = e.offsetX - hiddenLength;
        // console.log("hiddenLength:", hiddenLength);
        let parentWidth = e.srcElement.offsetWidth;
        // console.log("parentWidth:", parentWidth);
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

      this.searchDialogShow = true
    },
    PhotoShadeShow(index){
        this.currentPhotoIndex = index
    },
    PhotoShadeHidden(index){
      this.currentPhotoIndex = -1
    },
    //添加音乐
    addMusic(music){
     this.musicData.splice(0,0,music)
          // console.log(this.musicData[this.temp])
    },
    seekMusicPlay(music){
      this.musicData.splice(0,0,music)
      this.musPlay(music.url,music.id)
    },
    musPlay(url,id){
        document.getElementById("audio").load()
        this.musicPause()
        this.currentMusicSrc=url
        this.currentMusicTime = 0
        this.setMusicTime()
        this.musicPlay()
        this.currentMusicId = id
        // console.log(this.currentMusicSrc)
    },
    deleteMusic(i){
        // console.log(i)
        this.musicData.splice(i,1)
    },
    countPlayMusic(){
        let a =this.currentMusicSrc
        
        
    },
    preMusic(){
        console.log("上一首音乐")
        if(this.currentMusicIndex == 0){
          this.$message('当前已经是第一首啦!');
          return
        }
        this.currentMusicIndex--;
    },
    nextMusic(){
        console.log("下一首音乐")
        if(this.currentMusicIndex == this.musicData.length-1){
          this.$message("当前已经是最后一首啦!");
          return
        }
        this.currentMusicIndex++;
    },
    sendBullet(){
      let time = Math.floor(this.currentMusicTime);
      let bullet_obj = {
        time:0,
        content:this.bulletInputText,
        top:Math.floor(Math.random()*4)*2,
        z_distance:Math.floor(Math.random()*4) * 50,
        icon:Math.floor(Math.random()*4)
      }
      this.bulletInputText = ''
      this.bullets.push(bullet_obj)
      let send_obj = {}
      for(let item in bullet_obj){
        send_obj[item] = bullet_obj[item]
      }
      send_obj.time = time
      send_obj.musicid = this.currentMusicId,
      send_obj.ssk = this.$store.state.ssk

      get('/bullet/add',send_obj).then((result)=>{
        let response = result.response
        if(response.success){
          this.$message({
            message:'biubiu成功!',
            type:"success"
          })
        }
        else{
          this.$message.error('biubiu失败!未知原因，请稍后再试！')
        }
      }).catch(()=>{
          this.$message.error('biubiu失败,网络出问题啦!')
      })
    }
  },
  computed: {},
  components: {
    VolumnControl,
    CoolButton,
    BulletShow,
    TopNav
  },
  mounted(){
    console.log(BulletShow)
  },
};
</script>
<style scoped>
@import "~css/music.css";
</style>

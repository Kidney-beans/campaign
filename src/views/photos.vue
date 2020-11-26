<template>
  <div id="photos">
    <!-- <div class="Bj-show"><img :src="currentImg"></div> -->
    <span class="meteor" :style="{ left: p[0].left + 'vw', top: p[0].top + 'vh' }"></span>
    <span class="meteor" :style="{ left: p[1].left + 'vw', top: p[1].top + 'vh' }"></span>
    <span class="meteor" :style="{ left: p[2].left + 'vw', top: p[2].top + 'vh' }"></span>

    <h1 class="photos-title">Photos</h1>
    <div class="photosBox">
      <!-- 图片显示区 -->
      <div class="photos-show">
        <img :src="currentImg" class="photos-show-imgstyle" />
          <!-- 图片切换按钮 -->
        <img src="~assets/photos/photosBtn.png" class="photos-btn-right photos-btn" @click="photosRightBtn" v-show="rightImgIsShow"/>
        <img src="~assets/photos/photosBtn.png" class="photos-btn-left photos-btn" @click="photosLeftBtn" v-show="leftImgIsShow"/>
        <p></p>
      </div>
      <!-- 小图片列表 -->
      <div class="photos-list">
        <ul v-for="item in photosArr" :key="item.date" :style="{'left':left_offset + 'px'}" id="photos-ul">
          <!-- <dt>{{ year + "年" + month + "月" + day + "日" + h + "时" + m + "分" + s + "秒" }}</dt> -->
          <li v-for="(item2,index2) in item.photos" :key="item2.src" @click="showImg(item2.src,index2)"><img :src="item2.src" class="imgtt" :class="{'active':index2 == indexImg}" /></li>
          <p></p>
        </ul>
        <div class="left-bound-block bound-block" @mouseenter="leftMove" @mouseleave="leftMoveStop"> 《 </div>
        <div class="right-bound-block bound-block" @mouseenter="rightMove" @mouseleave="rightMoveStop"> 》 </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      currentImg: "http://118.25.144.69/public/imgs/1.jpg",
      photosArr: [
        {
          date: "1月1日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/1.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            }
          ],
        },
      ],
      indexImg:0,
      rightImgIsShow:true,
      leftImgIsShow:false,
      year: "",
      month: "",
      day: "",
      s: "",
      h: "",
      m: "",
      s: "",
      p: [
        {
          left: 50,
          top: -20,
        },
        {
          left: 50,
          top: -20,
        },
        {
          left: 50,
          top: -20,
        },
      ],
      left_offset:0,
      leftInterval:null,
      rightInterval:null
    };
  },
  methods: {
    getdate() {
      let date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.h = date.getHours();
      this.m = date.getMinutes();
      this.s = date.getSeconds();
    },
    showImg(src,index) {
      this.currentImg = src;
      this.indexImg = index
    },
    // 图片却换按钮
    photosRightBtn: function () {
      this.indexImg++
      if(this.indexImg==this.photosArr[0].photos.length){
       let countImg= this.photosArr[0].photos.length-1
        this.indexImg=countImg
        this.rightImgIsShow=false
      }else{
        if(this.indexImg==(this.photosArr[0].photos.length-1)){
        this.rightImgIsShow=false
        }else{
        this.leftImgIsShow=true
        this.rightImgIsShow=true
        }
        // this.leftImgIsShow=true
        // this.rightImgIsShow=true
      }
      this.currentImg=this.photosArr[0].photos[this.indexImg].src
      this.adaptOffset()
    },
    photosLeftBtn: function(){
       this.indexImg--
       if(this.indexImg<=0){
         this.indexImg=0
         this.leftImgIsShow=false
       }else{
         this.rightImgIsShow=true
         this.leftImgIsShow=true
       }
       this.currentImg=this.photosArr[0].photos[this.indexImg].src
       this.adaptOffset()
    },
    meteorRun() {
      setInterval(() => {
        let temp = [];
        for (let i = 0; i < 3; i++) {
          let obj = {};
          obj.left = Math.random() * 100 + 50;
          obj.top = Math.random() * 30 - 30;
          temp.push(obj);
        }
        this.p = temp;
      }, 5000);
    },
    leftMove(){
      this.leftInterval = setInterval(()=>{
        this.left_offset += 4
      },10)
    },
    leftMoveStop(){
      clearInterval(this.leftInterval)
      if(this.left_offset > 0){
        let ul = document.getElementById('photos-ul')
        ul.style.transition = "0.4s all"
        this.left_offset = 0
        setTimeout(()=>{
          ul.style.transition = ""
        },400)
      }
    },
    rightMove(e){
      this.rightInterval = setInterval(()=>{
        //计算
        this.left_offset -= 4
      },10)
    },
    rightMoveStop(){
      
      clearInterval(this.rightInterval)
      let ul = document.getElementById('photos-ul')
      
      let widthPx = ul.offsetWidth
      let screenWidthPx = screen.availWidth
      let diff = widthPx - screenWidthPx
      if(-this.left_offset > diff){
        ul.style.transition = "0.4s all"
        this.left_offset = -diff
        setTimeout(()=>{
          ul.style.transition = ""
        },400)
      }
    },
    adaptOffset(){
      setTimeout(()=>{
        let active =  document.getElementsByClassName('active')[0]
        let offsetLeft = active.offsetLeft
        if(offsetLeft + this.left_offset < 0){
          let ul = document.getElementById('photos-ul')
          ul.style.transition = "0.4s all"
          this.left_offset += (-(offsetLeft + this.left_offset))
          setTimeout(()=>{
            ul.style.transition = ""
          },400)
        }
        else if(offsetLeft + this.left_offset > screen.availWidth){
          let ul = document.getElementById('photos-ul')
          ul.style.transition = "0.4s all"
          this.left_offset -= (offsetLeft + this.left_offset - screen.availWidth + ul.getElementsByTagName('img')[0].offsetWidth)
          setTimeout(()=>{
            ul.style.transition = ""
          },400)
        }
      },100)
    }
  },
  computed: {},
  components: {},
  mounted() {
    this.getdate();
    // this.meteorSetTimeout();
    this.meteorRun();
  },
};
</script>
<style scoped>
@import "~css/photos.css";
</style>

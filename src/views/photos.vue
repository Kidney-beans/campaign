<template>
  <div class="photos">
  <div class="Bj-show"><img :src="currentImg"></div>
  <span class="meteor"></span>
  
    <h1 class="photos-title">Photos</h1>
    <div class="photosBox">
      <div class="photos-show">
        <img :src="currentImg"  class="photos-show-imgstyle"/>
        <img src="~assets/photos/photosBtn.png" class="photos-btn-right photos-btn" @click="hd" />
        <img src="~assets/photos/photosBtn.png" class="photos-btn-left photos-btn" />
        <p></p>
      </div>
      <div class="photos-list">
        <ul v-for="item in photosArr" :key="item.date">
          <!-- <dt>{{ year + "年" + month + "月" + day + "日" + h + "时" + m + "分" + s + "秒" }}</dt> -->
          <li v-for="item2 in item.photos" :key="item2.src" @click="showImg(item2.src)"><img :src="item2.src" class="imgtt" /></li>
          <p></p>
        </ul>
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
      currentImg: "http://dark.y-j-x.work/public/imgs/1.jpg",
      photosArr: [
        {
          date: "1月1日",
          photos: [
            {
              src: "http://dark.y-j-x.work/public/imgs/1.jpg",
            },
            {
              src: "http://dark.y-j-x.work/public/imgs/2.jpg",
            },
            {
              src: "http://dark.y-j-x.work/public/imgs/3.jpg",
            },
            {
              src: "http://dark.y-j-x.work/public/imgs/4.jpg",
            },
            {
              src: "http://dark.y-j-x.work/public/imgs/5.jpg",
            },
            {
              src: "http://dark.y-j-x.work/public/imgs/6.jpg",
            },
            {
              src: "http://dark.y-j-x.work/public/imgs/7.jpg",
            },
            {
              src: "http://dark.y-j-x.work/public/imgs/8.jpg",
            },
            {
              src: "http://dark.y-j-x.work/public/imgs/9.jpg",
            },
          ],
        },
      ],
      year: "",
      month: "",
      day: "",
      s: "",
      h: "",
      m: "",
      s: "",
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
    showImg(src) {
      this.currentImg = src;
    },
    hd: function () {
      console.log();
    },

  },
  computed: {},
  components: {},
  mounted() {
    this.getdate();
  },
};
</script>
<style scoped>
@import "~css/photos.css";
</style>

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
      currentImg: "http://pic.netbian.com/uploads/allimg/201022/222149-16033765090dc7.jpg",
      photosArr: [
        {
          date: "1月1日",
          photos: [
            {
              src: "http://pic.netbian.com/uploads/allimg/201022/222149-16033765090dc7.jpg",
            },
            {
              src: "http://pic.netbian.com/uploads/allimg/190207/201425-1549541665f301.jpg",
            },
            {
              src: "http://pic.netbian.com/uploads/allimg/200923/225226-160087274631cb.jpg",
            },
            {
              src: "http://pic.netbian.com/uploads/allimg/200729/221519-1596032119fab8.jpg",
            },
            {
              src: "http://pic.netbian.com/uploads/allimg/201022/222149-16033765090dc7.jpg",
            },
            {
              src: "http://pic.netbian.com/uploads/allimg/190207/201425-1549541665f301.jpg",
            },
            {
              src: "http://pic.netbian.com/uploads/allimg/200923/225226-160087274631cb.jpg",
            },
            {
              src: "http://pic.netbian.com/uploads/allimg/200729/221519-1596032119fab8.jpg",
            },
            {
              src: "http://pic.netbian.com/uploads/allimg/201022/222149-16033765090dc7.jpg",
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

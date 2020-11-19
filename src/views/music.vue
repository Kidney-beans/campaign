<template>
  <div class="music">
    <h1 class="title-h1">music</h1>
    <div class="music-box">
      <!-- <div class="music-menubar">音乐菜单</div> -->
      <input type="text" class="music-seek" />
      <button div="music-btn" @click="btnriff">搜索</button>
      <div class="music-log"></div>
      <div class="min-box">
        <div class="minlog1"></div>
        <div class="minlog2"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    Abc: String,
  },
  data() {
    return {};
  },
  methods: {
    //音乐搜索按鈕
    btnriff: function () {},
  },
  computed: {},
  components: {},
};
</script>
<style scoped>
@import "~css/music.css";
</style>

<template>
  <div class='photos'>
      <h1 class="photos-title">Photos</h1>
      <div class="photosBox">
      <div class="photos-list">
      <ul v-for="item in photosArr" :key="item.date">  
        <dt>{{year+"年"+month+"月"+day+"日"+h+"时"+m+"分"+s+"秒"}}</dt>
        <li v-for="item2 in item.photos" :key="item2.src" @click="showImg(item2.src)"><img :src="item2.src" class="imgtt"></li>
        <p></p>
      </ul>
      </div>

      <div class="photos-show">
      <img :src="currentImg">
      <img src="~assets/photos/photosBtn.png" class="photos-btn-right photos-btn" @click="hd">
      <img src="~assets/photos/photosBtn.png" class="photos-btn-left  photos-btn">
      <p></p>
      </div>
      </div>
  </div>
</template>
<script>
  export default {
    name:'',
    props:{
      
    },
      data() {
    return { 
      currentImg:"",
      photosArr:[
        {
          date:"1月1日",
          photos:[
            {
              src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606062497131&di=cd9e84444807758249cb4d423a55c7ab&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F86%2F10%2F01300000184180121920108394217.jpg",
            },
            {
              src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606063487700&di=e9972e3384cfa92f52bc5a449747e24a&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg",
            },
            {
              src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606143464399&di=927d0515311831a9f09eb239b9c28568&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0707%2Fcce1153db03f5788a88c96aff10e123c.jpg",
            },
            {
              src:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2610358734,2311904499&fm=26&gp=0.jpg",
            }
          ]
        },
      ],
      year:"",
      month:"",
      day:"",
      s:"",
      h:"",
      m:"",
      s:""
    };
  },
  methods:{
    getdate(){
      let date= new Date()
      this.year=date.getFullYear()
      this.month=date.getMonth()+1
      this.day= date.getDate()
      this.h=date.getHours()
      this.m=date.getMinutes()
      this.s=date.getSeconds()
    },
    showImg(src){
      this.currentImg = src
    },
    hd:function(){
      
    }

  },
   computed: {},
  components: {
    
  },
  mounted() {
    this.getdate()
    
  }
  }
</script>
<style scoped>
  @import '~css/photos.css';
</style>
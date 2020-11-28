<template>
  <div class='photos-menu-btn' :u-key="UKey">
    <colorful-circle-frame :side-length="SideLength" :side-width="SideWidth">
      <colorful-circle-frame :side-length="SideLength-50" :reverse="true" :side-width="SideWidth">
        <!-- <img src="~assets/photos/switch-1.png" v-show="status" class="switch-img"/> -->
        <!-- <img src="~assets/photos/switch-2.png" v-show="!status" class="switch-img"/> -->
        <img src="~assets/photos/up.png" v-show="!Status" class="switch-img" @click="btnClick"/>
      </colorful-circle-frame>
    </colorful-circle-frame>
  </div>
</template>
<script>
import ColorfulCircleFrame from 'components/common/colorful-circle-frame.vue'
  export default {
    name:'PhotosMenuBtn',
    props:{
      UKey:String,
      Status:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        SideLength:0,
        SideWidth:0
      }
    },
    computed:{
    
    },
    components:{
      ColorfulCircleFrame
    },
    methods:{
      btnClick(){
        this.$emit('btn-click')
      }
    },
    mounted(){
        console.log("[u-key=" + this.UKey + "]")
        let this_container = document.querySelector("[u-key=" + this.UKey + "]")
        console.log(this_container)
        this.SideLength = this_container.offsetWidth
        this.SideWidth = this_container.offsetWidth / 12
    }
  }
</script>
<style scoped>
  .photos-menu-btn{
    width:100%;
    height: 100%;
  }

  .photos-menu-btn .switch-img{
    width:60%;
    height: 60%;
    border-radius: 50%;
    cursor: pointer;
    animation: upup 1s infinite;
  }

  .photos-menu-btn .switch-img:hover{
    animation-play-state: paused;
  }

  @keyframes upup {
    0%{
      transform: translateY(10px) scaleX(1.1) scaleY(0.8);
    }
    100%{
      transform: translateY(-6px) ;
    }
  }
</style>
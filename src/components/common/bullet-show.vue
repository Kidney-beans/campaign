<template>
  <div class='bullet-show'>
      <div v-for="item in bullets" :key="item.time" class="bullet-item" :style="{'animation-delay':item.time + 's','top':item.top + 'vh','transform':`translateZ(${-item.z_distance}px)`,'animation-play-state':pause?'paused':'running'}">
          <img src="~assets/bullet-icon/star-blue.png" class="bullet-icon" v-if="item.icon == 0" />
          <img src="~assets/bullet-icon/star-green.png" class="bullet-icon" v-if="item.icon == 1" />
          <img src="~assets/bullet-icon/star-yellow.png" class="bullet-icon" v-if="item.icon == 2" />
          <img src="~assets/bullet-icon/star-purple.png" class="bullet-icon" v-if="item.icon == 3" />

          <span>{{item.content}}</span>
      </div>
  </div>
</template>
<script>
  export default {
    name:'BulletShow',
    props:{
      bullets:{
          type:Array,
      },
      pause:Boolean
    },
    mounted(){
        
    }
  }
</script>
<style scoped>
  .bullet-show{
      width:150%;
      height: 100%;
      transform-style: preserve-3d;
      perspective: 1000px;
      position: relative;
      margin: auto;
  }

  .bullet-show .bullet-item{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      position: absolute;
      animation: bullet-move 10s linear;
      right: -20%;
      width:20vw;
      
  }

  .bullet-show .bullet-item .bullet-icon{
      width:1em;
      height: 1em;
      display: block;
  }

  .bullet-show .bullet-item span{
      color: white;
  }
  @keyframes bullet-move {
      0%{
          right: -20%;
      }
      100%{
          right: 110%;
      }
  }
</style>
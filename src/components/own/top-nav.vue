<template>
  <div class='top-nav'>
    <span class="return-home" @click="returnHome">返回首页</span>
    <span class="user-name">{{$store.state.name}}&nbsp;<img style="height:1em" src="~assets/bullet-icon/star-yellow.png"/></span>
    
  </div>
</template>
<script>
  export default {
    name:'TopNav',
    props:{
      
    },
    methods:{
        returnHome(){
           this.$router.push('/gate')
        }
    }
  }
</script>
<style scoped>
  .top-nav{
      position: absolute;
      top:0;
      right:0;
      width: 20vw;
      height: 10vh;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: white;
      text-shadow: 1px 1px black;
      z-index: 1000;
  }

  .top-nav span{
      margin:0 3vw;
  }

  .top-nav .return-home{
      cursor: pointer;
  }
</style>
<template>
  <div class='top-nav'>
    <span class="return-home" @click="returnHome">返回首页</span>
    <span class="user-name">{{$store.state.name}}1</span>
  </div>
</template>
<script>
  export default {
    name:'TopNav',
    props:{
      
    },
    methods:{
        returnHome(){
            window.location.href = `http://localhost:8099/gate?ssk=${this.$store.state.ssk}&name=${this.$store.state.name}&account=${this.$store.state.account}`
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
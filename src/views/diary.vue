<template>
  <div class='diary'>
      <h1>diary</h1>
      <div style="overflow:hidden;color:#333333">
      <spot-lamp text="Surprise" font-size="8em" back-text-color="#333"></spot-lamp>
      <h1>aaa</h1>
    </div>
  </div>
</template>
<script>
import SpotLamp from 'components/common/spot-lamp.vue'
  export default {
    name:'',
    props:{
      
    },
    components:{
      SpotLamp
    }
  }
</script>
<style scoped>
  @import '~css/diary.css';
</style>
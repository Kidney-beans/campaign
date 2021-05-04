<template>
  <div id="gate">
      <ul>
          <li class="navli" @click="goto_('/plan')">计划</li>
          <li class="navli" @click="goto_('/photos')">相册</li>
          <li class="navli" @click="goto_('/music')">音乐</li>
          <li class="navli" @click="goto_('/relation')">人际</li>
          <li class="navli" @click="goto_('/diary')">日记</li>
      </ul>
  </div>
</template>

<script>
export default {
    methods:{
        goto_(path){
            this.$router.push(path)
        }
    }
}
</script>

<style>
    #gate{
        width:100vw;
        height: 100vh;
        position: absolute;
        top:0;
        left:0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    #gate ul{
        width:30vw;
    }

    #gate ul li{
        width:100%;
        line-height: 3em;
        text-align: center;
        list-style: none;
        background: linear-gradient(to right,rgb(3, 111, 212),blueviolet);
        margin: 1em;
        color:white;
        text-shadow: 1px 1px 3px black;
        border-radius: 3px;
        cursor: pointer;
        transition: 0.2s;
    }

    #gate ul li:hover{
        opacity: 0.7;
    }
</style>
<template>
  <div id='relation'>
        <h1 class="relation-title-h1">relation</h1>
        <div class="relationBox">
          <div class="contentBox">
              <div class="titleHead">
                  <div @click="jump(0)" :class="{'active':0==current_index}">社区</div>
                  <div @click="jump(1)" :class="{'active':1==current_index}">好友</div>
                  <div @click="jump(2)" :class="{'active':2==current_index}">收到的赞与评论</div>
                  <div @click="jump(3)" :class="{'active':3==current_index}">消息</div>
                  <div @click="jump(4)" :class="{'active':4==current_index}">我的设置</div>
              </div>
              <!-- 内容 -->
              <!--  -->
              <div class="titleContent" :style="{'top':top_offset}">
                  <div class="myWorld"> 
                           <ul class="myWorld-Content-box">
                           <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606893387282&di=3679662d98c374827f5f3147c22f0a8e&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180420%2Fa02ae1f573bb430ca298fe5783b4f38c.jpeg">
                             <li class="contentText">
                                <p>
                                    花褪残红青杏小。燕子飞时，绿水人家绕。<br>
                                    枝上柳绵吹又少。天涯何处无芳草。 <br>
                                    墙里秋千墙外道。墙外行人，墙里佳人笑。<br>
                                    笑渐不闻声渐悄。多情却被无情恼。<br>
                                </p>
                             </li>
                             <span class="myWorld-Content-ico">
                                  <img src="../assets/relation/pinglun.png" ><p>{{contentZan}}</p>
                                  <img src="../assets/relation/zan.png" @click="dianZan">
                             </span>
                             
                           </ul>
                  </div>
                  <div>
                        <ul>
                          <li> fgfhgghjkkgyuhdrydddddfjjhjhggjdjjfngjhjfdjtmcfbfj</li>
                        </ul>
                  </div>
                  <div>
                  
                        <ul>
                          <li>收到的赞与评论内容</li>
                        </ul>
                  </div>
                  <div>
                        <ul>
                          <li></li>
                        </ul>
                  </div>
                  <div>
                        <ul>
                          <li></li>
                        </ul>
                  </div>
              </div>
          </div>
        </div>
        <div class="relation-supplement-components">
        </div>
  </div>
</template>
<script>
  export default {
    name:'',

    data() {
      return {
        top_offset:'0vh',
        current_index:0,
        contentZan:0,
      };
    },
    props:{
      numstr:String
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      jump(index){
        this.current_index = index
        this.top_offset = `${-index * 100}vh `
      },
      dianZan(){
          this.contentZan++
          console.log(1)
      }
      

    },
    computed:{
    }
  }
</script>
<style scoped>
  @import '~css/relation.css';
</style>
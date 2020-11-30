<template>
  <div id='relation'>
        <h1 class="relation-title-h1">relation</h1>
        <div class="relationBox">
          <!-- <div class="contentBox">
              <div class="titleHead">
                  <div>社区</div>
                  <div>好友</div>
                  <div>收到的赞与评论</div>
                  <div>消息</div>
                  <div>我的设置</div>
              </div>
              <div class="titleContent">
                  <div>社区内容</div>
                  <div>好友内容</div>
                  <div>收到的赞与评论内容</div>
                  <div>消息内容</div>
                  <div>我的设置内容</div>
              </div>
          </div> -->
          <el-row class="tac popper-class" >
            <el-col :span="12">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">消息</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">好友</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-menu"></i>
                  <span slot="title">收到的赞与评论</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">我的设置</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
          
      
        </div>
        <div class="relation-supplement-components">


        </div>
  </div>
</template>
<script>
  export default {
    name:'',
    props:{
      numstr:String
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

    },
    computed:{
    }
  }
</script>
<style scoped>
  @import '~css/relation.css';
</style>
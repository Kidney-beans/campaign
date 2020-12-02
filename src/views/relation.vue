<template>
  <div id='relation'>
        <h1 class="relation-title-h1">relation</h1>
        <div class="relationBox">
          <div>
            <ul :class="{active:isActive,pingLunBox:true}" >
              <li v-for="item in pingLunArr" :key="item.id">我：{{item.text}}</li>
            </ul>

          </div>
          <div class="contentBox">
              <div class="titleHead">
                  <div @click="jump(0)" :class="{'active':0==current_index}">社区</div>  
                  <div @click="jump(1)" :class="{'active':1==current_index}">收到的赞与评论</div>
                  <div @click="jump(2)" :class="{'active':2==current_index}">发布</div>
              </div>
              <!-- 内容 -->
              <div class="titleContent" :style="{'top':top_offset}">
              <!-- 世界 -->
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
                                  <img src="../assets/relation/pinglun.png" @click="pingLun">
                                  <img src="../assets/relation/zan.png" @click="dianZan"><p>{{contentZan}}</p>
                             </span>
                             <span class="iptBox" v-show="inputShow">
                                    <input type="text" v-model="pingLunValue">
                                     <button @click="send">评论</button>
                             </span>                      
                           </ul>
                  </div>
                         <!-- 收到的赞 -->
                  <div class="getPraise">
                      
                  </div>
                  <!-- 发布 -->
                  <div class="release">
                        <div class="releaseHead">
                        <p>我的发布</p>
                        <button>发布</button>
                        
                        </div>
                  <div class="releaseBox">
                  
                        <el-input
                                  type="textarea"
                                  placeholder="请输入内容"
                                  v-model="textarea"
                                  maxlength="800"
                                  show-word-limit>
                        </el-input>
                        <el-upload
                              action="https://jsonplaceholder.typicode.com/posts/"
                              list-type="picture-card"
                              :limit="4"
                              :on-preview="handlePictureCardPreview"
                              :on-remove="handleRemove">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                              <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                      </div>
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
        dialogImageUrl: '',
        dialogVisible: false,
        textarea:"",
        aa:1,
        pingLunValue:"",
        isActive:false,
        inputShow:false,
        top_offset:'0vh',
        current_index:0,
        contentZan:0,

        pingLunArr:[
          {
            id:0,
            text:"hello"
          },
        ],
        newsArr:[
                {
                  imgUrl:"https://x0.ifengimg.com/res/2020/CCF4D1398A75722E75374EAE06402B66E0061E82_size2419_w1670_h879.png",
                  text:"目前嫦娥五号探测器的着陆器、上升器组合体正在月球表面开展采样探测。北京时间今天4时53分，着陆器、上升器组合体完成了月球钻取采样及封装，表取采样正在按计划进行。"
                },
                 {
                  imgUrl:"https://x0.ifengimg.com/res/2020/CCF4D1398A75722E75374EAE06402B66E0061E82_size2419_w1670_h879.png",
                  text:"目前嫦娥五号探测器的着陆器、上升器组合体正在月球表面开展采样探测。北京时间今天4时53分，着陆器、上升器组合体完成了月球钻取采样及封装，表取采样正在按计划进行。"
                },
        
        ]
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
         
      },
      pingLun(){
        this.inputShow=!this.inputShow
        this.isActive=!this.isActive
      
      },
      send(){
        if(this.pingLunValue==""){

        }else{
          
        // this.aa=this.pingLunValue
        this.pingLunArr.id=this.pingLunArr.length
       
        let obj = {}
        obj.text = this.pingLunValue
        this.pingLunArr.push(obj)
        console.log(this.pingLunArr)
        this.pingLunValue=""
        }

    },
      getdate() {
            let date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
            this.day = date.getDate();
            this.h = date.getHours();
            this.m = date.getMinutes();
            this.s = date.getSeconds();
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
      

    },
    computed:{
    }
  }
</script>
<style scoped>
  @import '~css/relation.css';
</style>
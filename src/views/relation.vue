<template>
  <div id='relation'>
        <top-nav v-show="navShow"></top-nav>
        <h1 class="relation-title-h1">relation</h1>
        <div class="relationBox">
          <div :class="{testBox:true,testBoxgo:isActive}">
              <img src="~assets/relation/closeRightAssessFrame.png" class="close" @click="closeRightAssessFrame">
              <h3>评论区</h3>
              <p v-for="item in community.pingLunArr" :key="item.id">我的评论：{{item.text}}</p>
          </div>
          <div class="contentBox">
              <div class="titleHead">
                  <div @click="jump(0)" :class="{'active':0==current_page_index}">社区</div>  
                  <div @click="jump(1)" :class="{'active':1==current_page_index}">收到的赞与评论</div>
                  <div @click="jump(2)" :class="{'active':2==current_page_index}">发布</div>
              </div>
              <!-- 内容 -->
              <div class="titleContent" :style="{'top':top_offset}">
              <!-- 世界 -->
                  <div class="myWorld"> 
                           <div class="myWorld-Content-box" v-for="(item,index) in community.newsArr" :key="item.imgUrl">
                           <img :src="item.imgUrl">
                             <div class="contentText">
                                <p>{{item.text}}</p>
                             </div>
                             <div class="myWorld-Content-ico">
                                  <img src="~assets/relation/pinglun.png" @click="pingLun(item,index)">
                                  <img src="~assets/relation/zan.png" @click="dianZan(item)"><p>{{item.applaudCount}}</p>
                             </div>
                             <div class="iptBox" v-show="index == community.currentTargetNewsIndex">
                                    <input type="text" v-model="item.currentAssessInput">
                                     <button @click="send(item)">评论</button>
                             </div>                      
                           </div>
                  </div>
                         <!-- 收到的赞 -->
                  <div class="getPraise">
                    <div class="getPraise-box">                                                        
                                <p>你暂时未的收到赞与评论</p>
                                <img src="../assets/relation/kong.png">                        
                    </div>
                  </div>
                  <!-- 发布 -->
                  <div class="release">
                        <div class="releaseHead">
                        <p class="release-button">我的发布</p>
                        <button @click="releaseButton">发布</button>
                        
                        </div>
                  <div class="releaseBox">
                        <el-input
                                  type="textarea"
                                  placeholder="请输入内容"
                                  v-model="releaseValue"
                                  maxlength="800"
                                  show-word-limit>
                        </el-input>
                        <div class="upload-container">
                          <div v-for="item in releaseModule.uploadModel.alreadyUploadList" :key="item.url" class="upload-item">
                            <img :src="item.url"/>
                          </div>
                          <div class="imgUpload upload-item" @click="triggerUpload">
                            <img src="~assets/relation/ad.png">
                            <input type="file" name="file" id="file" @change="fileChange">
                          </div>
                        </div>
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
import topNav from "../components/own/top-nav"
  export default {
    name:'',

    data() {
      return {
        navShow:true,
        releaseValue:"",
        isActive:false,
        top_offset:'0vh',
        current_page_index:0,
        community:{
          newsArr:[
            {
              imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607059374758&di=56d73d24458c81139a5fd689f3526327&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180216%2F318df6a09c0642c79583c8486590c6cf.jpeg",
              text:"今天，大医中山第四届网页设计大赛总决赛了！快来观看吧各位同学们！！！！",
              pingLunArr:[],
              currentAssessInput:'',
              assessing:false,
              applaudCount:0
            },
              {
              imgUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4238902235,685766808&fm=26&gp=0.jpg",
              text:"花褪残红青杏小。燕子飞时，绿水人家绕。枝上柳绵吹又少。天涯何处无芳草。墙里秋千墙外道。墙外行人，墙里佳人笑。笑渐不闻声渐悄。多情却被无情恼。",
              pingLunArr:[],
              currentAssessInput:'',
              assessing:false,
              applaudCount:0
            },
          ],
          currentTargetNewsIndex:0,
          pingLunArr:[
            {
              id:0,
              text:"hello"
            },
          ],

        },
        receiveApplaud:{

        },
        releaseModule:{
          uploadModel:{
            alreadyUploadList:[]
          },
        }
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
        this.current_page_index = index
        this.top_offset = `${-index * 100}vh `
      },
      dianZan(item){
          item.applaudCount++
      },
      pingLun(item,index){
        this.navShow=false
        this.isActive = true
        this.community.pingLunArr = item.pingLunArr
        item.assessing = !item.assessing
        this.community.currentTargetNewsIndex = index
      },
      send(a){
        if(a.currentAssessInput==""){

        }else{
        let obj = {}
        obj.text = a.currentAssessInput
        this.community.pingLunArr.push(obj)
        a.currentAssessInput=""
        }
    },
      triggerUpload(){
        document.getElementById("file").click()

      },
      fileChange(event){
        console.log(event.srcElement.files[0])
        let file = event.srcElement.files[0]
        let temp_url = URL.createObjectURL(file)
        console.log(temp_url)
        this.releaseModule.uploadModel.alreadyUploadList.push({
          url:temp_url
        })
      },
      releaseButton(event){
              let obj ={}
            obj.text=this.releaseValue
            obj.imgUrl=this.releaseModule.uploadModel.alreadyUploadList[0].url
            obj.pingLunArr=''
            obj.currentAssessInput=''
            obj.assessing=false
            obj.applaudCount=0
             console.log( this.releaseValue)
              console.log( this.releaseModule.uploadModel.alreadyUploadList[0].url)
              this.community.newsArr.push(obj)
      },
      closeRightAssessFrame(){
        this.isActive = false
        this.navShow=true
      }
    },
    computed:{
    },
    mounted(){

    },
     components:{
     topNav
    }
  }
</script>
<style scoped>
  @import '~css/relation.css';
</style>
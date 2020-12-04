<template>
  <div id="photos">
  <top-nav></top-nav>
    <!-- <div class="Bj-show"><img :path="currentImg"></div> -->
    <span
      class="meteor"
      :style="{ left: p[0].left + 'vw', top: p[0].top + 'vh' }"
    ></span>
    <span
      class="meteor"
      :style="{ left: p[1].left + 'vw', top: p[1].top + 'vh' }"
    ></span>
    <span
      class="meteor"
      :style="{ left: p[2].left + 'vw', top: p[2].top + 'vh' }"
    ></span>

    <h1 class="photos-title">Photos</h1>
    <top-nav></top-nav>
    <div class="photosBox">
      <!-- 图片显示区 -->
      <div
        :class="{ 'photos-show': true, 'photos-show-hidden': mode == 'global' }"
      >
        <img
          :src="photosArr[currentAlbum].photos[indexImg].path"
          class="photos-show-imgstyle"
        />
        <!-- 图片切换按钮 -->
        <img
          src="~assets/photos/photosBtn.png"
          class="photos-btn-left photos-btn"
          @click="photosLeftBtn"
          v-show="indexImg != 0"
        />
        <img
          src="~assets/photos/photosBtn.png"
          class="photos-btn-right photos-btn"
          @click="photosRightBtn"
          v-show="indexImg != photosArr[0].photos.length - 1"
        />
        <div class="remark-bar" v-if="currentRemark">
          <span>{{ currentRemark }}</span>
        </div>
      </div>
      <!-- 小图片列表 -->
      <div
        :class="{ 'photos-list': true, 'photos-list-hidden': mode == 'global' }"
      >
        <ul :style="{ left: left_offset + 'px' }" id="photos-ul">
          <!-- <dt>{{ year + "年" + month + "月" + day + "日" + h + "时" + m + "分" + s + "秒" }}</dt> -->
          <li
            v-for="(item, index) in photosArr[currentAlbum].photos"
            :key="item.path"
            @click="showImg(item.path, index)"
          >
            <img
              :src="item.path"
              class="imgtt"
              :class="{ active: index == indexImg }"
            />
          </li>
        </ul>
        <div
          class="left-bound-block bound-block"
          @mouseenter="leftMove"
          @mouseleave="leftMoveStop"
        >
          《
        </div>
        <div
          class="right-bound-block bound-block"
          @mouseenter="rightMove"
          @mouseleave="rightMoveStop"
        >
          》
        </div>
      </div>
    </div>
    <div class="switch-btn-container">
      <photos-menu-btn u-key="btn1" @btn-click="switchMode"></photos-menu-btn>
    </div>
    <div class="photo-album-list-container">
      <div class="search-by-date-container">
        <!-- <span class="input-title">选择日期</span> -->
        <el-date-picker v-model="currentChooseDate" type="month" placeholder="选择月份" @change="changeDate">
        </el-date-picker>
      </div>
      <div
        :class="{
          'photo-album-container': true,
          'photo-album-container-appear': mode == 'global',
        }"
      >
        <el-carousel :interval="4000" type="card" height="50vh">
          <el-carousel-item v-for="(item, index) in photosArr" :key="item.date">
            <div class="album-item-container">
              <img :src="item.photos[0].path" @click="changeAlbum(index)" />
              <div class="date-show">{{ item.date }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div
        :class="{
          'add-photos-btn-container': true,
          'add-photos-btn-container-appear': mode == 'global',
        }"
      >
        <cool-button
          width="12vw"
          height="6vh"
          text="Add Photos"
          border-radius="6vh"
          font-size="1.5em"
          @btn-click="adding = true"
        ></cool-button>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="adding"
      top="10vh"
      :width="'60vw'"
      :custom-class="'add-photos-dialog' + ((addingListShow)?' add-photos-dialog-leftoff':'')"
      :show-close="false"
      :center="true"
      :modal="false"
      >
      <div class="add-photos-block">
        <div class="img-reversation" 
            @dragenter="dragEnter"
            @dragover="dragOver"
            @dragleave="dragLeave"
            @drop="drop"
            >
          <img src="~assets/photos/img-reversation.png" class="empty-img" v-show="currentAdd.currentUploadURL == ''"/>
          <span v-show="currentAdd.currentUploadURL == ''">请将图片拖拽到这~</span>
          <img :src="currentAdd.currentUploadURL" class="img-preview" v-show="currentAdd.currentUploadURL != ''" />
        </div>
        <div class="photo-auto-msg-container">
          <div class="img-indate msg-container">
            <div v-show="currentAdd.indate">上传日期: </div>
            <div>{{currentAdd.indate}}</div>
          </div>
          <div class="img-name msg-container">
            <div v-show="currentAdd.name">图片名: </div>
            <div>{{currentAdd.name}}</div>
          </div>
          <div class="img-size msg-container">
            <div v-show="currentAdd.size">图片大小:</div>
            <div v-show="currentAdd.size">{{currentAdd.size}}B</div>
          </div>
        </div>
        <div class="photo-remark-input-container">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入图片备注(选填)"
            v-model="currentAdd.remark">
          </el-input>
        </div>
        <div class="photo-remark-btn-container">
          <el-button type="primary" plain @click="pushCurrentAdd" :disabled="!(currentAdd.size) || !allowAdd">加入上传</el-button>
          <el-button type="danger" plain @click="clearCurrentAdd">清空此项</el-button>
        </div>
      </div>
    </el-dialog>
    <div :class="{'photos-upload-list-show':true,'photos-upload-list-show-show':addingListShow}">
      <div class="header">
        <h2>Upload List</h2>
        <el-button type="primary" plain @click="startUpload" :disabled="uploadLock">确认上传</el-button>
      </div>
      <div class="upload-list">
        <div class="upload-item" v-for="(item,index) in currentAdd.photosToUpload" :key="item.size">
          <el-tooltip :content="item.remark" placement="top" effect="light">
            <img :src="item.tempurl"/>
          </el-tooltip>
          <el-button type="danger" plain @click="deleteTempPhoto(index)" v-show="!(item.isUploading)">{{item.buttonContent}}</el-button>
          <div style="cursor:pointer" @click="deleteAfterUpLoadPhoto(index)" v-show="item.isUploading">
            <el-progress type="circle" :percentage="item.procession" :status="item.status" :width="90" ></el-progress>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import topNav from "../components/own/top-nav"
import PhotosMenuBtn from "components/own/photos-menu-btn.vue";
import CoolButton from "components/common/cool-button.vue";
import dateFormat from 'js/transfer/dateFormat.js';
import TopNav from 'components/own/top-nav.vue'
import {post,get} from 'js/request/request.js';
export default {
  name: "",
  props: {},
  computed: {
    currentRemark() {
      return this.photosArr[this.currentAlbum].photos[this.indexImg].remark;
    },
    addingListShow(){
      return this.currentAdd.photosToUpload.length
      // return false
    },
    allowAdd(){
      let result = true
      for(let i = 0;i < this.currentAdd.photosToUpload.length;++i){
        if(this.currentAdd.photosToUpload[i].isUploading){
          result = false
          break;
        }
      }
      return result;
    }
  },
  data() {
    return {
      circle_h:true,
      mode: "location",
      currentAdd:{
        uploadLock:false,
        remark:'',
        currentUploadURL:'',
        photosToUpload:[],
        name:'',
        indate:dateFormat('%yyyy-%MM-%DD',new Date()),
        size:0,
        realfile:null,
      },
      isUploading:false,
      currentAlbum: 0,
      currentChooseDate:new Date(),
      photosArr: [
        {
          date: "1月1日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/1.jpg",
              remark: "第一张图",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
              remark: "第二张图",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
              remark: "",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
              remark: "哈哈哈我也不知道我在说啥子",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
              remark: "",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
              remark: "hahahha",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
              remark: "",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
              remark: "23r23e2e2323r23e23e2r32e2r23r23reweeger",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
              remark: "",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
              remark: "",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
              remark: "sdjfsldfjsldf",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
              remark: "23423e23r",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
              remark: "",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
              remark: "23r2334t32y5yerfejergewgrerfewgre",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
              remark: "",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
              remark: "",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
              remark: "34t34trwrefqerfsdfwdvw4h3y",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
              remark: "",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
              remark: "wpoejflskdmflskmdvlskmdvlsdmk",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
              remark: "we;ofkapbndflmv/;slmc;/lmvs/dvlm",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
              remark: "a;dojf/ldmfv/xmvlkdmfg;lkskth;sdlf;khs.dfkdl",
            },
          ],
        },
        {
          date: "1月2日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/1.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月3日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月4日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月5日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月6日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月7日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月1日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月2日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月3日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月4日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月5日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月6日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月7日",
          photos: [
            {
              path: "http://118.25.144.69/public/imgs/img-2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              path: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
      ],
      indexImg: 0,
      year: "",
      month: "",
      day: "",
      s: "",
      h: "",
      m: "",
      s: "",
      p: [
        {
          left: 50,
          top: -20,
        },
        {
          left: 50,
          top: -20,
        },
        {
          left: 50,
          top: -20,
        },
      ],
      left_offset: 0,
      leftInterval: null,
      rightInterval: null,
      adding:false
    };
  },
  components: {
    PhotosMenuBtn,
    CoolButton,
    TopNav
  },
  methods: {
    switchMode() {
      this.mode = this.mode == "global" ? "location" : "global";
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
    showImg(path, index) {
      this.currentImg = path;
      this.indexImg = index;
    },
    // 图片却换按钮
    photosRightBtn: function () {
      this.indexImg++;

      this.currentImg = this.photosArr[0].photos[this.indexImg].path;
      this.adaptOffset();
    },
    photosLeftBtn: function () {
      this.indexImg--;

      this.currentImg = this.photosArr[0].photos[this.indexImg].path;
      this.adaptOffset();
    },
    meteorRun() {
      setInterval(() => {
        let temp = [];
        for (let i = 0; i < 3; i++) {
          let obj = {};
          obj.left = Math.random() * 100 + 50;
          obj.top = Math.random() * 30 - 30;
          temp.push(obj);
        }
        this.p = temp;
      }, 5000);
    },
    leftMove() {
      this.leftInterval = setInterval(() => {
        this.left_offset += 4;
      }, 5);
    },
    leftMoveStop() {
      clearInterval(this.leftInterval);
      this.adaptOffset();
    },
    rightMove(e) {
      this.rightInterval = setInterval(() => {
        //计算
        this.left_offset -= 4;
      }, 5);
    },
    rightMoveStop() {
      clearInterval(this.rightInterval);
      this.adaptOffset();
    },
    adaptOffset() {
      setTimeout(() => {
        let active = document.getElementsByClassName("active")[0];
        let offsetLeft = active.offsetLeft;
        if (offsetLeft + this.left_offset < 0) {
          let ul = document.getElementById("photos-ul");
          ul.style.transition = "0.4s all";
          this.left_offset += -(offsetLeft + this.left_offset);
          setTimeout(() => {
            ul.style.transition = "";
          }, 400);
        } else if (offsetLeft + this.left_offset > screen.availWidth) {
          let ul = document.getElementById("photos-ul");
          ul.style.transition = "0.4s all";
          this.left_offset -=
            offsetLeft +
            this.left_offset -
            screen.availWidth +
            ul.getElementsByTagName("img")[0].offsetWidth;
          setTimeout(() => {
            ul.style.transition = "";
          }, 400);
        }
      }, 100);
    },
    changeAlbum(index) {
      this.currentAlbum = index;
      this.indexImg = 0;
      this.mode = "location";
      this.left_offset = 0;
      this.adaptOffset();
    },
    dragEnter(e){
      e.preventDefault()
    },
    dragOver(e){
      e.preventDefault()
    },
    dragLeave(e){
      e.preventDefault() 
    },
    drop(e){
      e.preventDefault()
      let upfile = e.dataTransfer.files[0]
      this.currentAdd.currentUploadURL = URL.createObjectURL(upfile)
      this.currentAdd.realfile = upfile
      this.currentAdd.size = upfile.size
      this.currentAdd.name = upfile.name
      this.currentAdd.remark = ''
    },
    pushCurrentAdd(){
      let item = {
        'size':this.currentAdd.size,
        'name':this.currentAdd.name,
        'remark':this.currentAdd.remark,
        'masteraccount':this.$store.state.account,
        'upfile':this.currentAdd.realfile,
        'tempurl':this.currentAdd.currentUploadURL,
        'procession':0,
        'status':'',
        'buttonContent':'删除',
        'isUploading':false
      }
      this.currentAdd.photosToUpload.push(item)
    },
    clearCurrentAdd(){
      this.currentAdd.size = 0
      this.currentAdd.name = ''
      this.currentAdd.remark = ''
      this.currentAdd.currentUploadURL = ''
    },
    deleteTempPhoto(index){
      this.currentAdd.photosToUpload.splice(index,1)
    },
    finishConvince(index){
      this.currentAdd.photosToUpload.splice(index,1)
    },
    startUpload(){
      this.isUploading = true
      this.uploadLock = true
      let total_count = 0
      this.currentAdd.photosToUpload.forEach((element)=>{
        if(element.status != ''){
          return
        }
        total_count++
      })
      this.currentAdd.photosToUpload.forEach((element,index) => {
        if(element.status != ''){
          return
        }
        let formdata = new FormData()
        for(let item in element){
          console.log(item,":",element[item])
          formdata.append(item,element[item])
        }
        console.log(formdata)
        element.isUploading = true
        post('/photo/upload',formdata,(e)=>{
          element.procession = Math.floor((e.loaded/e.total) * 99)
        }).then(result=>{
          let data = result.data;
          
          if(data.success){
            element.status = 'success'
            element.buttonContent = "完成"
          }
          else{
            element.status = 'exception'
            element.buttonContent = "失败"
          }
          element.isUploading = false
          total_count--
          if(total_count == 0){
            setTimeout(()=>{
              this.uploadLock = false
            },1000)
          }
        })
      });
    },
    changeDate(){
      let dataFormat = new FormData()
      dataFormat.append("date",this.currentChooseDate)
      post('/photo/month',dataFormat,()=>{console.log("请求发送!")}).then(result=>{
        let response = result.data
        if(response.success){
          let all_photos = response.result
          let temp_arr = []
          for(let i = 0;i < 31;++i){
            let obj = {
              date:dateFormat("%yyyy-%MM",this.currentChooseDate) + "-" + ((i+1>=10)?(i+1):('0'+(i+1))),
              photos:[]
            }
            temp_arr.push(obj)
          }
          all_photos.forEach((element,index)=>{
            let day = new Date(element.indate).getDate()
            element.indate = new Date(element.indate)
            element.path = 'http://localhost:8099/' + element.path
            temp_arr[day-1].photos.push(element)
          })
          this.photosArr = temp_arr.filter(element=>{
              console.log(element)
              return (element.photos.length > 0)
          })
          this.currentAlbum = 0
          this.indexImg = 0
          console.log(this.photosArr)
        }
        else{
          this.$message.error("请求失败，请检查网络设置")
        }
      })
    },
    deleteAfterUpLoadPhoto(index){
      if(this.isUploading){
        return
      }
      this.deleteTempPhoto(index)
    }
  },
  mounted() {
    this.getdate();
    // this.meteorSetTimeout();
    this.meteorRun();
  },
};
</script>
<style scoped>
@import "~css/photos.css";
</style>

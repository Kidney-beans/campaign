<template>
  <div id="photos">
    <!-- <div class="Bj-show"><img :src="currentImg"></div> -->
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
    <div class="photosBox">
      <!-- 图片显示区 -->
      <div
        :class="{ 'photos-show': true, 'photos-show-hidden': mode == 'global' }"
      >
        <img
          :src="photosArr[currentAlbum].photos[indexImg].src"
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
            :key="item.src"
            @click="showImg(item.src, index)"
          >
            <img
              :src="item.src"
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
      <div
        :class="{
          'photo-album-container': true,
          'photo-album-container-appear': mode == 'global',
        }"
      >
        <el-carousel :interval="4000" type="card" height="50vh">
          <el-carousel-item v-for="(item, index) in photosArr" :key="item.date">
            <div class="album-item-container">
              <img :src="item.photos[0].src" @click="changeAlbum(index)" />
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
        ></cool-button>
      </div>
    </div>
  </div>
</template>
<script>
import PhotosMenuBtn from "components/own/photos-menu-btn.vue";
import CoolButton from "components/common/cool-button.vue";
export default {
  name: "",
  props: {},
  computed: {
    currentRemark() {
      return this.photosArr[this.currentAlbum].photos[this.indexImg].remark;
    },
  },
  data() {
    return {
      mode: "location",
      currentAlbum: 0,
      photosArr: [
        {
          date: "1月1日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/1.jpg",
              remark: "第一张图",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
              remark: "第二张图",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
              remark: "",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
              remark: "哈哈哈我也不知道我在说啥子",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
              remark: "",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
              remark: "hahahha",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
              remark: "",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
              remark: "23r23e2e2323r23e23e2r32e2r23r23reweeger",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
              remark: "",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
              remark: "",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
              remark: "sdjfsldfjsldf",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
              remark: "23423e23r",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
              remark: "",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
              remark: "23r2334t32y5yerfejergewgrerfewgre",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
              remark: "",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
              remark: "",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
              remark: "34t34trwrefqerfsdfwdvw4h3y",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
              remark: "",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
              remark: "wpoejflskdmflskmdvlskmdvlsdmk",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
              remark: "we;ofkapbndflmv/;slmc;/lmvs/dvlm",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
              remark: "a;dojf/ldmfv/xmvlkdmfg;lkskth;sdlf;khs.dfkdl",
            },
          ],
        },
        {
          date: "1月2日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/1.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月3日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月4日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月5日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月6日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "1月7日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月1日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月2日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月3日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月4日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月5日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月6日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
            },
          ],
        },
        {
          date: "2月7日",
          photos: [
            {
              src: "http://118.25.144.69/public/imgs/img-2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/2.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/3.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/4.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/5.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/6.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/7.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/8.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/9.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/10.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/11.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/12.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/13.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/14.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/15.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/16.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/17.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/18.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/19.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/20.jpg",
            },
            {
              src: "http://118.25.144.69/public/imgs/21.jpg",
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
    };
  },
  components: {
    PhotosMenuBtn,
    CoolButton,
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
    showImg(src, index) {
      this.currentImg = src;
      this.indexImg = index;
    },
    // 图片却换按钮
    photosRightBtn: function () {
      this.indexImg++;

      this.currentImg = this.photosArr[0].photos[this.indexImg].src;
      this.adaptOffset();
    },
    photosLeftBtn: function () {
      this.indexImg--;

      this.currentImg = this.photosArr[0].photos[this.indexImg].src;
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

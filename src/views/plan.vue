<template>
  <div class='plan'>
    <!-- 背景 -->
    <div class="bgc">
      <div class="mask"></div>
    </div>
      <!-- 日历 -->
      <div class=calendar>
        <!-- 当前日期 -->
        <div class="date">
          <!-- 当前年份 -->
          <div class="year">2020
            <div class="plus">+</div>
            <div class="subtract">-</div>
          </div>
          <!-- 当前月份 -->
          <div class="month">11
            <div class="plus">+</div>
            <div class="subtract">-</div>
          </div>
          <!-- 时间 -->
          <div class="time">11:56:56
            <div class="stop">STOP</div>
          </div>
        </div>
        <div>
          <!-- 天数 -->
          <div class="day">
            <div class="dayNumber">日</div>
            <div class="dayNumber">一</div>
            <div class="dayNumber">二</div>
            <div class="dayNumber">三</div>
            <div class="dayNumber">四</div>
            <div class="dayNumber">五</div>
            <div class="dayNumber">六</div>
            <div></div>
          </div>
          <!-- 添加计划 -->
          <div class="add" style="display:none"></div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name:'',
    props:{
      
    }
  }
</script>
<style scoped>
  @import '~css/plan.css';
</style>
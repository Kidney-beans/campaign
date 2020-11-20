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
        <!-- 天数和添加计划 -->
        <div class="day-box">
          <!-- 天数 -->
          <div class="day">
            <!-- 小计划图标 -->
            <div class="havePlan">
              <!-- 计划图标1 -->
              <div class="plan-1">
                <!-- <div class="fontPlan">计划</div>
                <div class="cil">1</div> -->
                <spot-lamp text='plan1' font-size='1em'></spot-lamp>
              </div>
            </div>
            <!-- 星期 -->
            <div class="week">日</div>
            <div class="week">一</div>
            <div class="week">二</div>
            <div class="week">三</div>
            <div class="week">四</div>
            <div class="week">五</div>
            <div class="week">六</div>

            <div class="week">日</div>
            <div class="week">一</div>
            <div class="week">二</div>
            <div class="week">三</div>
            <div class="week">四</div>
            <div class="week">五</div>
            <div class="week">六</div>

            <div class="week">日</div>
            <div class="week">一</div>
            <div class="week">二</div>
            <div class="week">三</div>
            <div class="week">四</div>
            <div class="week">五</div>
            <div class="week">六</div>

            <div class="week">日</div>
            <div class="week">一</div>
            <div class="week">二</div>
            <div class="week">三</div>
            <div class="week">四</div>
            <div class="week">五</div>
            <div class="week">六</div>

            <div class="week">日</div>
            <div class="week">一</div>
            <div class="week">二</div>
            <div class="week">三</div>
            <div class="week">四</div>
            <div class="week">五</div>
            <div class="week">六</div>

            <div class="week">日</div>
            <div class="week">一</div>
            <div class="week">二</div>
            <div class="week">三</div>
            <div class="week">四</div>
            <div class="week">五</div>
            <div class="week">六</div>

            <div class="week">日</div>
            <div class="week">一</div>
            <div class="week">二</div>
            <div class="week">三</div>
            <div class="week">四</div>
            <div class="week">五</div>
            <div class="week">六</div>
            <div></div>
          </div>
          <!-- 添加计划 -->
          <div class="add" style="display:none"></div>
        </div>
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
  @import '~css/plan.css';
</style>
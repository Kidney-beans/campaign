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
          <div class="year">
            <div></div>
            <div class="plus">+</div>
            <div class="subtract">-</div>
          </div>
          <!-- 当前月份 -->
          <div class="month">
            <div></div>
            <div class="plus">+</div>
            <div class="subtract">-</div>
          </div>
          <!-- 时间 -->
          <div class="time">
            <div></div>
            <div class="stop">STOP</div>
          </div>
        </div>
        <!-- 天数和添加计划 -->
        <div class="day-box">
          <!-- 天数 -->
          <div class="day">
            <!-- 小计划图标 -->
            <ul class="havePlan">
              <!-- 计划图标1 -->
              <div class="plan-1">
                <!-- <div class="fontPlan">计划</div>
                <div class="cil">1</div> -->
                <spot-lamp text='plan1' font-size='1em' back-text-color="#fff"></spot-lamp>
              </div>
            </ul>
            <!-- 星期 -->
            <div v-for="(item) in week" class="week" :key="item">{{item}}</div>
            <!-- 所有 -->
            <div v-for="(item) in day" class="week" :key="item">{{item}}</div>
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
    data(){
      return{
        week:["日","一","二","三","四","五","六"],
        day:["1","2"]
      }
      return{
        hour:"",
        min:"",
        sec:""
      }
    },
    components:{
      SpotLamp
    },
    methods:{
      setYear(yearClass,year) {
        let yearDiv=document.querySelector(yearClass);
        yearDiv.childNodes[0].innerText=year;
      },
      setMonth(monthClass,month){
        let monthDiv=document.querySelector(monthClass);
        monthDiv.childNodes[0].innerText=month;
      },
      setTime(timeClass,time){
        let timeDiv=document.querySelector(timeClass);
        timeDiv.childNodes[0].innerText=time;
      },
      connectTime(hour,min,sec){
        this.hour=hour<10?"0"+hour:hour;
        this.min=min<10?"0"+min:min;
        this.sec=sec<10?"0"+sec:sec;
        return this.hour+":"+this.min+":"+this.sec;
      }
    },
    mounted(){
      
      let day=document.querySelector(".day");
      let date=new Date();
      let year=date.getFullYear();
      let month=date.getMonth()+1;
      let dayNow=date.getDay();
      this.setYear(".year",year);
      this.setMonth(".month",month);
      setInterval(() => {
        let date=new Date();
        let hour=date.getHours();
        let min=date.getMinutes();
        let sec=date.getSeconds();
        this.setTime(".time",this.connectTime(hour,min,sec));
      }, 1000);
      

      
      
      
      
    }
  }
</script>
<style scoped>
  @import '~css/plan.css';
</style>
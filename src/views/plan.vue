<template>
  <div class='plan'>
    <!-- 背景 -->
    <div class="bgc">
      <div class="number"></div>
      <h2 class="mask" :testStr="dayNow"></h2>
    </div>
      <!-- 日历 -->
      <div class=calendar>
        <!-- 当前日期 -->
        <div class="date">
          <!-- 当前年份 -->
          <div class="year">
            <div></div>
            
            <!-- 增加年份 -->
            <div class="plus" @click="plusYear">+</div>
            <!-- 减少年份 -->
            <div class="subtract" @click="subtractYear">-</div>
          </div>
          <!-- 当前月份 -->
          <div class="month">
            <div></div>
            <!-- 增加月份 -->
            <div class="plus" @click="plusMonth">+</div>
            <!-- 增加月份 -->
            <div class="subtract" @click="subtractMonth">-</div>
          </div>
          <!-- 时间 -->
          <div class="time" :time="time">
            <div></div>
            <div @click="stopTime" class="stop">{{!counterPause?'STOP':'START'}}</div>
          </div>
        </div>
        <!-- 天数和添加计划 -->
        <div class="day-box">
          <!-- 天数 -->
          <div class="day">
            <!-- 星期 -->
            <div v-for="(item) in week" class="days" :key="item">
              <div class="week dAn" :week="item">{{item}}</div>
            </div>
            <!-- 所有 -->
            <div v-for="(item) in days" class="days" :key="item" @mouseenter="changeNumber">
              <div :class='{week:true, weekAn:item!=""}' >{{item}}</div>
              <div class="addPlan" v-if="item!=''">...</div>
            </div>
          </div>
          <!-- 添加计划 -->
          <div class="add" style="display:none"></div>
        </div>
      </div>
      <!-- 小计划图标 -->
      <ul class="havePlan">
        <!-- 计划图标1 -->
        <div class="plan-1">
          <!-- <div class="fontPlan">计划</div>
          <div class="cil">1</div> -->
          <spot-lamp text='plan1' font-size='1em' back-text-color="#fff"></spot-lamp>
        </div>
      </ul>
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
        days:["1","2"],
        year:"",
        month:"",
        dayNow:"",
        hour:"",
        min:"",
        sec:"",
        time:"",
        timer:"",
        counterPause:false
      }
    },
    components:{
      SpotLamp
    },
    methods:{
      //设置年份
      setYear(yearClass,year) {
        let yearDiv=document.querySelector(yearClass);
        yearDiv.childNodes[0].innerText=year;
      },
      //设置月份
      setMonth(monthClass,month){
        let monthDiv=document.querySelector(monthClass);
        monthDiv.childNodes[0].innerText=month;
      },
      //设置时间
      setTime(timeClass,time){
        let timeDiv=document.querySelector(timeClass);
        timeDiv.childNodes[0].innerText=time;
      },
      //拼接时间
      connectTime(hour,min,sec){
        this.hour=hour<10?"0"+hour:hour;
        this.min=min<10?"0"+min:min;
        this.sec=sec<10?"0"+sec:sec;
        // this.time=this.hour+":"+this.min+":"+this.sec;
        return this.hour+":"+this.min+":"+this.sec;
      },
      //停止或开始时间
      stopTime(){
          this.counterPause = !this.counterPause
      },
      //增加年份
      plusYear(e){
        // console.log(e.currentTarget.previousElementSibling);
        this.year=parseInt(this.year)+1;
        e.currentTarget.previousElementSibling.innerText=this.year;
        this.addDays();
      },
      //减少年份
      subtractYear(e){
        // console.log(e.currentTarget.parentElement,1)
        this.year=parseInt(this.year)-1;
        e.currentTarget.parentElement.childNodes[0].innerText=this.year;
        this.addDays();
      },
      //增加月份
      plusMonth(e){
        // console.log(e.currentTarget.previousElementSibling);
        console.log(this.month);
        this.month=(parseInt(this.month)+1)>12?"01":((parseInt(this.month)+1)<10?("0"+(parseInt(this.month)+1)):(parseInt(this.month)+1));
        e.currentTarget.previousElementSibling.innerText=this.month;
        this.addDays();
      },
      //减少月份
      subtractMonth(e){
        // console.log(e.currentTarget.parentElement,1)
        this.month=(parseInt(this.month)-1)<1?"12":((parseInt(this.month)-1)<10?("0"+(parseInt(this.month)-1)):(parseInt(this.month)-1))
        e.currentTarget.parentElement.childNodes[0].innerText=this.month;
        this.addDays();
      },
      //获取当月天数
      getDays(){
        //闰年每月天数
        var monthOlympic=[31,29,31,30,31,30,31,31,30,31,30,31];
        //非闰年每月天数
        var monthNormal=[31,28,31,30,31,30,31,31,30,31,30,31];
        //判断是否为闰年
        if((this.year%100==0&&this.year%400==0)||(this.year%100!=0&&this.year%4==0))
        {
            return (monthOlympic[this.month-1]);
        }
        else
        {
            return (monthNormal[this.month-1]);
        }
      },
      //添加天数
      addDays(){
        let firstDayWeek=new Date(this.year,this.month-1,1).getDay();
        // let firstDayWek=firstDayWeek.getDate();
        console.log( firstDayWeek)
        //console.log( firstDayWeek.getFullYear(),firstDayWeek.getMonth()+1,firstDayWeek.getDate(), firstDayWeek.getDay(),this.dayNow)
        this.days.length=0;
        for(let i=0;i<firstDayWeek;i++){
          this.days.push("");
        }
        for(let i=0;i<this.getDays();i++){
          this.days.push(i+1);
        }
        let blank=(firstDayWeek+this.getDays())%7;
        for(let i=0;blank%7!=0;i++){
          this.days.push("");
          blank++;
        }
        console.log(this.days);
      },
      //改变背景数字
      changeNumber(e){
        if(e.currentTarget.childNodes[0].innerText!=''){
          this.dayNow=e.currentTarget.childNodes[0].innerText;
        }
        console.log()
      }
    },
    mounted(){
      let day=document.querySelector(".day");
      let date=new Date();
      this.year=date.getFullYear();
      this.month=date.getMonth()+1;
      this.dayNow=date.getDate();
      this.setYear(".year",this.year);
      this.setMonth(".month",this.month);
      this.timer=setInterval(() => {
        if(this.counterPause){
          return
        }
        let date=new Date();
        let hour=date.getHours();
        let min=date.getMinutes();
        let sec=date.getSeconds();
        this.setTime(".time",this.connectTime(hour,min,sec));
      }, 1000);
    //  clearInterval(timer);
      this.addDays();
      

      
      
      
      
    }
  }
</script>
<style scoped>
  @import '~css/plan.css';
</style>
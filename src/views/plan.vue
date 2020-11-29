<template>
  <div id='plan'>
    <!-- 背景 -->
    <div class="bgc">
      <h2 class="mask" :testStr="bgcNum"></h2>
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
            <div v-for="(item,index) in days" class="days" :key="item" >
              <div :class='{week:true, weekAn:item!="",dayNowBgc:isDayNow(item)}' >{{item}}</div>
              <div class="addPlan" v-if="item!=''" @click="seePlan(index,item)" title="查看计划">...</div>
            </div>
          </div>
          <!-- 计划选项 -->
          <div class="add" style="display:none"></div>
        </div>
      </div>
      <!-- 计划列表 -->
      <div class="planList" :class="{'planList-hidden':!listShow}" @mouseleave="hiddenPlan">
        <!-- 添加计划按钮 -->
        <div class="btnPlan">
          <div title="添加计划" @click="planPageDisplay">+</div>
        </div>
        <!-- 计划列表内的计划 -->
        <ul class="ulPlan" :style="{'display':temp_sw}">
          <li class="havePlan" v-for="(item,index) in currentPlans" :style="{'top': 5 + (index * 15) + 'vh','width':getWidth(index)}" :key="item"  >
            <div class="planDel" title="删除计划" @click="deleteItem(index)">x</div>
            <div @mouseenter="activeItem(index)" @mouseout="sleepItem(index)">PLAN{{index+1}}</div>
          </li>
      </ul>
      </div>
      <!-- 添加计划页 -->
      <div class="addPlanPage PlanPageAn" :style="{'display':pageDisplay}">
          <div class="formPlan">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="标题">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="地点">
                <el-input v-model="form.position"></el-input>
              </el-form-item>
              <el-form-item label="计划时间">
                <el-col :span="11">
                  <el-time-select
                    placeholder="起始时间"
                    v-model="form.startTime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                      maxTime: form.endTime
                    }">
                  </el-time-select>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-select
                    placeholder="结束时间"
                    v-model="form.endTime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                      minTime: form.startTime
                    }">
                  </el-time-select>
                </el-col>
              </el-form-item>
              <el-form-item label="具体计划">
                <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">添加</el-button>
                <el-button @click="pagePlanHidden" >取消</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>
      <!-- 显示详细计划 -->
      <div class="showDetailedPlan">
          <div class="timeLine">
            <div class="pointOne"></div>
            <div class="yMD">
              <span>2010</span>
              <span>-</span>
              <span>01</span>
              <span>-</span>
              <span>01</span>
            </div>
            <div class="block">
              <div class="titleD">办活动</div>
              <div class="plan-T">款了附近的萨拉开房记录卡德加激发动力会计分录建档立卡
                解放路卡接待来访</div>
            <div class="plan-D">
              <div class="positionD">建档立卡是</div>
              <div class="timeD">11：00-12：00</div>
            </div>
            </div>
            <div class="pointTwo"></div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name:'',
    props:{
      
    },
    data(){
      return{
        form: {
          name: '',
          position:'',
          startTime: '',
          endTime: '',
          desc: ''
        },
        listShow:false,
        pageDisplay:'none',
        temp_sw:'none',
        week:["日","一","二","三","四","五","六"],
        days:["1","2"],
        year:"",
        yearNow:"",
        month:"",
        monthNow:"",
        day:"",
        dayNow:"",
        bgcNum:"",
        hour:"",
        min:"",
        sec:"",
        time:"",
        timer:"",
        counterPause:false,
        prefixPlantDays:0,
        plans:[
          [
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球",
              title:''
            }
          ],
          []
          ,[
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球"
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球"
            }         
          ],
          [
          {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球"
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球"
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球"
            }

          ],
          []
          ,[
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球"
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去打篮球"
            }
          ]
        ],
        currentPlans:[],
        planIndex:0,
        activePlanIndex:-2
      }
    },
    components:{
     
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
      //改变选中日期
      changeDay(Option,optionNow){
        console.log(Option,optionNow)
        if(Option!=optionNow){
          this.day="01";
        }else{
          this.day=this.dayNow
        }
      },
      //设置背景数字
      setBgcNum(){
        this.bgcNum=this.month+"."+this.day;
        this.currentPlans = this.plans[this.day-1];
        console.log(this.currentPlans)
      },
      //增加年份
      plusYear(e){
        // console.log(e.currentTarget.previousElementSibling);
        //改变初始当前选中日期
        this.changeDay(parseInt(this.year)+1,this.yearNow);
        // console.log(this.day);
        this.year=parseInt(this.year)+1;
        this.setBgcNum();
        e.currentTarget.previousElementSibling.innerText=this.year;
        this.addDays();
      },
      //减少年份
      subtractYear(e){
        // console.log(e.currentTarget.parentElement,1)
        //改变初始当前选中日期
        this.changeDay(parseInt(this.year)-1,this.yearNow);
        // console.log(this.day);
        this.year=parseInt(this.year)-1;
        this.setBgcNum();
        e.currentTarget.parentElement.childNodes[0].innerText=this.year;
        this.addDays();
      },
      //增加月份
      plusMonth(e){
        // console.log(e.currentTarget.previousElementSibling);
        //改变初始当前选中日期
        this.changeDay(parseInt(this.month)+1,this.monthNow);
        // console.log(this.month);
        this.month=(parseInt(this.month)+1)>12?"01":((parseInt(this.month)+1)<10?("0"+(parseInt(this.month)+1)):(parseInt(this.month)+1));
        this.setBgcNum();
        e.currentTarget.previousElementSibling.innerText=this.month;
        this.addDays();
      },
      //减少月份
      subtractMonth(e){
        // console.log(e.currentTarget.parentElement,1)
        //改变初始当前选中日期
        this.changeDay(parseInt(this.month)-1,this.monthNow)
        this.month=(parseInt(this.month)-1)<1?"12":((parseInt(this.month)-1)<10?("0"+(parseInt(this.month)-1)):(parseInt(this.month)-1))
        this.setBgcNum();
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
        //console.log( firstDayWeek.getFullYear(),firstDayWeek.getMonth()+1,firstDayWeek.getDate(), firstDayWeek.getDay(),this.dayNow)
        this.days.length=0;
        this.prefixPlantDays=firstDayWeek;
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
        // console.log(this.days);
      },
      isDayNow(item){
        if(item==this.day){
          return true;
        }else{
          return false;
        }
      },
      // 查看计划
      seePlan(index,item){
        parseInt(item)<10?this.day="0"+item:this.day=item;
        this.setBgcNum();
        this.temp_sw='none'
        this.listShow = true
        this.currentPlans = this.plans[index - this.prefixPlantDays]
        setTimeout(()=>{
            this.temp_sw='block'
        },200)
      },
      //隐藏计划
      hiddenPlan(e){
        this.temp_sw='none';
        this.listShow = false
        
      },
      // 改变计划列表内的计划的宽度
      getWidth(index){
         let diff = Math.abs(this.activePlanIndex - index)
        if(diff == 0){
          return '12vw'
        }
        else if(diff == 1){
          return '8vw'
        }
        else{
          return '6vw'
        }
      },
      activeItem(index){
       this.activePlanIndex = index
       this.planIndex=index

      },
      sleepItem(index){
        this.activePlanIndex = -2
      },
      deleteItem(index){
        this.currentPlans.splice(index,1)
      },
      onSubmit() {
        console.log('submit!');
      },
      planPageDisplay(){
        this.pageDisplay="block";
      },
      pagePlanHidden(){
        this.pageDisplay='none';
      }
    },
    mounted(){
      let day=document.querySelector(".day");
      let date=new Date();
      this.year=date.getFullYear();
      this.yearNow=this.year;
      this.month=date.getMonth()+1;
      this.monthNow=this.month;
      this.day=date.getDate();
      this.dayNow=this.day;
      this.currentPlans = this.plans[this.day-1];
      this.setBgcNum();
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
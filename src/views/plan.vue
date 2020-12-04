<template>
  <div id='plan'>
    <top-nav></top-nav>

    <h1 class="webTitle">PLAN</h1>
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
            <div>{{year}}</div>
            <!-- 增加年份 -->
            <div class="plus" @click="plusYear">+</div>
            <!-- 减少年份 -->
            <div class="subtract" @click="subtractYear">-</div>
          </div>
          <!-- 当前月份 -->
          <div class="month">
            <div>{{this.month}}</div>
            <!-- 增加月份 -->
            <div class="plus" @click="plusMonth">+</div>
            <!-- 增加月份 -->
            <div class="subtract" @click="subtractMonth">-</div>
          </div>
          <!-- 时间 -->
          <div class="time" :time="time">
            <div>{{this.time}}</div>
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
            <div v-for="(item,index) in days" class="days" :key="index" >
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
          <li class="havePlan" v-for="(item,index) in currentPlans" :style="{'top': 5 + (index * 15) + 'vh','width':getWidth(index)}" :key="index"  >
            <div class="planDel" title="删除计划" @click="deleteItem(index)">x</div>
            <div @mouseenter="activeItem(index)" @mouseout="sleepItem(index)">PLAN{{index+1}}</div>
          </li>
      </ul>
      </div>
      <!-- 添加计划页 -->
      <circle-drawer-form outter-background="#000" inner-background="rgba(255,0,0,1)" :hidden="add_dialog_hidden">
        <div class="addPlanPage PlanPageAn">
          <div class="clearPlanPage" @click="clearAddPlan">
            <img src="../assets/plan/clearPage.png" alt="清空"> 
          </div>
          <div class="addPlanAccessAn" :style="{'display':addAccess}">
            <div class="addPlanAccess">{{this.AccessF}}</div>
          </div>
          <div class="formPlan">
            <el-form ref="form" label-width="80px">
              <el-form-item label="标题">
                <el-input v-model="title"></el-input>
              </el-form-item>
              <el-form-item label="地点">
                <el-input v-model="position"></el-input>
              </el-form-item>
              <el-form-item label="计划时间">
                <el-col :span="11">
                  <el-time-select
                    placeholder="起始时间"
                    v-model="startTime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                      maxTime: endTime
                    }">
                  </el-time-select>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-select
                    placeholder="结束时间"
                    v-model="endTime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                      minTime: startTime
                    }">
                  </el-time-select>
                </el-col>
              </el-form-item>
              <el-form-item label="具体计划" maxlength="150">
                <el-input type="textarea" v-model="plan" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">添加</el-button>
                <el-button @click="pagePlanHidden" >关闭</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>
      </circle-drawer-form>
      <!-- 显示详细计划 -->
      <div class="showDetailedPlan showPlanAn" :style="{'display':showPlan}">
          <div class="timeLine" v-if="this.currentPlans.length>0">
            <div class="pointOne"></div>
            <div class="yMD">
              <span>{{currentPlans[planIndex].year}}</span>
              <span>-</span>
              <span>{{currentPlans[planIndex].month}}</span>
              <span>-</span>
              <span>{{currentPlans[planIndex].day}}</span>
            </div>
            <div class="block">
              <div class="titleD">{{currentPlans[planIndex].title}}</div>
              <div class="plan-T">{{currentPlans[planIndex].plan}}</div>
            <div class="plan-D">
              <div class="positionD">{{currentPlans[planIndex].position}}</div>
              <div class="timeD">{{currentPlans[planIndex].time}}</div>
            </div>
            </div>
            <div class="pointTwo"></div>
        </div>
      </div>
  </div>
</template>
<script>
  import circleDrawerForm from "components/common/circle-drawer-form.vue";
  import {get,post} from "js/request/request.js"
  import TopNav from 'components/own/top-nav.vue'
  export default {
    name:'',
    props:{
      
    },
    data(){
      return{
        addAccess:'none',
        AccessF:"添加成功",
        title: '',
        position:'',
        startTime: '',
        endTime: '',
        plan: '',
        showPlan:'none',
        listShow:false,
        add_dialog_hidden:true,
        temp_sw:'none',
        week:["日","一","二","三","四","五","六"],
        days:["1","2"],
        year:"",
        yearNow:"",
        month:"",
        monthNow:"",
        day:1,
        dayNow:"",
        bgcNum:"",
        hour:"",
        min:"",
        sec:"",
        time:"",
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
              plan:"今天要fadfdas去打篮球",
              title:'今天要去打篮球'
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要fasdfadf去打篮球",
              title:'今天要去打篮球'
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去dsfadfasdf打篮球",
              title:'今天要去打篮球'
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要dsafagagfaf去打篮球",
              title:'今天要去打篮球'
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去dsadasd打篮球",
              title:'今天要去打篮球'
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去dasdsad打篮球",
              title:'今天要去打篮球'
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去sd打篮球",
              title:'今天要去打篮球'
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
          ],[

          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ],[
            
          ]
        ],
        currentPlans:[{
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去dasdsad打篮球",
              title:'今天要去打篮球'
            },
            {
              year:"2020",
              month:"11",
              day:"25",
              time:"11:00-13:00",
              position:"运动场",
              plan:"今天要去sd打篮球",
              title:'今天要去打篮球'
            }],
        planIndex:0,
        activePlanIndex:-2
      }
    },
    components:{
     circleDrawerForm,
     TopNav
    },
    methods:{
      //拼接时间
      connectTime(hour,min,sec){
        this.hour=hour<10?"0"+hour:hour;
        this.min=min<10?"0"+min:min;
        this.sec=sec<10?"0"+sec:sec;
        this.time=this.hour+":"+this.min+":"+this.sec;
        //this.$store.state.id  类名：masterid
      },
      //停止或开始时间
      stopTime(){
          this.counterPause = !this.counterPause
      },
      //改变选中日期
      changeDay(Option,optionNow){
        // console.log(Option,optionNow)
        if(Option!=optionNow){
          this.day="01";
        }else{
          this.day=parseInt(this.dayNow)>10?this.dayNow:"0"+this.dayNow
          // console.log(this.day)
        }
      },
      //设置背景数字
      setBgcNum(){
        this.bgcNum=this.month+"."+this.day;
        this.currentPlans = this.plans[this.day-1];
      },
      //增加年份
      plusYear(e){
        //改变初始当前选中日期
        this.changeDay(parseInt(this.year)+1,this.yearNow);
        this.year=parseInt(this.year)+1;
        this.setBgcNum();
        this.addDays();
      },
      //减少年份
      subtractYear(e){
        //改变初始当前选中日期
        this.changeDay(parseInt(this.year)-1,this.yearNow);
        this.year=parseInt(this.year)-1;
        this.setBgcNum();
        this.addDays();
      },
      //增加月份
      plusMonth(e){
        //改变初始当前选中日期
        this.changeDay(parseInt(this.month)+1,this.monthNow);
        this.month=(parseInt(this.month)+1)>12?"01":((parseInt(this.month)+1)<10?("0"+(parseInt(this.month)+1)):(parseInt(this.month)+1));
        this.setBgcNum();
        this.addDays();
      },
      //减少月份
      subtractMonth(e){
        //改变初始当前选中日期
        this.changeDay(parseInt(this.month)-1,this.monthNow)
        this.month=(parseInt(this.month)-1)<1?"12":((parseInt(this.month)-1)<10?("0"+(parseInt(this.month)-1)):(parseInt(this.month)-1))
        this.setBgcNum();
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
        this.day = (parseInt(item)<10)?"0"+item:item;
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

       this.showPlan='block'

      },
      sleepItem(index){
        this.activePlanIndex = -2

        this.showPlan='none'
      },
      deleteItem(index,plan){
        let dataForm = new dataForm()
        for(let item in plan){
          dataForm.append(item,plan[item])
        }
        dataForm.append("ssk",this.$store.state.ssk)
        post('/plan/delete',dataForm).then(result=>{
          let response = result.data
          if(response.success){
            this.$message({
              message:"删除成功!",
              type:'success'
            });
            this.currentPlans.splice(index,1)
          }
          else{
            this.$message("删除失败，请稍后再试!")
          }
        }).catch(()=>{
          this.$message.error("删除失败，请检查网络!")
        })
        
      },
      planPageDisplay(){
        
        this.add_dialog_hidden=false;
      },
      clearAddPlan(){
        this.title=''
        this.position=''
        this.endTime=''
        this.startTime=''
        this.plan=''
      },
      pagePlanHidden(){
        this.add_dialog_hidden=true;
        this.clearAddPlan()
      },
      getPlan(date){
        let dataForm = new dataForm()
        dataForm.append('date',date)
        dataForm.append("ssk",this.$store.state.ssk)
        post('/plan/find',dataForm).then(result=>{
          let response = result.data
          if(response.success){
            //请求成功！
            //response.result是plan列表（一天的）
            let list = response.result
            this.currentPlans = list.map(element=>{
              let obj = {
                year:element.d.getFullYear(),
                month:element.d.getMonth() + 1,
                day:element.d.getDate(),
                time:element.time,
                position:element.position,
                plan:element.plan,
                title:element.title
              }
              return obj;
            })
          }else{
            this.$message("获取计划列表失败")
          }
        }).catch(()=>{
          this.$message.error("服务端故障，请稍后再试!")
        })
      },
  
      onSubmit() {
        let plan={
          year:this.yearNow,
          month:this.monthNow,
          day:this.day,
          title:this.title,
          position:this.position,
          startTime:this.startTime,
          endTime:this.endTime,
          plan:this.plan
        }

        let post_data = {
          position:this.position,
          plan:this.plan,
          title:this.title,
          d:new Date(this.yearNow,this.monthNow,this.day),
          time:this.startTime + "-" + this.endTime
        }

        console.log(post_data)
        this.currentPlans.push(plan)
        this.AccessF='添加成功'
        this.addAccess='block'
        setTimeout(()=>{
          this.addAccess='none'
        },4000)
        
      }
    },
    mounted(){
      let day=document.querySelector(".day");
      let date=new Date();
      this.year=date.getFullYear();
      this.yearNow=this.year;
      this.month=date.getMonth()+1;
      this.monthNow=this.month;
      this.dayNow=date.getDate();
      this.day=this.dayNow>10?this.dayNow:'0'+this.dayNow;

      this.setBgcNum();
      this.timer=setInterval(() => {
        if(this.counterPause){
          return
        }
        let date=new Date();
        let hour=date.getHours();
        let min=date.getMinutes();
        let sec=date.getSeconds();
        this.connectTime(hour,min,sec)
      }, 1000);
      this.addDays();
    }
  }
</script>
<style scoped>
  @import '~css/plan.css';
</style>
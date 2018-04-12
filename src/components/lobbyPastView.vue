<template>
    <div id="pa_con">
        <header id="pa_head" class="new_header">
            <div class="left">
                <a href="javascript:;">
                </a>
            </div>
            <h2 class="center lottery_name"> 往期开奖</h2>
        </header>

        <div id="pa_content" class="content lobby_past_view">
            <div id="betting_record" class="tab_container tabBox">
                <ul class="tab_content">
                    <li class="past_view" v-for="(list,index) in pastView">
                        <ul class="new_panel">
                            <li class="prod cqssc" >
                                <div class="new_panel_top play_th">
                                    <div class="prd_num"><i class="prd"></i><span>{{list.lotteryName}}</span></div>

                                    <div class="prd_num02" v-if="list.lotteryId != '116'">第{{( list.lotteryId == '8' 
                                        || list.lotteryId == '24' 
                                        || list.lotteryId == '26' 
                                        || list.lotteryId == '32'
                                        || list.lotteryId == '30'
                                        )?list.issueAlias :list.pcode}}期</div>
                                    <div class="prd_num02" v-if="list.lotteryId == '116'">{{newDateFormater(list.prizeCloseTime)}}</div>
                                    <!-- <div class="time timerset" :data-time=" (format(formatTimeUnlix(list.endTime)).getTime() - format(formatTimeUnlix(sys_time)).getTime()) / 1000 ">-->
                                    <!-- 【重庆秒秒彩】除了百乐彩之外，其他平台往期开奖中需要除去开奖倒计时 -->
                                    <div class="time timerset endtime" :data-time="0" v-if="list.endTime > sys_time" v-bind:class="{'hide': list.openingTimeHide}">
                                    </div>
                                    <div class="time timerset nextendtime"  v-else v-bind:class="{'hide': list.openingTimeHide}">
                                    </div>
                                </div>
                                <!--  北京pk10  秒速赛车 江苏快3 -->
                                <ul :class="'new_panel_center '+ulclass[list.lotteryId]" v-if="(list.lotteryId == '8') 
                                || (list.lotteryId == '108') || (list.lotteryId == '24') || (list.lotteryId == '6') 
                                || (list.lotteryId == '106') || (list.lotteryId == '20') || (list.lotteryId == '22')">
                                    <li v-for="listnum in list.winNumber.split(',')" >
                                       <!-- <span class="pk10_ball small_ball" :class="'num_'+listnum"></span>-->
                                        <span :class="[spanclass[list.lotteryId],'active num_'+listnum]"></span>
                                    </li>
                                </ul>
                                <!--  幸运28 -->
                                <ul class="new_panel_center lo_ball double-numbers xy28_top_number" v-else-if="(list.lotteryId == '30')" v-html="getDoubleContent(list.winNumber.split(','))" >
                                </ul>
                                <!-- -->
                                <ul class="new_panel_center lo_ball" v-else>
                                    <li v-if="(list.lotteryId != '10'&&list.lotteryId != '110') " v-for="listnum in list.winNumber.split(',')"
                                        :class="'round_ball active num_'+ listnum ">{{listnum}}
                                    </li>

                                    <li v-if="(list.lotteryId == '10'||list.lotteryId == '110' )" v-for="listnum in list.winNumber.split(',')"
                                        :class=" listnum < 10?'lhc_ball lhc_ball_b num_0'+ listnum : 'lhc_ball lhc_ball_b num_' + listnum  ">
                                        {{listnum}}
                                    </li>
                                </ul>

                                <div class="function_btn">
                                    <router-link class="bell new_btn btn_outline" to="publicTemplate/pastView" @click.native="setActionToView(list.lotteryId,gameAliasName[list.lotteryId])"><i></i><span>往期开奖</span></router-link>
                                   <!-- <a class="bell btn btn_outline" href="publicTemplate/pastView" @click="setActionToView(list.lotteryId,gameName[list.lotteryId])"><i></i>往期开奖</a>-->
                                    <router-link class="check new_btn ok btn_blue" :to="'/'+gameHref[list.lotteryId]"><i></i><span>立即投注</span></router-link>
                                </div>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>

        <FooterNav />

        <div class="so-shade"></div>
        <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />

    </div>
</template>



<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
import FooterNav from '@/components/Footer'
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'

export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
      FooterNav,
      AutoCloseDialog,
 },
    data :function() {
        return {
            haslogin:false ,
            hasaction:false , // 阻止重复提交
            gametimerInt:'' ,
            now_time:'',  // 当前期数销售截止时间
            sys_time :'',  // 当前系统时间
            pastView:{} ,
           // pastViewArray :{} ,
            cssid :{'8':'pk10','108':'pk10','24':'pk10','6':'k3','106':'k3'} ,
            ulclass :{'8':'pk10_top_number','108':'pk10_top_number','24':'pk10_top_number','6':'k3dice_top','106':'k3dice_top','20':'k3dice_top','22':'k3dice_top'} ,
            spanclass :{'8':'pk10_ball','108':'pk10_ball','24':'pk10_ball','6':'k3_dice','106':'k3_dice','20':'k3_dice','22':'k3_dice'} ,
            gameHref : {
                "2":"cqssc",
                "12":"cqssc/tianJinIndex",
                "14":"cqssc/xinJiangIndex",
                "26":"cqssc/BeiJingIndex", //北京时时彩
                "28":"cqssc/TaiWanIndex", //台湾5分彩
                "102":"cqssc/SecondSscIndex",
                "112":"cqssc/HanGuoIndex", //韩国1.5分彩
                "114":"cqssc/DongJingIndex", //东京1.5分彩
                "32":"cqssc/QQIndex", //QQ分分彩
                "4":"jc11x5",     //江西11选5
                "18":"jc11x5/sd11x5Index",  //山东11选5
                "104":"jc11x5/ms11x5Index",  // 秒速11选5
                "16":"jc11x5/gd11x5Index",  //广东11选5
                "8":"pk10",
                "108":"pk10/SecondPk10",  // 秒速 赛车
                "24":"pk10/LuckyBoat",  // 
                "6":"k3/",  //江苏快3
                "20":"k3/anHuiK3Index",
                "22":"k3/huBeiK3Index",
                "106":"k3/miaoSuK3Index",  // 秒速k3
                "10": "lhc",  // 
                "110": "wflhc",  // 
                "30": "xy28", // 幸运28
                "116": "cqssc/CQmmcIndex", //重庆秒秒彩
            }, // 对应彩种的id
            gameName : {
                "2":"重庆时时彩",
                "12":"天津时时彩",
                "14":"新疆时时彩",
                "26":"北京时时彩",
                "28":"台湾5分彩",
                "102":"秒速时时彩",
                "112":"韩国1.5分彩",
                "114":"东京1.5分彩",
                "4":"江西11选5",     //江西11选5
                "18":"山东11选5",  //山东11选5
                "16":"广东11选5",  //广东11选5
                "104":"秒速11选5",  //秒速11选5
                "8":"北京PK10",
                "108":"秒速赛车",
                "24":"幸运飞艇",
                "6":"江苏快3",  // 江苏快3
                "20":"安徽快3",
                "22":"湖北快3",
                "106":"秒速快3",
                "10": "香港六合彩",
                "110": "五分六合彩",

            },
            gameAliasName: [], // 对应彩种的名称
        }
    },
    beforeDestroy:function(){
      clearInterval(this.gametimerInt) ;
   },
    created:function () {
        var _self = this ;
        _self.haslogin = this.ifLogined() ;
        if( !_self.haslogin){
            _self.$router.push('/login')  ;
        }
        this.gameAliasName = this.getLotteryNameList();
    },
  mounted:function() {
      var _self = this ;
      $('html,body').css('overflow-y','scroll' )  ;
      document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部

      _self.lobbytimerBegin();
      setTimeout(function(){
          _self.gameTimer() ;
      },200)

  },
  methods:{
      /*
       * 跳转往期开奖处理
       *  */
      setActionToView:function (lotteryid,name) {
          this.setCookie('lt_lotteryid',lotteryid) ; // 彩种 id 设置
          this.setCookie('lottery_name',name) ;
      },

      /*
      * 近期开奖数据，近期开奖页面
      * */
    doubleCount:function (maxtime) {
        var _self = this ;
        var senddata ={
            sideType: '2' , // 1官彩，2双面彩
            maxUpdateTime: maxtime , // 最近修改时间，如果近期时间内没修改则不返回数据
        }
        $.ajax({
            type: 'get',
            headers: {
                'Authorization': 'bearer  ' + this.getAccessToken ,
                // 'sourceType':'2', // 1是pc端，2是h5
                // 'sideType':'1',  // 1是传统盘，2是双面盘
            },
            url: this.action.forseti + 'api/priodDataNewlys',
            timeout: 600000,
            data: senddata ,
            success: (data) => {
              /*  for(var i=0;i<data.data.length;i++){*/
                    $.each(data.data,function (i,v) {
                        //console.log(v) ;
                        if(!v.winNumber || v.winNumber==''){
                            switch (v.lotteryId.toString()){
                                case '8': // 北京pk10
                                case '108': // 秒速赛车
                                case '24': // 秒速赛车
                                    v.winNumber ='20,20,20,20,20,20,20,20,20,20' ;
                                    break;
                                case '6' :   // 江苏K3
                                case '20' :  // 安徽K3
                                case '22' :  // 湖北K3
                                case '106' :  // 秒速k3
                                    v.winNumber ='20,20,20' ;
                                    break;
                                default  :
                                    v.winNumber='-,-,-,-,-' ;
                                    break ;
                            }
                        }
                       // console.log(v.endTime) ;
                       let openTime = '';
                        if(_self.format(_self.formatTimeUnlix(v.endTime,0)).getTime() > _self.format(_self.formatTimeUnlix(_self.sys_time,0)).getTime() ){ // 如果当前期结束时间大于系统时间
//                            console.log('结束时间大') ;
                            openTime = Math.floor((v.endTime - _self.sys_time)/1000);
                            $('.timerset').eq(i).attr('data-time',Math.floor((v.endTime - _self.sys_time)/1000));
                        }else{
//                            console.log('结束时间小') ;
                            openTime = Math.floor((v.nextEndTime - _self.sys_time)/1000); 
                            $('.timerset').eq(i).attr('data-time', Math.floor((v.nextEndTime - _self.sys_time)/1000));
                        }
                        //console.log(v.lotteryId, openTime, v.endTime, v.nextEndTime);

                        v.openingTimeHide = false;
                        if ( [116].includes(parseInt(v.lotteryId)) ) {
                            v.openingTimeHide = true;
                        }                            
                    }) ;

               /* }*/
                let gmaeList = this.getLotteryNameList();
                this.pastView = data.data ;


                this.pastView.forEach(function(item) {
                  _self.gameAliasName.forEach(function(gName, gId) {
                     if(item.lotteryId == gId) {
                        item.lotteryName = gName;
                     }
                  });
                });

            },
            error: function (e) {  // 错误提示
                _self.errorAction(e) ;
            }
        });
    },

      lobbytimerBegin:function(){
          var _self = this;
          if(_self.hasaction){
              return false ;
          }
          _self.hasaction = true ;
          _self.newGetSystemTime().then(sys_time=>{
              _self.sys_time = sys_time ;
              _self.doubleCount('') ;
              setTimeout(function () {
                  _self.hasaction = false ;
              },2000) ;
          });


      },

 // 定时器，倒计时处理
      gameTimer:function () {
              //倒计时定时器
              //countdown(90);
              var that = this ;
              this.gametimerInt = window.setInterval(function() {
                  var $obj_nav_span = $(".timerset");
                  for (var i = 0; i < $obj_nav_span.length; i++) {
                      var _times = "";
                      if ($obj_nav_span.eq(i).html() == "") {
                          $obj_nav_span.eq(i).html();
                      }
                      if (parseInt($obj_nav_span.eq(i).attr("data-time")) > 0) {
                          _times = parseInt($obj_nav_span.eq(i).attr("data-time")) - 1;
                          $obj_nav_span.eq(i).attr("data-time", _times);
                      } else { // 当前倒计时结束
                          that.lobbytimerBegin();
                         _times = $obj_nav_span.eq(i).attr("data-time");
                      }
                      $obj_nav_span.eq(i).html(that.startTimer(_times));
                  }
              }, 1000);

      },

    startTimer:function(seconds) {
        let days        = Math.floor(seconds/24/60/60);
        let hoursLeft   = Math.floor((seconds) - (days*86400));
        let hours       = Math.floor(hoursLeft/3600);
        let minutesLeft = Math.floor((hoursLeft) - (hours*3600));
        let minutes     = Math.floor(minutesLeft/60);
        let remainingSeconds = seconds % 60;
        if(hours < 10){
            hours = '0' + hours;
        }
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        if (remainingSeconds < 10) {
            remainingSeconds = '0' + remainingSeconds;
        }
        return hours + ':' + minutes + ':' + remainingSeconds;
    },
    getDoubleContent: function(list) {
        return list.map(function(item, i){
            let liStr = "<li class='active xy28_ball num_"+item+"'>"+item+"</li>";
            if( i == 3 )
                liStr = "<!----> <span class='icon icon_equal'></span> <!----><!----><!---->"+ liStr;
            return liStr;
        }).join('');
    }
  }

}
</script>
<style scoped>
.hide { display: none;}
</style>

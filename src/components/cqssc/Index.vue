<template>
    <div>
      <div class="so-con">
        <!--left siderbar  -->

        <!--用户导航 so-left -->
        <UserNavigation el=".so-menu" ref="navone"/>
        
        <!--right menu  
            属性
                el 要绑定到哪个节点上，即点击哪个节点触发
            事件
                play 当用户点击完法说明时触发
        -->
        <UserMenu el=".so-top-zoushi" @play="$refs.playDialog.open()" :payoff="balanceData.payoff" />

        <div class="so-index" :class="lotteryID==116?'bet_mms':''">
            <div class="so-top-all">
                <MenuBar :moduleName="lotteryName" :balance="balancePublic" />
                <div class="so-in-main">
                    <div>
                        <div class="so-main-top">
                            <HistoryTerm :lotteryID="lotteryID" :previous_pcode="previous_pcode" />
                            <div class="so-m-t-right" v-show="ishwowpriod">
                                <div class="last-open-num">
                                    <ul>
                                        <li :class="'active round_ball num_' + item" v-for="item in winNumber.split(',')">{{item}}</li>
                                    </ul>
                                </div>
                                <div class="last-open-dou">
                                    <ul>
                                        <li>{{lastTermStatic.total}}</li>
                                        <li>{{lastTermStatic.sizer}}</li>
                                        <li>{{lastTermStatic.doubler}}</li>
                                        <li>{{lastTermStatic.longer}}</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <CountdownTimer v-show="lotteryID != 116" ref="countdownTimer"
                                        @countdownOver="playLottery"
                                        @entertainCountdownOver="entertain"
                                        @entertainCountdownBreak="entertainBreak"
                                        @spanArrived="lotteryDataFetch"
                                        @visibility="timerBegin"
                                        :now_pcode="now_pcode" :lotteryID="lotteryID"
                                        :start="sys_time" :end="now_time" :overend="nowover_time"/>
                    </div>
                </div>
            </div>
            <div class="so-in-con">
                <div class="so-con-left" id="nav-wrapper">
                    <ul>
                        <li :class="(index == 0 && 'active')"  v-for="(kind,index) in kinds" @click="switchTab">
                           <!-- <a :href="'#so-item'+index">{{kind}}</a>-->
                            <a>{{kind}}</a>
                            <span v-if="lotteryID == 116" class="left-menu_bet-count" v-show="betSubCount[index]">{{betSubCount[index]}}</span>
                        </li>
                    </ul>
                </div>
                <div class="body_bg"></div>
                <div  id="content-wrapper">
                     <div class="so-con-right  " >
                               <div id="scroller" > <!-- style="min-height: 180%"  -->
                                   <!--<div>-->
                                    <!--以下为盘面不同样式，根据ID区分-->
                                    <div id="so-item0" class="content-right active item_one" >
                                        <!--总和&龙虎-->
                                        <ul>
                                            <li class="select-li" v-for="item in doubleSideList.filter((temp)=>{return temp.cid==21600})">
                                                <div class="bet_panel">
                                                    <h2>
                                                        {{item.name}}
                                                    </h2>
                                                    <div class="bet_box">
                                                        <p :data-id="itemChild.cid" :class="([21605,21606,21607].includes(itemChild.cid) && 'so-con-span-short')" v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                                            <span>{{itemChild.name}}</span>
                                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li :class="'select-li' + ({'0':' first_ball', '1':' sec_ball'}[index] || ' sec_ball')" v-for="(item,index) in doubleSideList.filter((temp)=>{return temp.cid<21600})">
                                                <div class="bet_panel">
                                                    <h2>
                                                        {{item.name}}
                                                    </h2>
                                                    <div class="bet_box">
                                                        <p :data-id="itemChild.cid" v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                                            <span>{{itemChild.name}}</span>
                                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="so-item1"class="content-right" style="display:none;">
                                        <ul>
                                            <li class="select-li" v-for="item in oneToFiveList">
                                                <div class="bet_panel">
                                                    <h2>
                                                        {{item.name}}
                                                    </h2>
                                                    <div class="bet_ball">
                                                        <p :data-id="itemChild.cid" v-for="(itemChild,index) in item.childrens">
                                                            <span :class="'round_ball num_' + itemChild.name" @click="OFSelect($event, itemChild, item)">{{itemChild.name}}</span>
                                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                    <div id="so-item2" class="content-right" style="display:none;">
                                        <ul>
                                            <li class="select-li" v-for="item in frontCenterBackList">
                                                <div class="bet_panel">
                                                    <h2>
                                                        {{item.name}}
                                                    </h2>
                                                    <div class="bet_box">
                                                        <p :data-id="itemChild.cid" v-for="itemChild in item.childrens" @click="betSelect($event, itemChild, item)">
                                                            <span>{{itemChild.name}}</span>
                                                            <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                   <!--</div>-->
                            </div>
                        </div>

                </div>
                <div class="so-clear"></div>
            </div>
        </div>
        <!--
        下注组件
            属性
                :lotteryID="lotteryID"  彩种id
                :betSelectedList="betSelectedList"  用户选中的赌注
                :parentRefs="$refs"   当前页面的引用
                :balance="balanceData.balance"  帐单值
                :now_pcode="now_pcode"   期次
                :next_pcode="next_pcode"   下期期次
                :now_day="now_day"    日期
            事件
                @betSuccess="resetAction" 
        -->
        <Bet :lotteryID="lotteryID" @betSuccess="resetAction('1')" ref="bet"
            :betSelectedList="betSelectedList"
            :parentRefs="$refs"
            :balance="balancePublic" 
            :now_pcode="now_pcode" :next_pcode="next_pcode" :now_day="now_day" 
             @refreshBalance = 'refreshBalance'
             @lotteryDataFetch = 'lotteryDataFetch'
            :pk10_now_pcode="pk10_now_pcode"
        />

        <!--封盘底部遮挡-->
        <div v-if="entertainStatus" class="so-fengpan">
            <a>已封盘</a>
        </div>
         <!-- 未开盘 -->
          <div v-if="notopen" class="so-fengpan">
              <a>未开盘</a>
          </div>
          <!-- 确认对话框API
              text  对话框提示内容
          -->
        <InfoDialog ref="infoDialog" text="请您继续投注" />

        <!--自动关闭（闪屏）对话框API
            属性
                text  对话框提示内容
                type  对话框类型，可以是 static/frist/images/pop/ 目录下任意图片，像title_quantity、title_tip
            方法
                open(text, type)
        -->
        <AutoCloseDialog ref="autoCloseDialog" text="您的余额不足" type="" />

        <BetSuccessfulDialog ref="betSuccessfulDialog" />

      </div>

        <!--玩法说明对话框
            方法：
                open 打开对话框
                close 关闭对话框
        -->
        <PlayDialog ref="playDialog" :moduleName="lotteryName" :moduleplay="moduleplay" :lotteryId="lotteryID" />
    </div>
  
</template>

<script>
// import $ from "jquery";

import UserNavigation from '@/components/publicTemplate/UserNavigation'
import UserMenu from '@/components/publicTemplate/UserMenu'
import InfoDialog from '@/components/publicTemplate/InfoDialog'
import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import BetSuccessfulDialog from '@/components/publicTemplate/BetSuccessfulDialog'
import CountdownTimer from '@/components/publicTemplate/CountdownTimer'
import HistoryTerm from '@/components/publicTemplate/HistoryTerm'
import MenuBar from '@/components/publicTemplate/MenuBar'
import Bet from '@/components/publicTemplate/Bet'
import PlayDialog from '@/components/cqssc/PlayDialog'
import Mixin from '@/Mixin'

export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
    HistoryTerm,
    MenuBar, 
    CountdownTimer,
    BetSuccessfulDialog,
    Bet,
    UserNavigation,
    UserMenu,
    InfoDialog, 
    AutoCloseDialog,
    PlayDialog
  }, 
  props:['moduleName', 'moduleLotteryID','moduleplay'],
  provide: function () {
    return {
      lotteryDataFetch: this.lotteryDataFetch
    }
  },
  data:function () {
    return {
        now_time:'',  // 当前期数销售截止时间
        nowover_time:'',  // 当前期数封盘时间
        next_pcode:'',  // 下一期数
        now_pcode:'',  // 当前期数
        pk10_now_pcode:'',  // 当前期数
        previous_pcode:'',//上一期期数
        winNumber:'',    //上期开奖号
        lastTermStatic:'',  //上期开奖数据统计
        sys_time :'',  // 当前系统时间
        now_day:'',  // 当前日期
        balanceData:{},
        entertainStatus:false,
        notopen:false,
        ishwowpriod:false,
        betSelectedList:[],   //用户选中的注数
        // playTreeList:[], //玩法树
        lotteryID: 2 ,
        allLottery:{} ,
        gameHref:{} ,
        kinds:['两面', '1-5球', '前中后'],
        balancePublic:'',
        lotteryName:'重庆时时彩',
        betSubCount: [0, 0, 0]
    }
  },
  created:function(){

      if (this.moduleLotteryID) {
          this.lotteryID = this.moduleLotteryID;
      }
      this.getMemberBalance(this.lotteryID).then(()=>{
        this.loadPlayTree(this.lotteryID).catch(function () {
             console.log("Promise Rejected in method of create 2");
        });  // 玩法树，彩种id 为2

    }).catch(function () {
        console.log("Promise Rejected in method of create 1");
    });
    this.lotteryName = this.getLotteryNameById(this.lotteryID);

  },
  mounted:function() {
    this.deleteCookie('scrollF');
    var _self = this ;
    var lotteryid = this.lotteryID ; // 彩种id
    var lotteryname = this.lotteryName; // 彩种名称
    this.setCookie('lt_lotteryid',lotteryid) ; // 彩种id
    this.setCookie('lottery_name',lotteryname) ; // 彩种名称
    this.allLottery = this.$refs.navone.getLotterys() ;
    this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值
    this.initViewHeight() ;
      this.refreshBalance();
    setTimeout(() => {
        this.timerBegin();

    }, 500) ;
      _self.setScroll() ; // 下拉回弹
  },
  computed:{
    doubleSideList:function(){
        return this.getListByParentID(21000); 
    },
    oneToFiveList:function(){
        return this.getListByParentID(22000); 
    },
    frontCenterBackList:function(){
        return this.getListByParentID(23000);
    }
  },
  watch:{
    
  },

  methods:{
    refreshBalance:function(newBalance){
        this.balancePublic = newBalance
        this.getMemberBalance(this.lotteryID)
    },     
    switchTab:function(e){
        var _self = this ;
        const $src = $(e.currentTarget);
        const index = $src.index();
        const $tabs = $('.so-con-right .content-right');
        $tabs.hide();
        $tabs.eq(index).show();
        $src.addClass('active').siblings().removeClass('active') ;

        var conth = $tabs.eq(index).height();
        _self.setClickHeight(conth) ;
        _self.conScroll.refresh() ; _self.conScroll.scrollTo(0, 300) ;
    },
    getListByParentID:function(parentID){
        return this.playTreeList.filter((item,i)=>{
            return item.parentId == parentID;
        });
    },
    //开奖倒计时结束后处理
    playLottery:function(){
        this.timerBegin();
    },
    //封盘倒计时结束后处理
    entertain:function(){
        this.$refs.infoDialog.open('请至下期继续投注', '本期投注已结束')
        this.entertainStatus = true;
        this.resetAction();
    },
      entertainBreak: function () {
          this.entertainStatus = true;
          this.resetAction();
      },

    //获取开奖更据 needIn 是否需要再次调用倒计时定时器
    lotteryDataFetch:function(needIn){
        const that = this;
        return new Promise((resolve)=>{
            
            that.getSystemTime().then(sys_time=>{
                that.sys_time = that.formatTimeUnlix(sys_time) ;
                that.priodDataNewly(that.lotteryID, sys_time).then(res=>{
                    that.balancePublic = res.msg;
                    that.setCookie("balancePublic",that.balancePublic)
                    that.ishwowpriod = true ;

                    if(that.lotteryID != '116') {
                        that.next_pcode = res.data[0].pcode;  // 下期期数

                        var firstpcode = res.data[0].pcode.toString().substr(8, 11) ;
                        let code = res.data[2].winNumber;
                        var OpenFlag1 = ( sys_time > res.data[1].endTime )&&(sys_time < res.data[0].startTime)
                        var OpenFlag = (sys_time > res.data[0].startTime&&sys_time < res.data[0].endTime)
                        if(firstpcode =='024' && that.lotteryID == '2'){  // 重庆时时彩 白天第一期
                            if(res.data[1].endTime - sys_time >0){ // 凌晨最后一期未结束
                                if(res.data[1].endTime < sys_time ) { // 如果当期结束时间小于系统时间
                                    that.now_time = that.formatTimeUnlix(res.data[0].endTime);  // 当前期数时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);  // 当前期封盘时间
                                    that.now_pcode = res.data[0].pcode;  // 当前期数
                                }else{
                                    that.now_time = that.formatTimeUnlix(res.data[1].endTime);  // 当前期数时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);  // 当前期封盘时间
                                    that.now_pcode = res.data[1].pcode;  // 当前期数
                                }
                                that.winNumber = res.data[2].winNumber;
                                that.lastTermStatic = res.data[2].doubleData;    //上期开奖统计
                                that.previous_pcode = res.data[2].pcode;  // 上期期数
                            }else{
                                if( res.data[0].startTime - sys_time >0){  // 未开盘状态
                                    that.notopen = true ;
                                }else{
                                    that.notopen = false ;
                                }
                                that.now_pcode = res.data[0].pcode;  // 当前期数
                                that.now_time = that.formatTimeUnlix(res.data[0].endTime);   // 当前期数时间
                                that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);   // 当前期封盘时间
                                that.winNumber = res.data[1].winNumber;
                                that.lastTermStatic = res.data[1].doubleData;    //上期开奖统计
                                that.previous_pcode = res.data[1].pcode;  // 上期期数
                            }

                        }else if(firstpcode =='001' && that.lotteryID != '2'){ // 天津，新疆 时时彩 白天第一期
                            if(res.data[1].endTime - sys_time >0) { // 凌晨最后一期未结束
                                if(res.data[1].endTime < sys_time ) { // 如果当期结束时间小于系统时间
                                    that.now_time = that.formatTimeUnlix(res.data[0].endTime);  // 当前期数时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);   // 当前期封盘时间
                                    that.now_pcode = res.data[0].pcode;  // 当前期数
                                }else{
                                    that.now_time = that.formatTimeUnlix(res.data[1].endTime);  // 当前期数时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);   // 当前期封盘时间
                                    that.now_pcode = res.data[1].pcode;  // 当前期数
                                }

                                that.winNumber = res.data[2].winNumber;
                                that.lastTermStatic = res.data[2].doubleData;    //上期开奖统计
                                that.previous_pcode = res.data[2].pcode;  // 上期期数
                            }else{
                                if( res.data[0].startTime - sys_time >0){  // 未开盘状态
                                    that.notopen = true ;
                                }else{
                                    that.notopen = false ;
                                }
                                that.now_pcode = res.data[0].pcode;  // 当前期数
                                that.now_time = that.formatTimeUnlix(res.data[0].endTime);   // 当前期数时间
                                that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);   // 当前期封盘时间
                                that.winNumber = res.data[1].winNumber;
                                that.lastTermStatic = res.data[1].doubleData;    //上期开奖统计
                                that.previous_pcode = res.data[1].pcode;  // 上期期数
                            }

                        }else {   
                                
                            if(res.data[1].endTime < sys_time ) { // 如果当期结束时间小于系统时间
                                that.now_time = that.formatTimeUnlix(res.data[0].endTime); // 当前期数时间
                                that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);  // 当前期封盘时间
                                that.now_pcode = res.data[0].pcode;  // 当前期数
                                that.pk10_now_pcode = res.data[0].pcode;  // 当前期数
                                if( that.lotteryID == '26' || that.lotteryID == '28' || that.lotteryID == '32' ){
                                    that.now_pcode = res.data[0].issueAlias;  // 当前期数
                                }
                                that.winNumber = res.data[1].winNumber;
                                that.lastTermStatic = res.data[1].doubleData;    //上期开奖统计
                                that.previous_pcode = res.data[1].pcode;  // 上期期数
                                if( that.lotteryID == '26' || that.lotteryID == '28' || that.lotteryID == '32' ){
                                    that.previous_pcode = res.data[1].issueAlias;  // 上期期数
                                }
                            }else{
                                that.now_time = that.formatTimeUnlix(res.data[1].endTime); // 当前期数时间
                                that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);  // 当前期封盘时间
                                that.now_pcode = res.data[1].pcode;  // 当前期数
                                that.pk10_now_pcode = res.data[1].pcode;  // 当前期数
                                if( that.lotteryID == '26' || that.lotteryID == '28' || that.lotteryID == '32' ){
                                    that.now_pcode = res.data[1].issueAlias;  // 当前期数
                                }
                                that.winNumber = res.data[2].winNumber;
                                that.lastTermStatic = res.data[2].doubleData;    //上期开奖统计
                                that.previous_pcode = res.data[2].pcode;  // 上期期数
                                if( that.lotteryID == '26' || that.lotteryID == '28' || that.lotteryID == '32' ){
                                    that.previous_pcode = res.data[2].issueAlias;  // 上期期数
                                }
                            }
                                
                        }

                        if( that.lotteryID == '2'&& OpenFlag1&&firstpcode =='001'){

                            that.notopen = true ;
                            that.now_time = that.formatTimeUnlix(res.data[0].endTime);  // 当前期数时间
                            that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);  // 当前期封盘时间
                            that.now_pcode = res.data[0].pcode;  // 当前期数

                            that.winNumber = res.data[1].winNumber;
                            that.lastTermStatic = res.data[1].doubleData;    //上期开奖统计
                            that.previous_pcode = res.data[1].pcode;  // 上期期数
                        }
                        if( that.lotteryID == '2'&& OpenFlag&&firstpcode =='001'){
                            that.notopen = false ;
                            that.now_time = that.formatTimeUnlix(res.data[0].endTime);  // 当前期数时间
                            that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);  // 当前期封盘时间
                            that.now_pcode = res.data[0].pcode;  // 当前期数
                            that.winNumber = res.data[1].winNumber;
                            that.lastTermStatic = res.data[1].doubleData;    //上期开奖统计
                            that.previous_pcode = res.data[1].pcode;  // 上期期数
                        }

                        code = that.winNumber
                        // console.log(that.winNumber,'code-boss')

                        if (!code) {
                            let hasFind = false
                            _.forEach(res.data, (item, index) => {
                                if (_.size(item.winNumber) > 0 && index >= 2) {
                                    that.winNumber = item.winNumber
                                    that.previous_pcode = item.pcode
                                    if( that.lotteryID == '26' || that.lotteryID == '28' || that.lotteryID == '32' ){
                                        that.previous_pcode = item.issueAlias
                                    }
                                    that.lastTermStatic = item.doubleData;
                                    hasFind = true
                                    return false
                                }
                            })
                            if (!hasFind) {
                                that.winNumber = code
                            }
                        }             

                        if(res.data[1].status >1){ // 异常情况，如提前开盘 2
                            that.entertainStatus = true;
                        }
                        // 当天日期
                        that.now_day = ( res.data[1].pcode).toString().substr(0, 8);
                        if(that.lotteryID == '116') {
                            that.now_day = (res.data[1].pdate).toString();
                        }
                        if(needIn =='1'){ // 倒计时结束后
                            that.$refs.countdownTimer && that.$refs.countdownTimer.timerInit(that.sys_time, that.now_time, that.nowover_time);  // 重新倒计时
                        }
                    } else {
                        //重庆秒秒彩
                        that.winNumber = '9,9,9,9,9';
                        that.lastTermStatic = {
                            total: '45',
                            sizer: '大',
                            doubler: '单',
                            longer: '和'
                        }
                        if(res.data) {
                            let lastBet = res.data[0];
                            that.winNumber = lastBet.winNumber;
                            that.lastTermStatic = lastBet.doubleData;
                        }
                    }
                    resolve();
                }).catch(function () {
                    console.log("Promise Rejected in method of timeBegin");
                });
            }); 
        })
        
    },

    timerBegin:function(){
        var that = this;
        that.lotteryDataFetch('1') ;
    /*    this.lotteryDataFetch().then(()=>{
                that.$refs.countdownTimer && that.$refs.countdownTimer.timerInit(that.sys_time, that.now_time, that.nowover_time);  // 重新倒计时
        })*/
        if (that.$refs.countdownTimer.wrongFlag) {
            that.entertainStatus = true;
        } else {
            that.entertainStatus = false;
        }

        that.notopen = false;

    },
    resetAction:function(success){
        this.betSelectedList = [];
        $(".so-con-right p").removeClass('active');
        // if(success != '1'){
        //     this.$refs.bet.betAmount = '' ;
        // }
        this.getMemberBalance(this.lotteryID) ; // 更新余额
        this.$refs.bet.showList = false ; // 关闭下注弹窗
        this.betSubCount = [0, 0, 0];

    },
    //当用户选择球时，保存相应数据
    betSelect:function(e, item, parentItem){
          if (this.entertainStatus || this.notopen){
              return false;
          }
          var $src = $(e.currentTarget);
          if ($src.prop('class').indexOf('active') < 0){
              $src.addClass('active');
              item.parentItem = parentItem;
              this.betSelectedList.push(item);
          } else{
              $src.removeClass('active');
              this.betSelectedList = this.betSelectedList.filter((selected)=>{ return selected.cid != item.cid; });
          }
          this.betSubCount[0] = $('#so-item0').find('.active').length;
          this.betSubCount[2] = $('#so-item2').find('.active').length;
      },
    //用户选择1-5球时，保存相应数据
    OFSelect:function(e, item, parentItem){
          if (this.entertainStatus || this.notopen){
              return false;
          }
          var $src = $(e.currentTarget);
          if ($src.parent('p').prop('class').indexOf('active') < 0){
              $src.parent('p').addClass('active');
              item.parentItem = parentItem;
              this.betSelectedList.push(item);
          }else{
              $src.parent('p').removeClass('active');
              this.betSelectedList = this.betSelectedList.filter((selected)=>{ return selected.cid != item.cid; });
          }
          this.betSubCount[1] = $('#so-item1').find('.active').length;
      }


  }
}
</script>

<style scoped>

</style>

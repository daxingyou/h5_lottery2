<template>
    <div class="so-con" id="xy28">
        <!--left siderbar  -->
        <!--用户导航 so-left -->
        <UserNavigation el=".so-menu" ref="navone"/>
        <!--right menu  -->
        <UserMenu el=".so-top-zoushi" @play="$refs.playDialog.open()" :payoff="balanceData.payoff" />
        
        <div class="so-index">
            <div class="so-top-all">
                <MenuBar :moduleName="moduleName || '幸运28'" :balance="balancePublic" />

                <div class="so-in-main">
                    <div>
                        <div class="so-main-top">
                            <HistoryTerm :previous_pcode="previous_pcode" />

                            <div class="so-m-t-right">
                                <div class="last-open-num">
                                    <ul class="xy28_top_number">
                                        <li :class="'active xy28_ball num_' + item" v-if="index < 3" v-for="(item, index) in winNumber.split(',')">{{item}}</li>
                                        <li><span class="icon icon_equal"></span></li>
                                        <li :class="'active xy28_ball num_' + item" v-if="index == 3" v-for="(item, index) in winNumber.split(',')">{{item}}</li>
                                    </ul>
                                </div>
                                <div class="last-open-k3dou last-open-dou">
                                    <ul class="xy28_top_detail ">
                                        <li v-for="(item, index) in lastTermStatic">{{item}}</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <CountdownTimer ref="countdownTimer"
                            @countdownOver="playLottery"
                            @entertainCountdownOver="entertain"
                            @entertainCountdownBreak="entertainBreak"
                            @spanArrived="lotteryDataFetch"
                            @visibility="timerBegin"
                            :now_pcode="nowIssueAliasPcode" :lotteryID="lotteryID"
                            :start="sys_time" :end="now_time" :overend="nowover_time" />
                    </div>
                </div>
            </div>
            <div class="so-in-con">
                <div class="so-con-left" id="nav-wrapper">
                    <ul>
                        <li :class="[showMethodClass(index, kind), index == 0 && 'active']" v-for="(kind,index) in kinds" @click="switchTab">
                            <a >{{kind}}</a>
                        </li>
                    </ul>
                </div>
                <div class="body_bg"  ></div>
                <div  id="content-wrapper">
                     <div class="so-con-right ">
                      <div id="scroller"  class="scroller" >
                        <!--以下为盘面不同样式，根据ID+class区分-->
                        <!-- xy28 混合 -->
                        <div id="xy28-item0" class="active xy28_item item_one">
                            <ul>
                                <li class="select-li" v-for="item in mixedList">
                                    <div class="bet_panel">
                                        <h2>
                                            {{item.name}}
                                        </h2>
                                        <div class="bet_box num_box">
                                            <p v-for="(itemChild,index) in item.childrens" @click="betSelect($event, itemChild, item)">
                                                <span>{{itemChild.name}}</span>
                                                <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!-- xy28 特码合值 -->
                        <div id="xy28-item1" class="xy28_item" style="display:none;">
                            <ul>
                                <li class="select-li" v-for="item in spNumberList">
                                    <div class="bet_panel">
                                        <h2>
                                            {{item.name}}
                                        </h2>
                                        <div class="bet_box num_box">
                                            <p class="ball_5x" v-for="(itemChild,index) in item.childrens" @click="betSelect($event, itemChild, item)">
                                                <span :class="'xy28_ball num_' + (index)">{{itemChild.name}}</span>
                                                <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
                <div class="so-clear"></div>
            </div>
        </div>
        <!--封盘时给foot加上class:close-->
        <!--<div class="so-foot close">-->


        <!--
        下注组件
            属性
                :lotteryID="lotteryID"  彩种id
                :betSelectedList="betSelectedList"  用户选中的赌注
                :parentRefs="$refs"   当前页面的引用
                :isCombine="isCombine"  是否组合玩法
                :combineCount="combineCount"    组合玩法对应的注数
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
             @refreshBalance = 'refreshBalance'            
            :balance="balancePublic" :now_pcode="now_pcode" :next_pcode="next_pcode" :now_day="now_day" />

        <!--封盘底部遮挡-->
        <div v-if="entertainStatus" class="so-fengpan">
            <a>已封盘</a>
        </div>
        <!--未开盘底部遮挡-->
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

        <!--玩法说明-->
        <PlayDialog ref="playDialog" :moduleName="lotteryName " :moduleplay="moduleplay" />
  </div>


</template>



<script>
    // import $ from "jquery";
    import UserNavigation from '@/components/publicTemplate/UserNavigation'
    import UserMenu from '@/components/publicTemplate/UserMenu'
    import MenuBar from '@/components/publicTemplate/MenuBar'

    import InfoDialog from '@/components/publicTemplate/InfoDialog'
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
    import BetSuccessfulDialog from '@/components/publicTemplate/BetSuccessfulDialog'
    import CountdownTimer from '@/components/publicTemplate/CountdownTimer'
    import HistoryTerm from '@/components/publicTemplate/HistoryTerm'
    import BallItem from '@/components/publicTemplate/BallItem'

    import Bet from '@/components/publicTemplate/Bet'
    import PlayDialog from '@/components/xy28/PlayDialog'
    import Mixin from '@/Mixin'
    import store from './../../_vuex/store'
    

    export default {
      name: 'Xy28Index',
      mixins:[Mixin],
      components: {
        HistoryTerm,
        MenuBar, 
        BallItem,
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
      data: function() {
        return {
            now_pcode:'',  // 当前期数
            pk10_now_pcode : '',
            previous_pcode:'',//上一期期数
            nowIssueAliasPcode: '',
            winNumber:'',    //上期开奖号
            lastTermStatic:'',  //上期开奖数据统计
            entertainStatus:false,
            notopen:false,
            ishwowpriod : false ,
            now_time:'',  // 当前期数销售截止时间
            nowover_time:'',  // 当前期数封盘时间
            next_pcode:'',  // 下一期数销售截止时间
            sys_time:'',  // 当前系统时间
            now_day:'',  // 当前日期
            balanceData:{},
            balancePublic:'',

            betSelectedList:[],   //用户选中的注数
            playTreeList:[], //玩法树
            lotteryID:30,
            allLottery:{} ,
            gameHref:{} ,
            kinds:['混合', '特码和值'],
            lotteryName: '幸运28'

        }
      },
      created:function(){
        if (this.moduleLotteryID) {
            this.lotteryID = this.moduleLotteryID;
        }
        this.getMemberBalance(this.lotteryID).then(()=>{

            this.loadPlayTree(this.lotteryID);  // 玩法树，彩种id 为2
        });
        this.lotteryName = this.getLotteryNameById(this.lotteryID);
      },
        mounted:function() {
            var lotteryid = this.lotteryID ; // 彩种id
            var lotteryname = this.lotteryName ; // 彩种名称
            this.setCookie('lt_lotteryid',lotteryid) ; // 彩种id
            this.setCookie('lottery_name',lotteryname) ; // 彩种名称
            this.allLottery = this.$refs.navone.getLotterys() ;
            this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值
            this.refreshBalance();
            setTimeout(() => {
                this.timerBegin();
            }, 500) ;
            this.initViewHeight();
            // $('body').attr('id', 'k3')
            this.setScroll() // 下拉回弹
           
          },
          computed:{
            mixedList:function(){
                return this.getListByParentID(121000); 
            },
            spNumberList:function(){
                return this.getListByParentID(122000); 
            }
          },
          methods:{            
            refreshBalance:function(newBalance){
                this.balancePublic = newBalance
                this.getMemberBalance(this.lotteryID)
            },
            betCountStat:function(xslen, xlen){
                return  xslen*((xslen-1)/xlen);
            },
            
            switchTab:function(e){
                var _self = this ;
                const $src = $(e.currentTarget);
                const index = $src.index();
                const $tabs = $('.so-con-right .xy28_item');
                $tabs.hide();
                $tabs.eq(index).show();
                $src.addClass('active').siblings().removeClass('active');
                var conth = $tabs.eq(index).height() ;
                _self.setClickHeight(conth) ;
                //  _self.setScroll() ;
                _self.conScroll.refresh() ; _self.conScroll.scrollTo(0, 300)  ;
            },
            getListByParentID:function(parentID){
                return this.playTreeList.filter((item,i)=>{
                    return item.parentId == parentID;
                });
            },
            //开奖倒计时结束后处理
            playLottery:function(){
               // this.$refs.infoDialog.open('请至下期继续投注', 'title_end') ;
                this.timerBegin();
            },
            //封盘倒计时结束后处理
            entertain:function(){
                // this.$refs.infoDialog.open('请至下期继续投注', 'title_end') ;
                this.$refs.infoDialog.open('请至下期继续投注', '本期投注已结束');
                this.entertainStatus = true;
                this.resetAction();
            },

            entertainBreak: function () {
                // this.$refs.infoDialog.open('请至下期继续投注', 'title_end')
                // this.$refs.infoDialog.open('请至下期继续投注', '本期投注已结束')
                this.entertainStatus = true;
                this.resetAction();
            },

            lotteryDataFetch:function(needIn){
                const that = this;
                return new Promise((resolve)=>{
                    that.getSystemTime().then(sys_time=>{
                        // sys_time = '2017-10-30 19:39:10';    //5秒后封盘所需时间，然后5秒后开奖
                        // sys_time = '2017-10-30 19:39:16';   //封盘状态所需时间，5秒后开奖 
                        that.sys_time = that.formatTimeUnlix(sys_time) ;
                        that.priodDataNewly(that.lotteryID, sys_time).then(res=>{
                            // 将余额放入cookie
                            that.balancePublic = res.msg;
                            that.setCookie("balancePublic",res.msg)

                            that.ishwowpriod = true ;
                            that.next_pcode = res.data[0].pcode;  // 下期期数
                            let code = res.data[2].winNumber;
                            var firstpcode = res.data[0].pcode.toString().substr(8, 11) ;
                            if(firstpcode =='001'){  //  白天第一期
                                if(res.data[1].endTime - sys_time >0) { // 凌晨最后一期未结束

                                    if(res.data[1].endTime < sys_time ) { // 如果当期结束时间小于系统时间
                                        that.now_time = that.formatTimeUnlix(res.data[0].endTime);   // 当前期数时间
                                        that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);  // 当前期封盘时间
                                        that.now_pcode = res.data[0].pcode;  // 当前期数
                                        that.nowIssueAliasPcode = res.data[0].issueAlias;
                                    }else{
                                        that.now_time = that.formatTimeUnlix(res.data[1].endTime);   // 当前期数时间
                                        that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);  // 当前期封盘时间
                                        that.now_pcode = res.data[1].pcode;  // 当前期数
                                        that.nowIssueAliasPcode = res.data[1].issueAlias;
                                    }

                                    that.winNumber = res.data[2].winNumber;
                                    that.lastTermStatic = res.data[2].doubleData;    //上期开奖统计
                                    that.previous_pcode = res.data[2].pcode;  // 上期期数
                                }else {
                                    if( res.data[0].startTime - sys_time >0){  // 未开盘状态
                                        that.notopen = true ;
                                    }else{
                                        that.notopen = false ;
                                    }
                                    that.now_time = that.formatTimeUnlix(res.data[0].endTime);  // 当前期数时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime); // 当前期封盘时间

                                    that.now_pcode = res.data[0].pcode;  // 当前期数
                                    that.nowIssueAliasPcode = res.data[0].issueAlias;
                                    that.winNumber = res.data[1].winNumber;
                                    that.lastTermStatic = res.data[1].doubleData;    //上期开奖统计
                                    that.previous_pcode = res.data[1].issueAlias;  // 上期期数
                                }

                            }else{  // 普通时间

                                if(res.data[1].endTime < sys_time ) { // 如果当期结束时间小于系统时间
                                    that.now_time = that.formatTimeUnlix(res.data[0].endTime);   // 当前期数时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);   // 当前期封盘时间
                                    that.now_pcode = res.data[0].pcode;  // 当前期数
                                    that.nowIssueAliasPcode = res.data[0].issueAlias;
                                }else{
                                    that.now_time = that.formatTimeUnlix(res.data[1].endTime);   // 当前期数时间
                                    that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);   // 当前期封盘时间
                                    that.now_pcode = res.data[1].pcode;  // 当前期数
                                    that.nowIssueAliasPcode = res.data[1].issueAlias;
                                }

                                //code 上期开奖号码
                                if (!code) {
                                    // code = '-,-,-,-,-';
                                    that.winNumber = res.data[3].winNumber;
                                    that.lastTermStatic = res.data[3].doubleData;    //上期开奖统计
                                    that.previous_pcode = res.data[3].issueAlias;  // 上期期数
                                }else{
                                    that.winNumber = res.data[2].winNumber;
                                    that.lastTermStatic = res.data[2].doubleData;    //上期开奖统计
                                    that.previous_pcode = res.data[2].issueAlias;  // 上期期数
                                }
                            }
                              code = that.winNumber
                             if (!code) {
                                let hasFind = false
                                _.forEach(res.data, (item, index) => {
                                    if (_.size(item.winNumber) > 0 && index >= 2) {
                                        that.winNumber = item.winNumber
                                        that.lastTermStatic = item.doubleData;    //上期开奖统计
                                        that.previous_pcode = item.issueAlias;
                                        hasFind = true
                                        return false
                                    }
                                })
                                if (!hasFind) {
                                    that.winNumber = code
                                }
                            }
                            else {
                                that.winNumber = code
                            }
                            
                            if(res.data[1].status >1){ // 异常情况，如提前开盘 2
                                that.entertainStatus = true;
                            }
                            if(needIn =='1'){ // 倒计时结束后
                                that.$refs.countdownTimer && that.$refs.countdownTimer.timerInit(that.sys_time, that.now_time, that.nowover_time);  // 重新倒计时
                            }
                            // 当天日期
                            that.now_day = ( res.data[1].pcode).toString().substr(0, 8);
                            that.lastTermStatic = [
                                that.lastTermStatic.colorWave, 
                                that.lastTermStatic.doubler, 
                                that.lastTermStatic.sizer, 
                                that.lastTermStatic.verySizer, 
                                ]
                            that.lastTermStatic = that.lastTermStatic.filter(function(item) { 
                                console.log(item);
                                return item != '-' 
                                });
                            resolve();
                        });
                    }); 
                })
                
            },
            timerBegin:function(){
                var that = this;
                that.lotteryDataFetch('1')
               /* this.lotteryDataFetch().then(()=>{
                    that.$refs.countdownTimer && that.$refs.countdownTimer.timerInit(that.sys_time, that.now_time, that.nowover_time);
                })*/
                // that.entertainStatus = false;
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
            },
            //当用户选择球时（普通），保存相应数据
            betSelect:function(e, item, parentItem){
                if (this.entertainStatus || this.notopen){
                    return false;
                }
                var $src = $(e.currentTarget);
                if ($src.prop('class').indexOf('active') < 0){
                    $src.addClass('active');
                    item.parentItem = parentItem;
                    this.betSelectedList.push(item);
                }else{
                    $src.removeClass('active');
                    this.betSelectedList = this.betSelectedList.filter((selected)=>{ return selected.cid != item.cid; });
                }
            },
            showMethodClass(index, kind) {
                let classStr = ""

                if (this.currentMethodIndex == index) {
                    classStr += " active"
                }

                if (kind.length >= 4) {
                    classStr += " methodNavS"
                }

                return classStr
            }
          }

    }
</script>
<style scoped>
    #nav-wrapper ul > li.methodNavS a {
        font-size: .3rem;
    }

</style>

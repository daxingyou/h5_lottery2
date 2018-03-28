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
                                        <li><span class="xy28_ball num_1">1</span></li>
                                        <li><span class="xy28_ball num_2">2</span></li>
                                        <li><span class="xy28_ball num_1">1</span></li>
                                        <li><span class="icon icon_equal"></span></li>
                                        <li><span class="xy28_ball active num_4">4</span></li>
                                    </ul>
                                </div>
                                <div class="last-open-k3dou last-open-dou">
                                    <ul class="xy28_top_detail ">
                                        <li>小</li>
                                        <li>双</li>
                                        <li>极小</li>
                                        <li>绿波</li>
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
                            :now_pcode="now_pcode" :lotteryID="lotteryID"
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
                                <li class="select-li">
                                    <div class="bet_panel">
                                        <h2>
                                            混合
                                        </h2>
                                        <div class="bet_box num_box">
                                            <p>
                                                <span>大</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                            <p>
                                                <span>小</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                            <p class="active">
                                                <span>单</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                            <p>
                                                <span>双</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                            <p>
                                                <span>极大</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                            <p>
                                                <span>极小</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                            <p>
                                                <span>豹子</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                            <p>
                                                <span>红波</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                            <p>
                                                <span>绿波</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                            <p>
                                                <span>蓝波</span>
                                                <span class="bet-times">1.995</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!-- xy28 特码合值 -->
                        <div id="xy28-item1" class="xy28_item" style="display:none;">
                            <ul>
                                <li class="select-li">
                                    <div class="bet_panel">
                                        <h2>
                                            特码合值
                                        </h2>
                                        <div class="bet_box num_box">
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_0">0</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_1">1</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_2">2</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x active">
                                                <span class="xy28_ball num_3">3</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_4">4</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x active">
                                                <span class="xy28_ball num_5">5</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_6">6</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x active">
                                                <span class="xy28_ball num_7">7</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_8">8</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_9">9</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_10">10</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_11">11</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_12">12</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x active">
                                                <span class="xy28_ball num_13">13</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_14">14</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_15">15</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_16">16</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_17">17</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_18">18</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_19">19</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_20">20</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_21">21</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_22">22</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_23">23</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_24">24</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_25">25</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_26">26</span>
                                                <span class="bet-times">279.00</span>
                                            </p>
                                            <p class="ball_5x">
                                                <span class="xy28_ball num_27">27</span>
                                                <span class="bet-times">279.00</span>
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
            previous_pcode:'',//上一期期数
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
            kinds:['混合', '特码合值'],
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

            setTimeout(() => {
                this.timerBegin();
            }, 500) ;
            this.initViewHeight();
            // $('body').attr('id', 'xy28')
            this.setScroll() // 下拉回弹
          },
          methods:{
              showMethodClass(index, kind) {
                let classStr = ""

                if (this.currentMethodIndex == index) {
                    classStr += " active"
                }

                if (kind.length >= 4) {
                    classStr += " methodNavS"
                }

                return classStr
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

          }

    }
</script>
<style scoped>
    #nav-wrapper ul > li.methodNavS a {
        font-size: .3rem;
    }

</style>

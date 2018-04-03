<template>
    <div>
        <!--封盘时给foot加上class:close-->
        <!--<div class="so-foot close">-->
        <div class="so-foot">
            <div class="bet_selected">
                <p>已选<span class="bet-select-num">{{betCount}}</span>注</p>
            </div>
            <div class="bet_count">
                <form>
                    <input placeholder="输入金额" type="tel" class="bet-amount" v-model="betAmount">
                    <!--<input type="reset" @click="$parent.resetAction()" value="重置" >-->
                    <a class="submit" href="javascript:;" @click="$parent.resetAction()">重置</a>
                </form>
            </div>
            <div class="bet_btn">
                <div class="so-add" @click="startBet($event)">
                    <p v-if="lotteryID==116 || lotteryID==118" class="bet_btn-big">马上开奖</p> <!--秒秒彩-->
                    <p v-else>下注</p>
                </div>
            </div>
        </div>
        <!--<div v-if="showList" class="so-shade"></div>-->
        <div v-if="showList" class="modal so-pop">
            <div class="m_content">
            <h2>下注清单<a @click="closeListDialog"></a></h2>
            <p class="grey_text">请核对您的下注信息</p>
            <div>
                <div class="boxlist bet-go-list">
                    <template v-if="playType == 'combine' || playType == 'grouped'|| playType == 'yzycombine'">
                        <p :data-id="item.cid" data-type=""  v-for="(item,index) in betSelectedList"  v-show="index =='0'" >
                            【<span class="each-title">{{item.parentItem && item.parentItem.name}}</span>-
                            <span class="each-content">{{betSelectedList.map((item)=>{ return item.name; }).join(',')}}</span>】 @
                            <span class="each-times">{{payoffFormat(item.oddsData.payoff)}}</span> x
                            <span class="each-mon">{{betAmount}}</span>
                        </p>
                    </template>

                    <template v-else>
                        <p :data-id="item.cid" data-type="" v-for="item in betSelectedList"  >
                            【<span class="each-title">{{item.parentItem && item.parentItem.name}}</span>-
                            <span class="each-content">{{item.name}}</span>】 @
                            <span class="each-times">{{payoffFormat(item.oddsData.payoff)}}</span> x
                            <span class="each-mon">{{betAmount}}</span>
                        </p>
                    </template>
                </div>
            </div>
            <p class="so-pop-sum">
            【总计】总注数：<span class="total-bet-num">{{betCount}}</span>
            总金额：<span class="total-bet-mon">{{totalAmount}}</span>
            </p>
            <a class="new_btn cancle" @click="closeListDialog"><span>取消</span></a>
            <a class="new_btn btn-submit ok" @click="submitAction(lotteryID)"><span>确定</span></a>
            </div>
        </div>
        <!--封盘底部遮挡-->
         <!-- <div class="so-fengpan">
            <a>已封盘</a>
        </div>  -->

        <!--秒秒彩开奖弹屏-->
        <div class="mmc-tool" v-show="lotteryID == 116">
            <div class="mmc-tool_machine">
                <!-- 开奖动画 -->
                <div id="res"></div>
                <div class="mmc-tool_number">
                    <div class="mmc_num_box">
                        <div class="mmc_num cqmmc_num"></div>
                        <div class="mmc_num cqmmc_num"></div>
                        <div class="mmc_num cqmmc_num"></div>
                        <div class="mmc_num cqmmc_num"></div>
                        <div class="mmc_num cqmmc_num"></div>
                    </div>
                </div>
                <!-- 开奖后 -->
                <div class="mmc-tool_draw" style="display:none">
                    <!--中奖标题-->
                    <div class="mmc-tool_title mmc-tool_title-win">
                        <p>总计<span>200.00</span>元</p>
                    </div>
                    <!--没中奖标题-->
                    <div class="mmc-tool_title mmc-tool_title-lose" style="display:none">
                    </div>
                    <!--投注清单-->
                    <div class="mmc-tool_list">
                        <ul>
                            <li>【第一球-大】@1.98X10 <span class="status-win">已派彩：1.89元</span></li>
                            <li>【第一球-7】@9.95X10 <span class="status-lose">未中奖</span></li>
                            <li>【第一球-7】@9.95X10 <span class="status-lose">未中奖</span></li>
                            <li>【第一球-7】@9.95X10 <span class="status-lose">未中奖</span></li>
                            <li>【第一球-7】@9.95X10 <span class="status-lose">未中奖</span></li>
                        </ul>
                    </div>
                </div><!-- end 开奖后 -->
                <!--按钮-->
                <div class="mmc-tool_btn">
                    <a href="javascript:;" class="btn_reset" @click="closeMmcTool()"></a>
                    <a href="javascript:;" class="btn_replay" @click="spinAction('.cqmmc_num')"></a>
                </div>
            </div>
        </div><!--end 重庆秒秒彩开奖弹屏-->

        <!--赛车秒秒彩开奖弹屏-->
        <div class="mmc-tool pk10-mmc-tool"  v-show="lotteryID == 118">
            <div class="mmc-tool_machine">
                <!-- 开奖动画 -->
                <!-- <div id="res"></div> -->
                <div class="mmc-tool_number">
                    <!--设计稿多加的pk10特有开奖讯息-->
                    <div class="pk10-mmc_marquee">
                        <span class="num_1">1</span>
                        <span class="num_2">2</span>
                        <span class="num_3">3</span>
                        <span class="num_4">4</span>
                        <span class="num_5">5</span>
                        <span class="num_6">6</span>
                        <span class="num_7">7</span>
                        <span class="num_8">8</span>
                        <span class="num_9">9</span>
                        <span class="num_10">10</span>
                    </div>
                    <div class="mmc_num_box">
                        <div class="mmc_num pk10mmc_num"></div>
                        <div class="mmc_num pk10mmc_num"></div>
                        <div class="mmc_num pk10mmc_num"></div>
                        <div class="mmc_num pk10mmc_num"></div>
                        <div class="mmc_num pk10mmc_num"></div>
                        <div class="mmc_num pk10mmc_num"></div>
                        <div class="mmc_num pk10mmc_num"></div>
                        <div class="mmc_num pk10mmc_num"></div>
                        <div class="mmc_num pk10mmc_num"></div>
                        <div class="mmc_num pk10mmc_num"></div>
                    </div>
                </div>
                <!-- 开奖后 -->
                <div class="mmc-tool_draw" style="display:none;">
                    <!--中奖标题-->
                    <div class="mmc-tool_title mmc-tool_title-win">
                        <p>总计<span>200.00</span>元</p>
                    </div>
                    <!--没中奖标题-->
                    <div class="mmc-tool_title mmc-tool_title-lose" style="display:none">
                    </div>
                    <!--投注清单-->
                    <div class="mmc-tool_list">
                        <ul>
                            <li>【冠亚和-冠军大】@1.98X10 <span class="status-win">已派彩：1.89元</span></li>
                            <li>【冠亚和值-9】@1.995X10 <span class="status-lose">未中奖</span></li>
                            <li>【冠军-10】@1.995X10 <span class="status-lose">未中奖</span></li>
                            <li>【冠军-10】@1.995X10 <span class="status-lose">未中奖</span></li>
                            <li>【冠军-10】@1.995X10 <span class="status-lose">未中奖</span></li>
                            <li>【冠军-10】@1.995X10 <span class="status-lose">未中奖</span></li>
                            <li>【冠军-10】@1.995X10 <span class="status-lose">未中奖</span></li>
                            <li>【冠军-10】@1.995X10 <span class="status-lose">未中奖</span></li>
                            <li>【冠军-10】@1.995X10 <span class="status-lose">未中奖</span></li>
                        </ul>
                    </div>
                </div><!-- end 开奖后 -->
                <!--按钮-->
                <div class="mmc-tool_btn">
                    <a href="javascript:;" class="btn_reset" @click="closeMmcTool()"></a>
                    <a href="javascript:;" class="btn_replay" @click="spinAction('.pk10mmc_num')"></a>
                </div>
            </div>
        </div><!--end 秒秒彩开奖弹屏-->
    </div>
</template>



<script>
import Mixin from '@/Mixin'
// import $ from "jquery";
// import store from './../../_vuex/store'
import {mapState, mapGetters} from 'vuex'


export default {
    name: 'Bet',
    props:[
        'betSelectedList', 'parentRefs', 
        'lotteryID', 'balance', 'now_pcode', 'now_day', 'next_pcode', 'pk10_now_pcode',
        // 'isCombine',    //是否组合玩法
        'playType',     //玩法类型
        'combineCount', //组合玩法注数
    ],
    mixins:[Mixin],
    data () {
        return {
            betAmount:'', //投注金额
            betGoList:[],
            // shadeStatus:false,
            showList:false ,
            ajaxSubmitAllow :false ,  // 解决重复提交的问题
            beforeBetBalance: 0
        }
    },
    computed:{
        betCount:function(){
            if (this.playType == 'combine' || this.playType == 'grouped') {
                return this.combineCount;
            }else{
                return this.betSelectedList.length
            }
        },
        totalAmount:function(){
            if (this.playType == 'grouped') {
                return this.betCount * this.betAmount
            }else if (this.playType == 'combine') {
                return this.betAmount;
            }else if(this.playType == 'yzycombine'){
                return this.betAmount;
            }else{
                return this.betSelectedList.length * this.betAmount
            }
        },
        foc: function () {
            this.focuFirst()
            return this.$store.state.foc
        },
        unit: function() {
             return 2.11 * this.rem;
        },
        rem: function() {
            return $('.so-con').width() / 10;
        },
        numRand: function() {
            if ( this.lotteryID==118){
                var x = '9999999999'; //上限
                var y = '0000000000'; //下限
            } else {
                var x = '99999'; //上限
                var y = '00000'; //下限
            }
            var rand = parseInt(Math.random() * (x - y + 1) + y);
            return rand;
        }
    },

    watch: {
        foc: function () {
        }
    },
    mounted:function(){
        var _self = this;
        this.focuFirst();
    },
    methods:{
        // 转动轮盘
        runSpin:function() {
            // this.mmc.spin();
            $('.mmc-tool_draw').hide();
        },
        // 秒秒彩再玩一次
        mmcReplay:function() {
            //$('.mmc-tool_draw').hide();
        },
        // 关闭秒秒彩开奖弹屏
        closeMmcTool:function() {
            $('.mmc-tool').hide();
        },
        /*
        * 重置投注页，提交表单后调用 success 1 投注成功
        * */
        resetAction:function(success) {
            this.$emit('betSuccess');
            if(success != '1'){
                this.betAmount = '';
            }
            this.showList = false;
        },

        focuFirst: function () {
            var betF = $('.bet-amount').html()
            if (!betF) {
                // $('.bet-amount').focus();
                console.log('')
            }

        },

        spinAction: function(el) {
            var isBegin = false;
            var _self = this;
            // 秒秒彩动画

            if(isBegin) return false;
            isBegin = true;

            $(el).css('backgroundPositionY',0);
            var result = _self.numRand;

            // var result = '3627';

            $('.mmc-tool_btn').find('a').addClass('disable');  // 按钮不能点选样式

            $('#res').text('随机摇奖结果 = '+result);
            var num_arr = (result+'').split('');
            $($(el).get().reverse()).each(function(index){
                var _num = $(this);
                setTimeout(function(){
                    _num.animate({
                        backgroundPositionY: (_self.unit * 60) - (_self.unit * num_arr[index])
                    },{
                        duration: 2000+index*10,
                        // easing: "easeInOutCirc", // 这个会报错先注解
                        complete: function(){
                            if(index==3) isBegin = false;
                        }
                    });
                }, index * 300);

                // 移除按钮不能点选状态
                setTimeout(function(){
                    $('.mmc-tool_btn').find('a').removeClass('disable');
                }, 4000)
            });

        },

        /*
        * 表单提交，下注接口,lotteryid 彩种id
        * */

        submitAction:function(lotteryid) {



            // var total_mon = Number($('.total-bet-mon').text()) ; // 总投注金额
            const total_mon = this.monAmt(this.totalAmount);
             this.beforeBetBalance = this.balance 

            // console.log( total_mon )
            // console.log( this.balance )

            // 余额不足提示充值
            // if (this.monAmt(total_mon) > this.monAmt(Number(returnMoney($('.so-in-top-sum').eq(0).text())))) {

            if (total_mon > this.balance) {
                // this.parentRefs.infoDialog.open('余额不足，请充值后继续进行！', 'title_bet_fail')
                this.parentRefs.infoDialog.open('余额不足，请充值后继续进行！', '下注失败')
                this.showList = false;
                return false;
            }

            // 调用父组件方法刷新余额
            // this.$emit('refreshBalance')

            var that = this;
            if(this.ajaxSubmitAllow){
                return false ;
            }      

            var resdata = {
                'list': [ ],
                'amount': total_mon,  //总金额，此金额=所有注单总金额
                'lotteryId': this.lotteryID ,  //彩种id
                'operType': 0, //下注类型，1下注
                // 'pcode': $('.now-date ').eq(0).text(), //期次20170925013
                'pcode':(this.lotteryID =='8' || this.lotteryID =='108' || this.lotteryID =='26' || this.lotteryID =='28' || this.lotteryID =='32' )? this.pk10_now_pcode:this.now_pcode,
                'pdate': this.now_day, //日期20170925
                'remark': '无',//备注，可用于测试
                'source': 'h5', //来源：h5
                'sourceType':'2', // 1是pc端，2是h5
            };
            this.ajaxSubmitAllow = true ;
            this.doSubmitAction(resdata.list) ;
            $.ajax({
                type: 'POST',
                headers: {
                    "Authorization": "bearer  " + this.getAccessToken,
                    // 'sourceType':'2', // 1是pc端，2是h5
                    // 'sideType':'1',  // 1是传统盘，2是双面盘
                },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                url: this.action.forseti + 'api/orders/betOrder',
                timeout: 600000,
                //  data:  $(form).serialize() + "&randomNum=" + randomNum ,
                data: JSON.stringify(resdata),
                success: (data) => {
                    if (data.length <= 0) {
                        return false;
                    }        
                    if (data.err == 'SUCCESS') {  //购买成功                       
                        this.ajaxSubmitAllow = false ;     //解决瞬间提交2次的问题

                        let newBalance = Number(data.msg)
                        if (newBalance >= 0) {
                            this.parentRefs.betSuccessfulDialog.open('购买成功')
                            this.$emit('refreshBalance', newBalance);
                        }
                        else {
                            this.$emit('refreshBalance', that.beforeBetBalance)
                            this.parentRefs.infoDialog.open('余额不足，请充值后继续进行！', '下注失败')
                        }
                        this.resetAction('1')
                        return false;                       
                    } else {  //购买失败提示
                        this.ajaxSubmitAllow = false ;
                        if(data.data =='' || data.data ==null){ // 平台商不存在
                            // this.parentRefs.autoCloseDialog.open(data.msg,'title_bet_fail')
                            this.parentRefs.autoCloseDialog.open(data.msg, '下注失败')
                            // initTipPop05(false,3,data.msg) ;
                        }else{   // 各种错误提示
                            if(data.data.params.ErrInfo !=''){
                                // initTipPop05(false,3,data.data.params.ErrInfo) ;
                                // this.parentRefs.autoCloseDialog.open(data.data.params.ErrInfo,'title_bet_fail') ;
                                this.parentRefs.autoCloseDialog.open(data.data.params.ErrInfo, '下注失败');

                            }
                        }
                        this.$emit('refreshBalance', that.beforeBetBalance)

                        return false ;

                    }
                },
                error: function (e) {  // 错误提示
                    if(e.status == 401) {
                        window.location = '/login';
                        return false;
                    }
                    // initTipPop05(false,3,'投注失败，请稍后再试') ;
                    // this.parentRefs.autoCloseDialog.open('投注失败，请稍后再试','title_bet_fail')
                    this.parentRefs.autoCloseDialog.open('投注失败，请稍后再试', '下注失败')
                    this.ajaxSubmitAllow = false;
                }
            });


        },

        /*
        * 表单提交数据处理
        * */
        doSubmitAction:function(list) {
            if (this.playType == 'combine' || this.playType == 'grouped'|| this.playType == 'yzycombine'){
                list.push({  // 一条数据就是一个方案，一个方案可以有多条下注
                    'betAmount': this.monAmt(Number(this.totalAmount)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                    'betContent': this.betSelectedList.map((item)=>{ return item.name; }).join(','),      //zuArr.toString(),//下注内容，如1,5,8,3,7
                    'betCount': this.betCount, //注单数
                    'betMode': 0, //下注模式(预留)
                    'chaseCount': 1, //追号期数(含当期),默认1
                    'ifChase': 0 , //是否追号,0不追号，1追号
                    'moneyMode': 'y' ,//付款类型：元y，角j，分f
                    'multiple': Number(this.betAmount),    //Number($('.each-mon').eq(0).text()), //倍数最少为1
                    'payoff': 0, //派彩
                    'playId': this.betSelectedList[0].cid , //玩法
                    'remark': '无'//备注
                });
            }else{
                this.betSelectedList.forEach((item, i)=>{
                    list.push({  // 一条数据就是一个方案，一个方案可以有多条下注
                        'betAmount': this.monAmt(Number(this.betAmount)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                        'betContent': item.name,     //new_num.toString(),//下注内容，如1,5,8,3,7
                        'betCount':1,         //Number(num_each), //注单数
                        'betMode': 0, //下注模式(预留)
                        'chaseCount': 1, //追号期数(含当期),默认1
                        'ifChase': 0 , //是否追号,0不追号，1追号
                        'moneyMode': 'y' ,//付款类型：元y，角j，分f
                        'multiple': Number(this.betAmount),         //Number(total_each), //倍数最少为1
                        'payoff': 0, //派彩
                        'playId': item.cid,  //play_each, //玩法
                        'remark': '无'//备注
                    });
                });
            }
            return false;
        },

        startBet:function(e){
            var amount = this.betAmount;  // 获取金额
            var nums = this.betSelectedList.length;
            const closet = 4;
            // if(nums<1){ // 没有选择投注项目
            if(this.betCount<1){ // 没有选择投注项目
                this.parentRefs.autoCloseDialog.open('请选择投注项目')
                return false;
            }

            if(!amount || !this.isPositiveNum(amount) || amount =='0'){ // 投注金额不正确  .modal.m08
                // this.parentRefs.autoCloseDialog.open('请输入整数的投注金额，金额不能为0','title_bet_fail')
                this.parentRefs.autoCloseDialog.open('请输入整数的投注金额', '下注失败')
                return false;
            }
            // 注单金额正确
            this.showList = true;
        },
        closeListDialog:function(){
            this.showList = false;
        }
    }
}
</script>

<style scoped>
    .so-pop, .so-shade { display: block; }
</style>
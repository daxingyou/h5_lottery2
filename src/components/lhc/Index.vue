<template>
    <div>
        <div class="so-con" id="lhc">
            <!--left siderbar  -->

            <!--用户导航 so-left -->
            <UserNavigation el=".so-menu" ref="navone"/>

            <!--right menu
                属性
                    el 要绑定到哪个节点上，即点击哪个节点触发
                事件
                    play 当用户点击完法说明时触发
            -->
            <UserMenu el=".so-top-zoushi" @play="$refs.playDialog.open()" :payoff="balanceData.payoff" :lotteryID="lotteryID" />

            <div class="so-index">
                <div class="so-top-all">
                    <MenuBar :moduleName="moduleName || '香港六合彩'" :balance="balancePublic" />
                        <div class="so-in-main">
                            <div>
                                <div class="so-main-top">
                                    <HistoryTerm :previous_pcode="previous_pcode" />
                                        <div class="so-m-t-right" v-show="ishwowpriod">
                                            <div class="last-open-num">
                                                <ul>
                                                    <li :class="'lhc_ball num_' + ((item) < 10? '0'+ item: item)" v-if="index < 6" v-for="(item, index) in winNumber">{{item}}</li>

                                                    <li class="lhc_ball_plus">
                                                        <span></span>
                                                        <span></span>
                                                    </li>

                                                    <li :class="'lhc_ball num_' + ((item) < 10? '0'+ item: item)" v-if="index == 6" v-for="(item, index) in winNumber">{{item}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                </div>
                                    <CountdownTimer ref="countdownTimer"
                                                    @countdownOver="playLottery"
                                                    @entertainCountdownOver="entertain"
                                                    @spanArrived="lotteryDataFetch"
                                                    @visibility="timerBegin"
                                                    :now_pcode="now_pcode" :lotteryID="lotteryID"
                                                    :start="sys_time" :end="now_time" :overend="nowover_time" />
                            </div>
                        </div>
                </div>
                <div class="so-in-con">
                    <!-- PlayMethodBar.vue 
                        左側玩法選單
                    -->
                    <PlayMethodBar ref="PlayMethodBar" @lhcclearbet="clearBetList" @lhcclearcnt="clearCombineCnt" :kinds="kinds" v-on:switchPlayMethod="switchPlayMethod"/>
                    <div class="body_bg" > </div>
                        <!-- Touzhu.vue 
                            右側投注區
                        -->
                    <Touzhu @lhcselectshengxiao="selectShengXiao" @lhcclearbet="clearBetList" @lhcselectbet="selectBet"
                            @lhcselectlian="selectLianType" @lhcclearcnt="clearCombineCnt" @lhcsetcnt="setCombineCnt"
                            :currentMethod="currentMethod" :playTreeList="playTreeList" :betSelectedList="betSelectedList"
                            :currentBaseShengXiao="currentBaseShengXiao"/>

                </div><!-- so-in-con -->
                <LhcBet :lotteryID="lotteryID" @betSuccess="resetAction('1')" ref="bet"
                        :betSelectedList="betSelectedList" :combineCount="combineCount"
                        :parentRefs="$refs" :balance="balancePublic" :playType="playType"
                        :now_pcode="now_pcode" :next_pcode="next_pcode" :now_day="now_day"
                        @refreshBalance = 'refreshBalance'
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
            </div><!-- so-index -->
        </div><!-- so-con -->
        <PlayDialog ref="playDialog" :moduleName="moduleName" :moduleplay="moduleplay" />
    </div>
</template>

<script>
    import './lhc.sass'
    import UserNavigation from '@/components/publicTemplate/UserNavigation'
    import UserMenu from '@/components/publicTemplate/UserMenu'
    import InfoDialog from '@/components/publicTemplate/InfoDialog'
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
    import BetSuccessfulDialog from '@/components/publicTemplate/BetSuccessfulDialog'
    import CountdownTimer from '@/components/publicTemplate/CountdownTimer'
    import HistoryTerm from '@/components/publicTemplate/HistoryTerm'
    import MenuBar from '@/components/publicTemplate/MenuBar'
    import LhcBet from '@/components/lhc/LhcBet'
    import PlayDialog from '@/components/cqssc/PlayDialog'
    import Mixin from '@/Mixin'
    import PlayMethodBar from '@/components/lhc/PlayMethodBar'
    import Touzhu from '@/components/lhc/Touzhu'

    export default {
        name: 'LhcIndex',
        mixins: [Mixin],
        components: {
            HistoryTerm,
            MenuBar,
            CountdownTimer,
            BetSuccessfulDialog,
            LhcBet,
            UserNavigation,
            UserMenu,
            InfoDialog,
            AutoCloseDialog,
            PlayDialog,
            PlayMethodBar,
            Touzhu
        },
        props: ['moduleName', 'moduleLotteryID', 'moduleplay'],
        data() {
            return {
                now_time:'',  // 当前期数销售截止时间
                nowover_time:'',  // 当前期数封盘时间
                next_pcode:'',  // 下一期数
                now_pcode:'',  // 当前期数
                previous_pcode:'',//上一期期数
                winNumber:'',    //上期开奖号
                sys_time :'',  // 当前系统时间
                now_day:'',  // 当前日期
                balanceData:{},
                entertainStatus:false,
                notopen:false,
                ishwowpriod:false,
                betSelectedList:[],   //用户选中的注数
                playType: 'normal',
                lotteryID: 10,
                combineCount: 0,
                currentBaseShengXiao: "狗",
                allLottery:{},
                gameHref:{},
                kinds:[],
                balancePublic:'',
                currentMethod: '特码'
            }
        },
        created() {
            if (this.moduleLotteryID) {
                this.lotteryID = this.moduleLotteryID;
            }
            this.getMemberBalance(this.lotteryID).then(()=>{
                 // 玩法树，彩种id 为10

            }).catch(function () {
                console.log("Promise Rejected in method of create 1");
            });

            this.loadPlayTree(this.lotteryID)
        },
        mounted() {
            let _self = this;
            let lotteryid = this.lotteryID ; // 彩种id
            let lotteryname = this.moduleName || '香港六合彩' ; // 彩种名称
            this.setCookie('lt_lotteryid', lotteryid) ; // 彩种id
            this.setCookie('lottery_name', lotteryname) ; // 彩种名称
            this.allLottery = this.$refs.navone.getLotterys() ;
            this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值
            this.initViewHeight() ;

            setTimeout(() => {
                this.timerBegin();

            }, 500) ;
            //_self.setScroll();
        },
        computed:{
        },
        watch:{
            playTreeList() {
                _.forEach(this.playTreeList, (item, index) => {
                    this.$set(this.kinds, index, item.name)
                })
            }
        },
        methods:{
            refreshBalance(newBalance) {
                this.balancePublic = newBalance
            },
            //切換左方玩法
            switchPlayMethod(method) {
                this.currentMethod = method;
                this.playType = _.some(["连肖","连尾","连码"], method) ? 'combination' : 'normal'
                if (method == "合肖" || method == "自选不中") {
                    this.playType = "group"
                }
            },
            //开奖倒计时结束后处理
            playLottery() {
                //  this.$refs.infoDialog.open('请至下期继续投注', 'title_end')
                this.timerBegin();
            },
            //封盘倒计时结束后处理
            entertain() {
                // this.$refs.infoDialog.open('请至下期继续投注', 'title_end')
                this.$refs.infoDialog.open('请至下期继续投注', '本期投注已结束')
                this.entertainStatus = true;
                this.resetAction();
            },
            //获取开奖更据 needIn 是否需要再次调用倒计时定时器
            lotteryDataFetch(needIn) {
                const that = this;
                return new Promise((resolve)=>{

                    that.getSystemTime().then(sys_time=>{
                        that.sys_time = that.formatTimeUnlix(sys_time) ;
                        that.priodDataNewly(that.lotteryID, sys_time).then(res => {
                            that.balancePublic = res.msg;
                            that.setCookie("balancePublic", that.balancePublic)

                            that.ishwowpriod = true ;
                            that.next_pcode = res.data[0].issueAlias;  // 下期期数

                            that.currentBaseShengXiao = res.data[1].zodiac
                            let code = res.data[2].winNumber.split(',')
                            that.previous_pcode = res.data[2].issueAlias

                            if(res.data[1].endTime < sys_time ) { // 如果当期结束时间小于系统时间
                                that.now_time = that.formatTimeUnlix(res.data[0].endTime); // 当前期数时间
                                that.nowover_time = that.formatTimeUnlix(res.data[0].prizeCloseTime);  // 当前期封盘时间
                                that.now_pcode = res.data[0].issueAlias;  // 当前期数
                            }else{
                                that.now_time = that.formatTimeUnlix(res.data[1].endTime); // 当前期数时间
                                that.nowover_time = that.formatTimeUnlix(res.data[1].prizeCloseTime);  // 当前期封盘时间
                                that.now_pcode = res.data[1].issueAlias;  // 当前期数
                            }

                            //code 上期开奖号码
                            if (!code) {
                                let hasFind = false
                                _.forEach(res.data, (item, index) => {
                                    if (_.size(item.winNumber) > 0 && index >= 3) {
                                        that.winNumber = item.winNumber.split(',')
                                        that.previous_pcode = item.issueAlias
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

                            if(res.data[1].status > 1){ // 异常情况，如提前开盘 2
                                that.entertainStatus = true;
                            }

                            // 当天日期
                            that.now_day = res.data[0].pdate;

                            if(needIn =='1'){ // 倒计时结束后
                                that.$refs.countdownTimer && that.$refs.countdownTimer.timerInit(that.sys_time, that.now_time, that.nowover_time);  // 重新倒计时
                            }

                            resolve();
                        }).catch(function () {
                            console.log("Promise Rejected in method of timeBegin");
                        });
                    });

                })
            },
            timerBegin() {
                let that = this;
                that.lotteryDataFetch('1') ;
                that.entertainStatus = false;
                that.notopen = false;
            },
            resetAction(success) {
                this.clearBetList()

                if (this.playType == 'combination' || this.playType == 'group') {
                    this.clearCombineCnt()
                }

                this.getMemberBalance(this.lotteryID) ; // 更新余额
                this.$refs.bet.showList = false ; // 关闭下注弹窗
            },
            clearBetList() {
                this.betSelectedList = []
            },
            clearCombineCnt() {
                this.combineCount = 0
            },
            selectLianType(itemInfo) {
                let include = _.find(this.betSelectedList, {name: itemInfo.item.name})

                this.playType = itemInfo.playType

                if(include){
                    this.betSelectedList = _.difference(this.betSelectedList, [include])
                    this.combineCount = this.combination(_.size(this.betSelectedList), itemInfo.num)
                }else{
                    if (_.size(this.betSelectedList) + 1 > itemInfo.limit) {
                        this.$refs.infoDialog.open('请选择' + itemInfo.limit + '个选项', '投注项目超过规定数量');
                    }
                    else {
                        this.betSelectedList.push(itemInfo.item)
                        this.combineCount = this.combination(_.size(this.betSelectedList), itemInfo.num)
                    }
                }
            },
            setCombineCnt(cnt) {
                this.combineCount = cnt
            },
            selectBet(item) {
                let include = ""
                let idPrefix = item.cid.toString().substr(0, 5)
                if (item.cid == 1151190 || idPrefix == '11711' || idPrefix == '11311')
                    include = _.find(this.betSelectedList, {name: item.name})
                else
                    include = _.find(this.betSelectedList, {cid: item.cid})

                if(include){
                    this.betSelectedList = _.difference(this.betSelectedList, [include])
                }else{
                    let cid = ''
                    if (item.cid) {
                        cid = item.cid.toString().substr(0, 5)
                        if (cid == "11311" || cid == "11711") {
                            if (_.size(this.betSelectedList) < item.limit)
                                this.betSelectedList.push(item)
                            else {
                                this.$refs.infoDialog.open('请选择' + item.limit + '个选项', '投注项目超过规定数量');
                            }
                        }
                        else {
                            this.betSelectedList.push(item)
                        }
                    }
                    else {
                        this.betSelectedList.push(item)
                    }
                }
            },
            selectShengXiao(itemList) {
                let intercount = _.intersection(itemList, this.betSelectedList).length

                let addShengXiao = (item, index) => {
                    if(!_.includes(this.betSelectedList, item)){
                        this.betSelectedList.push(item)
                    }
                }

                if (intercount < itemList.length) {
                    _.forEach(itemList, addShengXiao);
                }
                else if (intercount == itemList.length) {
                    this.betSelectedList = _.difference(this.betSelectedList, itemList)
                }
            },
            productRange(a, b) {
                let prd = a,i = a;

                while (i++< b) {
                    prd*=i;
                }
                return prd;
            },
            combination(n, r) {
                if (n == r)
                    return 1
                if (n < r)
                    return 0

                r = (r < n - r) ? n - r : r;
                return this.productRange(r + 1, n)/this.productRange(1, n - r);
            }
        }
    }
</script>

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
                    <p>下注</p>
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
                        <!-- For 合肖 and 自选不中 !-->
                        <template v-if="playType == 'group'">
                            <p :data-id="item.cid" data-type=""  v-for="(item,index) in betSelectedList"  v-show="index =='0'" >
                                【<span class="each-title">{{item.playName}}</span>
                                <span class="each-content">{{betSelectedList.map((item)=>{ return item.name; }).join(',')}}</span>】 @
                                <span class="each-times">{{payoffFormat(item.oddsData.payoff)}}</span> x
                                <span class="each-mon">{{betAmount}}</span>
                            </p>
                        </template>

                        <!-- For 连码 !-->
                        <template v-else-if="playType == 'combination' && (itemCidPrefix == '106')">
                            <p :data-id="item.cid" data-type="" v-for="(item,index) in betSelectedList" v-show="index =='0'" >
                                【<span class="each-title">{{item.playName}}</span>
                                <span class="each-content">{{betSelectedList.map((item)=>{ return item.name; }).join(',')}}</span>】 @
                                <span class="each-times" v-if="item.cid.toString().substr(0, 5) == '10621' || item.cid.toString().substr(0, 5) == '10641'">({{item.oddsData.payoff}}) x</span>
                                <span class="each-times" v-else>{{payoffFormat(item.oddsData.payoff)}} x</span>
                                <span class="each-mon">{{betAmount}}</span>
                            </p>
                        </template>

                        <!-- For 连肖 and  连尾 !-->
                        <template v-else-if="playType == 'combination'">
                            <p :data-id="item.cid" data-type="" v-for="(item,index) in showListRes">
                                【<span class="each-title">{{item.playName}}</span>
                                <span class="each-content">{{item.name}}</span>】 @
                                <span class="each-times">{{payoffFormat(item.oddsData.payoff)}}</span> x
                                <span class="each-mon">{{betAmount}}</span>
                            </p>
                        </template>

                        <template v-else>
                            <p :data-id="item.cid" data-type="" v-for="item in betSelectedList">
                                【<span class="each-content">{{item.playName}}</span>】 @
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

    </div>
</template>

<script>
    import Mixin from '@/Mixin'
    import betContentList from '@/components/lhc/BetOrderContent.json'

    export default {
        name: 'Bet',
        props:[
            'betSelectedList', 'parentRefs',
            'lotteryID', 'balance', 'now_pcode', 'now_day', 'next_pcode', 'pk10_now_pcode',
            'playType',     //玩法类型
            'combineCount', //组合玩法注数
        ],
        mixins:[Mixin],
        data() {
            return {
                betAmount:'', //投注金额
                betGoList:[],
                showList:false ,
                ajaxSubmitAllow :false ,  // 解决重复提交的问题
                betContentList,
                beforeBetBalance: 0
            }
        },
        computed:{
            showListRes() { // for lianXiao and lianWei show the detail list
                let lastRes = []
                if (_.size(this.betSelectedList) >= 2) {
                    let itemCid = this.betSelectedList[0].cid.toString().substr(0, 4)

                    if (itemCid == '1111' || itemCid == '1141') {
                        let baseNum = this.betSelectedList[0].selectNum
                        let combinationRes = this.getCombination(this.betSelectedList, baseNum)
                        let name = ""
                        let betContent = ""
                        let payoff = -1
                        let selectMax = true

                        if (itemCid == '1111') {
                            selectMax = false
                            payoff = Number.MAX_SAFE_INTEGER
                        }

                        _.forEach(combinationRes, (item, index) => {
                            name = ""
                            betContent = ""
                            if (selectMax) {
                                payoff = -1
                            }
                            else {
                                payoff = Number.MAX_SAFE_INTEGER
                            }
                            _.forEach(combinationRes[index], (item2, index2) => {
                                if (index2 + 1 == _.size(combinationRes[index])) {
                                    name += item2.name
                                    if (item2.name[item2.name.length - 1] == "尾") {
                                        betContent += (_.concat([], item2.name.split("尾"))[0])
                                    }
                                    else {
                                        betContent += item2.name
                                    }
                                }
                                else {
                                    name += item2.name + ','
                                    if (item2.name[item2.name.length - 1] == "尾") {
                                        betContent += (_.concat([], item2.name.split("尾"))[0]) + ','
                                    }
                                    else {
                                        betContent += item2.name + ','
                                    }
                                }

                                if (selectMax) {
                                    if (payoff < (item2.oddsData.payoff)) {
                                        payoff = item2.oddsData.payoff
                                    }
                                }
                                else {
                                    if (payoff > (item2.oddsData.payoff)) {
                                        payoff = item2.oddsData.payoff
                                    }
                                }
                            })

                            this.$set(lastRes, index, _.extend({}, item[0],
                                    {name:name, betContent: betContent, oddsData:{payoff:payoff}}))
                        })
                    }
                }

                return lastRes
            },
            betCount() {
                if (this.playType == 'combination' || this.playType == 'group') {
                    return this.combineCount;
                }else{
                    return this.betSelectedList.length
                }
            },
            totalAmount() {
                if (this.playType == 'group'){
                    return this.betAmount;
                }else if (this.playType == 'combination') {
                    return this.betCount * this.betAmount
                }else{
                    return this.betSelectedList.length * this.betAmount
                }
            },
            itemCidPrefix() {
                return this.betSelectedList[0].cid.toString().substr(0, 3)
            },
        },
        mounted() {
            console.log( this.balance )
            console.log('playType', this.playType)
            console.log('combineCnt', this.combineCount)
        },
        watch:{
            betSelectedList() {

            },
        },
        methods:{
            /*
            * 重置投注页，提交表单后调用 success 1 投注成功
            * */
            resetAction(success) {
                this.$emit('betSuccess');
                if(success != '1'){
                    this.betAmount = '';
                }
                this.showList = false;
            },

            /*
            * 表单提交，下注接口,lotteryid 彩种id
            * */

            submitAction(lotteryid) {
                const total_mon = this.monAmt(this.totalAmount);
                //console.log("balance", this.getCookie('balancePublic'))

                this.beforeBetBalance = this.balance
                if (total_mon > this.balance) {
                    // this.parentRefs.infoDialog.open('余额不足，请充值后继续进行！', 'title_bet_fail')
                    this.parentRefs.infoDialog.open('余额不足，请充值后继续进行！', '下注失败')
                    this.showList = false;
                    return false;
                }

                // 调用父组件方法刷新余额
                let that = this;
                if(this.ajaxSubmitAllow){
                    return false ;
                }

                let resdata = {
                    'list': [ ],
                    'amount': total_mon,  //总金额，此金额=所有注单总金额
                    'lotteryId': this.lotteryID ,  //彩种id
                    'operType': 0, //下注类型，1下注
                    // 'pcode': $('.now-date ').eq(0).text(), //期次20170925013
                    'pcode':(this.lotteryID =='8' || this.lotteryID =='108' )? this.pk10_now_pcode:this.now_pcode,
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
                    },
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: this.action.forseti + 'api/orders/betOrder',
                    timeout: 600000,
                    data: JSON.stringify(resdata),
                    success:(data) => {
                        if (data.length <= 0) {
                            return false;
                        }
                        if (data.err == 'SUCCESS') {  //购买成功
                            this.ajaxSubmitAllow = false ;     //解决瞬间提交2次的问题

                            let newBalance = Number(that.balance) - Number(total_mon)

                            console.log("balance money", newBalance)
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
                    error: (e) => {  // 错误提示
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
            doSubmitAction(list) {
                if (this.playType == 'group') {
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
                }else if (this.playType == 'combination') {
                    if (this.itemCidPrefix == '111' || this.itemCidPrefix == '114') {
                        this.showListRes.forEach((item, i) => {
                            list.push({  // 一条数据就是一个方案，一个方案可以有多条下注
                                'betAmount': this.monAmt(Number(this.totalAmount)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                                'betContent': item.betContent,     //new_num.toString(),//下注内容，如1,5,8,3,7
                                'betCount': 1,         //Number(num_each), //注单数
                                'betMode': 0, //下注模式(预留)
                                'chaseCount': 1, //追号期数(含当期),默认1
                                'ifChase': 0, //是否追号,0不追号，1追号
                                'moneyMode': 'y',//付款类型：元y，角j，分f
                                'multiple': Number(this.betAmount),         //Number(total_each), //倍数最少为1
                                'payoff': 0, //派彩
                                'playId': item.cid,  //play_each, //玩法
                                'remark': '无'//备注
                            });
                        });
                    }
                    else {
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
                    }
                }else {
                    this.changeBetContent()
                    this.betSelectedList.forEach((item, i)=>{
                        list.push({  // 一条数据就是一个方案，一个方案可以有多条下注
                            'betAmount': this.monAmt(Number(this.betAmount)), //下注金额，元的模式下需要 x100传值，角的模式下 x10
                            'betContent': item.betContent,     //new_num.toString(),//下注内容，如1,5,8,3,7
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
            changeBetContent() {
                let getBetContent = (item, index) => {
                    if (this.betContentList.data[item.cid]) {
                        item.betContent = this.betContentList.data[item.cid]
                    }
                    else {
                        item.betContent = item.name
                    }
                }

                _.forEach(this.betSelectedList, getBetContent)
            },
            startBet(e) {
                let amount = this.betAmount;  // 获取金额
                const closet = 4;
                // if(nums<1){ // 没有选择投注项目
                if(this.betCount<1){ // 没有选择投注项目
                    this.parentRefs.autoCloseDialog.open('请选择投注项目')
                    return false;
                }

                console.log("amount", amount)

                if(!amount || !this.isPositiveNum(amount) || amount =='0'){ // 投注金额不正确  .modal.m08
                    // this.parentRefs.autoCloseDialog.open('请输入整数的投注金额，金额不能为0','title_bet_fail')
                    this.parentRefs.autoCloseDialog.open('请输入整数的投注金额，金额不能为0', '下注失败')
                    return false;
                }
                // 注单金额正确
                this.showList = true;
            },
            getCombination(arr, size) {
                let allResult = [];

                (function mapping(arr, size, result) {
                        let arrLen = arr.length;
                        if (size > arrLen) {
                            return;
                        }
                        if (size == arrLen) {
                            allResult.push([].concat(result, arr))
                        } else {
                            for (let i = 0 ; i < arrLen; i++) {
                                let newResult = [].concat(result);
                                newResult.push(arr[i]);

                                if (size == 1) {
                                    allResult.push(newResult);
                                } else {
                                    let newArr = [].concat(arr);
                                    newArr.splice(0, i + 1);
                                    mapping(newArr, size - 1, newResult)
                                }
                            }
                        }
                })(arr, size, []);

                return allResult;
            },
            closeListDialog() {
                this.showList = false;
            }
        }
    }
</script>

<style scoped>
    .so-pop, .so-shade { display: block; }
</style>
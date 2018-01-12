<template>
    <div id="pa_con"  class="body lhc">
        <header id="pa_head" class="new_header">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1) ">
                    <span class="icon icon_back"></span>
                </a>
            </div>
            <h2 class="center lottery_name">{{lotteryname}} 投注记录</h2>
            <div class="right">
                <div class="dropdown_icon"><span class="icon icon_filter"></span>筛选</div>
            </div>
        </header>
        <div class="dropdown" style="display:none;">
            <div class="play_area">
                <div class="sort">
                    <h5>游戏筛选</h5>
                    <ul>
                        <li :class="{'active':lotteryid== list.id}" :data-val="list.id" v-for="list in gamechoose"><a href="javascript:void(0);"> {{list.name}} </a></li>
                      <!--  <li data-val="2"><a href="javascript:void(0);">重庆时时彩</a></li>
                        <li data-val="12"><a href="javascript:void(0);">天津时时彩</a></li>
                        <li data-val="14"><a href="javascript:void(0);">新疆时时彩</a></li>
                        <li data-val="4"><a href="javascript:void(0);">江西11选5</a></li>
                        <li data-val="16"><a href="javascript:void(0);">广东11选5</a></li>
                        <li data-val="18"><a href="javascript:void(0);">山东11选5</a></li>
                        <li data-val="6"><a href="javascript:void(0);">江苏快3</a></li>
                        <li data-val="20"><a href="javascript:void(0);">安徽快3</a></li>
                        <li data-val="22"><a href="javascript:void(0);">湖北快3</a></li>
                        <li data-val="8"><a href="javascript:void(0);">北京PK10</a></li>-->

                    </ul>
                    <div>
                        <div class="btn_outline"><a class="new_btn" href="javascript:;"><span>取消</span></a></div>
                        <div class="btn_submit"><a class="new_btn ok" href="javascript:;"><span>确定</span></a></div>
                    </div>
                </div>
            </div>
        </div>

        <div id="pa_content">
            <div id="betting_record" class="tab_container tabBox">
                <div class="hd recode-tab"> <!-- 投注记录切换tab -->
                    <ul class="tab tab_mid">
                        <li class="on"><a href="javascript:;" data-filter="" data-val="1">全部</a></li>
                        <li><a href="javascript:;" data-filter="not_open" data-val="2">未开奖</a></li>
                        <li><a href="javascript:;" data-filter="winning" data-val="3">已中奖</a></li>
                        <li><a href="javascript:;" data-filter="not_win" data-val="4">未中奖</a></li>
                    </ul>
                </div>
                <div class="swiper-container" id="swiper1" >
                    <div class="swiper-wrapper">

                        <!-- 全部 -->
                        <div class="swiper-slide" v-for="index in 4">
                            <div class="bd">
                                <ul class="tab_content tab_content_1 sliding-box">
                                    <!--列表内容-->
                                    <!--
                                        first_li 第一個li一定要加，此為內容框的上方
                                        active 點擊後要加，才會展開
                                    -->
                                    <!-- 本周 -->
                                    <li :class="showClass(collapseCtrl[index2])" :data-val="item" v-for="(item, index2) in showTitleList">
                                        <div class="panel_title new_panel_top" @click="getBetRecord(index2)">
                                            <strong class="title-data" v-if="lotteryid == 10">{{item}}</strong>
                                            <strong class="title-data" v-else>{{showDateList[index2]}}</strong>
                                            <span><!-- 此為箭頭，點按後展開或收合，預設第一個為展開（父層li的class有active） --></span></div>
                                        <ul class="panel bet-recode-all" style="display: block;">
                                            <li style="margin: auto;text-align: center;height: 2rem;display: block;line-height: 2rem;" class="so-zzjz" v-if="loadingList[index2] == 1 && betRecordList[index2].length == 0">正在加载...</li>
                                            <li style="margin: auto;text-align: center;height: 2rem;display: block;line-height: 2rem;" class="so-zzjz" v-if="betRecordList[index2].length == 0 && collapseCtrl[index2] == 1 && loadingList[index2] == 0">没有数据了</li>
                                            <!-- data-val裡的 encodeURI(JSON.stringify(v))，他們寫暂时不显示详情 -->
                                            <li onclick="return false" class="bet_data" data-status="not_open" v-for="(item2, index3) in betRecordList[index2]" v-if="betRecordList[index2].length > 0 && collapseCtrl[index2] == 1">
                                                <a href="javascript:;" data-val="">
                                                    <div class="item">
                                                        <div class="badge ssc_badge">
                                                            <img :src="'/static/frist/images/lotterylogo/logo_' + item2.lotteryid + '.svg'">
                                                        </div>
                                                        <div class="lottery_t ssc">
                                                            <p><!-- orderId: -->{{item2.orderid}}</p>
                                                            <p><span><!-- playName: -->{{item2.playname}}</span></p>
                                                            <span class="prd_num"><span><!-- pcode: -->{{item2.pcode}}</span>期</span>
                                                            <strong><!-- 倍率?multiple: -->{{item2.betamount}}</strong>
                                                        </div>
                                                        <!-- 
                                                        CSS 狀態說明
                                                        status00
                                                        未開獎、未中獎、和局
                                                        status02
                                                        己中獎(已派彩)
                                                        status04
                                                        用户撤单、系统撤单、中奖停追、存在异常、异常注单 
                                                        -->
                                                        <div :class="showStatusClass(item2.orderstatus)">
                                                            <span><!-- orderStatus: -->{{item2.orderstatusname}}</span>
                                                            <div v-if="item2.orderstatus == 32"><!-- 若己派彩則顯示 payoff：XXXX.X元 -->{{item2.payoff}}</div>
                                                            <div v-else></div>
                                                            <p v-if = ' item2.playId=="1012"&&(item2.orderstatusname=="已中奖"||item2.orderstatusname=="未中奖")  ' class="reword">返点：</p>
                                                            <p v-if = 'item2.playId=="1012"&&(item2.orderstatusname=="已中奖"||item2.orderstatusname=="未中奖") ' class="reword">{{roundAmt(item2.reforwardPoint)}}元</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <!-- 本周 -->
                                </ul>
                            </div>
                        </div>
                        <!-- 全部 -->
                        <!-- 未开奖 -->
                    </div><!-- swiper-wrapper -->
                </div>
            </div>
        </div>
        <footer id="pa_foot"></footer>
        <div class="so-shade"></div>
    </div>
</template>


<script>
    import Mixin from '@/Mixin'
    
    export default {
        name: 'lhcBetRecord',
        mixins: [Mixin],
        data() {
            return {
                restr: '', // 网页html缓存
                lock: 0,
                // access_token : this.getCookie('access_token'), // 取token
                lotteryname : this.getCookie('lottery_name') ,
                lotteryid : this.getCookie('lt_lotteryid') ,
                lastlotteryid : this.getCookie('lt_lotteryid') ,
                nowDate: new Date(),

                seadata: {
                    page: 1, // 页数，从1开始
                    pageSize: 10, // 每页行数
                    searchType: 1, // 查询类型，1为投注记录查询，2为追号查询
                    statusType: 1, // 状态：1全部，2未开奖，3已中奖，4未中奖,81异常处理中，5和局
                    lotteryId: this.lotteryid , // 彩种ID
                    sideType: '2' , // 彩票类型：1 官彩，2 双面彩
                    pdate: 0, // 0: 本周，1: 上週，2:上上週
                },
                tableLock: 0,
                // 投注详情
                touzhuXQ: {},
                soyeScroll:null, 
                mySwiperTrack: null,
                gamechoose :[
                    {id:'0','name':'全部'} ,

                   {id:'2','name':'重庆时时彩'} ,
                    {id:'102','name':'秒速时时彩'} ,
                    {id:'14','name':'新疆时时彩'} ,
                    {id:'108','name':'秒速赛车'},
                    {id:'8','name':'北京PK10'} ,
                    {id:'12','name':'天津时时彩'} ,
                    {id:'4','name':'江西11选5'} ,
                    {id:'104','name':'秒速11选5'} ,
                    {id:'16','name':'广东11选5'} ,
                    {id:'18','name':'山东11选5'} ,
                    {id:'106','name':'秒速快3'} ,
                    {id:'6','name':'江苏快3'} ,
                    {id:'22','name':'湖北快3'} ,
                    {id:'20','name':'安徽快3'} ,
                    {id:'10','name':'香港六合彩'},
                ],
                ajaxSubmitAllow: false,
                betRecordList: [[], [], []],
                collapseCtrl: [0, 0, 0], //控制本週，下週，下下週的選單是否展開，0 為不展開，1 為展開
                numOfDate: 3, //控制其它彩種的顯示日期的天數，目前是今天日期，昨天日期跟前天日期，三天的資料
                pageList: [1, 1, 1], //控制本周，下週，下下週的資料取得的頁數，起始跟後端從第一頁開始拿
                loadingList: [0, 0, 0], //控制是否顯示加載數據，0 不顯示， 1 顯示
                showDateList:[], //放置其他彩種的日期，用來顯示在 UI 上
                showTitleList:["本周", "上周", "上上周"],
                pDateList:[], //放置其他彩種用來傳給後端 API pdate 參數的值
            }
        },
        created() {
            this.setDateList()
            this.getBetRecord(0)
        },
        computed:{
            year() {
                return this.nowDate.getYear() + 1900;
            },
            mon() {
                return (this.nowDate.getMonth() + 1) < 0 ? ('0' + (this.nowDate.getMonth() + 1)) : (this.nowDate.getMonth() + 1);
            },
            day() {
                return this.nowDate.getDate() < 10 ? ('0' + this.nowDate.getDate()) : this.nowDate.getDate();
            },
            newpdate() {
                return '' + this.year + this.mon + this.day;
            },
        },/*computed*/
        mounted() {
            $('html,body').css('overflow-y','scroll' )  ;
            if (this.lotteryid != 10) {
                this.seadata.pdate = this.newpdate;
            }
            else {
                this.seadata.pdate = 0
            }
            this.setMenuAction();
            this.initView();
            this.initDateMeun() ;
            //scrollTo(0,0); // 回到顶部
            document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
            let mySwiperRecode = new Swiper('#swiper1', {
                // autoplay: 5000,//可选选项，自动滑动
                onSlideChangeStart: (swiper) => {
                    this.betRecordList = [[], [], []]
                    this.pageList = [1, 1, 1]
                    this.collapseCtrl = [0, 0, 0]
                    this.loadingList = [0, 0, 0]
                    let index = swiper.activeIndex
                    this.seadata.statusType = index + 1
                    this.seadata.page = 1
                    this.getBetRecord(0)
                    this.initView()
                    $('#betting_record .recode-tab .tab_mid  li').each((i, t) => {
                        if (i === index) {
                            $(t).addClass('on')
                                .siblings()
                                .removeClass('on');
                        }
                    })
                },
            })

            // 一级标签
            /* (function () {*/
            $('#tabs > div').click((e) => {
                const $src = $(e.currentTarget);
                $src.addClass('active')
                    .siblings()
                    .removeClass('active');
                if ($src.index()) {
                    // 追号
                    $('#betting_record').hide()
                    $('#trace_record').show()
                    this.seadata.searchType = 2;
                    this.seadata.page = 1;// 页数，从1开始
                    // initZhuihao()
                } else {
                    // 投注
                    $('#betting_record').show()
                    $('#trace_record').hide()
                    this.seadata.searchType = 1;
                    this.seadata.page = 1;// 页数，从1开始
                }
                this.restr = '';// 网页html缓存
                this.initView()
            });
            /* })();*/


            // 二级标签
            /*(function () {*/
            $('.tab_mid > li').click((e) => {
                this.betRecordList = [[], [], []]
                this.pageList = [1, 1, 1]
                this.collapseCtrl = [0, 0, 0]
                this.loadingList = [0, 0, 0]
                document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
                const $src = $(e.currentTarget);
                let dateval = $('.tab_content').find('.slide_toggle:first-child').data('val') ;
                /*if (this.lotteryid == 10) {
                    this.seadata.pdate = 0;  // 切换时默认第一天
                }*/
                $src.addClass('on').siblings().removeClass('on');
                let num = parseInt($src.index(), 10);
                switch (num) {
                    case 0:
                        this.seadata.statusType = 1
                        if (this.seadata.searchType === 1) {
                            mySwiperRecode.slideTo(0, 200, false);
                        } else {
                            mySwiperTrack.slideTo(0, 200, false);
                        }
                        break
                    case 1:
                        this.seadata.statusType = 2
                        if (this.seadata.searchType === 1) {
                            mySwiperRecode.slideTo(1, 200, false);
                        } else {
                            mySwiperTrack.slideTo(1, 200, false);
                        }
                        break
                    case 2:
                        this.seadata.statusType = 3
                        if (this.seadata.searchType === 1) {
                            mySwiperRecode.slideTo(2, 200, false);
                        } else {
                            mySwiperTrack.slideTo(2, 200, false);
                        }
                        break
                    case 3:
                        this.seadata.statusType = 4
                        if (this.seadata.searchType === 1) {
                            mySwiperRecode.slideTo(3, 200, false);
                        } else {
                            mySwiperTrack.slideTo(3, 200, false);
                        }
                        break
                }
                this.seadata.page = 1
                this.getBetRecord(0)
                this.initView()
            });

            // 下拉加载更多
            function soyeScroll (selector) {
                this.selector = selector;
                this.init = (cb) => {
                    let selector = this.selector;
                    let that = this;
                    let arr = selector.split(' ');
                    selector = arr.join('');
                    let doc = '';
                    if (selector.indexOf('.') === 0) {
                        selector = selector.substring(1, selector.length);
                        doc = document.getElementsByClassName(selector);
                        if (doc === null) {
                            console.error('soyeScroll errorMsg: this class is undefined!');
                            return;
                        }
                        doc = doc[doc.length - 1];
                        window.onscroll = () => {
                            let thisClientHeight = document.body.clientHeight;
                            let thisScrollHeight = document.body.scrollHeight;
                            if (thisScrollHeight - 100 <= (thisClientHeight + that.getScrollTop())) {
                                cb();
                            }
                        };
                    } else if (selector.indexOf('#') === 0) {
                        selector = selector.substring(1, selector.length);
                        doc = document.getElementById(selector);
                        if (doc === null) {
                            console.error('soyeScroll errorMsg: this id is undefined!');
                            return;
                        }
                        let thisHeight = doc.style.height;
                        let thisX = doc.getBoundingClientRect().left;
                    }
                };
                this.getScrollTop = () => {
                    let scrollTop = 0;
                    let bodyScrollTop = 0;
                    let documentScrollTop = 0;
                    if (document.body) {
                        bodyScrollTop = document.body.scrollTop;
                    }
                    if (document.documentElement) {
                        documentScrollTop = document.documentElement.scrollTop;
                    }
                    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                    return scrollTop;
                };
            }

            this.soyeScroll = new soyeScroll('.bet_data');
            this.soyeScroll.init(() => {
                if (this.lock === 0) {
                    this.lock = 1;
                    this.restr = '';
                    let pdate

                    pdate = _.findIndex(this.collapseCtrl, (item) => {return item == 1})
                    this.getBetRecord(pdate); // 投注记录
                }
            });

        },/*mounted*/
        watch: {
        },
        methods: {
            showClass(stat) {
                let classStr = "slide_toggle bet_day new_bet_day new_panel"

                if (stat == 1) {
                    classStr += ' active'
                }

                return classStr
            },
            showStatusClass(statCode) {
                let classStr = "status"

                switch (parseInt(statCode)) {
                    case 32:
                        classStr += ' status02'
                        break;
                    case 4: // 用户撤单
                    case 5:  // 系统撤单
                    case 6:  // 中奖停追
                    case 71: // 存在异常
                    case 81: // 异常注单
                        classStr += ' status04'
                        break;
                    case 33: // 和局
                        classStr += ' status00'
                        break;
                    default:
                        classStr += ' status00'
                }

                return classStr
            },
            setDateList() {
                (this.nowDate.getMonth() + 1) + '月' + this.nowDate.getDate() + '日'
                let nowDateData = this.nowDate

                for (let i = 1; i <= this.numOfDate; i++) {
                    this.showDateList.push((nowDateData.getMonth() + 1) + '月' + nowDateData.getDate() + '日')
                    this.pDateList.push((nowDateData.getYear() + 1900).toString().padStart(4, '0') + (nowDateData.getMonth() + 1).toString().padStart(2, '0') + nowDateData.getDate().toString().padStart(2, '0'))
                    nowDateData.setDate(nowDateData.getDate() - 1)
                }
            },
            getBetRecord(pdate) {
                let _self = this ;

                console.log("lock", this.lock)

                if (pdate < 0) {
                    return false
                }

                if(_self.ajaxSubmitAllow){ // 解决重复提交问题
                    return false ;
                }

                if (this.collapseCtrl[pdate] == 1 && this.lock == 0) {
                    this.$set(this.collapseCtrl, pdate, 0)
                    this.pageList[pdate] =  1
                    this.betRecordList[pdate] = []
                }
                else {
                    this.$set(this.collapseCtrl, pdate, 1)
                    //關掉其他展開的資料
                    _.forEach(this.collapseCtrl, (val, index2) => {
                        if (pdate != index2 && index2 <= 2) {
                            this.$set(this.collapseCtrl, index2, 0)
                            this.pageList[index2] = 1
                            this.betRecordList[index2] = []
                        }
                    })
                    this.$set(this.loadingList, pdate, 1)

                    _self.seadata.lotteryId = _self.lotteryid // 彩种ID
                    _self.seadata.page = _self.pageList[pdate]
                    //如果是六合彩 pdate 是 0,1,2
                    if (this.lotteryid == 10) {
                        _self.seadata.pdate = pdate
                    }
                    else {
                        _self.seadata.pdate = _self.pDateList[pdate]
                    }
                    _self.ajaxSubmitAllow = true;
                    $.ajax({
                        type: 'post',
                        headers: {
                            "Authorization": "bearer  " + _self.getCookie("access_token"),
                        },
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8', // json格式传给后端
                        url: _self.action.forseti + 'api/orders/orderList',
                        data: JSON.stringify(_self.seadata), // json格式
                        success: (res) => {
                            if(res.err =='SUCCESS') {
                                _self.ajaxSubmitAllow = false;
                                if (_self.lastlotteryid != _self.lotteryid) { // 是否切换，切换需要重置
                                }

                                const dataList = res.data.rows;

                                if (dataList.length === 0 && this.pageList[pdate] <= 1) {
                                    _self.betRecordList[pdate] = []
                                } else{
                                    _self.lock = 0;
                                    _.forEach(dataList, (betData, index) => {
                                        let betDataObj = {}
                                        betDataObj.lotteryid = betData.lotteryId
                                        betDataObj.pcode = betData.issueAlias
                                        betDataObj.orderstatus = betData.orderStatus
                                        betDataObj.orderstatusname = betData.orderStatusName
                                        betDataObj.betamount = this.fortMoney(this.roundAmt(betData.betAmount), 2)
                                        if (betDataObj.orderstatus == 32) {
                                            betDataObj.payoff = _self.fortMoney(_self.roundAmt(betData.payoff), 2) + '元'
                                        }
                                        betDataObj.orderid = betData.orderId
                                        betDataObj.betcontent = betData.betContent
                                        betDataObj.playname = betData.playName
                                        betDataObj.cid = betData.cid                                        
                                        betDataObj.reforwardPoint = betData.reforwardPoint                                        
                                        betDataObj.playId = betData.playId.toString().substr(0,4)
                                        _self.betRecordList[pdate].push(betDataObj)
                                    })
                                }
                                _self.lastlotteryid = _self.lotteryid;
                                //有多下載資料再把，page 參數加一
                                if (_.size(dataList) > 0)
                                    _self.pageList[pdate]++;

                                //關掉加載數據顯示
                                this.$set(this.loadingList, pdate, 0)
                            }
                            error: () => {
                                _self.ajaxSubmitAllow = false
                                this.$set(this.loadingList, pdate, 0)
                            }
                        },
                    })
                }
            },
            /**
             * 投注详情
             */
            showBetDetails(that, view) {
                
            },/*showBetDetails*/
            getScroll() {
                let t, l, w, h;
                if (document.documentElement && document.documentElement.scrollTop) {
                    t = document.documentElement.scrollTop;
                    l = document.documentElement.scrollLeft;
                    w = document.documentElement.scrollWidth;
                    h = document.documentElement.scrollHeight;
                } else if (document.body) {
                    t = document.body.scrollTop;
                    l = document.body.scrollLeft;
                    w = document.body.scrollWidth;
                    h = document.body.scrollHeight;
                }
                return {t: t, l: l, w: w, h: h};
            },/*getScroll*/


            /**
             * 获取元素的绝对位置
             * @param element
             * @returns {Number|number}
             */
            getElementTop(element) {
                let actualTop = element.offsetTop;
                let current = element.offsetParent;
                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                return actualTop;
            },/*getElementTop*/
            // 日期标签
            initDateMeun() {
            },/*initDateMeun*/
            //筛选下拉单
            setMenuAction() {
                $(".dropdown_icon,.btn_outline").click(() => {
                    $(".dropdown").slideToggle("fast", () => {
                    });
                    $('.so-shade').fadeToggle("fast", "linear");
                });
                let lotterychooseid ;
                $('.play_area').on('click', 'li', (e) => {
                    let $src = $(e.currentTarget);
                    $src.addClass('active').siblings().removeClass('active');
                    let val = $src.data('val');
                    lotterychooseid = val;

                });
                //确定提交
                $('.btn_submit').on('click', (e) => {
                    this.betRecordList = [[], [], []]
                    this.pageList = [1, 1, 1]
                    this.collapseCtrl = [0, 0, 0]
                    this.loadingList = [0, 0, 0]
                    if(lotterychooseid || lotterychooseid == '0'){
                        this.lotteryid = lotterychooseid ;
                    }
                    this.seadata.page = 1; // 还原页码
                    let lottery_name

                    $('.play_area').each(function () {
                        let flag = $(this).find('li').hasClass('active') ;
                        if(flag){
                            lottery_name = $(this).find('li.active').find('a').text() ;
                            this.lotteryid = $(this).find('li.active').data('val') ;
                        }
                    }) ;
                    $('.lottery_name').html(lottery_name + ' 投注记录'); // 彩种名称
                    this.getBetRecord(0);
                    $(".dropdown").slideToggle("fast", () => {
                    });
                    $('.so-shade').fadeToggle("fast", "linear");

                });
            },/*setMenuAction*/
            initView:function () {
            },/*initView*/
        },

    }
</script>

<style>
    .swiper-container {
            height: 100%;
        }
     #swiper1 .reword{
        display: inline-block;
        color: #71c341;
        font-size: 0.25rem;
    }
</style>


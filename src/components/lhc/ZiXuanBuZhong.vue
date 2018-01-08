<template>
<div  id="content-wrapper" class="zixuanbuzhong">
	<div class="so-con-right" >
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 自选不中 -->
				<div id="so-item0" class="content-right active item_one" >
					<ul>
						<!-- 1-49 -->
						<li class="select-li" >
							<div class="bet_panel">
								<h2>
									<span class="bet-times">赔率：<span>{{betRate == 0?"-":payoffFormat(betRate)}}</span></span>
									自选不中
								</h2>
								<div class="bet_box">

									<p :data-id="item.cid" :class="isBtnActived(item)" v-for="(item, index) in ZiXuanBuZhongList" @click="betSelect(item)">
										<span class="num_group" >
											<span :class="'lhc_ball num_'+ item.name" >{{item.name}}</span>
										</span>
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- 自选不中 -->
			</div><!-- tab_container -->
		</div><!-- scroller -->
	</div><!-- so-con-right -->
</div>
</template>

<script>
    import playTreeIndexByCid from '@/PlayTreeIndexByCid'
    import LhcMixin from '@/components/lhc/LhcMixin'

    export default {
        name: 'ZiXuanBuZhong',
        mixins: [LhcMixin],
        props: {
            playTreeList: {
                type: Array,
                default: [],
            },
            betSelectedList: {
                type: Array,
                default: [],
            }
        },
        data() {
            return {
                ZiXuanBuZhongList: [],
                betRate: 0,
                maxBallNum: 49,
                maxItemNum: 12,
				minItemNum: 5,
                playGroup: [],
				ballNumList:[],
                playType: 'group',
				myScroll: null
            }
        },
        mounted(){
            if (playTreeIndexByCid.get('1170000')) {
                this.handlePlayList()
            }
            this.myScroll = new iScroll("scroller", {  // 投注区域
                onScrollEnd() {
                    this.refresh() ;
                },
                vScroll: true,
                mouseWheel: true,
                hScrollbar: false,
                vScrollbar: false,
                click: true ,
                useTransform: false,
                useTransition: false,
            });

            this.myScroll.refresh()
            this.myScroll.scrollTo(0, 300)
        },
        created() {
        },
        computed: {
        },
        updated() {
            this.setScrollHeight(false, 0)
        },
        watch: {
            playTreeIndexByCid() {
                if (playTreeIndexByCid.get('1170000')) {
                    this.handlePlayList()
                }
            },
            betSelectedList() {
                let nBetItem = _.size(this.betSelectedList)
                if (nBetItem < this.minItemNum)
                    this.betRate = 0

                let matchItem = _.find(this.playGroup, {number: nBetItem})
                if (matchItem) {
                    this.betRate = matchItem.item.oddsData.payoff
                    this.$emit('lhcsetcnt',1)

                    _.forEach(this.betSelectedList, (item, index) => {
                        item.cid = matchItem.item.cid
                        item.playName = matchItem.item.playName
                        item.oddsData.payoff = this.betRate
                    })
                }
                else {
                    this.$emit('lhcsetcnt',0)
                    if (nBetItem > 0) {
                        _.forEach(this.betSelectedList, (item, index) => {
                            item.cid = 1171100
                            item.oddsData.payoff = this.betRate
                        })
                    }
                }
            }
        },
        methods: {
            payoffFormat:function(val){
                return (Number(val)/10000).toFixed(3);
            },
            isBtnActived(item) {
                if(!this) return ''

                let classStr = 'so-con-span-short-4x'
                if (_.find(this.betSelectedList, {name: item.name})) {
                    classStr += ' active'
                }
                return classStr
            },
            computeNumList() {
                let res = []
                for (let i = 1; i <= this.maxBallNum; i++) {
                    if (i < 10) {
                        res.push("0" + i)
                    }
                    else {
                        res.push("" + i)
                    }
                }
                return res
            },
            handlePlayList() {
                this.ballNumList = this.computeNumList()
                _.forEach(this.ballNumList, (ballNum, index) => {
                    let cid = 1171100

                    this.$set(this.ZiXuanBuZhongList, index, _.extend({},
                        {cid: cid, name: ballNum, oddsData:{payoff:0}}))
                })

                _.forEach(playTreeIndexByCid.get('1171100').childrens, (item, index) => {
                    let num = item.cid % 100 + 4

					this.$set(this.playGroup, index, _.extend({}, {number: (num), item: item}))
                })
            },
            betSelect(item) {
                item.limit = this.maxItemNum
                this.$emit('lhcselectbet', item);
            }
        }
    }
</script>


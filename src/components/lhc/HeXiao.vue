<template>
<div  id="content-wrapper" class="hexiao">

	<div class="so-con-right" >
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 合肖 -->
				<div id="so-item0" class="content-right active item_one" >
					<ul>
						<!-- 合肖 -->
						<li class="select-li bet_lm" >
							<div class="bet_panel">
								<h2>
									<span class="bet-times">赔率：<span>{{betRate == 0?"-":payoffFormat(betRate)}}</span></span>
									合肖
								</h2>
								<div class="bet_box">
									<p :data-id="item.cid" :class="isBtnActived(item)" v-for="(item, index) in HeXiaoList" @click="betSelect(item)">
										<span>{{item.name}}</span>
										<span class="num_group" >
											<span :class="'lhc_ball num_'+ item2" v-for="(item2, index2) in shengXiaoMapNumber[index]"></span>
										</span>
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div><!-- tab_container -->
		</div><!-- scroller -->
	</div><!-- so-con-right -->
</div>
</template>

<script>
    import playTreeIndexByCid from '@/PlayTreeIndexByCid'
    import LhcMixin from '@/components/lhc/LhcMixin'

    export default {
        name: 'HeXiao',
		mixins: [LhcMixin],
        props: {
            playTreeList: {
                type: Array,
                default: [],
            },
            betSelectedList: {
                type: Array,
                default: [],
            },
            currentBaseShengXiao: {
                type: String,
                default:"狗"
            }
        },
        data() {
            return {
                HeXiaoList: [],
                shengXiaoList: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
                betRate: 0,
				maxBallNum: 49,
				maxHeXiaoItem: 11,
				minHeXiaoItem: 2,
				playGroup: [],
				playType: 'group',
				myScroll: null
            }
        },
        mounted() {
            if (playTreeIndexByCid.get('1130000')) {
                this.handlePlayList()
            }
            this.myScroll = new iScroll("content-wrapper",{  // 投注区域
                onScrollEnd() {
                    this.refresh() ;
                    this.scrollTo(0, 300)
                },
                onScrollStart: function () {
                    console.log('scrolling is started');
                },

                vScroll:true,
                mouseWheel: false ,
                hScrollbar:false ,
                vScrollbar:false ,
                click: true ,
                useTransform: false ,
                useTransition: false ,
            });
        },
        created() {
        },
        computed: {
            shengXiaoMapNumber() {
                let getIndex = (item) => {
                    return item == this.currentBaseShengXiao
                }

                let index = _.findIndex(this.shengXiaoList, getIndex)
                return this.computeShengXiaoNum(index + 1, this.maxBallNum)
            },
        },
        updated() {
            this.setClickHeight($('.so-con-right'), $('#so-item0').height())
        },
        watch: {
            playTreeIndexByCid() {
                if (playTreeIndexByCid.get('1130000')) {
                    this.handlePlayList()
                }
            },
			betSelectedList() {
                let nBetItem = _.size(this.betSelectedList)

				if (nBetItem < this.minHeXiaoItem)
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
                            item.cid = 1131100
                            item.oddsData.payoff = this.betRate
                        })
                    }
				}
			}
        },
        methods: {
            isBtnActived(item) {
                if(!this) return ''

                let classStr = 'so-con-span-long'
                if (_.find(this.betSelectedList, {name: item.name})) {
                    classStr += ' active'
                }
                return classStr
            },
            handlePlayList() {
                _.forEach(this.shengXiaoList, (shengXiao, index) => {
                    let cid = 1131100

                    this.$set(this.HeXiaoList, index, _.extend({},
                        {cid: cid, name: shengXiao, oddsData:{payoff:0}}))
                })

				_.forEach(playTreeIndexByCid.get('1131100').childrens, (item, index) => {
				    let num = item.cid % 100

				    this.$set(this.playGroup, index, _.extend({}, {number: (num + 1), item: item}))
				})
            },
            betSelect(item) {
                item.limit = this.maxHeXiaoItem
                this.$emit('lhcselectbet', item);
            }
        }
    }
</script>

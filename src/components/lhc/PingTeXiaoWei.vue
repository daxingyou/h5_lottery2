<template>
<div  id="content-wrapper" class="pingtexiaowei">
	<div class="so-con-right" >
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 平特肖尾 -->
				<div id="so-item0" class="content-right active item_one" >
					<ul>
						<!-- 一肖 -->
						<li class="select-li bet_lm" v-for="(item, index) in pingTeXiaoWeiList">
							<div class="bet_panel">
								<h2>
									{{item.name}}
								</h2>
								<div class="bet_box">
									<p :data-id="itemChild.cid" :class="isBtnActived(itemChild)"  v-for="(itemChild, index2) in item.childrens" @click="betSelect(itemChild, item)">
										<span>{{itemChild.name}}</span>
										<span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
										<span class="num_group" v-if="index == 0">
											<span :class="'lhc_ball num_' + item2" v-for="item2 in shengXiaoMapNumber[index2]"></span>
										</span>
										<span class="num_group" v-if="index == 1">
											<span :class="'lhc_ball num_' + item2" v-for="item2 in weiNumList[index2]"></span>
										</span>
									</p>
								</div>
							</div>
						</li>
						<!-- 一肖 -->
					</ul>
				</div>
				<!-- 平特肖尾 -->
			</div><!-- tab_container -->
		</div><!-- scroller -->
	</div><!-- so-con-right -->
</div>
</template>

<script>
    import playTreeIndexByCid from '@/PlayTreeIndexByCid'
    import LhcMixin from '@/components/lhc/LhcMixin'

    export default {
        name: 'PingTeXiaoWei',
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
				default:"鸡"
			}
        },
        data() {
            return {
                pingTeXiaoWeiList: [],
                maxBallNum: 50,
                playType: 'normal',
                shengXiaoList: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
				myScroll: null
            }
        },
        mounted() {
            if (playTreeIndexByCid.get('1100000')) {
                this.pingTeXiaoWeiList = playTreeIndexByCid.get('1101000').childrens
            }

            this.myScroll = new iScroll("scroller",{  // 投注区域
                onScrollEnd() {
                    this.refresh() ;
                },
                vScroll:true,
                mouseWheel: true ,
                hScrollbar:false ,
                vScrollbar:false ,
                click: true ,
                useTransform: false ,
                useTransition: false ,
            });

            this.myScroll.refresh()
            this.myScroll.scrollTo(0, 300)
        },
        created() {
        },
        computed: {
            //根據本命年算出對應生肖的號碼
            shengXiaoMapNumber() {
                let getIndex = (item) => {
                    return item == this.currentBaseShengXiao
                }

                let index = _.findIndex(this.shengXiaoList, getIndex)
                return this.computeShengXiaoNum(index + 1)
            },
			//算出對應的尾數號碼
			weiNumList() {
                return this.computeWeiNumList()
			}
        },
		updated() {
            this.setScrollHeight(false, 0)
        },
        watch: {
            playTreeList() {
                if (playTreeIndexByCid.get('1100000')) {
                    this.pingTeXiaoWeiList = playTreeIndexByCid.get('1101000').childrens
                }
			},
        },
        methods: {
            isBtnActived(item) {
                if(!this) return ''

                let classStr = 'so-con-span-long'
                if (_.find(this.betSelectedList, {cid: item.cid})) {
                    classStr += ' active'
                }
                return classStr
            },
			computeWeiNumList() {
                var res = [[], [], [], [], [], [], [], [], [], []]
				for (var i = 1; i < this.maxBallNum; i++) {
                    if (i < 10)
                    	res[i % 10].push("0" + i)
					else {
                        res[i % 10].push("" + i)
					}
				}
				return res
            },
        }
    }
</script>


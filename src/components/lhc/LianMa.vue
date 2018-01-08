<template>
<div  id="content-wrapper" class="lianma">
	<div class="so-con-right" >
        <div class="tab_panel">
            <div class="hd lhc_tab" >
                <ul class="tab tab_mid tab_two">
                    <li :class="currentBar == index && 'on'" :data-tab="(index + 1)" :data-id="item.cid" v-for="(item, index) in playGroupBar" @click="barChange(index)"><a href="javascript:;">{{item.name}}</a></li>
                </ul>
            </div><!-- hd lhc_tab -->
        </div><!-- tab_panel -->
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 三全中 -->
				<div :id="'so-item' + index" class="content-right item_one" v-for="(lianMa, index) in lianMaNList" v-if="currentBar == index">
					<ul>
						<!-- 1-49 -->
						<li class="select-li" v-for="(lianMaItem, lianMaItemIndex) in lianMa.childrens">
							<div class="bet_panel">
								<h2>
									{{lianMa.name}}
								</h2>
								<div class="bet_box">
									<p :data-id="lianMaGrandChild.cid" :class="showLianMaClass(lianMaGrandChild)" v-for="lianMaGrandChild in lianMaItem.children" @click="selectLianType(lianMaGrandChild, lianMa)">
										<span :class="'lhc_ball num_'+ (lianMaGrandChild.name)">{{lianMaGrandChild.name}}</span>
										<span class="bet-times-group" v-if="lianMaGrandChild.cid == 1062101 || lianMaGrandChild.cid == 1064101">
											<span class="bet-times">{{lianMaGrandChild.oddsData.payoff}}</span>
										</span>
										<span class="bet-times" v-else>{{payoffFormat(lianMaGrandChild.oddsData.payoff)}}</span>
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
        name: 'LianMa',
		mixins: [LhcMixin],
        props: ['playTreeList', 'betSelectedList', 'combineCnt'],
        data() {
            return  {
                playGroupBar:[],
                currentBar: 0,
				maxBallNum: 49,
                limitItemNum: 7,
                lianMaNumList:[],
				playType: 'combination',
                lianMaNList: [],
            }
        },
        mounted() {
            if (playTreeIndexByCid.get('1060000')) {
                this.playGroupBar = playTreeIndexByCid.get('1060000').childrens
                this.handlePlayList()
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
        updated() {
            this.setScrollHeight(true, this.currentBar)
        },
        watch: {
            playTreeList() {
                if (playTreeIndexByCid.get('1060000')) {
                    this.playGroupBar = playTreeIndexByCid.get('1060000').childrens
                    this.handlePlayList()
                }
            }
        },
        methods: {
            barChange(index) {
                this.currentBar = index;
                this.$emit('lhcclearcnt')
                this.$emit('lhcclearbet')
                this.myScroll.refresh()
                this.myScroll.scrollTo(0, 300)
            },
            showLianMaClass(item) {
                let  classStr = "so-con-span-short"
                if(!this) return ''

                if(item.cid == 1062101 || item.cid == 1064101 || item.cid == 1066101) {
                	classStr += ' bet-times-2'
                }

                if(item.cid == 1066101) {
                	classStr += ' bet-times-3'
                }

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
				this.lianMaNumList = this.computeNumList()
                _.forEach(playTreeIndexByCid.get('1060000').childrens, (item, index) => {
                    let children = []
                    _.forEach(this.lianMaNumList, (lianMa, index) => {
                        let payoff = ""
						let itemCid = item.cid
						let playName = ""
                        let cid = 100000

						if (itemCid == 1061000) {
                            cid = 1061101
							payoff = playTreeIndexByCid.get('1061101').oddsData.payoff
							playName = playTreeIndexByCid.get('1061101').playName
						}
						else if (itemCid == 1062000) {
							cid = 1062101
							payoff = this.payoffFormat(playTreeIndexByCid.get('1062101').oddsData.payoff) + "/"
							payoff += this.payoffFormat(playTreeIndexByCid.get('1062102').oddsData.payoff)
                            playName = playTreeIndexByCid.get('1062101').playName
                        }
                        else if (itemCid == 1063000) {
                            cid = 1063101
                            payoff = playTreeIndexByCid.get('1063101').oddsData.payoff
                            playName = playTreeIndexByCid.get('1063101').playName
                        }
                        else if (itemCid == 1064000) {
                            cid = 1064101
                            payoff = this.payoffFormat(playTreeIndexByCid.get('1064101').oddsData.payoff) + "/"
                            payoff += this.payoffFormat(playTreeIndexByCid.get('1064102').oddsData.payoff)
                            playName = playTreeIndexByCid.get('1064101').playName
                        }
						else if (itemCid == 1065000) {
                            cid = 1065101
                            payoff = playTreeIndexByCid.get('1065101').oddsData.payoff
                            playName = playTreeIndexByCid.get('1065101').playName
                        }
						else if (itemCid == 1066000) {
                            cid = 1066101
                            payoff = playTreeIndexByCid.get('1066101').oddsData.payoff
                            playName = playTreeIndexByCid.get('1066101').playName
                        }
                        this.$set(children, index, _.extend({},
                            {cid: cid, playName:playName, name: lianMa, oddsData: {payoff:payoff}}))
                    })

                    this.$set(this.lianMaNList, index,
                        _.extend({}, item, {childrens: [{children: children}]})
                    )
                })
            },
            selectLianType(item, parentItem) {
                let itemInfo = {}
                itemInfo.limit = this.limitItemNum

                if (parentItem.name == "三全中") {
                    itemInfo.num = 3
                    itemInfo.limit = 10
                }
                else if (parentItem.name == "三中二") {
                    itemInfo.num = 3
                }
                else if (parentItem.name == "二全中") {
                    itemInfo.num = 2
                }
                else if (parentItem.name == "二中特") {
                    itemInfo.num = 2
                }
                else if (parentItem.name == "特串") {
                    itemInfo.num = 2
                }
                else if (parentItem.name == "四全中") {
                    itemInfo.num = 4
                    itemInfo.limit = 4
                }

                itemInfo.playType = this.playType

                itemInfo.item = item
                this.$emit('lhcselectlian', itemInfo)
            },
        }
    }
</script>


<template>
<div  id="content-wrapper" class="lianxiao">

	<div class="so-con-right" >
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->

			<div class="tab_panel">

				<div class="hd lhc_tab tab_short" >
					<ul class="tab tab_mid tab_two">
						<!-- <li :class="(index==0 && 'on')" :data-tab="index" v-for="(kind,index) in continuedNumberList" @click="subTabChange($event, kind, index)"><a href="javascript:;">{{kind.name}}</a></li> -->
						<li :class="currentBar == index && 'on'" :data-tab="(index + 1)" :data-id="item.cid" v-for="(item, index) in playGroupBar" @click="barChange(index)"><a href="javascript:;">{{item.name}}</a></li>
					</ul>
				</div><!-- hd lhc_tab -->
			</div><!-- tab_panel -->

			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 二连肖 -->
				<div :id="'so-item' + index" class="content-right item_one" v-for="(item, index) in lianXiaoNList" v-if="currentBar == index">
					<ul>
						<!-- 1-49 -->
						<li class="select-li" v-for="(shengXiao, index2) in item.childrens" >
							<div class="bet_panel" >
								<h2>
									{{item.name}}
								</h2>
								<div class="bet_box">
									<p :data-id="shengXiaoItem.cid" :class="showLianXiaoClass(shengXiaoItem)" v-for="(shengXiaoItem, shengXiaoItemIndex) in shengXiao.childrens" @click="selectLianType(shengXiaoItem, item)">
										<span>{{shengXiaoItem.name}}</span>
										<span class="bet-times">{{payoffFormat(shengXiaoItem.oddsData.payoff)}}</span>
										<span class="num_group">
											<span :class="'lhc_ball num_' + item2" v-for="item2 in shengXiaoMapNumber[shengXiaoItemIndex]"></span>
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
        name: 'LianXiao',
        mixins: [LhcMixin],
        props: ['playTreeList', 'betSelectedList', 'currentBaseShengXiao'],
        data:function() {
            return  {
                playGroupBar:[],
				playType: 'combination',
                currentBar: 0,
				limitItemNum: 12,
                shengXiaoList: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
                lianXiaoNList: [],
            }
        },
        mounted() {
            if (playTreeIndexByCid.get('1110000').childrens) {
                this.playGroupBar = playTreeIndexByCid.get('1111000').childrens
                this.handlePlayList()
            }
        },
		computed: {
            shengXiaoMapNumber() {
                let getIndex = (item) => {
                    return item == this.currentBaseShengXiao
                }

                let index = _.findIndex(this.shengXiaoList, getIndex)
                return this.computeShengXiaoNum(index + 1)
            },
		},
        watch: {
            playTreeList() {
                if (playTreeIndexByCid.get('1110000').childrens) {
                    this.playGroupBar = playTreeIndexByCid.get('1111000').childrens
                    this.handlePlayList()
                }
            }
        },
        methods: {
            barChange(index) {
                this.currentBar = index;
                this.$emit('lhcclearcnt')
                this.$emit('lhcclearbet')
            },
            showLianXiaoClass(item) {
                let classStr = 'so-con-span-long'

                if (_.find(this.betSelectedList, {name: item.name})) {
                    classStr += ' active'
                }

                return classStr
            },
            handlePlayList() {
                _.forEach((playTreeIndexByCid.get('1111000')).childrens, (item, index) => {
                    let children = []
					_.forEach(this.shengXiaoList, (shengXiao, index2) => {
					    let payoff = 0
						let cid = 100000

						if (item.cid == 1111100) {
					        cid = 1111190
                            if (shengXiao === this.currentBaseShengXiao) {
                                payoff = (playTreeIndexByCid.get()['1111101']).oddsData.payoff
                            }
                            else {
                                payoff = (playTreeIndexByCid.get()['1111102']).oddsData.payoff
                            }
                        }
                        else if (item.cid == 1111200) {
                            cid = 1111290
                            if (shengXiao === this.currentBaseShengXiao) {
                                payoff = (playTreeIndexByCid.get()['1111201']).oddsData.payoff
                            }
                            else {
                                payoff = (playTreeIndexByCid.get()['1111202']).oddsData.payoff
                            }
						}
                        else if (item.cid == 1111300) {
                            cid = 1111390
                            if (shengXiao === this.currentBaseShengXiao) {
                                payoff = (playTreeIndexByCid.get()['1111301']).oddsData.payoff
                            }
                            else {
                                payoff = (playTreeIndexByCid.get()['1111302']).oddsData.payoff
                            }
                        }
                        else if (item.cid == 1111400) {
                            cid = 1111490
                            if (shengXiao === this.currentBaseShengXiao) {
                                payoff = (playTreeIndexByCid.get()['1111401']).oddsData.payoff
                            }
                            else {
                                payoff = (playTreeIndexByCid.get()['1111402']).oddsData.payoff
                            }
                        }

					    this.$set(children, index2, _.extend({},
								{cid: cid, name: shengXiao, oddsData:{payoff:payoff}}))
					})

                    this.$set(this.lianXiaoNList, index,
                        _.extend({}, item, {childrens: [{childrens: children}]})
                    )
                })
            },
			selectLianType(item, parentItem) {
				let itemInfo = {}
                itemInfo.limit = this.limitItemNum

                if (parentItem.name == "二连肖") {
					itemInfo.num = 2
				}
				else if (parentItem.name == "三连肖") {
                    itemInfo.num = 3
                }
                else if (parentItem.name == "四连肖") {
                    itemInfo.num = 4
                }
                else if (parentItem.name == "五连肖") {
                    itemInfo.num = 5
                }

                console.log("item cid", item.cid)
                itemInfo.playType = this.playType

                item.parentItem = parentItem
				item.selectNum = itemInfo.num

				itemInfo.item = item
				this.$emit('lhcselectlian', itemInfo)
			},
        }
    }
</script>

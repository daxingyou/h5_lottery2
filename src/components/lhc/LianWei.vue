<template>
<div  id="content-wrapper" class="lianwei">

	<div class="so-con-right" >
        <div class="tab_panel">

            <div class="hd lhc_tab tab_short" >
                <ul class="tab tab_mid tab_two">
                    <li :class="currentBar == index && 'on'" :data-tab="(index + 1)" :data-id="item.cid" v-for="(item, index) in playGroupBar" @click="barChange(index)"><a href="javascript:;">{{item.name}}</a></li>
                </ul>
            </div><!-- hd lhc_tab -->

        </div><!-- tab_panel -->
            
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->

			

			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 二连尾 -->
				<div :id="'so-item' + index" class="content-right item_one" v-for="(item, index) in lianWeiNList" v-if="currentBar == index">
					<ul>
						<!-- 1-49 -->
						<li class="select-li" v-for="(lianWei, index2) in item.childrens" >
							<div class="bet_panel" >
								<h2>
									{{item.name}}
								</h2>
								<div class="bet_box">
									<p :data-id="lianWeiItem.cid" :class="showLianＷeiClass(lianWeiItem)" v-for="(lianWeiItem, lianWeiItemIndex) in lianWei.childrens" @click="selectLianType(lianWeiItem, item)">
										<span>{{lianWeiItem.name}}</span>
										<span class="bet-times">{{payoffFormat(lianWeiItem.oddsData.payoff)}}</span>
										<span class="num_group">
											<span :class="'lhc_ball num_' + item2" v-for="item2 in weiNumList[lianWeiItemIndex]"></span>
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
        name: 'LianWei',
        mixins: [LhcMixin],
        props: ['playTreeList', 'betSelectedList'],
        data() {
            return  {
                playGroupBar:[],
                playType: 'combination',
                currentBar: 0,
                limitItemNum: 10,
                currentBaselianWei: 0,
				lianWeiNameList:["0尾", "1尾", "2尾", "3尾", "4尾", "5尾", "6尾", "7尾", "8尾", "9尾"],
                lianWeiNList: [],
            }
        },
        mounted() {
            if (playTreeIndexByCid.get('1140000').childrens) {
                this.playGroupBar = playTreeIndexByCid.get('1141000').childrens
                this.handlePlayList()
            }

            this.myScroll = new iScroll("scroller",{  // 投注区域
                onScrollEnd() {
                    console.log("end")
                    this.refresh() ;
                },
                /* onBeforeScrollMove:function(e){
                     e.preventDefault();
                 },*/
                vScroll:true,
                mouseWheel: true ,
                hScrollbar:false ,
                vScrollbar:false ,
                click: true ,
                // momentum: false ,

                useTransform: false ,
                useTransition: false ,
                // snapThreshold:0.5
            });

            this.myScroll.refresh()
            this.myScroll.scrollTo(0, 300)
        },
        updated() {
            /*let wrapper = $('#content-wrapper')
            if (wrapper) {
                let myScroll = new iScroll(wrapper)
            }*/
            var _h =  window.innerHeight - ($('.so-in-top').height() + $('.so-in-main').height() + $('.so-foot').height() + $('.tab_panel').height())
            $('#scroller').css('height',  _h )
            $('.tab_container').height( $('#so-item'+this.currentBar).height() + 40 )
            
        },
        computed: {
            weiNumList() {
                return this.computeWeiNumList()
            }
        },
        watch: {
            playTreeList() {
                if (playTreeIndexByCid.get('1140000').childrens) {
                    this.playGroupBar = playTreeIndexByCid.get('1141000').childrens
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
            showLianＷeiClass(item) {
                let classStr = 'so-con-span-long'

                if (_.find(this.betSelectedList, {name: item.name})) {
                    classStr += ' active'
                }

                return classStr
            },
            computeWeiNumList() {
                var res = [[], [], [], [], [], [], [], [], [], []]
                for (var i = 1; i < 50; i++) {
                    if (i < 10)
                        res[i % 10].push("0" + i)
                    else {
                        res[i%10].push("" + i)
                    }
                }
                return res
            },
            handlePlayList() {
                _.forEach(playTreeIndexByCid.get('1141000').childrens, (item, index) => {
                    let children = []

                    _.forEach(this.lianWeiNameList, (lianWei, index2) => {
                        let payoff = 0
						let cid
						let playName = ""

                        if (item.cid == 1141100) {
                            cid = 1141190
							playName = playTreeIndexByCid.get('1141190').playName
                            if (index2 === this.currentBaselianWei) {
                                payoff = playTreeIndexByCid.get('1141101').oddsData.payoff
                            }
                            else {
                                payoff = playTreeIndexByCid.get('1141102').oddsData.payoff
                            }
                        }
						else if (item.cid == 1141200) {
                            cid = 1141290
                            playName = playTreeIndexByCid.get('1141290').playName
                            if (index2 === this.currentBaselianWei) {
                                payoff = playTreeIndexByCid.get('1141201').oddsData.payoff
                            }
                            else {
                                payoff = playTreeIndexByCid.get('1141202').oddsData.payoff
                            }
						}
						else if (item.cid == 1141300) {
                            cid = 1141390
                            playName = playTreeIndexByCid.get('1141390').playName
                            if (index2 === this.currentBaselianWei) {
                                payoff = playTreeIndexByCid.get('1141301').oddsData.payoff
                            }
                            else {
                                payoff = playTreeIndexByCid.get('1141302').oddsData.payoff
                            }
						}
						else if (item.cid == 1141400) {
                            cid = 1141490
                            playName = playTreeIndexByCid.get('1141490').playName
                            if (index2 === this.currentBaselianWei) {
                                payoff = playTreeIndexByCid.get('1141401').oddsData.payoff
                            }
                            else {
                                payoff = playTreeIndexByCid.get('1141402').oddsData.payoff
                            }
						}

                        this.$set(children, index2, _.extend({},
                            {cid: cid, playName: playName, name: lianWei, oddsData:{payoff: payoff}}))
                    })

                    this.$set(this.lianWeiNList, index,
                        _.extend({}, item, {childrens: [{childrens: children}]})
                    )
                })
            },
            selectLianType(item, parentItem) {
                let itemInfo = {}
                itemInfo.limit = this.limitItemNum

                if (parentItem.name == "二连尾") {
                    itemInfo.num = 2
                }
                else if (parentItem.name == "三连尾") {
                    itemInfo.num = 3
                }
                else if (parentItem.name == "四连尾") {
                    itemInfo.num = 4
                }
                else if (parentItem.name == "五连尾") {
                    itemInfo.num = 5
                }

                itemInfo.playType = this.playType

				item.selectNum = itemInfo.num

                itemInfo.item = item
                this.$emit('lhcselectlian', itemInfo)
            },
        }
    }
</script>


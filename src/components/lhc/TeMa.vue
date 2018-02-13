<template>
<div id="content-wrapper" class="tema lhc-wrapper" ref="temalhcwrapper">
	<div class="so-con-right" >
        <div class="tab_panel">
            <ul class="lhc_top_tab" >
                <li :data-tab="index" :class="(currentGroupIndex == (Math.floor(group.cid/1000))  && 'active')"  v-for="(group, index) in groupName" @click="switchPlayGroup(Math.floor(group.cid/1000))">
                    <!-- <a :href="'#so-item'+index">{{kind}}</a>-->
                    <span>{{group.name}}</span>
                </li>
            </ul>

            <div class="hd lhc_tab" id="lhc_tab_test">
                <ul class="tab tab_mid tab_two">
                    <li :data-tab="index" :class="isXiaoBtnActived(index)" v-for="(shengXiao, index) in shengXiaoList"  @click="selectShengXiao(index, currentGroupIndex)"><a href="javascript:;">{{shengXiao}}</a></li>
                </ul>
            </div><!-- hd lhc_tab -->
        </div><!-- tab_panel -->

		<div class="scrollerClass" id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container" ref="tab_container_test">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 特码B -->
				<div id="so-item0" class="content-right active item_one"
					 v-show="currentGroupIndex == 1011">
					<ul>
						<!-- 1-49 -->
						<li class="select-li">
							<div class="bet_panel">
								<div class="bet_box">
									<p :data-id="item.cid" class="so-con-span-short" :class="isBtnActived(item)" v-for="(item, index) in TeMaBList" @click="betSelect(item)">
										<span :class="'lhc_ball num_'+ (item.name)">{{item.name}}</span>
										<span class="bet-times">{{payoffFormat(item.oddsData.payoff)}}</span>
									</p>
								</div>
							</div>
						</li>

						<!-- 两面玩法組 LiangMian -->
						<li class="select-li bet_lm">
							<div class="bet_panel">
								<h2>
									两面
								</h2>
								<div class="bet_box">
									<p :data-id="item.cid" :class="isBtnActived(item)" v-for="(item, index) in LiangMianB" @click="betSelect(item)">
										<span>{{item.name}}</span>
										<span class="bet-times">{{payoffFormat(item.oddsData.payoff)}}</span>
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>

				<!-- 特码A -->
				<div id="so-item1" class="content-right "
					 v-show="currentGroupIndex == 1012"
				>
					<ul>
						<!-- 1-49 -->
						<li class="select-li" >
							<div class="bet_panel">
								<div class="bet_box">
									<p :data-id="item.cid" class="so-con-span-short" :class="isBtnActived(item)" v-for="(item, index) in TeMaAList" @click="betSelect(item)">
										<span :class="'lhc_ball num_' + item.name">{{item.name}}</span>
										<span class="bet-times">{{payoffFormat(item.oddsData.payoff)}}</span>
									</p>
								</div>
							</div>
						</li>
						<!-- 两面玩法組 LiangMian -->
						<li class="select-li bet_lm" >
							<div class="bet_panel">
								<h2>
									两面
								</h2>
								<div class="bet_box">
									<p :data-id="item.cid" :class="isBtnActived(item)" v-for="(item, index) in LiangMianA" @click="betSelect(item)">
										<span>{{item.name}}</span>
										<span class="bet-times">{{payoffFormat(item.oddsData.payoff)}}</span>
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
        name: 'TeMa',
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
				default: "狗",
			}
		},
		data() {
            return {
                groupName: [], //顯示特碼 A 跟 B
                shengXiaoList: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
                shengXiaoMapNumber:[],
				currentGroupIndex: 1011,
				currentBarIndex: 0,
                TeMaAList: [],
                TeMaBList: [],
                LiangMianB: [],
				LiangMianA: [],
                myScroll: null,
            }
        },
        mounted(){
            if (playTreeIndexByCid.get('1010000')) {
                let item1 = playTreeIndexByCid.get('1012000')
				let item2 = playTreeIndexByCid.get('1011000')
                if (item2) {
                    this.currentGroupIndex = 1011
				}
				else {
                    this.currentGroupIndex = 1012
				}

                if (item2) {
                    this.groupName.push(item2)
                    this.TeMaBList = playTreeIndexByCid.get('1011100').childrens
                    this.LiangMianB = playTreeIndexByCid.get('1011200').childrens
                }

                if (item1) {
                    this.groupName.push(item1)
                    this.TeMaAList = playTreeIndexByCid.get('1012100').childrens
                    this.LiangMianA = playTreeIndexByCid.get('1012200').childrens
                }
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

        },
		updated() {
            this.setScrollHeight(true, this.currentBarIndex)
		},
		watch: {
            playTreeList() {
                this.groupName = []
                if (playTreeIndexByCid.get('1010000')) {
                    let item1 = playTreeIndexByCid.get('1012000')
                    let item2 = playTreeIndexByCid.get('1011000')
                    if (item2) {
                        this.currentGroupIndex = 1011
                    }
                    else {
                        this.currentGroupIndex = 1012
                    }

                    if (item2) {
                        this.groupName.push(item2)
                        this.TeMaBList = playTreeIndexByCid.get('1011100').childrens
                        this.LiangMianB = playTreeIndexByCid.get('1011200').childrens
                    }

                    if (item1) {
                        this.groupName.push(item1)
                        this.TeMaAList = playTreeIndexByCid.get('1012100').childrens
                        this.LiangMianA = playTreeIndexByCid.get('1012200').childrens
                    }
                }
            },
		},
      	methods: {
            isXiaoBtnActived(xiao) {
                if(!this) return ''

				if (this.shengXiaoMapNumber.length > 0) {
                    let intercount = _.intersection(this.shengXiaoMapNumber[xiao], this.betSelectedList).length
                    return intercount == this.shengXiaoMapNumber[xiao].length ? 'on' : ''
                }
            },
			//特碼 A 跟 B 切換
			switchPlayGroup(cid) {
                this.currentGroupIndex = cid;
                if (cid == 1011)
                    this.currentBarIndex = 0
				else {
                    this.currentBarIndex = 1
				}
                this.$emit('lhcclearbet')
                this.myScroll.refresh()
                this.myScroll.scrollTo(0, 300)
			},
            computeShengXiao(baseIndex, teMaType) {
                let res = [[], [], [], [], [], [], [], [], [], [], [], []]
                let baseIndexList = [];
                let cidPrefix = ''
                let itemCnt

                if (teMaType == 1011) {
					itemCnt = this.TeMaBList.length
            	}
            	else {
                    itemCnt = this.TeMaAList.length
                }

			    if (itemCnt > 0) {
                    if (teMaType == 1011) {
                        cidPrefix = this.TeMaBList[0].cid.toString().substr(0, 5)
                    }
                    else {
                        cidPrefix = this.TeMaAList[0].cid.toString().substr(0, 5)
                    }

                    if (baseIndex == 1) {
                        baseIndexList[0] = 0;
                        for (let i = 11; i >= 1; i--) {
                            baseIndexList[12 - i] = i
                        }
                    }
                    else if (baseIndex == 1) {
                        baseIndexList[0] = 1;
                        baseIndexList[1] = 0;

                        j = 11
                        for (let i = 2; i < 12; i++) {
                            baseIndexList[i] = j
                            j--
                        }
                    }
                    else {
                        if (baseIndex + 1 <= 12) {
                            let j = 1
                            for (let i = baseIndex - 1; i >= 0; i--) {
                                baseIndexList[i] = j
                                j++
                            }
                            baseIndexList[baseIndex] = 0

                            j = 11
                            for (let i = baseIndex + 1; i < 12; i++) {
                                baseIndexList[i] = j
                                j--
                            }
                        }
                    }

                    for (let i = 1; i < 50; i++) {
                        for (let j = 0; j < baseIndexList.length; j++) {
                            if (i % 12 == baseIndexList[j]) {
                                let dataId = ""
                                let include
                                if (i < 10) {
                                    dataId = cidPrefix + "0" + i
                                }
                                else {
                                    dataId = cidPrefix + i
                                }

                                if (teMaType == 1011) {
                                    include = _.find(this.TeMaBList, {cid: parseInt(dataId)})
                                }
                                else {
                                    include = _.find(this.TeMaAList, {cid: parseInt(dataId)})
                                }
                                if (include)
                                	res[j].push(include)
                            }
                        }
                    }
                }
                return res;
            },
			selectShengXiao(index, teMaType) {
                let getIndex = (item) => {
                    return item == this.currentBaseShengXiao
                }

                let index2 = _.findIndex(this.shengXiaoList, getIndex)
                this.shengXiaoMapNumber = this.computeShengXiao(index2 + 1, teMaType)
				this.$emit("lhcselectshengxiao", this.shengXiaoMapNumber[index])
            },
		}
    }
</script>
<style type="text/css" scoped>
    
</style>

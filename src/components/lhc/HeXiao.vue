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
            betSelectedList: { //儲存下注內容
                type: Array,
                default: [],
            },
            currentBaseShengXiao: { //本命年生肖，在 index.vue 透過 API 取得再往下傳
                type: String,
                default:"鸡"
            }
        },
        data() {
            return {
                HeXiaoList: [],
                shengXiaoList: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
                betRate: 0, //用來顯示動態產生的賠率
				maxBallNum: 49, //用來產生對應生效的球號，沒有 49 號
				maxHeXiaoItem: 11, //對應玩法, 最多十一合肖
				minHeXiaoItem: 2,  //對應玩法， 最少二合肖
				playGroup: [], //存玩法群 (二合肖，三合肖...十一合肖)
				playType: 'group', //屬於群組玩法，不管選幾個都是注數都是一注
				myScroll: null
            }
        },
        mounted() {
            if (playTreeIndexByCid.get('1130000')) {
                this.handlePlayList()
            }
            this.myScroll = new iScroll("scroller",{  // 投注区域
                onScrollEnd() {
                    this.refresh() ;
                },
                vScroll:true,
                mouseWheel: false ,
                hScrollbar:false ,
                vScrollbar:false ,
                click: true ,
                useTransform: false ,
                useTransition: false ,
            });
            this.myScroll.refresh()
            this.myScroll.scrollTo(0, 100)
        },
        created() {
        },
        computed: {
            //產生生肖對應的數字並顯示在 UI 上
            shengXiaoMapNumber() {
                let getIndex = (item) => {
                    return item == this.currentBaseShengXiao
                }

                let index = _.findIndex(this.shengXiaoList, getIndex)
                return this.computeShengXiaoNum(index + 1, this.maxBallNum)
            },
        },
        updated() {
            this.setScrollHeight(false, 0)
        },
        watch: {
            playTreeIndexByCid() {
                if (playTreeIndexByCid.get('1130000')) {
                    this.handlePlayList()
                }
            },
			//監聽下注內容一有變動，判斷目前的玩法 (二合肖，三合肖... 十一合肖)
			betSelectedList() {
                let nBetItem = _.size(this.betSelectedList)

				//不屬於任何一種玩法，賠率為 0，UI 呈現是 '-'
				if (nBetItem < this.minHeXiaoItem)
				    this.betRate = 0

				//確認是不是有形成某種玩法
                let matchItem = _.find(this.playGroup, {number: nBetItem})
                if (matchItem) { //有形成某種玩法
					//取得對應玩法的賠率，並設定注數為 1
                    this.betRate = matchItem.item.oddsData.payoff
                    this.$emit('lhcsetcnt',1)

					//將下注內容的玩法 id 換成對應的玩法，並加上 playName 和賠率
                    _.forEach(this.betSelectedList, (item, index) => {
					    item.cid = matchItem.item.cid
						item.playName = matchItem.item.playName
						item.oddsData.payoff = this.betRate
					})
				}
				else {
                    //沒有形成對應的玩法，注數設成 0，並更改下注內容的玩法 id 跟賠率
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
            //用來處理 li 的 class 是否加入 active 屬性
            isBtnActived(item) {
                if(!this) return ''

                let classStr = 'so-con-span-long'
                if (_.find(this.betSelectedList, {name: item.name})) {
                    classStr += ' active'
                }
                return classStr
            },
			//產生 UI 顯示所需的資料和取得玩法群
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
			//用來把 item 傳到 index.vue 做處理
            betSelect(item) {
                item.limit = this.maxHeXiaoItem
                this.$emit('lhcselectbet', item);
            }
        }
    }
</script>

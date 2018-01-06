<template>
<div id="content-wrapper">
	<div class="so-con-right" >
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 总肖 -->
				<div id="so-item0" class="content-right active item_one" >
					<ul>
						<!-- 总肖 -->
						<li class="select-li bet_lm" v-for="(item, index) in zhengXiaoList">
							<div class="bet_panel">
								<h2>
									{{item.name}}
								</h2>
								<div class="bet_box">
									<p :data-id="itemChild.cid" :class="isBtnActived(itemChild)"  v-for="(itemChild, index) in item.childrens" @click="betSelect(itemChild)">
										<span>{{itemChild.name}}</span>
										<span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
										<span class="num_group">
											<span :class="'lhc_ball num_' + item2" v-for="item2 in shengXiaoMapNumber[index]">{{item2}}</span>
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
        name: 'ZhengXiao',
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
                zhengXiaoList: [],
                shengXiaoList: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
				myScroll: null
            }
        },
        created() {
            console.log("yes created")

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
        mounted() {
            if (_.size(playTreeIndexByCid.get('1151100').childrens) > 0) {
                this.handlePlayList()
            }

            this.myScroll = new iScroll("content-wrapper",{  // 投注区域
                onScrollEnd() {
                    this.refresh() ;
                },
                vScroll:true,
                mouseWheel: true,
                hScrollbar:false ,
                vScrollbar:false ,
                click: true ,

                useTransform: false ,
                useTransition: false ,
            });
        },
        updated() {
            this.setClickHeight($('.so-con-right'), $('#so-item0').height())
        },
        watch: {
            playTreeList() {
                this.handlePlayList()
            },
        },
        methods: {
            isBtnActived(item) {
                if (!this) return ''

                let classStr = 'so-con-span-long'
                if (_.find(this.betSelectedList, {name: item.name})) {
                    classStr += ' active'
                }
                return classStr
            },
            handlePlayList() {
				let children = []
                _.forEach(this.shengXiaoList, (shengXiao, index) => {
                    let cid = 1151190
					let payoff = 0
					let playName = playTreeIndexByCid.get('1151190').playName + shengXiao

					if (shengXiao == this.currentBaseShengXiao) {
                        payoff = playTreeIndexByCid.get('1151101').oddsData.payoff
					}
					else {
                        payoff = playTreeIndexByCid.get('1151106').oddsData.payoff
                	}

                    this.$set(children, index, _.extend({},
                        {cid: cid, playName: playName, name: shengXiao, oddsData:{payoff:payoff}}))
                })

				let item = playTreeIndexByCid.get('1151190')

                this.$set(this.zhengXiaoList, 0,
                    _.extend({}, item, {childrens: children}))
            },
        }
    }
</script>

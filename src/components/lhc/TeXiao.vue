<template>
<div  id="content-wrapper" class="texiao">

	<div class="so-con-right" >
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 特肖 -->
				<div id="so-item0" class="content-right active item_one">
					<ul>
						<!-- 特肖 -->
						<li class="select-li bet_lm" v-for="item in teXiaoList">
							<div class="bet_panel">
								<h2>
									{{item.name}}
								</h2>
								<div class="bet_box">
									<p :data-id="itemChild.cid" :class="isBtnActived(itemChild)"  v-for="(itemChild, index) in item.childrens" @click="betSelect(itemChild, item)">
										<span>{{itemChild.name}}</span>
										<span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
										<span class="num_group">
											<span :class="'lhc_ball num_' + item2" v-for="item2 in shengXiaoMapNumber[index]">{{item2}}</span>
										</span>
									</p>
								</div>
							</div>
						</li>
						<!-- 特肖 -->
					</ul>
				</div>
				<!-- 特肖 -->
			</div><!-- tab_container -->
		</div><!-- scroller -->
	</div><!-- so-con-right -->
</div>
</template>

<script>
    import playTreeIndexByCid from '@/PlayTreeIndexByCid'
    import LhcMixin from '@/components/lhc/LhcMixin'

    export default {
        name: 'TeXiao',
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
                teXiaoList: [],
                shengXiaoList: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
				myScroll: null
            }
        },
        mounted(){
            if (_.size(playTreeIndexByCid.get('1121000').childrens) > 0) {
                this.teXiaoList = playTreeIndexByCid.get('1121000').childrens
            }

            this.myScroll = new iScroll("content-wrapper",{  // 投注区域
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
        },
        created() {
        },
        computed: {
            shengXiaoMapNumber: function() {
                let getIndex = (item) => {
                    return item == this.currentBaseShengXiao
                }

                let index = _.findIndex(this.shengXiaoList, getIndex)
				return this.computeShengXiaoNum(index + 1)
			},
        },
        updated() {
            this.setClickHeight($('.so-con-right'), $('#so-item0').height())
        },
        watch: {
            playTreeList() {
                if (_.size(playTreeIndexByCid.get('1121000').childrens) > 0) {
                    this.teXiaoList = playTreeIndexByCid.get('1121000').childrens
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
        }
    }
</script>

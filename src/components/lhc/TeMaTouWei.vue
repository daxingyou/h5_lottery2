<template>
<div  id="content-wrapper" class="sepo">

	<div class="so-con-right" >
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 特码头尾 -->
				<div id="so-item0" class="content-right active item_one" >
					<ul>
						<!-- 头数 -->
						<li class="select-li" v-for="(item, index) in teMaTouWeiList">
							<div class="bet_panel" >
								<h2>
									{{item.name}}
								</h2>
								<div class="bet_box">
									<p :data-id="itemChild.cid" :class="isBtnActived(itemChild)"  v-for="(itemChild, index2) in item.childrens" @click="betSelect(itemChild, item)">
										<span>{{itemChild.name}}</span>
										<span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
										<span class="num_group" v-if="index == 1">
											<span :class="'lhc_ball num_' + item2" v-for="item2 in weiNumList[index2]"></span>
										</span>
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- 特码头尾 -->
			</div><!-- tab_container -->
		</div><!-- scroller -->
	</div><!-- so-con-right -->
</div>
</template>

<script>
    import playTreeIndexByCid from '@/PlayTreeIndexByCid'
    import LhcMixin from '@/components/lhc/LhcMixin'

    export default {
        name: 'TeMaTouWei',
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
                teMaTouWeiList: [],
            }
        },
        mounted(){
            if (_.size(playTreeIndexByCid.get('1081000').childrens) > 0) {
                this.teMaTouWeiList = playTreeIndexByCid.get('1081000').childrens
            }
        },
        created() {
        },
        computed: {
            weiNumList() {
                return this.computeWeiNumList()
            }
        },
        watch: {
            playTreeList() {
                if (_.size(playTreeIndexByCid.get('1081000').childrens) > 0) {
                    this.teMaTouWeiList = playTreeIndexByCid.get('1081000').childrens
                }
            },
        },
        methods: {
            isBtnActived(item) {
                if(!this) return ''

				let classStr = ''
				if (Math.floor(item.cid/100) == 10812) {
                    classStr = 'so-con-span-long'
				}
				if (_.find(this.betSelectedList, {cid: item.cid})) {
                    classStr += ' active'
				}
                return classStr;
            },
            computeWeiNumList() {
                var res = [[], [], [], [], [], [], [], [], [], []]
                for (var i = 1; i < 50; i++) {
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

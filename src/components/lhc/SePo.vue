<template>
<div  id="content-wrapper" class="sepo">
	<div class="so-con-right" >
		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<div id="so-item0" class="content-right active item_one" >
					<ul>
						<!-- 特码色波 -->
						<li class="select-li" v-for="item in sePoList">
							<div class="bet_panel">
								<h2>
									{{item.name}}
								</h2>
								<div class="bet_box">
									<p :data-id="itemChild.cid" :class="isBtnActived(itemChild)"  v-for="(itemChild,index) in item.childrens" @click="betSelect(itemChild)">
										<span>{{itemChild.name}}</span>
										<span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
									</p>
								</div>
							</div>
						</li>
						<!-- 特码色波 -->
						<!-- 7色波 -->
						<!-- 红球 -->
						<!-- 绿球 -->
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
        name: 'SePo',
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
                sePoList: [],
				myScroll: null
            }
        },
        mounted(){
            if (_.size(playTreeIndexByCid.get('1071000').childrens) > 0) {
                this.sePoList = playTreeIndexByCid.get('1071000').childrens
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
            this.setScrollHeight(false, 0)
        },
        watch: {
            playTreeList() {
                if (_.size(playTreeIndexByCid.get('1071000').childrens) > 0) {
                    this.sePoList = playTreeIndexByCid.get('1071000').childrens
                }
            },
        },
        methods: {
        }
    }
</script>

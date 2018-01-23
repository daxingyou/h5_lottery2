<template>
<div  id="content-wrapper">
	<div class="so-con-right" >
		<div id="scroller" > <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 特码五行 -->
	            <div id="so-item0" class="content-right active item_one" >
	                <ul>
						<!-- 特码五行 -->
                        <li class="select-li bet_lm" v-for="item in teMaWuXingList">
                            <div class="bet_panel">
                                <h2>
                                    {{item.name}}
                                </h2>
                                <div class="bet_box">
                                    <p :data-id="itemChild.cid" :class="isBtnActived(itemChild)"  v-for="(itemChild, index) in item.childrens" @click="betSelect(itemChild, item)">
                                        <span>{{itemChild.name}}</span>
                                        <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <!-- 特码五行 -->
	                </ul>
	            </div>
                <!-- 特码五行 -->
	        </div><!-- tab_container -->
        </div><!-- scroller -->
    </div><!-- so-con-right -->
</div>
</template>

<script>
    import playTreeIndexByCid from '@/PlayTreeIndexByCid'
    import LhcMixin from '@/components/lhc/LhcMixin'

    export default {
        name: 'TeMaWuXing',
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
                teMaWuXingList: [],
                myScroll: null
            }
        },
        mounted(){
            if (_.size(playTreeIndexByCid.get('1161000').childrens) > 0) {
                this.teMaWuXingList = playTreeIndexByCid.get('1161000').childrens
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
                if (_.size(playTreeIndexByCid.get('1161000').childrens) > 0) {
                    this.teMaWuXingList = playTreeIndexByCid.get('1161000').childrens
                }
            },
        },
        methods: {
        }
    }
</script>


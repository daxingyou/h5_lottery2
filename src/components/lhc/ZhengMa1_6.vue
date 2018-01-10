<template>
<div  id="content-wrapper">
	<div class="so-con-right" >
		<div id="scroller" > <!-- style="min-height: 180%"  --><!--<div>-->
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 正码1-6 -->
	            <div id="so-item0" class="content-right active item_one" >
	                <!-- <div v-for="zmList in zhengMaNList"></div> -->
	                <ul :id="'zm-list'+idx" v-for="(zmList,idx) in zhengMaNList">
						<!-- 正码一 -->
	                    <li :class="showItemClass(item.childrens[0].cid)" v-for="(item, index) in zmList">
                            <div class="bet_panel">
                                <h2 v-if="index == 0">
                                    {{item.name}}
                                </h2>
                                <div class="bet_box">
                                    <p :data-id="itemChild.cid" :class="isBtnActived(itemChild)" v-for="(itemChild, index2) in item.childrens" @click="betSelect(itemChild, item)">
                                        <span>{{itemChild.name}}</span>
                                        <span class="bet-times">{{payoffFormat(itemChild.oddsData.payoff)}}</span>
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
        name: 'ZhengMa1_6',
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
                zhengMaNList: [],
                myScroll: null,
            }
        },
        mounted() {
            if (_.size(playTreeIndexByCid.get('1040000').childrens) > 0) {
                this.handlePlayList()
            }

            this.myScroll = new iScroll("scroller", {  // 投注区域
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
                if (_.size(playTreeIndexByCid.get('1040000').childrens) > 0) {
                    this.handlePlayList()
                }
            },
        },
        methods: {
            //產生色波前面的一條線
            showItemClass(index) {
                let classStr = "select-li bet_lm"

                if (index == 1041111 || index == 1042111 ||
                    index == 1043111 || index == 1044111 ||
                    index == 1045111 || index == 1046111) {
                    classStr += " bet_lm_noname"
                }
                return classStr
            },
            handlePlayList() {
                _.forEach(playTreeIndexByCid.get('1040000').childrens, (item, index) => {
                    this.$set(this.zhengMaNList, index, [
                        _.extend({}, item, {childrens: _.filter(item.childrens[0].childrens, (c) => !/波/.test(c.name))})
                    ,
                        _.extend({}, item, {childrens: _.filter(item.childrens[0].childrens, (c) => /波/.test(c.name))}) 
                    ])
                })
            },
        }
    }
</script>
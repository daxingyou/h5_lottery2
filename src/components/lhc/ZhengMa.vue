<template>
<div  id="content-wrapper">

	<div class="so-con-right" >
		<div id="scroller" > <!-- style="min-height: 180%"  --><!--<div>-->


			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 正码 -->
	            <div id="so-item0" class="content-right active item_one" >
	                <ul>
	                	<!-- 1-49 -->
	                    <li class="select-li" v-for="item in zhengMaList">
	                        <div class="bet_panel">
	                        	<h2>
                                    {{item.name}}
                                </h2>
	                            <div class="bet_box">
									<p :data-id="itemChild.cid" :class="isBtnZhengMaActived(itemChild, item.cid)"  v-for="(itemChild,index) in item.childrens" @click="betSelect(itemChild, item)">
										<span :class="item.cid == '1031100'?'lhc_ball num_' + itemChild.name: ''">{{itemChild.name}}</span>
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
        name: 'ZhengMa',
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
                zhengMaList: [],
				myScroll: null
            }
        },
        mounted() {
            if (playTreeIndexByCid.get('1030000')) {
                this.zhengMaList = playTreeIndexByCid.get('1031000').childrens
            }

            this.myScroll = new iScroll("content-wrapper",{  // 投注区域
                onScrollEnd() {
                    console.log("end")
                    this.refresh() ;
                },
                /* onBeforeScrollMove:function(e){
                     e.preventDefault();
                 },*/
                vScroll:true,
                mouseWheel: false ,
                hScrollbar:false ,
                vScrollbar:false ,
                click: true ,
                // momentum: false ,

                useTransform: false ,
                useTransition: false ,
                // snapThreshold:0.5
            });
        },
        created() {
        },
        computed: {

        },
		updated() {
            this.setClickHeight($('.so-con-right'), $('#so-item0').height())
        },
        watch: {
            playTreeList() {
                if (playTreeIndexByCid.get('1030000')) {
                    this.zhengMaList = playTreeIndexByCid.get('1031000').childrens
                }
            },
        },
        methods: {
            isBtnZhengMaActived(item, cid) {
                if(!this) return ''

				let classStr = ''

				if (cid == '1031100') {
                    classStr = 'so-con-span-short'
				}
				if (_.find(this.betSelectedList, {cid: item.cid})) {
                    classStr += ' active'
				}

                return  classStr;
            },
        }
    }
</script>
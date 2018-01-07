<template>
<div  id="content-wrapper">

	<div class="so-con-right" >
		<div id="scroller" > <!-- style="min-height: 180%"  --><!--<div>-->


			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 两面 -->
	            <div id="so-item0" class="content-right active item_one" >
	                
	                <ul>
						<!-- 特码两面 -->
	                    <li class="select-li bet_lm" v-for="item in liangMianList">
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
        name: 'LiangMian',
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
        data: function () {
            return {
                liangMianList: [],
                myScroll: null
            }
        },
        mounted(){
            if (playTreeIndexByCid.get('1021000')) {
                this.liangMianList = playTreeIndexByCid.get('1021000').childrens
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
                mouseWheel: false ,
                hScrollbar:false ,
                vScrollbar:false ,
                click: true ,
                // momentum: false ,

                useTransform: false ,
                useTransition: false ,
                // snapThreshold:0.5
            });
            this.myScroll.refresh()
            this.myScroll.scrollTo(0, 100)
        },
        created() {
        },
        computed: {

        },
        updated() {
            /*console.log("so-item height updated")
            this.setClickHeight($('.so-con-right'), $('#so-item0').height())*/
            var _h =  window.innerHeight - ($('.so-in-top').height() + $('.so-in-main').height() + $('.so-foot').height() + $('.tab_panel').height())
            $('#scroller').css('height',  _h )
            $('.tab_container').height( $('#so-item0').height() + 40 )
        },
        watch: {
            playTreeList() {
                if (playTreeIndexByCid.get('1021000')) {
                    this.liangMianList = playTreeIndexByCid.get('1021000').childrens
                }
            },
        },
        methods: {

        }
    }
</script>

<template>
<div  id="content-wrapper" class="zhengte">
	<div class="so-con-right" >

		<div class="tab_panel">
			<div class="hd lhc_tab" >
				<ul class="tab tab_mid tab_two">
					<!-- <li :class="(index==0 && 'on')" :data-tab="index" v-for="(kind,index) in continuedNumberList" @click="subTabChange($event, kind, index)"><a href="javascript:;">{{kind.name}}</a></li> -->
					<li :class="currentBar == index && 'on'" :data-tab="(index + 1)" :data-id="item.cid" v-for="(item, index) in playGroupBar" @click="barChange(index)"><a href="javascript:;">{{item.name}}</a></li>
				</ul>
			</div><!-- hd lhc_tab -->
		</div><!-- tab_panel -->

		<div id="scroller"> <!-- style="min-height: 180%"  --><!--<div>-->
			
			<div class="tab_container">
				<!--以下为盘面不同样式，根据ID区分-->
				<!-- 正1特 -->
				<div :id="'so-item' + index" class="content-right item_one" v-for="(zhengTe, index) in zhengTeNList" v-if="currentBar == index">
					<ul>
						<!-- 1-49 -->
						<li class="select-li" v-for="(zhengTeItem, zhengTeItemIndex) in zhengTe.childrens">
							<div class="bet_panel">
								<h2>
									{{zhengTeItem.name}}
								</h2>
								<div class="bet_box">
									<p :data-id="zhengTeGrandChild.cid" :class="showZhengTeClass(zhengTeGrandChild)" v-for="zhengTeGrandChild in zhengTeItem.childrens" @click="betSelect(zhengTeGrandChild, zhengTeItem)">
										<span :class="showZhengTeItemClass(zhengTeItem.name, zhengTeGrandChild.name)">{{zhengTeGrandChild.name}}</span>
										<span class="bet-times">{{payoffFormat(zhengTeGrandChild.oddsData.payoff)}}</span>
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- 正6特 -->
			</div><!-- tab_container -->
		</div><!-- scroller -->
	</div><!-- so-con-right -->
</div>
</template>

<script>
    import playTreeIndexByCid from '@/PlayTreeIndexByCid'
    import LhcMixin from '@/components/lhc/LhcMixin'

    export default {
        name: 'ZhengTe',
		mixins: [LhcMixin],
        props: ['playTreeList', 'betSelectedList'],
		data() {
			return  {
			    playGroupBar:[],
				currentBar: 0,
				zhengTeNList: [],
				myScroll: null,
			}
		},
        mounted() {
            if (_.size(playTreeIndexByCid.get('1050000').childrens) > 0) {
                this.playGroupBar = playTreeIndexByCid.get('1050000').childrens
                this.handlePlayList()
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
                mouseWheel: true ,
                hScrollbar:false ,
                vScrollbar:false ,
                click: true ,
                // momentum: false ,

                useTransform: false ,
                useTransition: false ,
                // snapThreshold:0.5
            });

            this.myScroll.refresh()
            this.myScroll.scrollTo(0, 300)
        },
		updated() {
            /*let wrapper = $('#content-wrapper')
			if (wrapper) {
                let myScroll = new iScroll(wrapper)
            }*/
            var _h =  window.innerHeight - ($('.so-in-top').height() + $('.so-in-main').height() + $('.so-foot').height() + $('.tab_panel').height())
            $('#scroller').css('height',  _h )
            $('.tab_container').height( $('#so-item'+this.currentBar).height() + 40 )
            
		},
        watch: {
			playTreeList() {
                if (_.size(playTreeIndexByCid.get('1050000').childrens) > 0) {
                    this.playGroupBar = playTreeIndexByCid.get('1050000').childrens
                    this.handlePlayList()
                }
			}
        },
        methods: {
			barChange(index) {
			    this.currentBar = index;
                this.$emit('lhcclearbet')
                this.myScroll.refresh()
            	this.myScroll.scrollTo(0, 300)
            },
			showZhengTeClass(item) {
			    let classStr = ''
				let itemCidPrefix = Math.floor(item.cid/100)

				if (itemCidPrefix == 10511 || itemCidPrefix == 10521 ||
                    itemCidPrefix == 10531 || itemCidPrefix == 10541 ||
                    itemCidPrefix == 10551 || itemCidPrefix == 10561)
					 classStr = "so-con-span-short"

                if(!this) return ''

                if (_.find(this.betSelectedList, {cid: item.cid})) {
			        classStr += ' active'
				}

				return classStr
			},
            showZhengTeItemClass(parentName, childName) {
				return parentName == "两面"? "": 'lhc_ball num_' + childName
            },
            handlePlayList() {
                _.forEach(playTreeIndexByCid.get('1050000').childrens, (item, index) => {
                    this.$set(this.zhengTeNList, index,
                        _.extend({}, item, {childrens: item.childrens})
                    )
                })
            },
		}
    }
</script>

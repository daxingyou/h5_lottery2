<template>
  <div>
  <component v-bind:is="currentMethod" @lhcselectshengxiao="selectShengXiao" @lhcclearbet="clearBetList"
             @lhcselectbet="selectBet" @lhcselectlian="selectLianType" @lhcclearcnt="clearCombineCnt"  @lhcsetcnt="setCombineCnt"
             :playTreeList="playTreeList" :betSelectedList="betSelectedList" :currentMethod="currentMethod"
             :currentBaseShengXiao="currentBaseShengXiao">
  </component>
  </div>
</template>
<script>

	import '../../../static/frist/css/lhc.css'

    import TeMa from '@/components/lhc/TeMa'
    import LiangMian from '@/components/lhc/LiangMian'
    import ZhengMa from '@/components/lhc/ZhengMa'
    import ZhengMa1_6 from '@/components/lhc/ZhengMa1_6'
    import ZhengTe from '@/components/lhc/ZhengTe'
    import LianMa from '@/components/lhc/LianMa'
    import SePo from '@/components/lhc/SePo'
    import TeMaTouWei from '@/components/lhc/TeMaTouWei'
    import ZongXiao from '@/components/lhc/ZongXiao'
    import PingTeXiaoWei from '@/components/lhc/PingTeXiaoWei'
    import LianXiao from '@/components/lhc/LianXiao'
    import TeXiao from '@/components/lhc/TeXiao'
    import HeXiao from '@/components/lhc/HeXiao'
    import LianWei from '@/components/lhc/LianWei'
    import ZhengXiao from '@/components/lhc/ZhengXiao'
    import TeMaWuXing from '@/components/lhc/TeMaWuXing'
    import ZiXuanBuZhong from '@/components/lhc/ZiXuanBuZhong'

    export default {
        name: 'Touzhu',
        props:['currentMethod', 'playTreeList', 'betSelectedList', 'currentBaseShengXiao'],
        data: function () {
          return {
          }
        },
        components: {
            '特码': TeMa,
            '两面': LiangMian,
            '正码': ZhengMa,
            '正码1-6': ZhengMa1_6,
            '正特': ZhengTe,
            '连码': LianMa,
            '色波': SePo,
            '特码头尾': TeMaTouWei,
            '总肖': ZongXiao,
            '平特肖尾': PingTeXiaoWei,
            '连肖': LianXiao,
            '特肖': TeXiao,
            '合肖': HeXiao,
            '连尾': LianWei,
            '正肖': ZhengXiao,
            '特码五行': TeMaWuXing,
            '自选不中': ZiXuanBuZhong,
        },
        created: function() {

        },
        watch: {

        },
        methods:{
            //打开弹窗
            open:function(e){
                this.show = true;
            },
            //关闭弹窗
            close:function(e){
                this.show = false;
            },
            selectBet(item) {
                this.$emit('lhcselectbet', item)
            },
            selectShengXiao(itemList) {
                this.$emit('lhcselectshengxiao', itemList)
            },
            clearBetList() {
                this.$emit('lhcclearbet')
            },
            clearCombineCnt() {
                this.$emit('lhcclearcnt')
            },
            setCombineCnt(cnt) {
                this.$emit('lhcsetcnt', cnt)
            },
            selectLianType(ItemInfo) {
                this.$emit('lhcselectlian', ItemInfo)
            }
        },
        data () {
            return {
                show:false,
            }
        }
    }
</script>

<style scoped>
    .publicDialog { display: block !important; }
</style>

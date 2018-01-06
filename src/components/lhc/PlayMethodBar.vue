<template>
    <div class="so-con-left so-con-center" id="nav-wrapper">
        <ul>
            <!-- kinds:['特码', '两面', '正码', '正码1-6', '正特', '连码', '色波', '特码头尾', '总肖', '平特肖尾', '连肖', '特肖', '合肖', '连尾', '正肖', '特码五行', '自选不中'] -->
            <li :class="(currentMethodIndex == index  && 'active')"  v-for="(kind, index) in kinds" @click="switchPlayMethod(index)">
                <!-- <a :href="'#so-item'+index">{{kind}}</a>-->
                <a>{{kind}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import LhcMixin from '@/components/lhc/LhcMixin'

    export default {
        props: ['kinds'],
        mixins:[LhcMixin],
        data: function () {
            return {
                currentMethodIndex: 0,
                myScroll: null
            }
        },
        mounted() {
            this.myScroll = new iScroll("nav-wrapper", {  // 投注区域
                onScrollEnd() {
                    this.refresh() ;
                },
                vScroll:true,
                mouseWheel: true,
                hScrollbar: false,
                vScrollbar: false,
                click: true,
                useTransform: false,
                useTransition: false,
            });
        },
        updated() {
            $('#nav-wrapper ul').css('height', $('.so-con-left').height() + 'px')
        },
        methods: {
            switchPlayMethod(index) {
                this.currentMethodIndex = index;
                this.$emit("switchPlayMethod", this.kinds[index]);
                this.$emit('lhcclearbet')
                this.$emit('lhcclearcnt')
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #nav-wrapper ul>li:nth-child(4) a,
    #nav-wrapper ul>li:nth-child(8) a,
    #nav-wrapper ul>li:nth-child(10) a,
    #nav-wrapper ul>li:nth-child(16) a,
    #nav-wrapper ul>li:nth-child(17) a{
        font-size: .3rem;
    }
    .so-con-left.so-con-center{
        position: absolute;
        top:0;
        padding-bottom: 0;
    }
</style>

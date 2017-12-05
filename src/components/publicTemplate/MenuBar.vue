<template>
    <div class="new_header so-in-top">
        <ul>
            <li class="so-menu">
                <span class="icon icon_nav"></span>
            </li>
            <li class="left_top_logo">
                {{moduleName || '江苏快3'}}
            </li>
            <li class="purse">
                <span class="icon icon_money"></span>
                <div class="so-in-top-sum">
                    {{ fortMoney(roundAmt(balance), 2)}}
                </div>
            </li>
            <li class="so-top-zoushi">
                <span class="icon icon_trend"></span>
            </li>
        </ul>
    </div>
</template>


<script>
    import Mixin from '@/Mixin'
    export default {
        name: 'menuBar',
        mixins:[Mixin],
        props:['moduleName', 'balance'],
        data: function() {
            return {
            }
        },
        mounted:function(){
            // console.log( this.balance )
        }

    }
</script>
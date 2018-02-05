<template>

    <div v-if="showNavigation" :class="'so-left '+ (showNavigation?'active':'')">
        <div class="so-shade" id='shade-now' @click="close"></div>
        <!--<div class="so-left-close" @click="close">
            <img src="../../../static/frist/images/left/left808.png">
        </div>-->
        <div class="so-left-con" >
            <div class="so-l-c-top">
                <!--<div>
                    <img src="../../../static/frist/images/left/user.png">
                </div>-->
                <div>
                    <span class="icon icon_user"></span>
                    <p class="user_name" v-if="haslogin">{{getCookie('username')}}</p>
                    <div class="purse"  v-if="haslogin">
                        <span class="icon icon_money"></span>
                        <div class="so-in-top-sum" >
                            {{ fortMoney(roundAmt($parent.balanceData ? $parent.balanceData.balance : 0), 2)}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="so-l-c-con indexside">
                <div>
                    <ul>
                        <li @click="CheckDemoPlay('CZ')">
                            <a>
                                <div class="">
                                    <div>
                                        <i class="index_s index_s01"></i>
                                    </div>
                                </div>
                                充值
                            </a>
                        </li>
                        <li @click="CheckDemoPlay('TK')">
                            <a>
                                <div class="">
                                    <div>
                                        <i class="index_s index_s02"></i>
                                    </div>
                                </div>
                                提款
                            </a>
                        </li>
                        <li>
                            <a href ="/lobbyTemplate/acdetial">
                                <div class="">
                                    <div>
                                        <i class="index_s index_s03"></i>
                                    </div>
                                </div>
                                帐户明细
                            </a>
                        </li>
                        <li>
                            <a :href="custUrl" target="_blank" >
                                <div class="">
                                    <div>
                                        <i class="index_s index_s04"></i>
                                    </div>
                                </div>
                                在线客服
                            </a>
                        </li>
                        <!--20180125 新增个人消息-->
                        <div  class="left_logout">
                            <a href="javascript:;" class="new_btn" @click="loginOut()"><span class="midunm">退出</span></a>
                        </div>
                        <!--end 20180125 新增个人消息-->
                    </ul>
                </div>
            </div>
        </div>
        <Confirm ref="confirm" />
        <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />
    </div>

</template>


<script>
    import Mixin from '@/Mixin'
    // import $ from "jquery";
//    import deposit from '@/components/lobbyTemplate/deposit'
    import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
    import Confirm from '@/components/publicTemplate/Confirm'
    export default {
        name: 'IndexNavigation',
        mixins:[Mixin],
        props:['el'],
        components: {
//            deposit,
        AutoCloseDialog,
            Confirm
        },

        data :function() {
            return {
                balanceData:'',
                haslogin :false ,
                showNavigation:false ,
                allLottery:{},
                mainIndexBalance:'',
                custUrl:''
            }
        },
        created:function () {
            this.haslogin = this.ifLogined() ;
        } ,
        mounted:function() {
            var that = this;
            $(this.el).on('touchend', ()=>{
                this.showNavigation = true;
                that.mainIndexBalance = that.getCookie('balancePublic');
                e.preventDefault()
                $('html,body').css({'height':'100%','overflow-y':'hidden'}) ; // 禁止页面滚动
            }) ;
            this.custUrl=localStorage.getItem('Url');
            var shade 
            shade = document.getElementById('shade-now')
            shade.addEventListener('touchend', function(e) {
                e.preventDefault()
            });
        },
        methods:{
            // 关闭侧滑栏
            close:function(e){
                this.showNavigation = false;
                $('html,body').css({'height':'auto','overflow-y':'scroll'}) ;
                e.preventDefault()
            },

            //判断是否为游客,cla为class
            CheckDemoPlay:function (cla) {
                var _self =this;
                var acType=_self.getCookie('acType');
                if(acType==2){
                    _self.$refs.confirm.open();
                    return
                }
                if(cla=='CZ'){
                    _self.$router.push('/lobbyTemplate/deposit')
                }
                if(cla=='TK'){
                    _self.$router.push('/lobbyTemplate/Withdrawals')
                }
            }
        },

    }
</script>
<style scoped>
.so-shade {
    display: block;
    z-index: 0;
}
</style>
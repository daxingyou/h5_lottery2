<template>
     <div id="pa_con" class="so-con warp ">
      <!--left siderbar  -->
      <!--用户导航 so-left -->
      <UserNavigation el=".more-games" ref="navone" > </UserNavigation>
      <IndexNavigation el=".btn_leftside" ref="navtwo" > </IndexNavigation>
      <header id="pa_head" class="new_header index_nav_top">
             <div class="left index_side">
                 <a class="btn_leftside" href="javascript:;" v-show="haslogin">
                     <span class="icon icon_nav"></span>
                 </a>
             </div>
             <h2 class="center logo" v-bind:class="[haslogin ? '' : 'logo_left']"><img src="static/frist/images/logo.png" alt="百乐彩"></h2>
             <div class="right">
                 <router-link to="/login" class="new_btn_outline" v-show="!haslogin">登录</router-link>
                 <router-link to="/reg" class="new_btn_outline" v-show="!haslogin" >注册</router-link>
                 <a href="javascript:;" class="new_btn_outline" v-show="!haslogin"  @click="demoPlay()">试玩</a>
                 <!-- <router-link class="login" to="/lobbyTemplate/info" v-show="haslogin" ><i></i><b></b></router-link>--> <!-- 普通用户 -->
                 <a class="guset" href="javascript:;" v-show="haslogin && logintype=='2'" @click="CheckDemoPlay()"><span class="icon icon_user"></span>游客</a>  <!--  试玩帐号 -->
                 <span class="memberaccount" v-show="haslogin && logintype=='1'">{{getCookie('username')}}</span>
                 <a class="new_btn_outline" href="javascript:;" v-show="haslogin" @click="loginOut()">退出</a>
             </div>
         </header>
      <div class="news">
          <div id="focus" class="focus" >
              <div class="bd">
                  <ul v-for="list in banner">
                      <li>
                          <a :href="list.link" target="_blank">
                            <img :src="list.titlePic" />
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="hd">
                  <ul>
                       <li  v-for="(item,index) in banner" :data-val="index"></li>
                      <!--<li ></li>-->
                      <!--<li></li>-->
                      <!--<li></li>-->
                  </ul>
              </div>
          </div>
          <div class="marquee">
              <div class="news_title">
                  <i data-v-1f83ba94="" class="icon-notification"></i>
                  <span>最新消息 : </span>
              </div>
              <div id="marquee_snp" class="bd news_text slideText">
                  <div class="sys-notice">
                      <div class="bd">

                               <!-- <marquee scrollamount="3"> &lt;!&ndash;{{bulletins}}&ndash;&gt; 123,新增公告Adam测试2新增公告Adam测试新增公告3Adam测试新增公告4Adam测试新增公告5Adam测试6新增公告Adam测试 </marquee>-->
                              <!--  <marquee align="left" behavior="scroll" direction="left" hspace="0" vspace="0" loop="-1" scrollamount="2" scrolldelay="30">
                                    {{bulletins}}
                                </marquee>-->

                                 <!-- <div >
                                      <vue-marquee :content="bulletins" class="two"  :showtwo="false" >
                                      </vue-marquee>
                                      <vue-marquee content=" 00" class="two"  :showtwo="false" >
                                      </vue-marquee>
                                  </div>-->
                                 <!-- <div class="marquee-wrap" style="width:80%;">
                                      <vue-marquee content="发动机咖啡大家开个会尽快发货更好的非结构化健康法规尽快发货股份共计花费对符合国家开发和国家开发" class="two"  :showtwo="false" >

                                      </vue-marquee>
                                  </div>-->


                      </div>
                  </div>
              </div>

          </div>
      </div>
    <!--20171116 新增會員連結區塊-->
    <section class="account_area">
        <ul>
            <li>
                <a href="javascript:;" @click="CheckDemoPlay('CZ')">
                    <span class="icon_account icon_deposit"></span>
                    <p>充值</p>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="CheckDemoPlay('TK')">
                    <span class="icon_account icon_withdrawals"></span>
                    <p>提款</p>
                </a>
            </li>
            <li>
              <!--  <router-link to="/lobbyTemplate/promo">-->
                <router-link :to="'/lobbyTemplate/promo'">
                    <span class="icon_account icon_promo"></span>
                    <p>优惠活动</p>
                </router-link>
            </li>
            <li>
                <a  href="javascript:;" @click= 'openGameOnline()'  target="_blank">
                    <span class="icon_account icon_service"></span>
                    <p>在线客服</p>
                </a>
            </li>
        </ul>
    </section>
    <!--end 20171116 新增會員連結區塊-->

      <div id="index_content" class="content">
          <section class="hotgame_area">
              <!--<h3><img src="static/frist/images/title_hotgame.png" alt="热门游戏"></h3>-->
              <ul>

                 <!-- <li v-for="lottery in allLottery" v-if="lottery.ifHot==1">-->
                  <li v-for="(lottery,index) in allLottery" v-if="index<7"> <!-- 只展示前面7个 -->
                    <a class="to_lottery" :href="'/'+gameHref[lottery.cid]" v-if="haslogin">
                      <div :class="'badge'">
                       <!-- <img v-lazy="lottery.imgUrl">-->
                          <img v-lazy="'static/frist/images/lotteryicon/cp'+lottery.cid+'.png'">
                      </div>
                    </a>
                      <a class="to_lottery" @click="gotoGame(haslogin)"  v-else>
                          <div :class="'badge'">
                            <!--  <img v-lazy="lottery.imgUrl">-->
                              <img v-lazy="'static/frist/images/lotteryicon/cp'+lottery.cid+'.png'">
                          </div>
                      </a>
                    <p>{{lottery.name}}</p>

                  </li>
                    <!--20171116 新增選單-->
                    <li>
                        <a href="javascript:;" class="more-games">
                            <div class="badge">
                                <img src="/static/frist/images/lotteryicon/logo_more.png" lazy="loaded">
                            </div>
                        </a>
                        <p>更多游戏</p>
                    </li>
                    <li >
                        <a href="javascript:;" @click="Continued()">
                            <div class="badge">
                                <img src="/static/frist/images/lotteryicon/logo_app.png" lazy="loaded">
                            </div>
                        </a>
                        <p>APP下载</p>
                    </li>
                    <!--end 20171116 新增選單-->
              </ul>
          </section>
          <!--20171116 新增優惠活動-->
        <section class="promoindex_area">
              <h3>
                  <img src="static/frist/images//sale/yhhd_04_07.png" alt="优惠活动">
                  <router-link :to="'/lobbyTemplate/promo'" style="float: right;">更多>></router-link>
              </h3>
              <a  @click="Continued()">
                  <img src="/static/frist/images/banner/promo-1.jpg">
              </a>
          </section>
          <!--end 20171116 新增優惠活動-->
          <section class="cooper_area">
              <div class="cooper">
                  <h3><img src="static/frist/images/sale/hzjm_03.png" alt="合作加盟"></h3>
                  <ul>
                      <li>
                          <router-link class="icon_intro" to="/lobbyTemplate/tutorial"></router-link>
                      </li>
                      <li>
                          <router-link class="icon_agent" v-bind:to="'/lobbyTemplate/agent'"></router-link>
                      </li>
                      <li>
                          <router-link class="icon_about" to="/lobbyTemplate/about"></router-link>
                      </li>
                  </ul>
              </div>
          </section>
          <!--银行转账使用步骤-->

          <div class="modal" v-if="offFlag">
              <div class="m_content">
                  <h2 class="title">{{popMsgTitle}}
                      <a @click="shutDownPop"></a>
                  </h2>
                  <p class="content left">
                      {{popMsgContent}}

                  </p>

              </div>
          </div>

      </div>
      <Confirm ref="confirm" />
      <FooterNav />
      <AutoCloseDialog ref="autoCloseDialog" text=" " type="" />
  </div>
</template>

<script>
// import $ from "jquery"
import '../../static/js/touchslide.1.1.js'
import Mixin from '@/Mixin'
import IndexNavigation from '@/components/publicTemplate/IndexNavigation'
import UserNavigation from '@/components/publicTemplate/UserNavigation'
import FooterNav from '@/components/Footer'

import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import Confirm from '@/components/publicTemplate/Confirm'

export default {
  name: 'Index',
  mixins:[Mixin],
  components: {
      FooterNav ,
      IndexNavigation,
      UserNavigation ,
      AutoCloseDialog,
      Confirm
  },
  data :function() {
        return {
            haslogin:false ,
            logintype: this.getCookie('acType') || 1 ,
            balanceData:{ },
            allLottery:{} ,
            gameHref:{} ,
            bulletins:'',
            banner:[
//               {'url':'../../static/frist/images/baner_crrol22.jpg'},
//               {'url':'../../static/frist/images/baner_crrol3.jpg'},
//               {'url':'../../static/frist/images/baner_crrol4.jpg'},
            ] ,
            popMsgTitle:'',
            popMsgContent:"",
            offFlag:false,
            popMsgCid:[],
            currPopMsgCid:""

        }
    },
    computed:{

    },
    created:function () {
      //this.changeOffFlag ();

    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;
      this.allLottery = this.$refs.navone.getLotterys() ;
      this.gameHref = this.$refs.navone.gameHref ; // 拿子组件的值
      this.haslogin = this.$refs.navone.haslogin ; // 拿子组件的值
      if(this.haslogin){  // 只有登录状态才需要调余额
          this.getMemberBalance() ;
      }
      this.getBulletinsContent ();
      this.getPopMsg();

//      TouchSlide({
//                  slideCell: "#focus",
//                  autoPlay:true,
//              });


      /* $("#marquee_snp").slide({ // 文本滚动
           mainCell: ".bd ul",
           autoPage: true,
           effect: "leftMarquee",
           autoPlay: true,
           vis: 1,
           interTime: 50
       });*/
      //this.changeOffFlag();
       this.carouselImg()
  },
  methods:{
      getBulletinsContent :function () {
          let  self=this ;
          let bulletinsArr=[];
          $.ajax({
              type:"GET",
              url:this.action.forseti + 'apid/cms/notices',
              data:{
                  sideType:"2",
                  appid:"bcappid02",
              },
              success: (result) => {
                  for(let i=0;i<result.data.length;i++){
                      bulletinsArr.push('&nbsp;&nbsp;'+result.data[i].content+'&nbsp;&nbsp;');
                  }
                  self.bulletins=bulletinsArr.toString();
                  var str = '<marquee align="left" behavior="scroll" direction="left" hspace="0" vspace="0" loop="-1" scrollamount="2" scrolldelay="30">'+
                            self.bulletins+ '</marquee>' ;
                  $('.sys-notice>.bd').html(str)
              }
          })
      },
     //试玩
      demoPlay :function () {
           var _self=this;
           $.ajax({
               type: 'post',
               headers: {Authorization: 'Basic d2ViX2FwcDo='},
               url: _self.action.uaa + 'apis/member/testLogin',
               data:{},
               success:(res)=>{
                   if(res.err == 'SUCCESS'){ // 登录成功
                       _self.setCookie("access_token", res.data.access_token);  // 把登录token放在cookie里面
                       _self.setCookie("username", res.data.username);  // 把登录用户名放在cookie里面
                       _self.setCookie('acType',res.data.acType);   //把玩家类型放在cookie里面
                       _self.$refs.autoCloseDialog.open('登录成功','','icon_check','d_check') ;
                       setTimeout(function () {
                           window.location = '/' ;
                       },1000)
                   }else{
                       this.$refs.autoCloseDialog.open(res.cnMsg) ;
                   }
               }
            })
       },
      //判断是否为游客,
      CheckDemoPlay:function (cla) {
          var _self =this;
          var acType=_self.getCookie('acType');
          if(acType==2){
              _self.$refs.confirm.open();
              return
          }
          if(!this.haslogin){
              this.$refs.autoCloseDialog.open('登录后才可以操作')
              setTimeout(function () {
                  window.location = '/Login' ;
              },1000)
              return
          }
          if(cla=='CZ'){
              window.location = '/lobbyTemplate/deposit' ;
          }
          if(cla=='TK'){
              window.location = '/lobbyTemplate/Withdrawals' ;
          }
      },
      // 敬请期待
      Continued:function () {
            this.$refs.autoCloseDialog.open('敬请期待！') ;
        },
      //获取首页弹框信息
      isequal(element ) {
          return element == this.currPopMsgCid;
      },
      getPopMsg (){
          var _self=this;
          $.ajax({
              type: 'GET',
              url:  _self.action.forseti + 'apis/cms/popText',
              data:{},
              success:(res)=>{
                  if(!res.data ||!res.data[0]||!res.data[0].title){
                      _self.offFlag=false;
                      return false
                }
                else{
                      if(res.data ||res.data[0]||res.data[0].title){
                          _self.offFlag=true;
                      }
                      //console.log(res.data)
                      _self.popMsgTitle=res.data[0].title;
                      //console.log(this.popMsgTitle)
                      _self.popMsgContent=res.data[0].content;
                      _self.popMsgCid.push(res.data[0].cid);
                      _self.currPopMsgCid=res.data[0].cid;
                  }


                  if(localStorage.getItem('cid')==null){
                      return
                  }else {
                     this. changeOffFlag ()
                  }



              }
          })
      },
      //关闭弹框
      shutDownPop () {
          this.offFlag=!this.offFlag;
          localStorage.setItem('cid',this.popMsgCid)
      },
      //更改弹框显示的标志
      changeOffFlag () {
           var self=this
          var cid=[];

          if(localStorage.getItem('cid').length>1){
              cid=localStorage.getItem('cid').split(",")
          }else {
              cid.push(localStorage.getItem('cid'))
          }
          var flag=cid.some(function (el) {
              return el == self.currPopMsgCid
          });
          //console.log(flag);
          //console.log(cid);
          //console.log("aaa"+self.currPopMsgCid);
          flag ? self.offFlag=false :self.offFlag=true
          /*for(var i=0;i<cid.length;i++){
                if(cid[i]==this.currPopMsgCid){
                 this.offFlag=false;
                 return false
                }
          }*/
      },
      //轮播图接口
       carouselImg:function () {
           var _self=this;
           $.ajax({
               type:'get',
               url: _self.action.forseti + 'apid/cms/carousel',
               data:{},
               success:(res)=>{
                   if(res.data.itemPO){
                       var len= res.data.itemPO.length;
                       for(var i=0;i<len;i++){
                           res.data.itemPO[i].titlePic = _self.action.picurl+ res.data.itemPO[i].titlePic+'/0' ;
                       }
                       _self.banner =  res.data.itemPO ;
                       _self.$nextTick(function (){
                           TouchSlide({
                               slideCell: "#focus",
                               autoPlay:true,
                           });
                       });
                   }
               },
               err:(res)=>{
//
               }
           })
       }


  },

}
</script>

<style scoped>
  .to_lottery { display: block; position: relative; z-index: 7; }

</style>

<template>

    <div id="pa_con" class="so-con warp ">
        <header id="pa_head" class="new_header">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <span class="icon icon_back" @click = ' noticeBack() '></span>
                </a>
            </div>
            <h2 class="center title_name">个人消息</h2>
            <div class="right"></div>
        </header>
        <div class="pa_content">
            <div class="page_box">
                <div class="message_area new_panel">
                    <div class="new_panel_top"></div>
                    <div class="new_panel_center">
                        <div class="item"  v-for = "item in msgList " @click = 'openList($event)' >
                            <div class="badge">
                                <span class="icon_account icon_notice_1"></span>
                            </div>
                            <div class="content">
                                <div class="title">
                                    <h2>{{item.title}}</h2>
                                </div>
                                <div class="detail" v-html = 'item.content'>
                                    <!-- <p>本公司會員最多可申請1個帳號投注，. 若超過1個以上的帳號投注同場賽事,. 本公司將保留最終的注單審核及刪除權利，. 敬請會員注意，謝謝。</p>
                                    <p>春节大回馈春节大回馈春节大回馈春节大回馈春节大回馈春节大回馈</p> -->
                                </div>
                                <div class="date"> {{formTime(item.createTime)}} </div>
                            </div>
                            <div class="btn_collapse">
                                <span >展开</span>
                                <span class="icon icon_arrow_light"></span>
                            </div>
                        </div>

                   <!--      <div class="item">
                            <div class="badge">
                                <span class="icon_account icon_notice_1"></span>
                            </div>
                            <div class="content">
                                <div class="title">
                                    <h2>投注相關規範公告</h2>
                                </div>
                                <div class="detail">
                                    <p>本公司會員最多可申請1個帳號投注，. 若超過1個以上的帳號投注同場賽事,. 本公司將保留最終的注單審核及刪除權利，. 敬請會員注意，謝謝。</p>
                                </div>
                                <div class="date">2017/07/21</div>
                            </div>
                            <div class="btn_collapse">
                                <span>展开</span>
                                <span class="icon icon_arrow_light"></span>
                            </div>
                        </div> -->
                        <!-- <div class="item">
                            <div class="badge">
                                <span class="icon_account icon_notice_1"></span>
                            </div>
                            <div class="content">
                                <div class="title">
                                    <h2>春节大回馈</h2>
                                </div>
                                <div class="detail">
                                    春节大回馈春节大回馈春节大回馈春节大回馈春节大回馈春节大回馈
                                </div>
                                <div class="date">2017/07/21</div>
                            </div>
                            <div class="btn_collapse">
                                <span>展开</span>
                                <span class="icon icon_arrow_light"></span>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>

        </div>
        <!--<footer class="bot_nav">-->
            <!--<ul>-->
                <!--<li class="active">-->
                    <!--<a class="index" href="../">首页大厅</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a class="trend" href="lobby_past_view.html">往期开奖</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a class="record" href="publicTemplate/bet_record.html">投注纪录</a>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<a class="member" href="info.html">个人中心</a>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</footer>-->
        <FooterNav></FooterNav>
    </div>

    <!-- 個人消息彈出視窗 -->
    <!--<div class="modal msg">-->
        <!--<div class="m_content">-->
            <!--<h2 class="noclose"><a></a></h2>-->
            <!--<div class="content check">-->
                <!--<div>-->
                    <!--<img src="../../../static/frist/images/pop/title_public.png">-->
                    <!--<img src="../../../static/frist/images/icon_check.svg">-->
                <!--</div>-->
                <!--恭喜 ! 您已注册成功 , 祝您游戏愉快！-->
            <!--</div>-->
            <!--<div class="action">-->
                <!--<a class="ok">确定</a>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->

</template>

<script>
import Mixin from '@/Mixin'
import FooterNav from '@/components/Footer'

export default {
  name: 'notification',
  mixins:[Mixin],
  components: {
   // AutoCloseDialog,
      FooterNav ,
  },
    data: function() {
        return {
            msgList:[],
            page:1,
            lock:0,
            ajaxSubmitAllow:false,
            biggerLockHeight:1,
            pageTotal:1,
        }
    },
    computed:{
            year: function(){
                return this.nowDate.getYear() + 1900;
            },
            mon: function(){
                return (this.nowDate.getMonth() + 1) < 10 ? ('0' + (this.nowDate.getMonth() + 1)) : (this.nowDate.getMonth() + 1);
            },
            day: function(){
                return this.nowDate.getDate() < 10 ? ('0' + this.nowDate.getDate()) : this.nowDate.getDate();
            },
            newpdate: function(){
                return '' + this.year + this.mon + this.day;
            },
        },
  mounted:function() {
      this.noticeBack()
      $('html,body').css('overflow-y','scroll' )  ;
      this.getMsglist(1)
         // 下拉加载更多
            function soyeScroll (selector) {
                this.selector = selector;
                this.init = (cb) => {
                    let selector = this.selector;
                    let that = this;
                    var count = 0;
                    let arr = selector.split(' ');
                    selector = arr.join('');
                    let doc = '';
                    if (selector.indexOf('.') === 0) {
                        selector = selector.substring(1, selector.length);
                        doc = document.getElementsByClassName(selector);
                        if (doc === null) {
                            console.error('soyeScroll errorMsg: this class is undefined!');
                            return;
                        }
                        doc = doc[doc.length - 1];
                        window.onscroll = () => {
                            let thisClientHeight = document.body.clientHeight;
                            let thisScrollHeight = document.body.scrollHeight;
                            var flag1 = thisScrollHeight - 100 <= (thisClientHeight + that.getScrollTop())
                            // console.log(that.getScrollTop() ,'stop' )
                            // console.log((thisClientHeight + that.getScrollTop()) ,'h1')
                            // console.log( count ,'h2')
                            var flag2 = that.getScrollTop() > count
                            if(flag2 ){
                                count = that.getScrollTop()
                            } 
                            // console.log( thisScrollHeight - 100 <= (thisClientHeight + that.getScrollTop()) ,'scroll')
                            // console.log( thisScrollHeight - 100 ,'scroll-11')
                            // console.log(  (thisClientHeight + that.getScrollTop()) ,'scroll-12')
                            if (flag1&&flag2 ) {
                                cb();
                            }
                        };
                    } else if (selector.indexOf('#') === 0) {
                        selector = selector.substring(1, selector.length);
                        doc = document.getElementById(selector);
                        if (doc === null) {
                            console.error('soyeScroll errorMsg: this id is undefined!');
                            return;
                        }
                        let thisHeight = doc.style.height;
                        let thisX = doc.getBoundingClientRect().left;
                    }
                };
                this.getScrollTop = () => {
                    let scrollTop = 0;
                    let bodyScrollTop = 0;
                    let documentScrollTop = 0;
                    if (document.body) {
                        bodyScrollTop = document.body.scrollTop;
                    }
                    if (document.documentElement) {
                        documentScrollTop = document.documentElement.scrollTop;
                    }
                    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                    return scrollTop;
                };
            }

            this.soyeScroll = new soyeScroll('.item');
            this.soyeScroll.init(() => {
                if (this.lock === 0) {
                    this.lock = 1;
                    this.restr = '';                   
                    this.getMsglist(this.page); 
                }
            });    
  },
  methods: {
    getMsglist:function (pdate) {

        var _self=this;
           if (pdate < 0) {
                return false
            }
        if(_self.ajaxSubmitAllow){ // 解决重复提交问题
            return false ;
        }
        if(_self.page>_self.pageTotal){ // 解决重复提交问题
            return false ;
        }
         _self.ajaxSubmitAllow = true;

        $.ajax({
              type:'get',
              url: _self.action.forseti + 'apid/cms/msg/list',
              data:{
                sourceType:2,
                memberId:this.getCookie('memberId'),
                page:pdate,
                rows:5,    
              },
              success:(res)=>{
                _self.ajaxSubmitAllow = false;
                console.log(res,'res')
                _self.lock = 0;
                _self.pageTotal = res.data.data.totalPage
                console.log( _self.pageTotal ,'total' )
                if(_self.page<= _self.pageTotal){
                    _self.msgList.push(res.data.data.rows) ;
                    _self.msgList =  _.flatten(_self.msgList)
                    // console.log( _self.msgList ,'list')
                    _self.page++  
                    // console.log(_self.page,'pdate')
                    var t = new Date(_self.msgList[0].createTime)
                   
                }
              }
          })
      },

      noticeBack:function(){
        var _self=this;
        this.getMsglistStatus()
        this.getMsglistRead()        
      },


      getMsglistStatus:function () {
          var _self=this;
          $.ajax({
              type:'get',
              url: _self.action.forseti + 'apid/cms/msg/status',
              data:{
                sourceType:2,
                memberId:39130,
                page:1,
                // appid:1,    
              },
              success:(res)=>{

                 this.setCookie("noticeIndexStatu", res.data)  
                 // console.log(res.data ,'sta' )                
              }
          })
      },
      getMsglistRead:function () {
          var _self=this;
          $.ajax({
              type:'get',
              url: _self.action.forseti + 'apid/cms/msg/read',
              data:{
                sourceType:2,
                memberId:39130,
                page:1,
                // appid:1,    
              },
              success:(res)=>{
                 this.setCookie("noticeIndexRead", res.data)               
                 // console.log(res.data ,'rea' )                        
              }
          })
      },
   
    formTime:function(time){
         var t = new Date(time)       
        return '' + t.getFullYear() +'/'+ (t.getMonth()+1)+'/' + t.getDate()
    },
    openList:function(e){
        console.log(999)
        var $this =  $(e.currentTarget);
        var $text = $(this).find('.btn_collapse span:first-child');
         if (! $this.hasClass('active') ){
              $this.addClass('active');
              $this.siblings().removeClass('active');
              $text.text('收合')
          } else{
              $this.removeClass('active');
              $text.text('展开')
          }
    },


  }

}
</script>
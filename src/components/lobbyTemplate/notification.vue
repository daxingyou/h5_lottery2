<template>

    <div id="pa_con" class="so-con warp ">
        <header id="pa_head" class="new_header">
            <div class="left">
                <a href="javascript:;" onclick="history.go(-1)">
                    <span class="icon icon_back"></span>
                </a>
            </div>
            <h2 class="center title_name">个人中心</h2>
            <div class="right"></div>
        </header>
        <div class="pa_content">
            <div class="page_box">
                <div class="message_area new_panel">
                    <div class="new_panel_top"></div>
                    <div class="new_panel_center">
                        <div class="item">
                            <div class="badge">
                                <span class="icon_account icon_notice_1"></span>
                            </div>
                            <div class="content">
                                <div class="title">
                                    <h2>春节大回馈</h2>
                                </div>
                                <div class="detail">
                                    <p>本公司會員最多可申請1個帳號投注，. 若超過1個以上的帳號投注同場賽事,. 本公司將保留最終的注單審核及刪除權利，. 敬請會員注意，謝謝。</p>
                                    <p>春节大回馈春节大回馈春节大回馈春节大回馈春节大回馈春节大回馈</p>
                                </div>
                                <div class="date">2017/07/21</div>
                            </div>
                            <div class="btn_collapse">
                                <span>展开</span>
                                <span class="icon icon_arrow_light"></span>
                            </div>
                        </div>
                        <div class="item">
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
                        </div>
                        <div class="item">
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
                        </div>
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
// import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
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

        }
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' )  ;

      //列表展开收合
      $('.message_area').find('.item').on('click',function(){
          var $this = $(this);
          var $text = $(this).find('.btn_collapse span:first-child');

          if (! $this.hasClass('active') ){
              $this.addClass('active');
              $this.siblings().removeClass('active');
              $text.text('收合')
          } else{
              $this.removeClass('active');
              $text.text('展开')
          }
      })
  },
  methods: {

}

}
</script>
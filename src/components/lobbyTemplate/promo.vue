<template>
    <div id="pa_con" class="so-con warp body_bg">
        <header id="pa_head" class="new_header">
            <div class="left">
                <a href="/">
                    <span class="icon icon_back"></span>
                </a>
            </div>
            <h2 class="center title_name">优惠活动</h2>
            <div class="right"></div>
        </header>
        <div class="pa_content">
            <div class="promo_area">
                <ul class="promo_list">
                    <li>
                        <img src="../../../static/frist/images/banner/promo-1.jpg">
                        <h3>更多热门彩种 即将上线</h3>
                        <p><a href="promo_content" class="new_btn"><span>查看详情</span></a></p>
                    </li>
                    <li>
                        <img src="../../../static/frist/images/banner/promo-2.jpg">
                        <h3>支付系统 火爆升级</h3>
                        <p><a href="promo_content" class="new_btn"><span>查看详情</span></a></p>
                    </li>
                    <li>
                        <img src="../../../static/frist/images/banner/promo-3.jpg">
                        <h3>权威信誉担保 公平公正公开</h3>
                        <p><a href="promo_content" class="new_btn"><span>查看详情</span></a></p>
                    </li>
                    <li>
                        <img src="../../../static/frist/images/banner/promo-4.jpg">
                        <h3>彩球掉线 领取补偿金</h3>
                        <p><a href="promo_content" class="new_btn"><span>查看详情</span></a></p>
                    </li>
                    <li>
                        <img src="../../../static/frist/images/banner/promo-5.jpg">
                        <h3>完成有效投注 存款赠送100%</h3>
                        <p><a href="promo_content" class="new_btn"><span>查看详情</span></a></p>
                    </li>
                </ul>
            </div>


        </div>

    </div>
</template>
<style>

</style>
<script>
// import $ from "jquery";
import Mixin from '@/Mixin'


export default {
  name: 'promo',
  mixins:[Mixin],
  components: {

  },
  data: function() {
        return {

        }
    },
  created: function() {
    },
  mounted:function() {
      $('html,body').css('overflow-y','scroll' );
      document.documentElement.scrollTop = document.body.scrollTop=0; // 回到顶部
      $(function(){
          $('.promo_area > ul > li').on('click',function(){
              $(this).toggleClass('active').siblings().removeClass('active');
          })
      })
  },
  methods: {



  }
}
</script>
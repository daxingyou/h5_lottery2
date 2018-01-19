<template>
    <div id="pa_con" class="so-con warp ">
        <header id="pa_head" class="new_header">
            <div class="left">
                <router-link :to="'/'" >
                    <span class="icon icon_back"></span>
                </router-link>
            </div>
            <h2 class="center title_name">{{copyTitle}}</h2>
            <div class="right"></div>
        </header>
        <div class="pa_content" id="freshContent">
            <div class="tutorial_area page_box">
            <div class="tabset">
                <!-- Tab 1 -->
                <input type="radio" name="tabset" id="tab1" aria-controls="agent" checked @click="gotoTop('xsjc')">
                <label for="tab1" class="tab1">新手教程</label>
                <!-- Tab 2 -->
                <input type="radio" name="tabset" id="tab2" aria-controls="commission" @click="gotoTop('czjc')">
                <label for="tab2" class="tab2">充值教程</label>
                <!-- Tab 3 -->

                <div class="tab-box">
                    <section class="tab-panels" v-html="copyContent">

                    </section>
                </div>

            </div>
            </div>
        </div>

        <FooterNav />

    </div>
</template>

<script>
// import $ from "jquery";
import Mixin from '@/Mixin'
// import AutoCloseDialog from '@/components/publicTemplate/AutoCloseDialog'
import FooterNav from '@/components/Footer'

export default {
  name: 'about',
  mixins:[Mixin],
  components: {
   // AutoCloseDialog,
      FooterNav ,
  },
    data: function() {
        return {
            copyTitle: '新手教程',
            copyContent: '',
            freshEdu: {},
            depositEdu: {}
        }
    },
  mounted:function() {
      $('html,body').css('overflow-y', 'scroll');
      this.getCopyright('1', 'BT01')
  },
    watch: {
        copyContent: function () {
            console.log(0)
        }
    },
  methods: {
      gotoTop: function (name) {
          //scrollTo(0,0);
          if (name == 'xsjc') {
              this.getCopyright('1', 'BT01')
          }
          if (name == 'czjc') {
              this.getCopyright('1', 'BT05')

          }
      },
}

}
</script>
<style>


    #freshContent {
        margin-top: 1.37rem;
    }

    #freshContent .tab-panels {
        padding: 10px 5%;
    }
    #freshContent .tab-panels p {
        line-height: 30px;
        margin: .5rem 0;
        text-align: left;
    }

    #freshContent .tab-panels p strong {
        display: block;
        color: #b41a17;
        text-align: left;

    }

    #freshContent .tab-panels p span {
        display: block;
        text-indent: 0.5em;
        text-align: left;

    }
</style>
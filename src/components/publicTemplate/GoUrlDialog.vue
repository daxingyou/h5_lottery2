<template>
    <div v-if="show" class="modal m14">
        <div class="m_content">
            <h2>提示<a href="javascript:;" @click="close()"></a></h2>
            <div class="content danger">
                <div>
                    <img src="/static/frist/images/page/status03.svg">
                </div>{{message}}
            </div>
            <div class="action">
                <a class="new_btn cancel" href="javascript:;" @click="close()"><span>取消</span></a><a class="new_btn ok" href="javascript:;"  @click="goUrl()"><span>{{title}}</span></a>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal{
        display: block;
        z-index: 1000;
    }
</style>

<script>
import Mixin from '@/Mixin'
// import $ from "jquery";

export default {
    name: 'GoUrlDialog',
    mixins:[Mixin],
    data () {
        return {
            show:false,
            message : '',
            title : '',
            url : '',
        }
    },
    methods:{
       open:function (message, text, url) {
           this.show=true
           this.message = message;
            this.title = text;
            this.url = url;
       },
        //关闭弹窗
        close:function(e){
            this.show = false;
        },
        goUrl:function () {
            window.location = this.url ;
        },
    }
}
</script>

<style scoped>
</style>

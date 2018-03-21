import Vue from 'vue'
import Router from 'vue-router'
// import require from 'require';
import Index from '@/components/Index'
import Login from '@/components/Login'
import Reg from '@/components/Reg'
// import HksixlotIndex from '@/components/hksixlot/Index'
import Jc11x5Index from '@/components/jc11x5/Index'  // 江西11选5
import SD11x5Index from '@/components/jc11x5/ShanDongIndex'  // 山东11选5
import GD11x5Index from '@/components/jc11x5/GuangDongIndex'  // 广东11选5
import MS11x5Index from '@/components/jc11x5/MiaoSuIndex'  // 秒速11选5
import K3Index from '@/components/k3/Index'  // 广东11选5
import AnHuiK3Index from '@/components/k3/AnHuiIndex'  // 安徽快3
import HuBeiK3Index from '@/components/k3/HuBeiIndex'  // 湖北快
import Pk10Index from '@/components/pk10/Index'  // 北京 pk10
import SecondPk10 from '@/components/pk10/SecondPk10'  // 北京 pk10
import LuckyBoat from '@/components/pk10/LuckyBoat'  // 幸运飞艇

import CqsscIndex from '@/components/cqssc/Index'  // 重庆时时彩
import TjsscIndex from '@/components/cqssc/TianJinIndex'  // 天津时时彩
import XjsscIndex from '@/components/cqssc/XinJiangIndex'  // 新疆时时彩
import BeiJingIndex from '@/components/cqssc/BeiJingIndex'  // 北京时时彩
import TaiWanIndex from '@/components/cqssc/TaiWanIndex'  // 台湾5分彩
import SecondSsc from '@/components/cqssc/SecondSsc'  // 秒速时时彩
import HanGuoIndex from '@/components/cqssc/HanGuoIndex'  // 韩国1.5分彩
import DongJingIndex from '@/components/cqssc/DongJingIndex'  // 东京1.5分彩
import MiaoSuK3Index from '@/components/k3/MiaoSuIndex'  // 秒速快3
import LhcIndex from '@/components/lhc/Index' // 六合彩
import LhcBetRecord from '@/components/lhc/LhcBetRecord' // 六合彩投注紀錄

import WfLhcIndex from '@/components/lhc/wflhc' // 极速六合彩
// import WfLhcIndex from '@/components/wflhc/Index' // 极速六合彩
// import Xy28Index from '@/components/xy28/Index' // 幸运28

import PastView from '@/components/publicTemplate/PastView'
import lobbyPastView from '@/components/lobbyPastView'  // 大厅往期开奖
import BetRecord from '@/components/publicTemplate/BetRecord'
import lobbyBetRecord from '@/components/lobbyBetRecord'  // 大厅投注记录
import RoadBeads from '@/components/publicTemplate/RoadBeads'
import pk10RoadBeads from '@/components/publicTemplate/pk10RoadBeads'
import DsLong from '@/components/publicTemplate/DsLong'
import info from '@/components/lobbyTemplate/info'  // 大厅个人中心
import analysis from '@/components/lobbyTemplate/analysis'  // 大厅个人中心 盈亏分析
import acdetial from '@/components/lobbyTemplate/acdetial'  // 大厅个人中心 帐户明细
import acDetailData from '@/components/lobbyTemplate/acDetailData'  // 大厅个人中心 帐户明细
import deposit from '@/components/lobbyTemplate/deposit'  // 大厅个人中心 充值

import withdrawals from '@/components/lobbyTemplate/withdrawals'  // 大厅个人中心 提款
import agent from '@/components/lobbyTemplate/agent'  // 大厅代理加盟
import agentApply from '@/components/lobbyTemplate/agentApply'  // 大厅代理加盟注册页
import info_data from '@/components/lobbyTemplate/info_data'  //个人中心-账户管理
import notification from '@/components/lobbyTemplate/notification'  //个人中心-个人消息
// import join from '@/components/lobbyTemplate/join' //欢迎加入
import withdrawals_bind from '@/components/lobbyTemplate/withdrawals_bind'

import about from '@/components/lobbyTemplate/about'  // 大厅 關於我們
import tutorial from '@/components/lobbyTemplate/tutorial'  // 大厅 關於我們
import promo from '@/components/lobbyTemplate/promo'  // 大厅 优惠活动
import promo_content from '@/components/lobbyTemplate/promo_content'  // 大厅 优惠活动详情
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base:'/app/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    // {
    //   path: '/hksixlot', name: 'hksixlotIndex', component: HksixlotIndex
    // },
    {
      path: '/jc11x5/',
      name: 'jc11x5Index',
      component: Jc11x5Index
    },
    {
      path: '/jc11x5/sd11x5Index',
      name: 'sd11x5Index',
      component: SD11x5Index
    },
    {
      path: '/jc11x5/gd11x5Index',
      name: 'gd11x5Index',
      component: GD11x5Index
    },
   {
       path: '/jc11x5/ms11x5Index',
       name: 'ms11x5Index',
       component: MS11x5Index
   },
    {
      path: '/k3/',
      name: 'k3Index',
      component: K3Index
    },
    {
      path: '/k3/anHuiK3Index',
      name: 'AnHuiK3Index',
      component: AnHuiK3Index
    },
    {
      path: '/k3/huBeiK3Index',
      name: 'HuBeiK3Index',
      component: HuBeiK3Index
    },
   {//秒速快3
       path: '/k3/miaoSuK3Index',
       name: 'MiaoSuK3Index',
       component: MiaoSuK3Index
    },
    {
      path: '/pk10/',
      name: 'pk10Index',
      component: Pk10Index
    },
    {
      path: '/pk10/SecondPk10',
      name: 'SecondPk10',
      component: SecondPk10
    },
    {
      path: '/pk10/LuckyBoat',
      name: 'LuckyBoat',
      component: LuckyBoat
    },
    { //重庆时时彩
      path: '/cqssc/',
      name: 'cqsscIndex',
      component: CqsscIndex
    },
    {  // 天津时时彩
      path: '/cqssc/tianJinIndex',
      name: 'tjsscIndex',
      component: TjsscIndex
    },
    {  // 秒速时时彩
        path: '/cqssc/xinJiangIndex',
        name: 'xjsscIndex',
        component: XjsscIndex
    },
    {  // 韩国1.5分彩
        path: '/cqssc/HanGuoIndex',
        name: 'HanGuoIndex',
        component: HanGuoIndex
    },
    {  // 东京1.5分彩
        path: '/cqssc/DongJingIndex',
        name: 'DongJingIndex',
        component: DongJingIndex
    },
     {  // 新疆时时彩
        path: '/cqssc/SecondSscIndex',
        name: 'SecondSsc',
        component: SecondSsc
    },
    {  // 北京时时彩
      path: '/cqssc/BeiJingIndex',
      name: 'BeiJingIndex',
      component: BeiJingIndex
    },
    {  // 台湾5分彩
      path: '/cqssc/TaiWanIndex',
      name: 'TaiWanIndex',
      component: TaiWanIndex
    },
    {
        path: '/lhc',
        name: 'LhcIndex',
        component: LhcIndex
    },
     {
      path: '/wflhc',
      name: 'WfLhcIndex',
      component: WfLhcIndex
    },
    // {
    //   path: '/xy28',
    //   name: 'Xy28Index',
    //   component: Xy28Index
    // },

    { path: '/publicTemplate/pastView', name:'pastView', component: PastView },
    { path: '/lobbyPastView', name:'lobbyPastView', component: lobbyPastView },
    { path: '/publicTemplate/betRecord', name:'betRecord', component: BetRecord },
    { path: '/lobbyBetRecord', name:'lobbyBetRecord', component: lobbyBetRecord },
    { path: '/publicTemplate/roadBeads', name:'roadBeads', component: RoadBeads },
    { path: '/publicTemplate/pk10roadBeads', name:'pk10roadBeads', component: pk10RoadBeads },
    { path: '/publicTemplate/dsLong', name:'dsLong', component: DsLong },
    { path: '/lobbyTemplate/info', name:'info', component: info },
    { path: '/lobbyTemplate/analysis', name:'analysis', component: analysis },
    { path: '/lobbyTemplate/acdetial', name:'acdetial', component: acdetial },
    { path: '/lobbyTemplate/about', name:'about', component: about },
    { path: '/lobbyTemplate/tutorial', name:'tutorial', component: tutorial },

      {path: '/lhc/LhcBetRecord', name: 'lhcBetRecord', component: LhcBetRecord},


    // import acDetailData from '@/components/lobbyTemplate/acDetailData'  // 大厅个人中心 帐户明细
    { path: '/lobbyTemplate/acDetailData', name:'acDetailData', component: acDetailData, props: (route) => ({ 
        
        query: route.query.q 
      })
    },
    { path: '/lobbyTemplate/deposit', name:'deposit', component: deposit },
    { path: '/lobbyTemplate/withdrawals', name:'withdrawals', component: withdrawals },
    { path: '/lobbyTemplate/agent', name:'agent', component: agent },
    { path: '/lobbyTemplate/agentApply', name:'agentApply', component: agentApply },
    { path: '/lobbyTemplate/info_data', name:'info_data', component: info_data },
    { path: '/lobbyTemplate/notification', name:'notification', component:notification },
    // { path: '/lobbyTemplate/join', name:'join', component:join },
    { path: '/lobbyTemplate/withdrawals_bind', name:'withdrawals_bind', component:withdrawals_bind },
    { path: '/lobbyTemplate/promo', name:'promo', component:promo},
    { path: '/lobbyTemplate/promo_content', name: 'promo_content', component: promo_content }
  ]
})

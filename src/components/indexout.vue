<template>
  <div class="indexoutcon" id="indexoutcon">
    <div class="app-content" style="margin-left:0px;width:100%;margin-top:0px;">
      <!-- <keep-alive exclude="quickEntry,nextWeb"> -->
        <breadCrumb :newbar="newbar" />
        <router-view class=""></router-view>
      <!-- </keep-alive> -->
    </div>

    <div id="toast-container" class="toast-bottom-left"></div>
    <div id="app"></div>

  </div>
</template>

<script>
import AppHeader from './partials/app.header.vue'
import AppAside from './partials/app.aside.vue'
import { getQueryString,logout} from '@/misc/root-common'
import { mapState,mapActions } from 'vuex'

import { USER_SIGNIN } from '../store/user'
import { SET_ROUTERS,SET_ROUTERSOUT,OUT_ROUTERS } from '../store/menu'
import token, { TOKEN_SIGNIN } from '../store/token'
import { initialMenu,allnoAuthMenu } from '@/misc/initialmenu.js'
import MenuUtils from '@/misc/MenuUtils.js'
import { Set_LoadNode,Out_LoadNode } from '../store/isloadnode'
import { setCodeParams} from '../store/code-params'
import breadCrumb from '@/components/partials/bread-crumb';

export default {
  computed: mapState({ user: state => state.user,menuout: state => state.menuout,menu: state => state.menu,isloadnode:state => state.isloadnode}),
  components: {AppHeader, AppAside, breadCrumb},
  name: 'indexout',
  data(){
    return {
      linkurl:'',
      componenturl:'',
      newbar:[],
      theme: localStorage.theme || 'theme1'
    }
  },
  // beforeRouteEnter: Auth.authorizations, // 进入首页前先进行登录验证
  beforeRouteUpdate (to, from, next) {
    next()
  },
  methods: {
    ...mapActions(['USER_SIGNIN','SET_ROUTERS','Set_LoadNode','TOKEN_SIGNIN','SET_ROUTERSOUT','setCodeParams']),
    // loaded (state) { // 子组件加载完成应向上触发`loaded`事件, 在这里捕获后隐藏加载动画. (有没有更好的实现办法?)
    //   this.loading = state
    // },
    routerComp(data){
          var asyncRouterMap = [];
          var systemmenu = {};
          var firstpage = {};
          systemmenu['path'] = '/indexOut';
          systemmenu['component'] = "indexout";
          systemmenu['children'] = [];
          systemmenu['children'][0] = {};
          var syschildren = data;
          // this.$router.push('/indexout');
          $(syschildren).each(function(i,v) {
            var path = syschildren[i].url;
            var component = syschildren[i].component_url;
            if(path == null || path == "" || path == undefined){
              path = "";
            }
            if(syschildren[i].component_url == 'index/index'){
              firstpage = {title:'首页',id: syschildren[i].id,component: "index/index",path: path,icon:syschildren[i].icon_url,'showcode':syschildren[i].show_code,'funccode':syschildren[i].code,'nodetype':syschildren[i].node_type,parentId: syschildren[i].parent_id,level: 0,ishidden: false,meta:{'currentid':-1,'title':'首页'}};
            }else{
              systemmenu['children'].push({
                'title':syschildren[i].name,
                // 'name': syschildren[i].name,
                'id':syschildren[i].id,
                'funccode':syschildren[i].code,
                'component':syschildren[i].component_url,
                'path':'/cas'+path,
                'showcode':syschildren[i].show_code,
                'nodetype':syschildren[i].node_type,
                'icon':syschildren[i].icon_url,
                'parentId':syschildren[i].parent_id,
                'level':syschildren[i].lev,
                'ishidden':syschildren[i].ishidden,
                'meta':{
                  'currentid':syschildren[i].parent_id,
                  'title': syschildren[i].name,
                  'isbtn': syschildren[i].ishidden,
                   id:syschildren[i].id
                }
              });
            }
          })
          if(Object.keys(firstpage).length == 0){
              firstpage = {title:'首页',id:'-2',component: "index/index",path:'/index',icon:'ioss-home','showcode':'0','funccode':'-2','nodetype':1,parentId:'-2',level: 1,ishidden: false,meta:{'currentid':-1,'title':'首页'}};
          }
          systemmenu['children'][0] = firstpage;
          systemmenu['children'] = systemmenu['children'].concat(initialMenu)
          asyncRouterMap.push(systemmenu);
          asyncRouterMap = asyncRouterMap.concat(allnoAuthMenu);
          var routers = [];
          this.SET_ROUTERS(asyncRouterMap);
          //  this.SET_ROUTERS(asyncRouterMap)
          MenuUtils(routers,asyncRouterMap);
          this.$router.addRoutes(routers);
          const json_data = this.menu[0].children;
          var newarr = this.getTree(json_data);
          this.newbar = newarr;
    },
    getTree(treeData){
      if(treeData==undefined||treeData.length==0) return;
      var firstMenus=[];
      var leftMenus=[];//剩余未处理的
      var dealData=this.deepCopy(treeData);
      for(var i in dealData){
          if(dealData[i].parentId== 0){
              firstMenus.push(dealData[i]);
          }else{
              leftMenus.push(dealData[i]);
          }
      }
      this.buildMenuTree(firstMenus,leftMenus);
      return firstMenus;
    },
    buildMenuTree(firstMenus, leftMenus) {
          var deleteNode={};//待删除节点
          for (var i in firstMenus) {
            for (var j in leftMenus) {
            if(firstMenus[i].ishidden === false && leftMenus[j].ishidden === false && firstMenus[i].nodetype !== 2 && leftMenus[j].nodetype !== 2){
                if (firstMenus[i].id === leftMenus[j].parentId) {
                  if (firstMenus[i].children == undefined) {
                    firstMenus[i].children = [leftMenus[j]];
                  } else {
                    firstMenus[i].children.push(leftMenus[j]);
                  }
                  deleteNode[leftMenus[j].id]='';
                }
            }
            }
          }
        //删除已经处理的
        for(var i in leftMenus){
          if(deleteNode[leftMenus[i].id]){
            leftMenus.splice(i, 1);//移除已处理的元素
          }
        }
        //处理children的层级，剩余未处理的
        for (var k in firstMenus) {
          if (firstMenus[k].children != undefined && firstMenus[k].children.length > 0) {
              this.buildMenuTree(firstMenus[k].children, leftMenus);
          }
        }
    },
    deepCopy(ary){
        return JSON.parse(JSON.stringify(ary));
    },
    getDetail(type,username) {
        if(type == 0){ //不是代理的
          var resourcename = 'getDomainMenu'
          var request_network = this.$api.commonApi[resourcename]()
        }else if(type == 1){ //是代理的
          var resourcename = 'getDomainMenu2'
          var request_network = this.$api.commonApi[resourcename](username);
        }
        request_network.then(response => {
          var result = response.data.result;
          var data = response.data.data;
          this.routerComp(data);
          this.$router.push(this.linkurl);
        });
    },
    getOutIndex(type,username){
      var that = this;
      var menuinfo = JSON.parse(localStorage.getItem('menu'));
      var urllink = this.linkurl;
      var menuflag = 1;
      if(menuinfo){
        if(menuinfo.length > 0){
          var firstcomp = menuinfo[0].component;
          var newarr = menuinfo[0].children;
          $(newarr).each(function(i,v){
            if(newarr[i].path == urllink){
              menuflag = 0;
            }
          })
        }else{
          var firstcomp = ''
        } 
      }
      if(menuinfo == null || firstcomp == 'index' || menuflag == 1){
          this.getDetail(type,username);
       }else{
         this.$router.push(this.linkurl);
       }
      
      // var asyncRouterMap = [];
      // var systemmenu = {};
      // systemmenu['path'] = '/indexout';
      // systemmenu['component'] = "indexout";
      // systemmenu['children'] = [];
      // var urllink = this.linkurl;
      // var comlink = this.componenturl;
      // systemmenu['children'].push({
      //     'title':'嵌入',
      //     'component':comlink,
      //     'path':urllink,
      //     'children':[],
      // });
      // asyncRouterMap.push(systemmenu);
      // var routers = [];
      // this.SET_ROUTERS(asyncRouterMap);
      // MenuUtils(routers,asyncRouterMap);
      // this.$router.addRoutes(routers);
      // this.$router.push(urllink);
    },
    setTheme(theme,edata){
      if(theme === undefined){
        var themenew = 'theme1'
      }else{
        var themenew = theme
      }
      localStorage.setItem('theme', themenew);
      this.theme = themenew;
      if (!!this.theme) {
        document.getElementById('body_app').className = this.theme
      } else {
        document.getElementById('body_app').className = 'theme1'
      }
      var userinfo = edata.userinfo;
      this.USER_SIGNIN(userinfo);
    },
    detailRedirect(type,edata){
      var state = this.$route.query.state;
      if(type == 0){
         this.linkurl = edata.possurl;
         this.TOKEN_SIGNIN(edata.posstoken);
      }else{
         this.linkurl = state;
         var tokencas = this.$route.query.cas_access_token;
         var datajson = {
            cas_access_token: tokencas
         };
         this.TOKEN_SIGNIN(datajson);
      }
      this.componenturl = edata.posscompurl;
      var userinfo = edata.userinfo;
      var codeParams = edata.codeParams;
      this.setCodeParams(codeParams);
      if(type == 0){
        var hasload = localStorage.getItem('indexhasload');
        if(hasload){
          this.getOutIndex(0,userinfo.code);
        }else{
          localStorage.setItem('indexhasload',1);
          window.location.href = base.sq + base.version+'/auth/cas/auth'
        }
      }else{
        this.getOutIndex(1,userinfo.code);
      }
        
    }
  },
  created (){
    var that = this;
    var state = this.$route.query.state;
    window.addEventListener("message", function(e) {
      //判断是否有传输的新token，有新token重新存储
      let cas_token = e.data['casTokenChange']
      if(!!cas_token){
        var json = {
          'cas_access_token': cas_token
        }
        window.localStorage.setItem('tokenarray', JSON.stringify(json))
        return;
      }
      //判断是否有传输的新token，有新token重新存储 end
      var timestamps = e.data.timestamp;
      var gettimestamp = localStorage.getItem('timestamp');
      if(timestamps != undefined && gettimestamp != undefined && timestamps != gettimestamp){
          localStorage.removeItem('menu');
          localStorage.removeItem('indexhasload');
          localStorage.removeItem('codeRules')
          localStorage.removeItem('user')
      }
      var userstring = localStorage.getItem('user');
      if(userstring === "{}"){
          localStorage.removeItem('menu');
          localStorage.removeItem('indexhasload');
          localStorage.removeItem('codeRules')
      }
      /*代理的时候验证是否有传过来的值 */
      var edata1 = e.data;
      var themedata = edata1.themecolor;
      if(themedata == undefined){
         var theme = edata1.theme;
      }else{
         var theme = themedata;
      }
      that.setTheme(theme,edata1)
      /*代理设置主题结束 */
       if(state){
        var edata = e.data;
        var theme = edata.theme;
        that.setTheme(theme,edata)
        that.detailRedirect(1,edata)
      }
      if(e.origin != base.authwebsq){
        return;
      }
      var edata = e.data;
      var themedata = edata.themecolor;
    
      if(themedata == undefined){
          localStorage.setItem('timestamp',edata.timestamp);
          localStorage.setItem('sbparam',edata.sbparam)
          var theme = edata.theme;
          setTimeout(()=>{
           that.setTheme(theme,edata)
          },10)
          that.detailRedirect(0,edata)
      }else{
          var theme = themedata;
          that.setTheme(theme,edata)
      }
      const json_data = !!that.menu && !!that.menu[0] && !!that.menu[0].children && that.menu[0].children || [];
      var newarr = that.getTree(json_data);
      that.newbar = newarr;
    });
    
  },
  mounted(){
      var that = this;
      $("#app-preloader").remove();
  }
}
</script>

<template>
  <div style="display: none;" :style="{display: 'block'}">
    <app-aside :newbar="newbar" :userinfo="userinfo" id="appaside"></app-aside>

    <div class="app-content">
       <AppHeader :userinfo="userinfo" :cacheInfo="cacheInfo" id="topaside"></AppHeader>
       <div class="appcontent">
        <div class="appcontent-con">
          <breadCrumb :newbar="newbar" />
          <router-view class=""></router-view>
        </div>
       </div>
    </div>

    <div id="toast-container" class="toast-bottom-left"></div>

  </div>
</template>

<script>
import AppHeader from './partials/app.header.vue'
import AppAside from './partials/app.aside.vue'

import { getQueryString,logout} from '@/misc/root-common'
import { mapState,mapActions } from 'vuex'

import { USER_SIGNIN } from '../store/user'
import { TENANT_SIGNIN } from '../store/tenant'
import { SET_ROUTERS,OUT_ROUTERS } from '../store/menu'
import { TOKEN_SIGNIN } from '../store/token'
import MenuUtils from '@/misc/MenuUtils.js'
import { initialMenu,allnoAuthMenu } from '@/misc/initialmenu.js'
import { Set_LoadNode,Out_LoadNode } from '../store/isloadnode'
import { setCodeParams} from '../store/code-params'
import breadCrumb from '@/components/partials/bread-crumb';
export default {
  computed: mapState({ user: state => state.user,menu: state => state.menu,isloadnode:state => state.isloadnode,codeParams: state => state.setCodeParams.codeParams}),
  components: {AppHeader, AppAside,breadCrumb},
  name: 'index',
  data(){
    return {
      menuinfo:[],
      newbar:[],
      userinfo:{},
      transitionName: 'slide-left',
      loading: 1,
      initialimg:'/static/img/img_photo.png'
    }
  },
  // beforeRouteEnter: Auth.authorizations, // 进入首页前先进行登录验证
  beforeRouteUpdate (to, from, next) {
    next()
  },
  methods: {
    ...mapActions(['USER_SIGNIN','SET_ROUTERS','Set_LoadNode','TOKEN_SIGNIN','TENANT_SIGNIN','setCodeParams']),
    
    leftSideItem(){
         this.$api.commonApi.memInfo().then(response => {
            var result = response.data.result;
            if(result == 'success'){
              var json = response.data.data;
              this.getDetail(json);
            }else{
              // this.$Message.error('获取用户信息出错！');
              logout(1);
            }
         })
      },
      getDetail(json){
          var routers = [];
          var asyncRouterMap = this.cacheInfo(json).asyncRouterMap;
          var userobj = this.cacheInfo(json).userobj;
          var tenantid = json.tenant.id;
          if(json.code_check_rule_params){
          var codeParams = json.code_check_rule_params;
          this.setCodeParams(codeParams);
          }
          this.SET_ROUTERS(asyncRouterMap);
          MenuUtils(routers,asyncRouterMap);
          this.$router.addRoutes(routers);
          if (json.funcnodes.length == 0) {
	        this.$router.push("/403");
	        return;
	  }
          
          this.USER_SIGNIN(userobj);
          this.userinfo = userobj;
          var tenantinfo = {
            'tenantid':tenantid
          }
          this.TENANT_SIGNIN(tenantinfo);
          this.getSideLeft();
      },
      cacheInfo(json){
          var cachejson = {};
          var asyncRouterMap = [];
          var userobj = {};
          var data = json;
          var id = data.id;
          var name = data.name;
          var phone = data.phone;
          var code = data.code;
          var user_type = data.user_type;
          if(data.teams != null && data.teams.length > 0){
            var org_id = data.teams[0].id;
            var user_id = data.teams[0].user_id;
          }
          if(data.roles != null && data.roles.length > 0){
            var role_id = data.roles[0].id;
          }
          if(data.tenant != null){
            var tenancy_logo = data.tenant.logo_path;
            if(tenancy_logo == null){
              var tenancy_logo = '/static/img/logo-min.png'
            }
            var tenancy_title = data.tenant.title;
          }
          var portalUserFavorites = data.portalUserFavorites;
          var userphoto = this.initialimg,userstyle = 'theme1',usertaxarea = '',usertax = '';
          $(portalUserFavorites).each(function(i,v){
            var person_code = portalUserFavorites[i].code;
            var person_content = portalUserFavorites[i].content;
            if(person_code == 'i_path'){
              userphoto = person_content
            }else if(person_code == 'style'){
              userstyle = person_content
            }else if(person_code == 'last_tax_type_code'){
              usertax = person_content;
            }else if(person_code == 'last_tax_area_code'){
              usertaxarea = person_content;
            }
          })
          localStorage.setItem('theme', userstyle)
          userobj['id'] = id;
          userobj['name'] = name;
          userobj['phone'] = phone;
          userobj['user_type'] = user_type;
          userobj['org_id'] = org_id;
          userobj['user_id'] = user_id;
          userobj['role_id'] = role_id;
          userobj['code'] = code;
          userobj['tenancylogo'] = tenancy_logo;
          userobj['tenancytitle'] = tenancy_title;
          userobj['userphoto'] = userphoto;
          userobj['userstyle'] = userstyle;
          userobj['usertax'] = usertax;
          userobj['usertaxarea'] = usertaxarea;
          if(data.funcnodes.length > 0){
        
              var funcnodes = data.funcnodes;
              var systemmenu = {};
              // systemmenu['path'] = funcnodes.path;
              systemmenu['path'] = '/index';
              systemmenu['component'] = "index";
              systemmenu['children'] = [];
              var syschildren = funcnodes;
              var firstpage = {};
              if(syschildren != undefined || syschildren != null){
                  systemmenu['children'][0] = {};
                  $(syschildren).each(function(i,v) {
                    var path = syschildren[i].url;
                    var tokenval = syschildren[i].token_name;
                    if(tokenval == null || tokenval == ''){
                      if(globalconfig.hasportal){
                        var token_name = 'cas'
                      }else{
                        var token_name = 'trm'
                      }
                    }else{
                      var tokenlist = tokenval.split('_');
                      var token_name = tokenlist[0];
                    }
                    if(syschildren[i].lev == 1 && syschildren[i].url == null){
                      var firstpath = ''
                    }
                    if(syschildren[i].component_url == '' || syschildren[i].component_url == null){
                      var firstpath = ''
                    }else{
                      var firstpath = '/'+token_name;
                    }
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
                          'path':firstpath+path,
                          'showcode':syschildren[i].show_code,
                          'domainid':syschildren[i].domain_id,
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
                  });
                  if(Object.keys(firstpage).length == 0){
                     firstpage = {title:'首页',id:'-2',component: "index/index",path:'/index',icon:'ioss-home','showcode':'0','funccode':'-2','nodetype':1,parentId:'-2',level: 1,ishidden: false,meta:{'currentid':-1,'title':'首页'}};
                  }
                  systemmenu['children'][0] = firstpage;
                  systemmenu['children'] = systemmenu['children'].concat(initialMenu)
              }
             
              asyncRouterMap.push(systemmenu);
          }
          asyncRouterMap = asyncRouterMap.concat(allnoAuthMenu);
          return cachejson = {
            asyncRouterMap: asyncRouterMap,
            userobj:userobj
          }

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
      getSideLeft(){
        var that = this;
        const json_data = this.menu[0].children;
        this.userinfo = this.user;
        var newarr = this.getTree(json_data);
        this.newbar = newarr;
        this.Set_LoadNode();
      },
      tokenSign(urlhref) {
          if (globalconfig.hasportal) {
            var datajson = {
              cas_access_token: urlhref
            };
            this.TOKEN_SIGNIN(datajson);
          }
      },
      directUrl() {
       this.$router.push("/index");
      },
  },
  activated(){
    var userinfo = this.user;
    var urlhref = getQueryString(globalconfig.initialtoken);
    if (urlhref === "" || urlhref === null || urlhref === undefined) {
      if (Object.keys(userinfo).length == 0) {
        this.leftSideItem();
        this.directUrl();
      } else {
        this.getSideLeft();
        //window.location.href ="https://t-mdm-be-fp.bigfintax.com/api/v1/cas/auth";
      }
    } else {
      this.leftSideItem();
      this.tokenSign(urlhref);
      this.directUrl();
    }
  },
  created() {
    var userinfo = this.user;
    var urlhref = getQueryString(globalconfig.initialtoken);
    if (urlhref === "" || urlhref === null || urlhref === undefined) {
      if (Object.keys(userinfo).length == 0) {
        this.leftSideItem();
        this.directUrl();
      } else {
        this.getSideLeft();
      }
    } else {
      this.tokenSign(urlhref);
      this.leftSideItem();
      this.directUrl();
    }
  },
  mounted(){
    
  }
}
</script>


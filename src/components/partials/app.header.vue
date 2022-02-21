<template>
  <nav class="app-header navbar navbar-toggleable-sm">
   <!-- <div class="collapse-menu" id="collapse_menu"><i class="ioss-shadow"></i></div> -->
    <div class=" appheader-text">
      <div class="pull-left">
       {{userinfo.tenancytitle}}
      </div>
     
    </div>

    <div class="dropdown hidden">
      <a class="nav-item " dropdown-toggle>
        <span class="d-inline-block relative">
          <img src="../../assets/img/img_photo.png" class="rounded-circle avatar">
        </span>
        <span class="d-none d-md-inline-block ml-1">{{userinfo.name}}<i class="fa fa-angle-down text-primary"></i></span>
      </a>
      <div class="dropdown-menu dropdown-menu-right pt-0 m-0">
        <router-link class="dropdown-item py-2" :to="personurl"><i class="fa ioss-user mr-1"></i>个人资料</router-link>
        <router-link class="dropdown-item py-2" :to="updatepwdurl"><i class="fa ioss-edit mr-1"></i>密码修改</router-link>
        <theme-change></theme-change>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item py-2 logout-text" @click="logoutfunc()">
          <a href="javascript:;" >
            <i class="fa ioss-sign-out"></i> 退出登录
          </a>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import { mapState,mapActions } from 'vuex'
import { iframeWidth } from '@/misc/utils'
import { logout } from '@/misc/root-common'
import ThemeChange from '@/components/partials/theme-change.vue'

export default {
  name: 'AppHeader',
  components:{'theme-change':ThemeChange},
  data(){
    return {
      tenanttitle:'',
      Message:'',
      token_name:'',
      personurl:'',
      updatepwdurl:'',
      logouturl:'',
      tenancyList:[],
    }
  },
  props:['userinfo','cacheInfo'],
  computed: mapState({ user: state => state.user,tenantid: state => state.tenantid}),
  beforeCreate() {
    this.$nextTick(function () {
     
    })
  },
  watch:{
    // $route() {
    //   this.loadingDisplay()
    // }
  },
  methods: {
    ...mapActions(['USER_SIGNOUT','USER_SIGNIN','SET_ROUTERS','OUT_ROUTERS','TOKEN_SIGNOUT']),
    toggleQuickview: () => document.querySelector('.app-quickview').classList.toggle('app-quickview-show'),
    toggleSettings: () => document.querySelector('.app-settings').classList.toggle('app-settings-show'),
    toggleSearch: () => document.querySelector('.app-search').classList.toggle('app-search-show'),
    // toggleAside: () => document.body.classList.toggle('aside-folded'),
    toggleAside(){
      document.body.classList.toggle('aside-folded');
      iframeWidth();
    },
    pushAside () {
      var pushed = document.body.className.indexOf('aside-pushed')
      if (pushed === -1) {
        document.querySelector('#app').addEventListener('click', hander)
        document.body.classList.add('aside-pushed')
      } else {
        document.querySelector('#app').removeEventListener('click', hander)
        document.body.classList.remove('aside-pushed')
      }
    },
    request (url) {
      http.delete(url).then(response => {
        // this.$notice[response.data.success ? 'success' : 'error'](response.data.msg)
      })
    },
    loadingDisplay(){
     $(".layer-loading").css('display','none')
    },
    indexLogin(){
       var sessionid = this.$route.query.jsessionid;
       if(sessionid == undefined){
         sessionid = this.getCookie('JSESSIONID');
       }
       this.delCookie('JSESSIONID',sessionid);
       this.setCookie('JSESSIONID',sessionid);
    },
    getCookienew(){
        var c_name = 'JSESSIONID';  
        if(document.cookie.length>0){  
          var c_start=document.cookie.indexOf(c_name + "="); 
           if(c_start!=-1){ 
             c_start=c_start + c_name.length+1;
             var c_end=document.cookie.indexOf(";",c_start);  
             if(c_end==-1) c_end=document.cookie.length;  
             return unescape(document.cookie.substring(c_start,c_end));  
           }else{
                //手动从后台传来sessionid
              var JSESSIONID = $('#JSESSIONID').val();
              return JSESSIONID;
           }
        }
    },
    logoutfunc(){
      logout(1);
    },
    
   
  },
  created(){
    if(globalconfig.hasportal){
       this.token_name = 'cas'
    }else{
       this.token_name = 'trm'
    }
    this.personurl = '/'+this.token_name +'/usermessage'
    this.updatepwdurl = '/'+this.token_name +'/userpassword'
  },
  mounted(){
    
    this.Message = this.user.name;
    this.tenanttitle = this.user.tenancytitle;
   }

}
</script>

<style lang="scss">
.username:hover{
  background: #fbfbfb;
}
#change_tenant .ivu-dropdown-menu{max-height:250px;overflow:auto;}
</style>

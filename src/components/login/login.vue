<template>
  <div class="login">
    <vue-particles
        color="#0e89f4"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="5"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
    </vue-particles>
    <div class="login-con">
      <div class="login-con-left">
         <div class="login-con-logo">
         
         </div>
      </div>
      <div class="login-con-right">
        <div class="form-con">
            <Form ref="formValidate" :model="formValidate" id="loginfrom" :rules="ruleValidate" @keydown.enter.native="handleSubmit('formValidate')">
              <FormItem prop="username" class="username-input">
                <Input autocomplete="off" v-model="formValidate.username" name="account" placeholder="请输入用户名">
                  <span slot="prepend">
                    <i class="ioss-username"></i>
                  </span>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input autocomplete="off" type="password" v-model="formValidate.password" name="pw" placeholder="请输入密码">
                  <span slot="prepend">
                    <i class="ioss-password"></i>
                  </span>
                </Input>
              </FormItem>
              <FormItem class="mt-3 text-right">
                 <router-link to="/forgetPwd">忘记密码？</router-link>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit('formValidate')" type="primary" long>登录</Button>
              </FormItem>
            </Form>
          </div>
      </div>
    </div>
    <div class="footer-con">
       <div class="footer-conl">
         京ICP备17048858号-2 Copyright © 2016-2018神州云合 版权所有
       </div>
       <div class="footer-conr">
          <img src="../../assets/img/footer/ISO1.png" alt="">
          <img src="../../assets/img/footer/ISO2.png" alt="">
          <img src="../../assets/img/footer/ISO3.png" alt="">
       </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import md5 from 'js-md5'
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
export default {
  name: 'login',
  data(){
    const pwdCheck = (rule, value, callback) => {
        var value = $.trim(value);
        var val =  md5(value);
        var name = this.formValidate.username;
        // systemConfig.pwdCheck(val,name).then(response => {
        //   var result = response.data.result;
        //   if(result == 'error'){
        //      callback(new Error('密码不正确'));
        //   }else{
        //      callback();
        //   }
        // });
    };
    return {
        rememberMe: false,
        loading: false,
        formValidate: {
          username: '',
          password: '',
        },
        ruleValidate: {
            username: [
               { required: true, message: '账号不能为空', trigger: 'blur' },
               // { validator:usernameCheck,message: '用户名不正确', trigger: 'blur'}
            ],
            password: [
               { required: true, message: '密码不能为空', trigger: 'blur' },
               // { validator:pwdCheck,message: '密码不正确', trigger: 'blur'},
            ]
        },
    }
  },
  methods: {
    handleSubmit(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                var param = this.common.serializeObject("#loginfrom");
                param.pw = md5(param.pw);
                this.done(param);
            }
       })
    },
    done (param) {
      var routers = [];
      // systemConfig.loginApi(param).then(response => {
      //     var result = response.data.result;
      //     if(result == 'success'){
      //       var datajson = response.data.data;
      //       this.TOKEN_SIGNIN(datajson);
      //       this.$router.push('/indexlogin');
      //     }else{
      //        this.$Message.error(response.data.infos);
      //     }
      // });
    }
  },
  mounted () {
    localStorage.removeItem('user')
    document.body.classList.remove('preloader');
  }
}
</script>

<style lang="scss">
  .login{
      width: 100%;
      height: 100%;
      position: relative;
      #particles-js{width:100%;background:#0c142b;overflow:hidden}
      &-con{
          position: absolute;
          left:50%;
          top: 50%;
          transform: translateY(-60%);
          width:780px;
          margin-left:-360px;
          .login-con-left{width:450px;height:380px;float:left;
            .login-con-logo{text-align:center;margin-top:130px;}
          }
          .login-con-right{width:270px;height:380px;padding:20px 40px;float:left;background:#fff;
            .username-input{margin-top:50px;}
            .ivu-input-group-prepend{
              background:none;
              border:none;
              border-radius:0;
              border-bottom:1px solid #dcdee2;
              i{font-size:18px;color:#57a3f3;}
            }
            .ivu-input{
                border:none;
                border-radius:0;
                border-bottom:1px solid #dcdee2
            }
            .ivu-input:hover,.ivu-input:focus{
              border:none;
              box-shadow:none;
              border-bottom:1px solid #57a3f3
            }
            .ivu-form-item-error .ivu-input,.ivu-form-item-error .ivu-input-group-prepend{
                border:none;
                border-bottom:1px solid #ed4014
            }
          }
          &-header{
              font-size: 16px;
              font-weight: 300;
              text-align: center;
              padding: 30px 0;
          }
          .ivu-card{border-radius:0}
          .form-con{
              padding: 10px 0 0;
          }
          .login-tip{
              font-size: 10px;
              text-align: center;
              color: #c3c3c3;
          }
      }
      .footer-con{
        position:fixed;padding:0px 10px 0;bottom:0px;color:#fff;font-size:12px;width:100%;
        .footer-conl{
          width:50%;display:inline-block;margin-top:20px;
        }
        .footer-conr{
          width:50%;display:inline-block;text-align:right;float:right;
        }
      }

  }
</style>

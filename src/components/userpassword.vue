<template>
  <div class="task-set-add task-set-add1">
    <div class="card mb-3 p-3 b-no">
          <Form id="updatepwdmodel" ref="formUpdatePwd" :model="formUpdatePwd" :rules="updateValidate" :label-width="100">
                  <FormItem label="原密码：" prop="oldpwd">
                      <Input v-model="formUpdatePwd.oldpwd" type="password" name="oldpw" placeholder="请输入原密码"></Input>
                  </FormItem>
                  <FormItem label="新密码：" prop="pwd">
                      <Input v-model="formUpdatePwd.pwd" type="password" name="pw" placeholder="请输入新密码"></Input>
                  </FormItem>
                  <FormItem label="确认新密码：" prop="pwdcheck">
                      <Input v-model="formUpdatePwd.pwdcheck" type="password" name="" placeholder="请确认新密码"></Input>
                  </FormItem>
                  <FormItem>
                      <Button type="primary"  @click="confirmupdate('formUpdatePwd')"><i class="ioss-btnsave"></i>保存</Button>
                      <Button type="default" @click="cancelupdate"><i class="ioss-btnback"></i>返回</Button>
                  </FormItem>
            </Form>
    </div>
  </div>
</template>
<script>
import { validPhone,userCheckName,validFormatAccount,validFormatName } from '@/asyncvalidate_extend'
import md5 from 'js-md5'
export default {
  components:{ Button, Breadcrumb , BreadcrumbItem ,Select ,Option ,Transfer,Tabs,TabPane,Form,FormItem,Page,Input},
  data(){
    const oldPwCheck = (rule, value, callback) => {
            // var id = $("#updateid").val();
            var val = md5($.trim(value));
            // systemConfig.peUserCheckOldPw(val).then(response => {
            //     var result = response.data.result;
            //     if(result == 'error'){
            //        callback(new Error('输入的密码不正确'));
            //     }else{
            //        callback();
            //     }
            // });
        };
         const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码！'));
            } else {
                if (this.formUpdatePwd.pwdcheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formUpdatePwd.validateField('pwdcheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码！'));
            } else if (value !== this.formUpdatePwd.pwd) {
                callback(new Error('两次输入的密码不一致!'));
            } else {
                callback();
            }
        };

    return {
        formUpdatePwd:{
                oldpwd:'',
                pwd:'',
                pwdcheck:'',
            },
       updateValidate:{
                oldpwd: [
                    { required: true, message: '原密码不能为空', trigger: 'blur' },
                    { validator: oldPwCheck, trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                pwdcheck: [
                    { required: true, message: '确认密码不能为空', trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
            },
        typearr: [
             {
                  value: 0,
                  label: '管理员'
              },
              {
                  value: 1,
                  label: '普通用户'
              },
              {
                  value: 100,
                  label: '组长'
              },
              {
                  value: 101,
                  label: '经理'
              },
              {
                  value: 999,
                  label: '超级管理员'
              }
        ]
    }
  },
  // beforeRouteEnter (to, form, next) {
  //   console.log(to.params.id)
  //   next(vm => vm.$nextTick(() => vm.$emit('loaded')))
  // },
  mounted(){
    // this.getQuery();
  },
  methods:{
      cancelupdate(){
         history.go(-1)
       },
        confirmupdate(name){
          this.$refs[name].validate((valid) => {
            if(valid){
              var json = this.common.serializeObject("#updatepwdmodel");
              json.oldpw = md5(json.oldpw);
              json.pw = md5(json.pw);
              // systemConfig.peUserPwUpdate(json).then(response => {
              //    var result = response.data.result;
              //    if(result == 'success'){
              //      this.$Message.success('密码修改成功！');
              //      this.updatemodel = false;
              //    }
              // })
            }else{
              // this.$Message.error('密码修改失败！');
            }
          });
          setTimeout(() => {
                this.loadingtxt = false;
                this.$nextTick(() => {
                    this.loadingtxt = true;
                });
           }, 1000);
       },
    //    getQuery(){
    //    var id = this.$route.params.id;
      //  systemConfig.querymembyid(id).then(response => {
      //     var result = response.data.result;
      //     if(result == 'success'){
      //        var json = response.data.data;
      //        this.formValidate.code = json.code;
      //        this.formValidate.name = json.name;
      //        this.formValidate.email = json.email;
      //        this.formValidate.phone = json.phone;
      //        this.formValidate.sys_code= json.sys_code;
      //        this.formValidate.tenancyname = json.tenancyname;
      //        this.formValidate.user_type = json.user_type;
      //     }else{
      //       this.$Message.error('查询出错');
      //     }
          
      //  })
    // },
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                var id = this.$route.params.id;
                var json = this.common.serializeObject("#formvalid");
                json['id'] = id;
                // systemConfig.updatemem(id,json).then(response => {
                //     var result = response.data.result;
                //     var msg = response.data.infos;
                //     if(result=='success'){
                //        this.$Message.success('保存成功!'); 
                //     }else{
                //        this.$Message.error(msg);
                //     }
                   
                // }).catch(error => {
                //    this.$Message.error('保存出错!');
                // }) 
            } else {
                // this.$Message.error('保存出错!');
            }
        })
    },
    handleReset (name) {
        history.go(-1);
    }
  }
}
</script>

<style lang="scss">
  .task-set-add{
    min-width: 553px;
    .form-group{
      >label{
        width: 150px;
        text-align: right;
        >i{
          color: #ef1010;
          font-style: none;
        }
      }
    }
    .ivu-select,.ivu-input{
      width:250px;
    }
    .form-group-crew{
      >div{
        width: 232px;
        display:inline-block;
      }
    }
  }
</style>





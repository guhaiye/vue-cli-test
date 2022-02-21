<template>
  <div class="task-set-add">
    <input type="hidden" ref="inputid" >
    <div class="card mb-3 p-3 b-no">
         <Form id="formvalid" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="账号：" prop="code">
                <Input v-model="formValidate.code" name="code" placeholder="请输入账号"></Input>
            </FormItem>
            <FormItem label="姓名：" prop="name">
                <Input v-model="formValidate.name" name="name" placeholder="请输入名称"></Input>
            </FormItem>
            <FormItem label="邮箱：" prop="email">
                <Input v-model="formValidate.email" name="email" placeholder="请输入邮箱"></Input>
            </FormItem>
            <FormItem label="手机号码：" prop="phone">
                <Input v-model="formValidate.phone" name="phone" placeholder="请输入手机号码"></Input>
            </FormItem>
     <!--        <FormItem label="系统账号：">
                <span>{{formValidate.sys_code}}</span>
            </FormItem> -->
            <FormItem label="租户名称：" prop="tenancyname">
                <span>{{formValidate.tenancyname}}</span>
            </FormItem>
         <!--    <FormItem label="类型：" prop="user_type">
                <Select v-model="formValidate.user_type" clearable name="user_type">
                    <Option v-for="item in typearr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem> -->
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')"><i class="ioss-btnsave"></i>保存</Button>
                <Button @click="handleReset('formValidate')"><i class="ioss-btnback"></i>返回</Button>
            </FormItem>
        </Form>
    </div>
  </div>
</template>

<script>
import { validPhone,validFormatAccount,validFormatName } from '@/asyncvalidate_extend'
import variable from '@/components/variable'

export default {
  components:{ Button, Breadcrumb , BreadcrumbItem ,Select ,Option ,Transfer,Tabs,TabPane,Form,FormItem,Page,Input},
  data(){
    return {
        formValidate: {
            code: '',
            name: '',
            email: '',
            phone: '',
            sys_code: '',
            user_type: '',
            tenancyname:''
        },
        ruleValidate: {
            code: [
                { required: true, message: variable.notnull, trigger: 'blur' },
                { min: 0,max: 30, message: variable.companycode, trigger: 'blur'},
                { validator:validFormatAccount, message:variable.requst,trigger: 'blur'},
                { validator:userAccountCheck,message:variable.usernotrepeat,trigger:'blur'}
            ],
            name: [
                { required: true, message: variable.notnull, trigger: 'blur' },
                { min: 0,max: 100, message: variable.namelength, trigger: 'blur'},
                { validator:validFormatName, message:variable.requst,trigger: 'blur' },
                { validator:userCheckName,message:variable.usernotrepeat,trigger:'blur'}
            ],
            email: [
               { required: true, message:variable.notnull, trigger: 'blur' },
               { min: 0,max: 100, message: variable.namelength, trigger: 'blur'},
               {type:'email',message:variable.emailrequst,trigger:'blur'},
               {validator:userAccountCheck,message:variable.emailrepeat,trigger: 'blur'}
            ],
            phone: [
               { required: true, message: variable.notnull, trigger: 'blur' },
               {validator:validPhone,message: variable.phone, trigger: 'blur'},
               { min: 0,max: 50, message: variable.phonelegth, trigger: 'blur'},
               { validator:userAccountCheck,trigger:'blur'}
            ]
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
    this.getQuery();
  },
  methods:{
    getQuery(){
      //  systemConfig.usermessagelogin().then(response => {
      //     var result = response.data.result;
      //     if(result == 'success'){
      //        var json = response.data.data;
      //        this.$refs.inputid.value = json.id
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
    },
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                var id = this.$refs.inputid.value;
                var json = this.common.serializeObject("#formvalid");
                json['id'] = id;
                // systemConfig.updatemem(id,json).then(response => {
                //     var result = response.data.result;
                //     var msg = response.data.infos;
                //     if(result=='success'){
                //     this.$Message.success('保存成功!');
                //     }else{
                //     this.$Message.error(msg); 
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



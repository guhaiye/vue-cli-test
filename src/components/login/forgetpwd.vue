<template>
	<div class="forgetpwdcon">
		<div class="forgetcon">
			<div class="forgetcon-tit">忘记密码</div>
			<div class="m-4">
			    <Form ref="formValidate" id="formvalid" :model="formValidate" :rules="ruleValidate">
		           <FormItem label="" prop="email" id="email-validate">
		               <Input v-model="formValidate.email" name="email" placeholder="请输入邮箱"  @on-blur="validateFunc"></Input>
		           </FormItem>
		           <div class="validatecon">
		             <div class="formitem-left">
		             	<FormItem label="" prop="validatecode">
		           	       <Input v-model="formValidate.validatecode" name="validatecode" placeholder="请输入验证码"></Input>
		                </FormItem>
		              </div>
		              <div class="formitem-right">
		              	 <Button :disabled="isdisable" :class="{buttondisable:isdisable}" type="primary" @click="countDown">{{content}}</Button>
		              </div>
		           </div>
		           
		           <FormItem label="" prop="newpwd">
		               <Input type="password" v-model="formValidate.newpwd" name="newpwd" placeholder="请输入新密码"></Input>
		           </FormItem>
		           <FormItem label="" prop="newpwdcheck">
		               <Input type="password" v-model="formValidate.newpwdcheck" name="newpwdcheck" placeholder="请确认密码"></Input>
		           </FormItem>
		           <FormItem class="mt-4 mb-0"> 
	                  <Button @click="handleSubmit('formValidate')" type="primary" long>提交</Button>
	               </FormItem>
	               <FormItem>
	               	  <router-link class="pull-right" to="/login"><<返回登录</router-link>	
	               </FormItem>
		        </Form>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.forgetpwdcon{
        background:#f2f4f7;
        .forgetcon{background:#fff;width:400px;height:400px;margin:auto auto;
          .forgetcon-tit{padding:15px 0;border-bottom:1px solid #dcdee2;text-align:center;font-size:16px;}
          .ivu-form-item{margin-bottom:22px;}
          .validatecon{display:flex;}
          .buttondisable{}
          .formitem-left{width:60%;float:left;}
          .formitem-right{width:40%;float:right;text-align:right;margin-top:3px;}
        }
	}
</style>
<script>
	export default {
		data(){
			const validatePass = (rule, value, callback) => {
	            if (value === '') {
	                callback(new Error('请输入密码！'));
	            } else {
	                if (this.formValidate.newpwdcheck !== '') {
	                    // 对第二个密码框单独验证
	                    this.$refs.formValidate.validateField('newpwdcheck');
	                }
	                callback();
	            }
	        };
	        const validatePassCheck = (rule, value, callback) => {
	            if (value === '') {
	                callback(new Error('请输入确认密码！'));
	            } else if (value !== this.formValidate.newpwd) {
	                callback(new Error('两次输入的密码不一致!'));
	            } else {
	                callback();
	            }
	        };
			return{
			  content:'获取验证码',
			  timer: null,
			  count:'',
			  isdisable:true,
              formValidate:{
                email:'',
                validatecode:'',
                newpwd:'',
                newpwdcheck:''

              },
              ruleValidate:{
                email:[
                  { required: true, message: '邮箱不能为空', trigger: 'blur' },
                  {type:'email',message:'不是邮箱格式',trigger:'blur'},
                ],
                validatecode:[
                  { required: true, message: '验证码不能为空', trigger: 'blur' },
                ],
                newpwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                newpwdcheck: [
                    { required: true, message: '确认密码不能为空', trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
              }
			}
		},
		computed:{
			
		},
		methods:{
			validateFunc(){
		      if(this.formValidate.email == ''){
		   		 this.isdisable = true;
		      }else{
		      	 var haserror = $("#email-validate").hasClass('ivu-form-item-error');
		      	 if(haserror){
		      	    this.isdisable = false;
		      	 }else{
		      	 	this.isdisable = true;
		      	 }
		      }
			},
		   countDown(){
		   	  const TIME_COUNT = 10;
		      if (!this.timer) {
		        this.count = TIME_COUNT;
		        this.timer = setInterval(() => {
		        if (this.count > 0 && this.count <= TIME_COUNT) {
		          this.count--;
		          this.content = this.count + 's后重新发送'
                  this.isdisable = true;
		         } else {
		          this.content = '发送验证码'
		          this.isdisable = false;
		          clearInterval(this.timer);
		          this.timer = null;
		         }
		        }, 1000)
		       }
		   },
           handleSubmit(name){
           	 this.$refs[name].validate((valid) => {
           	 	if(valid){
                   
           	 	}
           	 })
           }
		},
		mounted(){
          document.body.classList.remove('preloader');
		}
	}
</script>
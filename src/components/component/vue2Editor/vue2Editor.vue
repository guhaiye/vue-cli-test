/**
 * author       : jiewei.shan
 * createTime   : 20200523
 * description  : 富文本组件
 */
<template>
    <vue-editor v-model="content" :id='id' @image-added="handleImageAdded" :editorToolbar="toolbar"  useCustomImageHandler  :disabled="disabled"></vue-editor>
</template>

<script>
import {VueEditor} from 'vue2-editor'
export default {
   props:['id','disabled','Fcontent','taskId','toolb'],
   name: 'vue2editor',
   components:{VueEditor},
    watch: {
      content(newval) {
        //父组件实时更新
        this.$emit('changeValue', newval);
      },
      Fcontent(newval) {
        //子组件实时更新
        this.content = newval
      }
    },
   data(){
       return {
           content:this.Fcontent,
           toolbar:!this.toolb ? [
                [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],   //h1.h2.h3.h4.h5.h6
                ['bold', 'italic', 'underline', 'strike'],     // 加粗，斜体，下划线，作废
                [{'align': ['','center','right','justify']}],   //文本对齐方式
                ['blockquote'],                                 //引用
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],//列表，有序列表，选择框列表
                [{ 'script': 'sub'}, { 'script': 'super' }],      // 脚本
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
                [{ 'color': [] }, { 'background': [] }],          //字体颜色，背景颜色
                ['link', 'image','code','code-block'],                                 //链接，图片，代码，代码块
                ['clean'],                                     // 清除格式
                // ['video']                                     //视频（未启用）
           ]: this.toolb,
       }
   },
   methods:{
      handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("files", file);
      if(!this.taskId){
        this.taskId=0
      } 
      this.$api.commonApi.uploadAttachment(this.taskId,formData).then(res=>{
          const {result,data,infos,code}=res.data;
          if(result=='success'){
            let url = data[0].filePath;
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          }
        });
    },
   }
}
</script>

<style lang="scss">

</style>

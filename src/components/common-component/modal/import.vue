/**
 * author       : guhaiye
 * createTime   : 20200313
 * description  : 导入弹窗
 */
<template>
    <Modal
        v-model="importModal"
        :title="bindtitle"
        :mask-closable="false">
        <div class="col-md-12 pd0 fontsize14">
             <Upload
                ref="upload"
                class="text-center"
                :before-upload="handleUpload"
                :headers="myheaders"
                :with-credentials="true"
                :max-size="5120" :format="['xls']" 
                :on-format-error="formatError" 
                :on-exceeded-size="handleExceedSizeError" 
                :on-success="ok"
                :action="actionurl">
                <Button icon="ios-cloud-upload-outline">选择文件上传</Button>
            </Upload>
            <div v-if="file !== null">
                 {{ file.name }} 
            </div>
        </div>
        <slot></slot>
        <div slot="footer">
            <Button type="default" @click="importModal=false">取消</Button>
            <Button type="primary" :loading="loadingStatus" :disabled="disabled" @click="importSure">导入</Button>
        </div>
    </Modal>
</template>

<script>
var globaltokentype = globalconfig.initialtoken;
var tokenarray = localStorage.getItem("tokenarray");
var tokenarrayjson = JSON.parse(tokenarray);
export default {
  data(){
      return {
          myheaders: { "X-Requested-With": "XMLHttpRequest" },
          importModal:false,
          disabled:false,

          bindtitle:'导入',

          actionurl:'',
          file: null,
          loadingStatus: false

      }
  },
  methods:{
     handleUpload (file) {
        this.file = file;
        return false;
     },
     formatError(){
         this.$Message.error('文件只能是xls格式');
     },
     handleExceedSizeError() {
         this.$Message.error('文件大小不能超过5M');
     },
     importSure(){
        this.file == null && this.$Message.error('请选择文件上传！') && function(){return true};
        this.file != null && 
        (this.loadingStatus = true)
        
        setTimeout(() => {
            this.file = null;
            this.loadingStatus = false;
            this.$Message.success('上传成功')
        }, 1500);
     },
     ok(res, file, fileList) {

     }
  },
  activated(){
      console.log(1)
  },
  mounted() {
    this.myheaders[globaltokentype] = tokenarrayjson[globaltokentype];
  }
}
</script>

<style>

</style>
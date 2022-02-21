<template>
  <div>
      <Upload
        ref="upload"
        :name="upload"
        :headers="myheaders"
        :with-credentials="true"
        :max-size="5120"
        :format="formatFile"
        :on-format-error="formatError"
        :on-exceeded-size="handleExceedSizeError"
        :before-upload="handleUpload"
        :on-success="ok"
        :on-error="err"
        :action="actionurl"
        :data='formData'
    >
        <i title="附件上传" class="ioss-line_cloud-to-upload vouchericon"></i>
    </Upload>
  </div>
</template>

<script>
var globaltokentype = globalconfig.initialtoken;
var tokenarray = localStorage.getItem("tokenarray");
var tokenarrayjson = JSON.parse(tokenarray);
export default {
    data() {
        return {
            myheaders: { "X-Requested-With": "XMLHttpRequest" },
            actionurl: "",
            file:null,
            formatFile: ["xls", "xlsx",'doc','docx','pdf'],
            upload:'upload',
            formData:{},
        };
    },
    props: ["importCallBack"],
    methods: {
        handleUpload(file) {
            let _file = !!file?file:null
            this.file=_file;
            this.$emit('fileNameChange',!!file?file.name:'')
            return false;
        },
        formatError(file) {
            var text = "文件只能是xls,xlsx,doc,docx,pdf格式";
            this.$Message.error(text);
        },
        handleExceedSizeError(file) {
            this.$Message.error("文件大小不能超过5M");
        },
        importSure() {
            var params = this.formData;
            var formData = new FormData();
            Object.keys(params).forEach((key) => {
              formData.append(key, params[key]);
            });
           formData.append('upload',this.file)
           this.$loading.show()
           this.$api.yhsContractManage.insertContract(formData).then(res => {
              const {result,infos,data} = res.data;
              this.$loading.hide()
              if(result == 'success'){
                  this.importCallBack();
              }else{
                  this.$Message.error(infos)
              }
           })
        //    this.$refs.upload.post(this.file);
        },
        ok(res, file, fileList) {
            const { code, infos, result } = res;
            if (result == "success") {
                this.file = null;
                this.$Message.success(infos);
            } else {
                this.file = null;
                this.$refs.upload.clearFiles();
            }
            this.importCallBack();
        },
        err(res, file, fileList) {
            console.log(res)
        },
        /* 初始化 */
        initStart() {
            this.file = null;
            this.formData = {}
            this.$refs.upload.clearFiles();
        }
    },
    mounted() {
        this.myheaders[globaltokentype] = tokenarrayjson[globaltokentype];
    },
    activated() {

    }
};
</script>

<style>
</style>
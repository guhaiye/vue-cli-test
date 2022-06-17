<template>
   <div class="col-md-12 pd0 fontsize14">
      <Upload
        ref="upload"
        :name="upload"
        :headers="myheaders"
        :with-credentials="true"
        :max-size="maxSize"
        :format="formatFile"
        :on-format-error="formatError"
        :on-exceeded-size="handleExceedSizeError"
        :before-upload="handleUpload"
        :on-success="ok"
        :on-error="err"
        :action="actionurl"
        :data='formData'
      >
        <Button icon="ios-cloud-upload-outline">选择文件上传</Button>
      </Upload>
      <div v-if="file !== null">{{ file.name }}</div>
    </div>
</template>

<script>
  var globaltokentype = globalconfig.initialtoken;
  var tokenarray = localStorage.getItem("tokenarray");
  var tokenarrayjson = JSON.parse(tokenarray);
  export default {
    name:'uploadUi',
      props: {
        maxSize:{
            type:Number,
            default:5120
        },
        importCallBack: {
            type: Function,
            default: function () {
                throw Error("请填写导入成功回调");
            },
        },
        errCallBack: {
            type: Function,
            default: function () {},
        },
    },
    data () {
      return {
        myheaders: { "X-Requested-With": "XMLHttpRequest" },
        editid:'',
        actionurl: "",
        file: null,
        formatFile: ["xls", "xlsx"],
        upload: "upload",
        formData:{},
      };
    },

    components: {},

    mounted() {
     this.myheaders[globaltokentype] = tokenarrayjson[globaltokentype];
    },
    methods: {
         handleUpload(file) {
             console.log('sss')
            this.file = file;
        },
        formatError(file) {
            var _format = this.formatFile.toString();
            var text = `文件只能是${_format}格式`
            this.$Message.error(text);
        },
        handleExceedSizeError(file) {
            let _size = this.maxSize / 1024
            this.loadingStatus = false;
            this.$Message.error(`文件大小不能超过${_size}M`);
        },
        ok(res, file, fileList) {
            const { code, infos, result } = res;
            if (result == "success") {
                this.file = null;
                if (code == 902) {
                } else {
                    this.$Message.success({
                        duration: 3,
                        content: infos,
                    });
                }
                this.importCallBack(res);
            } else if (code == 300) {
                this.importCallBack(res);
            } else {
                this.file = null;
                this.$refs.upload.clearFiles();
                // 错误回调
                let tag = this.errCallBack(res);
                if (!tag) {
                    this.$Message.error({
                        duration: 3,
                        content: infos,
                    });
                }
            }
        },
        err(res, file, fileList) {

        },
        /* 初始化 */
        initStart() {
            this.file = null;
            this.$refs.upload.clearFiles();
        },
    },


  }

</script>
<style lang='' scoped>

</style>
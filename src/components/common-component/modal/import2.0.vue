/**
 * author       : guhaiye
 * createTime   : 20200313
 * description  : 导入弹窗
 */
<template>
  <Modal v-model="importModal" :title="bindtitle" :mask-closable="false">
    <div class="col-md-12 pd0 fontsize14">
      <Upload
        class="text-center"
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
    <slot></slot>
    <div slot="footer">
      <Button type="default" @click="importModal = false">
        取消
      </Button>
      <Button
        type="primary"
        :loading="loadingStatus"
        :disabled="disabled"
        @click="importSure"
      >
        导入
      </Button>
    </div>
  </Modal>
</template>

<script>
var globaltokentype = globalconfig.initialtoken;
var tokenarray = localStorage.getItem("tokenarray");
var tokenarrayjson = JSON.parse(tokenarray);
export default {
  data() {
    return {
      myheaders: { "X-Requested-With": "XMLHttpRequest" },
      importModal: false,
      disabled: false,
      bindtitle: "导入",
      editid:'',
      actionurl: "",
      file: null,
      loadingStatus: false,
      formatFile: ["xls", "xlsx"],
      upload: "upload",
      formData:{},
    };
  },
  watch: {
    importModal: {
      handler(n, o) {
        if (n) {
          this.file = null;
          this.loadingStatus = false;
          this.$refs.upload.clearFiles();
        }
      },
    },
  },
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
  methods: {
    handleUpload(file) {
      this.file = file;
      if(!!this.editid){
        this.formData.id = this.editid
      }
      return false;
    },
    formatError(file) {
      var _format = this.formatFile.toString();
      var text = `文件只能是${_format}格式`
      this.loadingStatus = false;
      this.$Message.error(text);
    },
    handleExceedSizeError(file) {
      let _size = this.maxSize / 1024
      this.loadingStatus = false;
      this.$Message.error(`文件大小不能超过${_size}M`);
    },
    importSure() {
      if (this.loadingStatus) {
        return;
      }
      this.file == null &&
        this.$Message.error("请选择文件上传！") &&
        function () {
          return true;
        };
      this.file != null && (this.loadingStatus = true);
      if (this.file != null) {
        this.$refs.upload.post(this.file);
      }
    },
    ok(res, file, fileList) {
      const { code, infos, result } = res;
      this.loadingStatus = false;
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
      this.loadingStatus = false;
    },
    /* 初始化 */
    initStart() {
      this.file = null;
      this.loadingStatus = false;
      this.$refs.upload.clearFiles();
      this.importModal = true;
    },
  },
  mounted() {
    this.myheaders[globaltokentype] = tokenarrayjson[globaltokentype];
  },
  activated() {},
};
</script>

<style>
</style>
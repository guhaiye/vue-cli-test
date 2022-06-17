<template>
  <div class="importExportBtn">
    <Tooltip class="tooltipcon mr-2" content="导入" placement="top">
      <a @click="importEvent">
        <i class="ioss-exportin cursor_pointer fontsize16"></i>
      </a>
    </Tooltip>
    <importCom
      ref="importEle"
      :fileKey="'file'"
      :errCallBack="errCallBack"
      :importCallBack="importCallBack"
    >
      <slot name="defaultNote">
        <div class="text-center">
          <div style="color: red">{{ noteMsg }}</div>
          <a href="javascript:;" @click="templateDown" style>点击下载导入模板</a>
        </div>
      </slot>
    </importCom>
  </div>
</template>

<script>
import importCom from "@/components/common-component/modal/import2.0";
import { DownFileHref, DownFile } from "@/misc/root-common";
export default {
  name: "importBtnUi",
  props: {
    //导入的url
    importUrl: {
      type: String,
      default: "",
    },
    //导入按钮权限code
    btnCode: {
      type: String,
      default: "",
    },
    //提示
    noteMsg: {
      type: String,
      default: "注上传文件为.xls/.xlsx文件",
    },
    /**下载模板 */
    downApiUrl: {
      type: Object,
      default: () => {
        return {
          module: "",
          api: "",
        };
      },
    },
    /**导入成功初始化数据 */
    loadTable: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  data() {
    return {};
  },

  components: { importCom },

  mounted() {
      if (this.downApiUrl.type)  this.$refs.importEle.formData.type = this.downApiUrl.type
  },

  methods: {
    importEvent() {
      this.$refs.importEle.actionurl = this.importUrl;
      this.$refs.importEle.initStart();
    },
    /**模板下载 */
    templateDown() {
      let { module, api, type } = this.downApiUrl;
      this.$api[module][api](type)
        .then((res) => {
          var blob = res.data;
          DownFile(
            blob,
            decodeURI(res.headers["content-disposition"].split("filename=")[1])
          );
        })
        .catch((err) => {
          this.$Message.error("模板下载失败！");
        });
    },

    /**导入成功回调 */
    importCallBack(data) {
      const { infos, result } = data;
      if (infos == "success" || result == "success") {
        this.$refs.importEle.importModal = false;
        this.loadTable();
      }
    },
    /**导入失败回调 */
    errCallBack(res) {
      const { infos } = res;
      DownFile("\ufeff" + infos, "导入结果.csv", "text/csv;charset=utf-8;");
    },
  },
};
</script>
<style lang="scss" scoped></style>

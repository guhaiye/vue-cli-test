/** * author : guhaiye * createTime : 20220505 * description : 财税政策法规管理 */
<template>
  <div class="cszcfg-con">
    <tablePageLayout>
      <searchBar
        ref="searchBar"
        slot="search"
        :loadTable="initData"
        :resetDataResult="resetDataResult"
        :formValidate="formValidate"
        :searchData="searchData"
      ></searchBar>
      <template slot="btns">
        <buttonConUi>
          <a
            href="javascript:;"
            @click="$router.push('./add')"
            class="btn btn-outline-info"
            >新增</a
          >
          <exportBtnUi :propsData="propsData" v-btnhaspermisson="'F004_01_03'" />
          <importBtnUi
            :importUrl="importUrl"
            :downApiUrl="downApiUrl"
            :loadTable="initData"
            v-btnhaspermisson="'F004_01_04'"
          ></importBtnUi>
        </buttonConUi>
      </template>
      <VxeGridUi
        id="modalPageTable"
        v-autoHeight:tableMinHeight="{ context: this }"
        ref="tablecon"
        ellipsisAble="tooltip"
        :columnsTable="tableColumn"
        refName="tableModal"
      />
    </tablePageLayout>
    <confirmDel ref="confirmdel" :deleteData="delid"></confirmDel>
  </div>
</template>

<script>
import { tableColumn } from "./tablecolumn";
import importBtnUi from "@/components/component/importBtn";
import resetForm from "@/utils/globalMixins";
import confirmDel from "@/components/common-component/modal/confirm-delete";
import { getApiAsync } from "@/misc/baseDict";
export default {
  name: "",
  mixins: [resetForm],
  data() {
    return {
      isSearchHigh: false,
      tableColumn: tableColumn(this),
      formValidate: {},
      importUrl: `${base.sq + base.version}/articleImport/CSZCFG`,
      downApiUrl: {
        type: "CSZCFG",
        module: "commonApi",
        api: "exportModel",
      },
      delids: "",
      propsData: {},
      condition: [
        { f: "dispatchDateBegin", op: "eq", t: "t" },
        { f: "dispatchDateEnd", op: "eq", t: "t" },
      ],
      searchData: {
        formOptions: [
          {
            type: "text",
            label: "标题/文号",
            key: "title/documentNumber",
            condition: { op: "eq", t: "s" },
            value: "",
          },
          {
            type: "daterange",
            label: "发文日期",
            key: "dispatchDate",
            condition: { op: "eq", t: "s" },
            value: null,
          },
          {
            type: "select",
            label: "时效性",
            placeholder: "请选择时效性",
            key: "timeLiness",
            condition: { op: "eq", t: "s" },
            value: "",
            option: [],
          },
          {
            type: "select",
            label: "状态",
            placeholder: "请选择状态",
            key: "status",
            condition: { op: "eq", t: "s" },
            value: "",
            option: [],
          },
        ],
      },
    };
  },

  components: { importBtnUi, confirmDel },
  created() {
    this.getDict();
  },
  mounted() {
    this.initPropsData();
    this.initData();
  },

  methods: {
    initPropsData() {
      this.searchData.formOptions.forEach((v, i) => {
        this.$set(this.formValidate, v.key, "");
        if (v.key !== "dispatchDate") {
          this.condition.push({ f: v.key, ...v.condition });
        }
      });
      this.propsData = {
        module: "commonApi",
        api: "export",
        condition: this.condition,
        form: this.formValidate,
      };
    },
    initData(...rest) {
      let searchFiled = this.formValidate;
      let { dispatchDate } = this.formValidate;
      if (dispatchDate) {
        searchFiled.dispatchDateBegin = dispatchDate[0];
        searchFiled.dispatchDateEnd = dispatchDate[1];
      }
      var params = {
        module: "cszcfg",
        api: "list",
        condition: this.condition,
        params: { type: "CSZCFG" },
        formValid: searchFiled,
      };
      rest.indexOf("pagejump") >= 0 && (params.pagejump = "pagejump");
      this.$refs.tablecon.params = params;
      this.$refs.tablecon.loadTable();
    },
    delid() {
      this.$api.cszcfg.del(this.delids).then((res) => {
        const { result, infos, data } = res.data;
        if (result == "success") {
          this.$refs.confirmdel.deleteconfirm = false;
          this.initData("pagejump");
        }
      });
    },
    getDict() {
      let params = ["VALID_TIME", "ARTICLE_STATUS"];
      getApiAsync(params.toString()).then((res) => {
        let _data = this.searchData.formOptions;
        _data[2].option = res[params[0]];
        _data[3].option = res[params[1]];
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>

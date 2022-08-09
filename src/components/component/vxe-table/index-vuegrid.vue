<template>
  <div style="clear: both">
    <vxe-grid
      :ref="refName"
      size="small"
      header-align="left"
      row-class-name="rowStyle"
      empty-text="暂无数据"
      header-row-class-name="titleStyle"
      auto-resize
      show-header
      :border="border"
      highlight-hover-row
      :row-id="rowId"
      :height="tableHeight"
      :merge-cells="mergeCells"
      :data="tableData"
      :columns="columnsTable"
      :max-height="maxHeight"
      :show-overflow="ellipsisAble"
      :loading="loading"
      :resizable="resizAble"
      :align="alignCell"
      :sort-config="{ remote: remoteAble, trigger: 'cell' }"
      :tree-config="{transform: true, rowField: 'id', parentField: 'parentId'}"
      :checkbox-config="tableCheckboxConfig"
      @sort-change="sortChange"
      @checkbox-change="checkboxChange"
      @filter-change="filterChangeEvent"
      @checkbox-all="checkboxAll"
      @radio-change="radioChange"
      keep-source
      v-bind="tableOptionsObj"
    >
    <!-- :tree-config="{transform: true, rowField: 'id', parentField: 'parentId'}"  根据id 和 parentId 嵌套 -->
      <slot name="tableColumn"></slot>
    </vxe-grid>
    <Page
      v-if="IS_PAGE"
      show-sizer
      show-total
      show-elevator
      size="small"
      class="page-con"
      :total="tablePage.total"
      :current.sync="tablePage.current"
      :page-size="tablePage.pageSize"
      :page-size-opts="tablePage.pageSizeOpt"
      @on-page-size-change="handleSizeChange"
      @on-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getSearchField } from "@/misc/root-common";
export default {
  props: {
    columnsTable: {
      default: () => [],
      type: Array,
      required: true,
    },
    IS_PAGE: {
      type: Boolean, //是否分页
      default: true,
    },
    maxHeight: {
      type: Number,
    },
    ellipsisAble: {
      default: "ellipsis", //是否单元格溢出(...)
    },
    resizAble: {
      type: Boolean, //是否允许拖动列
      default: true,
    },
    alignCell: {
      default: "left",
      type: String, //表格对齐方式 可选 -left -center -right
    },
    remoteAble: {
      default: true, //是否服务端排序
    },
    tableOptions: {
      type: Object, //额外props
      default: () => ({}),
    },
    refName: {
      type: String, //额外props
      default: "tablecon",
    },
    rowId: {
      type: String,
      default: "id",
    },
    CheckboxConfig: {
      type: Object, //checkbox配置项
      default: () => ({}),
    },
    border:{
      type:[String, Boolean],
      default:'default'
    }
  },
  computed: {
    tableOptionsObj: function () {
      return Object.assign(this.tableOptions, {
        tooltipConfig: { zIndex: 9999, enterable: true },
      }); //处理UI库冲突弹框Index优先级的问题
    },
  },
  name: "VxeGridUi",
  data() {
    return {
      params: {},
      selectdata: [],
      tableCheckboxConfig: {
        checkMethod: ({ row }) => {
          return row._disabled != true;
        },
        visibleMethod({ row }) {
          return row._disabled != true;
        },
        ...this.CheckboxConfig,
      },
      defaultSelecteRowsId: [], //勾选的时候要传给后台的id
      tableHeight: 100,
      sortField: "",
      sortType: "desc",
      loading: false,
      tableData: [],
      tablePage: {
        total: 0,
        current: 1,
        pageSize: 25,
        pageSizeOpt: [15, 25, 40, 50, 100],
      },
      mergeCells: [
        //e.g. { row: 1, col: 1, rowspan: 3, colspan: 3 },
      ],
    };
  },
  methods: {
    //筛选触发事件
    filterChangeEvent({ property, values }) {
      this.$emit('filterChangeEvent', { property, value: values })
    },
    //排序
    sortChange({ column, property, order }) {
      this.sortField = property;
      this.sortType = order;
      this.loadTable && this.loadTable();
    },
    //分页
    handleSizeChange(pageSize) {
      this.tablePage.pageSize = pageSize;
      this.tablePage.current = 1;
      /* 添加延时器为了解决保存数据没有入库 */
      setTimeout(() => {
        this.loadTable && this.loadTable();
      }, 500);
    },
    handleCurrentChange(current) {
      this.tablePage.current = current;
      this.$emit("handleCurrentChange");
      /* 添加延时器为了解决保存数据没有入库 */
      setTimeout(() => {
        this.loadTable && this.loadTable("pagejump");
      }, 500);
    },
    tabelTotal(total) {
      this.tablePage.total = total;
      this.tablePage.pagesizeopt = this.getPageArr(total);
    },
    //勾选
    checkboxChange({ records, reserves, checked, row }) {
      this.selectdata = records;
      this.$emit("tableChangeEvent", records);
      // 通过是否被勾选获取勾选的id
      var selectedAllData = [...records, ...reserves];
      var selectedAll = selectedAllData.map((v, i) => v.id); //界面上所有被选中id
      /* 通过界面被勾选的id，去处理给用户传的id */
      if (checked) {
        selectedAll.forEach((id, i) => {
          if (!this.defaultSelecteRowsId.includes(id)) {
            this.defaultSelecteRowsId.push(id);
          }
        });
      } else {
        this.defaultSelecteRowsId.forEach((id, i) => {
          if (!selectedAll.includes(id)) {
            this.defaultSelecteRowsId.splice(i, 1);
            this.$delete(this.defaultSelecteRowsId);
          }
        });
      }
      this.$emit("selectDataChange", { records, checked, row });
      this.$emit("tableChange", this.selectdata);
    },
    radioChange({ row, column, newValue }) {
      this.selectdata = [row];
    },
    checkboxAll({ checked }) {
      if (checked) {
        this.selectdata = [].concat(this.tableData);
      } else {
        this.selectdata = [];
      }
      this.$emit("selectAllChange", { checked });
    },
    //设置被勾选的项
    checkedData() {
      this.$nextTick(() => {
        var table = this.$refs[this.refName];
        //通过被选中的id去设置被选中状态
        this.defaultSelecteRowsId.forEach((id) => {
          table.getRowById(id) && table.setCheckboxRow(table.getRowById(id), true);
        });
      });
    },
    //初始化方法
    initTable() {
      this.$refs[this.refName].clearAll();
      this.initPage();
    },
    initPage() {
      this.tablePage.total = 0;
      this.tablePage.current = 1;
      this.tablePage.pageSize = 25;
    },
    // 手动刷新列(动态改变列时需要手动调取)
    updateColumn() {
      this.$nextTick(() => {
        this.$refs[this.refName].refreshColumn();
      });
    },
    //获取数据
    /*数据f返回重组
    module: 接口属于哪个模块
    api: 接口地址
    condition: restful放到condition里面的条件 如[{"f":"sellerName","v":"销方公司","op":"eq"}]
    params: 除page,per_page,condition外的其他的条件
    formValid: 查询条件的form  如：this.formValidate
    rest[0]是一个json，内部包含api，condition，params，formValid
    */
    loadTable(...rest) {
      this.$loading.show();
      this.tableData = [];
      const { module, api, condition, params, formValid, pagejump } = this.params;
      pagejump == undefined || (rest.indexOf("pagejump") && (this.tablePage.current = 1));
      this.selectdata = [];
      const { current, pageSize } = this.tablePage;
      let _module = !!module ? module : "";
      let _api = !!api ? api : "";
      let _condition = !!condition ? condition : [];
      let _params = !!params ? params : {};
      let _form = !!formValid ? formValid : [];
      var conarr = getSearchField(_condition, _form);
      let paramsObj = {
        page: current,
        per_page: pageSize,
        condition: JSON.stringify(conarr),
      };
      if (Object.keys(_params).length > 0) {
        for (let k in _params) {
          paramsObj[k] = _params[k];
        }
      }
      console.log(paramsObj);
      this.$api[_module][_api](paramsObj)
        .then((res) => {
          const { data, page, result } = res.data;
          if (result == "success") {
            this.tableData = data;
            this.tabelTotal(page.total);
          }
          this.$loading.hide();
        })
        .catch((err) => {
          this.$loading.hide();
        });
    },
  },
};
</script>

<style lang="scss"></style>

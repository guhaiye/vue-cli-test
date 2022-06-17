<template>
  <div style="clear:both">
    <vxe-table
      :ref="refName"
      size="small"
      header-align="center"
      row-class-name="rowStyle"
      empty-text="暂无数据"
      header-row-class-name="titleStyle"
      border
      stripe
      auto-resize
      show-header
      highlight-hover-row
      :height="tableHeight"
      :merge-cells="mergeCells"
      :data="tableData"
      :max-height="maxHeight"
      :show-overflow="ellipsisAble"
      :loading="loading"
      :resizable="resizAble"
      :align="alignCell"
      :sort-config="{remote:remoteAble,trigger:'cell'}"
      @sort-change="sortChange"
      @checkbox-change="checkboxChange"
      @checkbox-all="checkboxChange"
      keep-source
      v-bind="tableOptions"
    >
      <slot name="tableColumn"></slot>
      <!-- <vxe-table-column v-for="(config, index) in tableColumn" :key="index" v-bind="config"></vxe-table-column> -->
    </vxe-table>
    <Page
      v-if="IS_PAGE"
      show-sizer
      show-total
      show-elevator
      size="small"
      class="pt-3 pb-3 text-center"
      :total="tablePage.total"
      :current.sync="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :page-size-opts="tablePage.pageSizeOpt"
      @on-page-size-change="handleSizeChange"
      @on-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      default: () => [],
      type: Array,
      required: true,
    },
    loadTable: {
      type: Function, //表格查询方法
    },
    IS_PAGE: {
      type: Boolean, //是否分页
      default: true,
    },
    maxHeight: {
      type: Number,
    },
    ellipsisAble: {
      type: Boolean, //是否单元格溢出(...)
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
    },
    refName: {
      type: String, //额外props
      default: "tablecon",
    },
  },
  data() {
    return {
      tableHeight:100,
      selectdata: [],
      sortField: "",
      sortType: "desc",
      loading: false,
      tablePage: {
        total: 0,
        current: 1,
        pageSize: 50,
        pageSizeOpt: [50, 100, 200, 500, 1000],
      },
      mergeCells: [
        //e.g. { row: 1, col: 1, rowspan: 3, colspan: 3 },
      ],
    };
  },
  methods: {
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
      this.loadTable && this.loadTable();
    },
    handleCurrentChange(current) {
      this.tablePage.current = current;
      this.loadTable && this.loadTable('pagejump');
    },
    tabelTotal(total) {
      this.tablePage.total = total;
      this.tablePage.pagesizeopt = this.getPageArr(total);
    },
    //勾选
    checkboxChange({ records }) {
      this.selectdata = records;  
      //用于点击复选框触发事件
      this.$emit('tableChangeEvent',records)
    },
    //初始化方法
    initTable() {
      this.$refs[this.refName].clearAll();
      this.initPage();
    },
    initPage() {
      this.tablePage.total = 0;
      this.tablePage.current = 1;
      this.tablePage.pageSize = 50;
    },
    // 手动刷新列(动态改变列时需要手动调取)
    updateColumn() {
      this.$nextTick(() => {
        this.$refs[this.refName].refreshColumn();
      });
    },
    // todo 
  },
};
</script>

<style lang='scss'>
.titleStyle {
  background: #ebf3fe;
}
</style>
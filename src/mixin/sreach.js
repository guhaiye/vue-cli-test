/* 查询时候的重置 enter键的查询 初始化data时候columnsTable的配置 */
export default {
    methods:{
    /**重置 */
    resetDataResult() {
        this.clearSearchField();
        this.$refs.tablepage.pageReset();
        this.dataTableShow();
    },
      /**清除搜索条件 */
    clearSearchField() {
        this.$refs.formValidate.resetFields();
    },
    dataResultKey(e) {
        if (e.keyCode == 13) {
            this.dataTableShow();
        }
    },
  }

}
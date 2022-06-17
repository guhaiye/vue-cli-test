/**全局混入 */
/** 表单重置、清除搜索条件、回车 */
const resetForm = {
    methods:{
        /**重置 */
        resetDataResult() {
            this.clearSearchField();
            !!this.$refs.tablecon && this.$refs.tablecon.initTable();
            this.initData();
        },
        /**清除搜索条件 */
        clearSearchField() {
            console.log(this.$refs.searchBar)
            !!this.$refs.searchBar&&!!this.$refs.searchBar.$refs.formVal && this.$refs.searchBar.$refs.formVal.$refs.formValidate.resetFields()
        },
        /**回车键 */
        dataResultKey(e) {
            if (e.keyCode == 13) {
                this.initData();
            }
        }
    }
}
export default resetForm
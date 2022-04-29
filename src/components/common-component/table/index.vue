/**
 * author       : guhaiye
 * createTime   : 20200311
 * description  : 公共表格组件
 */
<template>
  <div>
   <Table v-if="dataTable.length>0" :highlight-row="highLightRow"  :show-summary="showSummary" :summary-method="handleSummary"  @on-sort-change="sortChange" @on-row-click="clickRow" ref='tablecon' :row-class-name="rowClassName"  :load-data="handleLoadData" @on-select="selectItemChange" @on-select-cancel="tableChangeCancel" @on-selection-change="tableChange" :height="tableHeight" stripe  width="100%" :columns="columnsTable" size="small" :data="dataTable"></Table>
   <Table v-if="dataTable.length==0" class="noDataHtml" :height="tableHeight" stripe  width="100%" :columns="columnsTable" size="small" :data="dataTable" no-data-text="<span class='tableNodata'>暂无数据</span>"></Table>
  </div>
</template>

<script>
export default {
   // props:['columnsTable','dataTable','handleLoadData','rowClassName',"clickRow"],
    props: {
    columnsTable: { type: Array },
    dataTable: { type: Array },
    handleLoadData: { type: Function },
    showSummary:{type:Boolean,default:false},
    highLightRow:{type:Boolean,default:false},
    handleSummary:{
       type:Function,
       default:function(){
          return ""
       }
    },
    rowClassName: {
      type: Function,
      default: function () {
        return "";
      },
    },
    clickRow: {
      type: Function,
      default: function () {},
    },
  },
   data(){
       return {
           tableHeight:100,
           selectdata:[],
           sortfield:'',
       }
   },
   methods:{
         sortChange(column, key, order) {
            this.sortfield = column.key;
            // this.sorttype = column.order;
        },
       tableChange(selection){
          this.selectdata = selection;
          this.$emit('tableChange',this.selectdata)
       },
       tableChangeCancel(selection,row){
          this.$emit('tableChangeCancel',row)
       },
       selectItemChange(selection,row){
          this.$emit('selectItemChange',{selection,row})
       }
   }
}
</script>

<style lang="scss">
  .tableNodata{position: absolute;left: 50%;top: 50%;}
</style>
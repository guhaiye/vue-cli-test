/**
 * author       : guhaiye
 * createTime   : 20200311
 * description  : 分页公共组件
 * note         : 查询，重置，切换每页条数需初始化页码为1，dataTableShow()方法，查询参数有pagejump则不需要初始化页码
 */
<template>
   <Page class="page-con" :total="total" :current="current" :page-size="pagesize" :page-size-opts='pagesizeopt' size="small"   @on-change="changePageNum" @on-page-size-change="changePageSize" show-total show-elevator show-sizer></Page>
</template>

<script>
export default {
   props:['dataTableShow','proPagesize'],
   data(){
       return {
           /*分页 */
           total:0,
           pagesize:10,
           current:1,
           pagesizeopt:[],
       }
   },
   methods:{
       /*切换页码 */
       changePageNum(page){
         this.current = page;
         this.dataTableShow('pagejump'); //返回数据
       },
       /*切换每页条数 */
       changePageSize(pagesize){
         if(!!pagesize){
          this.pagesize = pagesize;
          this.current = 1;
          this.dataTableShow();  //将
         }
       },
       /**数据总条数 */
       tabelTotal(total){
         this.total = total;
       },
        /**分页原始状态 */
       pageReset(){
          this.current = 1;
          this.pagesize = this.proPagesize || this.globalpagesize; 
       }
   },
   created(){
       this.pagesizeopt = this.getPageArr(this.total);
       if(this.proPagesize){
         this.pagesize = this.proPagesize;
       }
   }
}
</script>

<style>

</style>
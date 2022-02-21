/**
 * author       : guhaiye
 * createTime   : 20200313
 * description  : 确认弹窗
 */
<template>
    <Modal
        v-model="confirmModel"
        :title="bindtitle"
        :loading="loading"
        :width="modalwidth"
        :mask-closable="false">
        <div class="col-md-12 pd0 fontsize14">
            <slot>您确认要删除选中的信息吗？</slot>
        </div>
        <div slot="footer">
            <Button type="primary" :disabled="disabled" :loading="loadingsd" @click="delSure">{{confirmtxt}}</Button>
        </div>
    </Modal>
</template>

<script>
export default {
  props:['confirmData'],
  data(){
      return {
          confirmModel:false,
          loading:false,
          disabled:false,
          modalwidth:'300',
          bindtitle:'提示',
          loadingsd:false,
          confirmtxt:'确认',
          canceltxt:'取消'
      }
  },
  methods:{
      delSure(){
         this.confirmData()
      },
      closeModal(){
         this.deleteconfirm = false
         //防止闪烁
         let timer=setTimeout(()=>{
            this.loading = false;
            this.disabled = false;
            this.modalwidth = '300';
            this.bindtitle = '提示';
            this.loadingsd = false;
            this.confirmtxt = '确认';
            this.canceltxt = '取消';
            timer=null;
            clearInterval(timer)
         },200)
      }
  },
}
</script>

<style>

</style>
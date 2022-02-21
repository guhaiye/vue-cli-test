/**
 * author       : guhaiye
 * createTime   : 20200313
 * description  : 删除/确认弹窗
 */
<template>
    <Modal
        v-model="deleteconfirm"
        :title="bindtitle"
        :loading="loading"
        :width="modalwidth"
        :mask-closable="false">
        <div class="col-md-12 pd0 fontsize14">
            <slot><div class="text-center p-3">您确认要删除选中的信息吗？</div></slot>
        </div>
        <div slot="footer">
            <Button type="default" @click="closeModal">{{canceltxt}}</Button>
            <Button type="primary" :disabled="disabled" :loading="loadingsd" @click="DelSure">{{confirmtxt}}</Button>
        </div>
    </Modal>
</template>

<script>
export default {
  props:['deleteData'],
  data(){
      return {
          deleteconfirm:false,
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
      DelSure(){
         this.deleteData()
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
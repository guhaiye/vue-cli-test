/**
 * author       : guhaiye
 * createTime   : 20200318
 * description  : 审核记录信息弹窗
 */
<template>
    <Modal
        v-model="repeatAuditModal"
        title="审核记录信息"
        width="500"
        class="topModal20 repeat-audit"
        :mask-closable="false">
        <div class="modalcon fontsize14">
            <Timeline>
                <TimelineItem :color="index == '0'?'red':'blue'" :key="item.id" v-for="(item,index) in dataTable" :class="index == '0'?'currentItem':''">
                    <p class="time">{{item.auditDate}}</p>
                    <p>[审批人员]：{{item.createBy}}</p>
                    <p class="content">[审批意见]：{{item.auditReason}}</p>
                    <p>[审批状态]：{{item.isApproved == 'N'?'不通过':'通过'}}</p>
                </TimelineItem>
            </Timeline>
        </div>
        <div slot="footer">
            <Button type="primary" @click="repeatAuditModal=false">确定</Button>
        </div>
    </Modal>
</template>

<script>
export default {
  props:[],
  data(){
      return {
          repeatAuditModal:false,
          disabled: false,
          dataTable:[],
      }
  },
  
  methods:{
      auditRecord(id){
        var params={declareId:id}
        this.$loading.show()
        this.$api.commonApi.getAuditHistory(params).then((res)=>{
            this.$loading.hide()
            const {data,infos,result} = res.data;
            if(result == 'success'){
                this.repeatAuditModal = true
                this.dataTable = data;
            }else{
                this.$Message.warning(infos)
            }
        })
      }
  }
}
</script>

<style lang="scss" scoped>
  .repeat-audit{ 
      font-size: 22px;
     .content{word-break: break-all;}
     p{line-height:24px;color:#999;}
     .currentItem{
         p{color:red;}
     }
     .modalcon{max-height:480px;overflow:auto;}
  }
  
</style>
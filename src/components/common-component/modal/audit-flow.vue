/**
 * author       : guhaiye
 * createTime   : 20200805
 * description  : 审核流程
 */
<template>
    <Modal
        v-model="auditFlowModal"
        title="审核流程"
        width="700"
        class="topModal20 repeat-audit"
        :mask-closable="false">
        <div class="modalcon fontsize14">
            <Timeline v-if="dataTable.length > 0">
                <TimelineItem :color="item.flagresult" :key="item.id" v-for="(item,index) in dataTable" >
                   <div class="timelinecon">
                        <Row class="mb-1">
                            <Col span="12">
                            <span class="color8989a5">{{item.taskname}}-{{item.pos_name}}</span>:
                            <span>{{item.taskassignee}}</span>
                            </Col>
                            <Col span="12" class="text-right color8989a5 fontsize12">
                            <span>{{item.executetime}}</span>
                            </col>
                        </Row>
                        <template v-if="!!item.executetime">
                            <Row class="mb-1"> 
                                <Col span ="24"  class="mb-1">处理意见：</Col>
                                <Col span="24" class="text-word">
                                {{item.taskinfo.opinion}}
                                </Col>
                            </Row>
                            <Row>
                                <Col span = '24' class="text-right">
                                <span class="colorgreen" v-if="item.taskinfo.result == 'yes'">通过</span>
                                <span class="colorred" v-else>不通过</span>
                                </Col>
                            </Row>
                        </template>
                        <template v-else>
                            <Row>
                                <Col span = '24' class="text-right">
                                未审批
                                </Col>
                            </Row>
                        </template>
                    </div>
                </TimelineItem>
            </Timeline>
            <div class="" v-else-if="dataTable.length == 0">
                还未进行审批工作
            </div>
        </div>
        <div slot="footer">
            <Button type="primary" @click="auditFlowModal=false">确定</Button>
        </div>
    </Modal>
</template>

<script>
export default {
  props:[],
  data(){
      return {
          auditFlowModal:false,
          disabled: false,
          dataTable:[],
      }
  },
  
  methods:{
      
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
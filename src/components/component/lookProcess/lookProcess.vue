/**查看流程 */
<template>
<div>
      <Drawer
        :title="title"
        v-model="processDrawer"
        width="520"
        :mask-closable="false"
        class="drawer-con"
    >
      <Timeline>
          <template v-if="processData.length > 0">
              <TimelineItem v-for="(item,index) in processData" :key="index">
                <div class="process-con">
                    <div class="process-con-photo"><img src="../../../assets/img/img_photo.png"></div>
                    <div class="process-con-content">
                        <div class="process-con-content-top">
                            <div class="process-con-content-top-l"><span class="process-spr">{{item.createBy}}</span></div>
                            <div class="process-con-content-top-r">
                                <a href="javascript:;" class="process-state-btn" :class="item.approvalResult === '0'?'ispass':'nopass'">{{item.approvalResult === '0' ? '通过' : '不通过'}}</a>
                            </div>
                        </div>
                        <div class="process-con-content-top">
                            <div class="process-con-content-top-l"></div>
                            <div class="process-con-content-top-r">{{item.createDate}}</div>
                        </div>
                        <div class="process-con-content-bottom">
                            {{item.opinion}}
                        </div>
                    </div>
                </div>
              </TimelineItem>
          </template>
          <template v-else>
              <div  class="nodata">
                  <img src="../../../assets/img/no.png" alt="">
                  <p> 暂无数据</p>
              </div>
          </template>
      </Timeline>
    </Drawer>
</div>

</template>

<script>

  export default {
    data () {
      return {
        title:'预览审核流程动态',
        processDrawer:false,
        processData:[{id:1,isCheck:false}]
      };
    },

    components: {},

    mounted() {},

    methods: {
      lookProcess(params){
        this.$loading.show();
        this.$api.commonApi.examineQuery(params).then(res => {
          const {result,infos,data} = res.data;
          this.$loading.hide();
          if(result == 'success'){
            this.processDrawer = true;
            this.processData = data
          }
        })
      }
    },


  }

</script>
<style lang='scss' scoped>
@import './index.scss';
</style>
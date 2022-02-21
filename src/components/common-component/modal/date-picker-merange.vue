/**
 * author       : yf
 * createTime   : 20200327
 * description  : 日期 月份选择器
 * params       : {}
 */
<template>
  <div>
    <DatePicker
      v-model="startTime"
      :options="startTimeOption"
      @on-change="onStartTimeChange"
      style="width:45%"
      type="month"
      placeholder="选择开始日期"
    ></DatePicker> -
    <DatePicker
      v-model="endTime"
      :options="endTimeOption"
      @on-change="onEndTimeChange"
      style="width:45%"
      type="month"
      placeholder="选择结束日期"
    ></DatePicker>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      startTimeOption: {},
      endTimeOption: {}
    };
  },
  props: ["start", "end", "", "startcb", "endcb"],
  watch: {
    start() {
      this.startTime = this.start;
    },
    end(){
      this.endTime = this.end;
    }
  },
  methods: {
    /* 日期切换 */
    onStartTimeChange(startTime, type) {
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime);
        }
      };
      this.startcb(startTime);
    },
    onEndTimeChange(endTime, type) {
      this.startTimeOption = {
        disabledDate(startTime) {
          return startTime > new Date(endTime);
        }
      };
      this.endcb(endTime);
    }
  },
  mounted() {
    this.startTime = this.start || "";
    this.endTime = this.end || "";
    // moment().format("YYYY-MM-DD")
    let vm = this;
    this.startTimeOption = {
      disabledDate(startTime) {
        return startTime > new Date(vm.endTime);
      }
    };
    this.endTimeOption = {
      disabledDate(endTime) {
        return endTime < new Date(vm.startTime);
      }
    };
  }
};
</script>

<style>
</style> 
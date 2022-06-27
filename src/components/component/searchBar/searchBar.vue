/** author:guofa time：20220511 dees：搜索 */
<template>
  <div class="search-wrap" :class="{ open: isSearchHigh }">
    <formUi ref="formVal" :modalName="formValidate">
      <Row type="flex" justify="start" class="code-row-bg">
        <searchFormItemUi
          :spanNum="item.col || 6"
          :label-width="item.labelWidth"
          :order="String(index < 3 ? index : index + 1)"
          v-for="(item, index) in searchData.formOptions"
          :class="[index > 2 && !isSearchHigh ? 'hide' : '']"
          :className = "item.className"
          :key="index"
          :name="item.key"
          :labelName="item.label"
        >
          <inputUi
            v-if="item.type === 'text'"
            :type="'text'"
            :placeholder="item.placeholder"
            :value.sync="formValidate[item.key]"
          />
          <datePickerUi
            v-else-if="item.type === 'datePicker'"
            :type="item.datePickerType"
            :placeholder="item.placeholder"
            :value.sync="formValidate[item.key]"
          />
          <DatePickers
            v-else-if="item.type === 'szyhDatePickers'"
            :type="item.datePickerType"
            :value.sync="formValidate[item.key]"
            :placeholder="item.placeholder"
            :format="item.format"
            :clearable="item.clearable"
             style="width: 100%"
             @on-change="formValidate[item.key] = $event"
           />
          <selectUi
            v-else-if="item.type === 'select'"
            :placeholder="item.placeholder"
            :value.sync="formValidate[item.key]"
            :optionArr="item.option"
          />
        </searchFormItemUi>
        <Col :span="6" class="btns" :order="3">
          <a href="javascript:;" title="查询" class="btn searchBtn" @click="loadTable">
            搜索
          </a>
          <a
            href="javascript:;"
            title="重置"
            class="btn searchresetBtn ml-2"
            @click="resetDataResult"
          >
            重置
          </a>
          <Button
            v-for="(item, index) in searchData.btnsOptions"
            :type="item.type"
            :key="index"
            @click="item.click(formValidate)"
            >{{ item.text }}</Button
          >
          <a
            v-if="searchData.formOptions.length > 3"
            href="javascript:;"
            id="searchHigh"
            @click="filterSearch"
            class="ml-2"
            >展开 <i class="ivu-icon ml-1" :class="arrowClass"></i
          ></a>
        </Col>
      </Row>
    </formUi>
  </div>
</template>

<script>
import searchFormItem from "@/components/component/searchFormItem";
export default {
  props: {
    formValidate: {
      type: Object,
      default: () => {
        return {};
      },
    },
    searchData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    queryData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    loadTable: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    resetDataResult: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  name: "searchBar",
  data() {
    return {
      arrowClass: "ivu-icon-ios-arrow-down",
      isSearchHigh: false,
    };
  },
  components: { searchFormItem },
  mounted() {},
  methods: {
    filterSearch() {
      this.isSearchHigh = !this.isSearchHigh;
      this.arrowClass = this.isSearchHigh
        ? "ivu-icon-ios-arrow-down"
        : "ivu-icon-ios-arrow-up";
    },
  },
};
</script>
<style lang="scss" scoped>
.hide {
  display: none;
}
.search-wrap {
  .btns {
    text-align: right;
  }
}
.open {
  height: auto;
}
</style>

<template>
  <div :class="['search-box', $slots['right-btn'] ? 'has-right' : '']">
    <div
      :class="['search-item', item.type]"
      v-for="(item, index) in searchData.formOptions"
      :key="index"
      :style="{ width: item.width }"
    >
      <!-- 搜索框 -->
      <Search
        v-if="item.type === 'text'"
        :placeholder="item.placeholder"
        :value.sync="formValidate[item.key]"
        :clearable="true"
        @on-search-change="searchChange($event, item, index)"
        @on-search-enter="searchEnter($event, item, index)"
      ></Search>
      <!-- 选择框 -->
      <Select
        v-else-if="item.type === 'select'"
        :placeholder="item.placeholder"
        v-model="formValidate[item.key]"
        @on-change="tableSearch(item, index)"
        :filterable="item.filterable"
        :multiple="item.multiple"
        clearable
      >
        <Option
          v-for="(option, index) in item.option"
          :key="index"
          :value="option[item.value] || option.id"
          :disabled="option.disabled"
          >{{ option[item.name] || option.name }}</Option
        >
      </Select>
      <DatePicker
        v-else-if="item.type === 'date'"
        v-model="formValidate[item.key]"
        type="date"
        :placeholder="item.placeholder"
        :style="'width: 100%;'"
      >
      </DatePicker>
    </div>
    <slot></slot>
    <div class="right-btn-wrap" v-if="$slots['right-btn']">
      <slot name="right-btn"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formValidate: {
      type: Object,
      default: () => {
        return {}
      }
    },
    searchData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loadTable: {
      type: Function,
      default: () => {
        return () => {}
      }
    }
  },
  name: 'pageSearchList',
  methods: {
    searchChange(event, item, index) {
      let formValidate = this.formValidate
      formValidate[item.key] = event.target.value
      this.$emit('formValidate:update', formValidate)
      if (item.target == 'change') {
        this.tableSearch(item, index)
      }
    },
    searchEnter(item, event) {
      this.tableSearch()
    },
    tableSearch(item, index) {
      this.$emit('tableSearch', item, index)
      this.loadTable()
    }
  }
}
</script>
<style lang="scss" scoped>
.search-box {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  position: relative;
  &.has-right {
    padding-right: 150px;
  }
  .search-item {
    width: 100px;
    &.text {
      width: 300px;
    }
    &.select {
      width: 160px;
    }
  }
  .right-btn-wrap {
    position: absolute;
    right: 0px;
    top: calc(50% - 16px);
  }
}
</style>

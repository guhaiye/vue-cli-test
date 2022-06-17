<template>
  <Select
    @on-change="selectChange"
    v-model="selectValue"
    :placeholder="placeholder"
    clearable
  >
    <Option v-for="item in optionArr" :value="item.value" :key="item.value">{{
      item.name
    }}</Option>
  </Select>
</template>

<script>
export default {
  watch: {
    value() {
      this.selectValue = this.value;
    },
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    optionArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  name: "selectUi",
  data() {
    return {
      selectValue: this.value,
    };
  },

  components: {},

  mounted() {},

  methods: {
    selectChange(v) {
      this.$emit("update:value", v);
    },
  },
};
</script>
<style lang="" scoped></style>

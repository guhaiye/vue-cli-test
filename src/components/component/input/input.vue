<template>
  <Input
    v-bind="$attrs"
    @on-change="inputChange"
    :type="type"
    v-model.trim="inputValue"
    :placeholder="placeholder"
    :maxlength="maxlen"
    clearable
  />
</template>

<script>
export default {
  watch: {
    value: {
      handler(n) {
        this.inputValue = n;
      },
      immediate: true,
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
    type: {
      type: String,
      default: "text",
    },
    maxlen: {
      type: Number,
      default: 220,
    },
  },
  name: "inputUi",
  data() {
    return {
      inputValue: this.value,
    };
  },

  components: {},

  mounted() {},

  methods: {
    inputChange() {
      this.$emit("update:value", this.inputValue);
    },
  },
};
</script>
<style lang="" scoped></style>

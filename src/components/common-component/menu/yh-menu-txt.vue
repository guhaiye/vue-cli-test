<template>
  <b v-html="workTxt" />
</template>

<script>
/**
 * @description：装饰 菜单 文字
 */
import menuBus from "./eventBus";
import pinyin from "pinyin-match";
export default {
  props: ["txt"],
  inject: ["kws"],
  data() {
    return {
      workTxt: ". . .",
    };
  },

  created() {
    menuBus.$on("upload", () => {
      this.generater();
    });
    // 初始化
    this.generater();
  },
  methods: {
    generater() {
      let txt = this.txt;
      let { key, color } = this.kws;
      if (key == "") {
        this.workTxt = txt;
        return;
      }
      let py = pinyin.match(txt, key);
      if (py) {
        let key_py = txt.substr(py[0], py[1] - py[0] + 1);
        let res = `<i class='menu_kw'>${key_py}</i>`;
        let reg = new RegExp(key_py, "g");
        this.workTxt = txt.replace(reg, res);
        return;
      }
      let reg = new RegExp(key, "g");
      let res = `<i class='menu_kw'>${key}</i>`;

      this.workTxt = txt.replace(reg, res);
    },
  },
};
</script>

<style>
.menu_kw {
  font-style: normal !important;
}
</style>
<template>
  <div class="app-aside">
    <div class="app_aside_fixed">
      <!-- logo -->
      <div class="app_aside_logo">
        <router-link to="/index">
          <template v-if="user.tenantid === 1">
            <div class="cyt_logo"></div>
          </template>
          <template v-else>
            <img :src="userinfo.tenancylogo" alt />
          </template>
        </router-link>
      </div>
      <!-- search -->
      <div :class="className">
        <Input
          v-model="keyword"
          clearable
          @on-enter="searchHandle"
          @on-focus="className = 'app_aside_search app_aside_search_focus'"
          @on-blur="className = 'app_aside_search'"
          prefix="ios-search"
          placeholder="请输入搜索..."
        />
      </div>
    </div>
    <!-- 菜单 -->
    <div class="app_aside_menu">
      <menu-com v-model="keyword" :openNames="openName" :data="newbars" />
      <!-- <menu-com v-model="keyword" :activeName="activeName" :data="newbars" /> -->
    </div>
  </div>
</template>

<script>
import menuCom, {
  pathFun,
  treePath,
  deepClone,
  treeCreate,
} from "@/components/common-component/menu/index.js";
import { mapState } from "vuex";
export default {
  components: { menuCom },
  computed: mapState({ user: (state) => state.user }),
  data() {
    return {
      keyword: "",
      // activeName: "",
      className: "app_aside_search",
      newbars: this.newbar,
      openName: [],
    };
  },
  props: ["newbar", "userinfo"],
  watch: {
    newbar() {
      this.newbars = this.newbar;
    },
  },
  methods: {
    update() {
      //路径
      let paths = pathFun([].concat(this.newbar), this.keyword, [], "");
      //筛选tree
      let data = treePath(paths, this.newbar);
      // 展开 tree
      let opens = treeCreate(deepClone(data), {});
      // console.log(openName);
      this.$nextTick(() => {
        let openName = Object.keys(opens).map((e) => Number(e));
        if (this.keyword == "") {
          this.openName = [];
        } else {
          this.openName = openName;
        }
        this.newbars = data;
      });

      return data;
    },
    searchHandle() {
      this.update();
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
</style>

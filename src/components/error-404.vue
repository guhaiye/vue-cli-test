<template>
  <div class="app lt h-100p">
    <div class="container text-center fade-in-up ng-enter">
      <div class="col-lg-6 col-md-6 offset-md-3 offset-lg-3">
        <div class="bg-white b-rad-3 p-3">
          <!-- <div class="error-shape err-404">
            <span>403</span>
          </div>-->
          <!-- <div class="errortxt">404</div> -->
          <div class="text-center">
            <img src="../assets/img/404.gif" alt="无访问权限" />
          </div>
          <div class="fontsize18 text-grey mt-4">访问的页面不存在，可能已经被删除或移动到其他位置</div>
          <div class="mt-5">
            <!-- <a @click="handlerest()" href="javascript:void(0)" class="btn btn-outline-info">返回上一页</a> -->
            <Button @click="handback()" type="primary">返回上一页</Button>
            <Button @click="backFirst()" class="ml-3" type="primary">返回首页</Button>
            <Button @click="handlerest()" class="ml-3" type="primary">重新登录</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.errortxt {
  color: #f6f7fb;
  font-size: 100px;
}
.errortxt_abs {
  position: absolute;
}
.fontsize22 {
  font-size: 22px;
}
</style>
<script>
import { logout } from "@/misc/root-common";
export default {
  name: "error-403",
  methods: {
    handback() {
      history.go(-1);
    },
    backFirst() {
      location.href = "/index";
    },
    handlerest() {
      logout(1);
    }
  },
  mounted() {
    document.body.classList.remove("preloader");
  },
  activated() {
    document.body.classList.remove("preloader");
  }
};
</script>

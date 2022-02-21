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
            <img src="../assets/img/403.gif" alt="无访问权限" />
          </div>
          <div class="fontsize18 text-grey mt-4">您没有访问权限，请联系系统管理员为您分配权限！</div>
          <div class="mt-5">
            <!-- <a @click="handlerest()" href="javascript:void(0)" class="btn btn-outline-info">返回上一页</a> -->
            <Button @click="handlerest()" type="primary">重新登录</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.flexbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.bg-img {
  min-width: 600px;
  height: 290px;
  background-image: url("../assets/img/Nopermission1.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  -moz-background-size: auto 100%;
  position: relative;
  .tipbox {
    position: absolute;
    right: 20px;
    top: 70px;
    width: 210px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tip {
    position: absolute;
    right: 36px;
    top: 82px;
    color: #0d429c;
  }
  .fontsize22 {
    font-size: 16px;
    color: #222;
    position: absolute;
    right: 48px;
    top: 167px;
  }
  .back {
    position: absolute;
    right: 75px;
    top: 210px;
    width: 110px;
  }
}
</style>
<script>
import { logout } from "@/misc/root-common";
export default {
  name: "noPermission",
  methods: {
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

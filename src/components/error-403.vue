<template>
  <div class="app lt h-100p">
    <div class="flexbox">
      <div class="bg-img">
        <img src="./../assets/img/Nopermission2.png" alt="无访问权限,请联系管理员分配！" class="tipbox" />
        <h3 class="tip">您没有权限！</h3>
        <p class="fontsize22 text-grey">请联系管理员分配权限</p>
        <Button @click="handlerest()" type="primary" class="back">重新登录</Button>
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

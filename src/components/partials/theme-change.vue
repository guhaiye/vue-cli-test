<template>  
    <Dropdown trigger="click" class="theme-switch" placement="left-end">
            <a href="javascript:void(0)" class="dropdown-item py-2">
                <i class="fa ioss-line_diamond mr-2"></i>主题设置
                <i class="fa icon-arrow-right theme-icon"></i>
            </a>
           <DropdownMenu slot="list" class="theme-switch-list">
              <div  title="theme1" @click ="active($event,'theme1')" :class="{'active': theme == 'theme1'}">
                  <label class="bg-jds-dark" ></label><i class="fa icon-arrow-down"></i><span> 经典色（深）</span>
              </div>
              <div title="theme2" @click ="active($event,'theme2')" :class="{'active': theme == 'theme2'}">
                  <label class="bg-jds-light"  ></label><i class="fa icon-arrow-down"></i><span> 经典色（浅）</span>
              </div>
              <div  title="theme3" @click ="active($event,'theme3')" :class="{'active': theme == 'theme3'}">
                  <label class="bg-yellow-light" ></label><i class="fa icon-arrow-down"></i><span> 浅黄色</span>
              </div>
              <div title="theme4" @click ="active($event,'theme4')" :class="{'active': theme == 'theme4'}">
                  <label class="bg-blue-dark" ></label><i class="fa icon-arrow-down"></i> <span> 深蓝色</span>
              </div>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default {
  data(){
      return {
          theme: localStorage.theme || 'theme1'
      }
  },
  created () {
    document.getElementById('body_app').className = this.theme
  },
  methods:{
      // 切换主题颜色
    active (e, theme) {
      // 获取选中主题, 优先使用参数传递的主题
            // 更改样式链接
            document.getElementById('body_app').className = theme
            // 保存
            localStorage.setItem('theme', theme)
            this.theme = theme;
            var json = {};
            json['code'] = 'style';
            json['content'] = theme
            savePersonInfo(json)
            this.changeOriginTheme()
    },
    changeOriginTheme(){
      var that = this;
      let mapFrame = $("[id^='iframeid']");
      if(mapFrame.length > 0){
        let iframeWin = mapFrame[0].contentWindow;
        iframeWin.postMessage({
          'themecolor': that.theme
        },'*')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .theme-switch{width:100%;
    .theme-icon{font-size: 8px;line-height: 20px;float: right;}
    /deep/ .ivu-select-dropdown{padding:0px;
        .theme-switch-list{
          &>div{
            width:100%;display:block;padding:0 16px;cursor:pointer;
              label{
                  width:14px;height:14px;border-radius:2px;display:inline-block;vertical-align: text-bottom;margin-right: .5rem;
                  &.bg-jds-dark{background:#1D293D;border:1px solid #1D293D;}
                  &.bg-jds-light{background:#fff;border:1px solid #3E98F1;}
                  &.bg-yellow-light{background:#FFE600;border:1px solid #FFE600;}
                  &.bg-blue-dark{background:#0B318F;border:1px solid #0B318F;}
              }
              &>span{margin-top:1px;}
              i{ visibility: hidden; line-height: 40px; color: #919AA6;float:right; }
              &.active i { visibility: visible }
          }

        }
    }
  }
</style>
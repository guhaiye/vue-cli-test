<template>
  <div class="importExportBtn">
      <Tooltip
        class="float-right tooltipcon"
        content="导出"
        placement="top"
    >
        <a @click="outputEvent">
          <i class="ioss-export3 cursor_pointer fontsize16"></i>
        </a>
    </Tooltip>
  </div>
</template>

<script>
  import {getSearchField,DownFile} from "@/misc/root-common";
  export default {
    name:'exportBtnUi',
    props:{
      //导出按钮权限code
      btnCode:{
          type:String,
          default:''
      },
      //导出条件
      propsData:{
          type:Object,
          default:()=>{
              return {
                 module:'',
                 api:'',
                 condition:[],
                 form:{}
              }
          }
      }
    },
    data () {
      return {

      };
    },

    components: {},

    mounted() {},

    methods: {
        outputEvent(){
            let {condition,form,module,api} = this.propsData
            var conarr = getSearchField(condition,form);
            let params = {
                condition: JSON.stringify(conarr),
            };
            this.$loading.show()
            this.$api[module][api](params).then((res) => {
                this.$loading.hide();
                const {data,headers} = res;
                const reader = new FileReader();
                reader.onload = e => {
                    try {
                    const _info = JSON.parse(e.target.result);
                    if (_info.result == 'error') {
                        this.$Message.warning({
                            content: _info.infos,
                            duration: 5
                        });
                    }
                    } catch (err) {
                        let temp = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
                        //对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
                        let iconv = require('iconv-lite'); 
                            iconv.skipDecodeWarning = true;//忽略警告
                        let fileName = iconv.decode(temp, 'utf-8');
                        DownFile(res.data,fileName);
                    }
                };
                reader.readAsText(data);
            });
        }
    },


  }

</script>
<style lang='scss' scoped>
</style>
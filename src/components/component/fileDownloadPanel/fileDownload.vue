/** 
author:guofa
time：20220511
dees：附件下载
*/
<template>
    <div class="file-download">
        <div class="label">附件：</div>
        <div class="file">
            <li class="item" v-for="item in fileList" :key="item.id">
                <a href="javascript:;" @click="fileDown(item.id)">{{ item.fileName }}</a>
              </li>
        </div>
    </div>
</template>

<script>
import { DownFile } from "@/misc/root-common";

export default {
    props: {
        fileList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data () {
        return {
        }
    },
  name: 'fileDownload',
  components: {
  },
  mounted () {

  },

  methods: {
    fileDown (id) {
      this.$api.commonApi.fileDown(id).then(res => {
          console.log(res)
          DownFile(
            res.data,
            decodeURI(res.headers["content-disposition"].split("filename=")[1])
          );
      })
    }
  }

}

</script>
<style lang='scss' scoped>
    .file-download {
        display: flex;
        .label {
            font-size: 14px;
            font-weight: 500;
            color: #596778;
        }
        .item {
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            color: #3E98F1;
            margin-bottom: 8px;
            list-style: none;
        }
    }
</style>

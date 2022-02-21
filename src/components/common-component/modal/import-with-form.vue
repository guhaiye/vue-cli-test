/**
 * author       : jiewei.shan
 * createTime   : 20200628
 * description  : 导入弹窗嵌入表单
 */
<template>
  <Modal v-model="importModal" :title="bindtitle" :mask-closable="false" class="topModal20">
    <Form class="mb-1" id="formvalid" ref="formValidate" :model="formValidate" :rules="ruleValidate" autocomplete="off" :label-width="120" onsubmit="return false;">
    <Row>
        <slot name="Form"></slot>
        <Col span="18">
            <FormItem label="数据文件" prop="upload">
                <Upload
                    ref="upload"
                    :name="upload"
                    :headers="myheaders"
                    :with-credentials="true"
                    :max-size="5120"
                    :format="formatFile"
                    :on-format-error="formatError"
                    :on-exceeded-size="handleExceedSizeError"
                    :before-upload="handleUpload"
                    :on-success="ok"
                    :on-error="err"
                    :action="actionurl"
                    :data='formData'
                >
                    <Button icon="ios-cloud-upload-outline">选择文件上传</Button>
                </Upload>
            </FormItem>
        </Col>
    </Row>
    </Form>
    <slot name="title"></slot>
    <div class="col-md-12 pd0 fontsize14">
        <div v-if="file !== null">{{ file.name }}</div>
    </div>
    <div slot="footer">
        <Button type="default" @click="closeModal">
            取消
        </Button>
        <Button type="primary" :loading="loadingStatus" :disabled="disabled" @click="importSure">
            导入
        </Button>
    </div>
  </Modal>
</template>

<script>
var globaltokentype = globalconfig.initialtoken;
var tokenarray = localStorage.getItem("tokenarray");
var tokenarrayjson = JSON.parse(tokenarray);
export default {
    data() {
        return {
            myheaders: { "X-Requested-With": "XMLHttpRequest" },
            importModal: false,
            disabled: false,
            bindtitle: "导入",
            actionurl: "",
            file:null,
            importType:"",
            loadingStatus: false,
            formatFile: ["xls", "xlsx"],
            upload:'upload',
            formData:{},
            formValidate:{},
            ruleValidate:{},
        };
    },
    watch: {
        importModal: {
            handler(n, o) {
                if (n) {
                this.file = null;
                this.loadingStatus = false;
                this.$refs.upload.clearFiles();
                }
            }
        }
    },
    props: ["importCallBack"],
    methods: {
        closeModal(){
            this.importModal=false
            this.$loading.hide()
        },
        handleUpload(file) {
            this.file=file;
            this.formData=this.formValidate;
            return false;
        },
        formatError(file) {
            var text = "";
            if (this.formatFile.length == 1) {
                if (this.formatFile.indexOf("zip") == 0) {
                text = "文件只能是zip格式";
                }
                if (this.formatFile.indexOf("xls") == 0) {
                text = "文件只能是xls格式";
                }
            } else {
                if (this.formatFile.indexOf("zip") < 0) {
                text = "文件只能是xls,xlsx格式";
                } else {
                text = "文件只能是xls,xlsx,zip格式";
                }
            }
            this.loadingStatus = false;
            this.$Message.error(text);
        },
        handleExceedSizeError(file) {
            this.$Message.error("文件大小不能超过5M");
        },
        importSure() {
            if(this.file == null){
                this.$Message.error("请选择文件上传！") 
                return ;
            }else{
                this.$refs.formValidate.validate((valid)=>{
                    if(valid){
                        this.$refs.upload.post(this.file);
                    }
                })
            }
        },
        ok(res, file, fileList) {
            const { code, infos, result } = res;
            if (result == "success") {
                this.file = null;
                this.$Message.success(infos);
            } else {
                this.file = null;
                this.$refs.upload.clearFiles();
            }
            this.importCallBack(this.importType,res);
            this.loadingStatus = false;
        },
        err(res, file, fileList) {
            this.loadingStatus = false;
        },
        /* 初始化 */
        initStart() {
            this.file = null;
            this.loadingStatus = false;
            this.$refs.upload.clearFiles();
            this.importModal = true;
        }
    },
    mounted() {
        this.myheaders[globaltokentype] = tokenarrayjson[globaltokentype];
    },
    activated() {

    }
};
</script>

<style>
</style>
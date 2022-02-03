<template>
    <div>
        <input 
        ref="zypcInput"
        @focus="zypcFocusInput"
        @blur="zypcBlurInput"
        :value="value"
        @input="input"
        :placeholder="placeholder" 
        :style="{
            backgroundColor:backgroundColor,
            width:width,
        }" 
        class="zypc-inputFirst" 
        type="text"> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:["backgroundColor","placeholder","width","value"],
    mounted() {

    },
    methods: {
        // 获得焦点为input标签添加边框
        zypcFocusInput(){
            this.$refs.zypcInput.style.border = '1px solid rgb(3,169,244)'
        },
        // 失去焦点将input标签的边框设置为默认值
        zypcBlurInput(){
            this.$refs.zypcInput.style.border = '1px solid rgb(150,150,150)'
        },
        // 实现v-modle的功能
        input(){
            console.log(event.target.value)
            this.$emit('input',event.target.value)
        }
    },
}
</script>

<style lang="css">
.zypc-inputFirst {
    border: 1px solid rgb(150, 150, 150);
    border-radius: 10px;
    outline: none;
    padding-left: 5px;
    height: 25px;
    width: 200px;
    margin: 6px;
}
</style>
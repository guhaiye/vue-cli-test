<template>
    <div :class="wrapClasses">
        <!-- {{type}} -->
        <template v-if="type !== 'suggest'">
            <Input
                ref="search"
                search
                v-model.trim="searchValue"
                :placeholder="placeholderText"
                :style="'width: ' + width"
                :size="size"
                :clearable="clearable"
                @on-focus="focusHandle"
                @on-blur="blurHandle"
                @on-change="changeHandle"
                @on-enter="enterHandle"
            >
            </Input>
            <div class="legend" :class="{'large': size=='large', 'small': size=='small'}" v-show="visiable">{{placeholder}}</div>
        </template>
        <template v-else>
            <!-- 22 -->
            <AutoComplete
                v-model="searchValue"
                :placeholder="placeholderText"
                :style="'width: ' + width"
                :size="size"
                :data="data"
                :clearable="clearable"
                icon="ios-search"
                @on-focus="focusHandle"
                @on-blur="blurHandle"
                @on-select="suggestSelectHandle"
                @on-change="suggestChangeHandle"
                @on-search="suggestSearchHandle"
            >
            </AutoComplete>
            <div class="legend" :class="{'large': size=='large', 'small': size=='small'}" v-show="visiable">{{placeholder}}</div>
        </template>
    </div>
</template>
<script>
    const prefixCls = 'ivu-search';

    export default {
        name: 'Search',
        components: {},
        props: {
            type: {
                type: String,
                default: 'search'
            },
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: '300px'
            },
            size: {
                type: String,
                default: 'default'
            },
            clearable: {
                type: Boolean,
                default: false
            },
            timeout: {
                type: Number,
                default: 300
            },
            data: {
                type: Array,
                default: () => []
            },
        },
        data () {
            return {
                searchValue: this.value,
                placeholderText: this.placeholder,
                visiable: false,
                timer: null,
            };
        },
        computed: {
            wrapClasses () {
                return [`${prefixCls}-wrapper`];
            }
        },
        watch: {
            value: {
                handler(n) {
                    console.log(n)
                    this.searchValue = n
                },
                immediate: true
            }
        },
        methods: {
            focusHandle() {
                this.visiable = true;
                this.placeholderText = '';
            },
            blurHandle() {
                this.visiable = false;
                this.placeholderText = this.placeholder;
            },
            changeHandle(event) {

                clearTimeout(this.timer);

                this.timer = setTimeout(() => {

                    this.$emit('on-search-change', event);

                }, this.timeout);

            },
            enterHandle(event) {
                this.$emit('on-search-enter', event);
            },
            suggestSelectHandle(value){
                this.$emit('on-suggest-select', value);

            },
            suggestChangeHandle(value){
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.$emit('on-suggest-change', value);
                }, this.timeout);

            },
            suggestSearchHandle(query){
                this.$emit('on-suggest-search', query);
            }
        },
        mounted () {}
    };
</script>
<style lang="less" scoped>

</style>

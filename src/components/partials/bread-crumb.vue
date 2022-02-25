/**
 * author       : haiye.gu
 * createTime   : 20220127
 * description  : 面包屑
 */
<template>
   <ol class="breadcrumb">
    <Breadcrumb>
        <BreadcrumbItem v-for="(item,index) in breadCrumbList" :key="index">{{item}}</BreadcrumbItem>
    </Breadcrumb>
   </ol>
</template>
<script>
    import {jsonFIndParent} from '@/misc/arr-detail'
    export default {
        props:['newbar'],
        created() {
            this.getBreadcrumb()
        },
        data() {
            return {
               breadCrumbList: []
            }
        },
        watch: {
            $route() {
               this.getBreadcrumb()
            }
        },
        methods: {
            getBreadcrumb() {
                let _arr = this.newbar
                const {id} = this.$route.meta
                this.breadCrumbList = jsonFIndParent(id,_arr)
            }
        }
    }
</script>

<style lang="scss" scoped>
  .bread-crumb{margin-bottom:1rem}
</style>
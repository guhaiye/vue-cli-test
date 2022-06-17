/** author:guofa time：20220511 dees：文章内容 */

<template>
  <div class="multiple-block-article">
    <div class="block-item" v-if="!!articleData.answer">
      <div class="tag">问题</div>
      <div class="content">{{ articleData.answer }}</div>
    </div>
    <div class="block-item" v-if="!!articleData.answer">
      <div class="tag">解答</div>
      <div class="content">{{ articleData.question }}</div>
    </div>
    <template
      v-if="JSON.stringify(articleData.caseDto) !== '{}' && !!articleData.caseDto"
    >
      <div class="tab-title">
        <div class="title">案例解析</div>
      </div>
      <div class="block-item" v-if="!!articleData.caseDto.caseDescription">
        <div class="tag">案例描述</div>
        <div class="content" v-html="articleData.caseDto.caseDescription"></div>
      </div>
      <div class="block-item" v-if="!!articleData.caseDto.caseAnalyze">
        <div class="tag">案例解析</div>
        <div class="content" v-htm="articleData.caseDto.caseAnalyze"></div>
      </div>
      <div class="block-item" v-if="!!articleData.caseDto.policyBasis">
        <div class="tag">政策依据</div>
        <div class="content" v-html="articleData.caseDto.policyBasis"></div>
      </div>
      <div class="block-item" v-if="!!articleData.caseDto.practicalOperation">
        <div class="tag">实务操作</div>
        <div class="content" v-html="articleData.caseDto.practicalOperation"></div>
      </div>
      <div class="block-item" v-if="!!articleData.caseDto.riskWarning">
        <div class="tag">实务操作</div>
        <div class="content" v-html=" articleData.caseDto.riskWarning "></div>
      </div>
    </template>
    <template v-if="!!articleData.regulations && articleData.regulations.length > 0">
      <div class="tab-title">
        <div class="title">对应政策法规</div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in articleData.regulations" :key="index">
          {{ item.title }} 【{{ item.dispatchDate }}】
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    articleData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  name: "multipleBlockArticle",
  components: {},
  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.multiple-block-article {
  .tag {
    width: 114px;
    height: 36px;
    line-height: 36px;
    padding: 0 30px;
    border: none;
    border-radius: 2px;
    position: relative;
    background: #f5f5f5;
    margin-bottom: 20px;
    margin-top: 16px;
    font-weight: 500;
    color: #596778;
  }

  .tag:after {
    content: "";
    width: 0;
    height: 0;
    border: 20px solid;
    position: absolute;
    bottom: -30px;
    left: 60px;
    border-color: #f5f5f5 transparent transparent;
  }

  .tab-title {
    height: 48px;
    line-height: 48px;
    background: #ffffff;
    box-shadow: 0px 1px 0px 0px #e5e5e5;
    font-size: 16px;
    color: #3e98f1;
    .title {
      display: inline-block;
      height: 49px;
      border-bottom: 2px solid #3e98f1;
    }
  }

  .list {
    padding: 16px 0 28px 0px;
    border-bottom: 1px solid #eceef0;
    .item {
      margin-bottom: 4px;
    }
  }
}
</style>

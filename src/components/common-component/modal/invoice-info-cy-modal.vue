/**
 * author       : guhaiye
 * createTime   : 20200313
 * description  : 销项，分类编码详细公用接口
 */
<template>
  <Modal
    class="detailmodal-con"
    v-model="detailmodalshow"
    title="基本信息"
    :mask-closable="false"
  >
    <div class="col-md-12 pd0">
      <Row>
        <Col :span="5" class="invoice-date">
          <span
            >开票日期： <label for="">{{ invoicecon.invoiceDate }}</label></span
          >
        </Col>
        <Col :span="13" class="invoice-name">
          <h4>{{ invoiceType | filterInvoiceType }}</h4>
          <span></span>
          <span></span>
          <!-- <div class="invoice-chapter" v-if="!!invoicecon.taxBureau">
            {{ invoicecon.taxBureau }}
          </div> -->
        </Col>
        <Col :span="6" class="invoice-code">
          <span class="tx_over" :title="invoicecon.invoiceCode"
            >发票代码： <label for="">{{ invoicecon.invoiceCode }}</label></span
          >
          <span class="tx_over" :title="invoicecon.invoiceNumber"
            >发票号码：
            <label for="">{{ invoicecon.invoiceNumber }}</label></span
          >
          <span
            class="tx_over"
            v-if="invoicecon.invoiceType != '01'"
            :title="invoicecon.checkCode"
            >校验码： <label for="">{{ invoicecon.checkCode }}</label></span
          >
        </Col>
      </Row>
      <Row
        :class="invoicecon.invoiceType != '01' ? 'mt-1' : 'mt-4'"
        class="invoice-table-tit"
      >
        <Col :span="1" class="invoice-table-tit1" style="line-height: 32px">
          购买方
        </Col>
        <Col :span="11" class="invoice-table-tit1 text-left">
          <div class="tx_over">
            <label for="">名称：</label>
            <span :title="invoicecon.buyerName">{{
              invoicecon.buyerName
            }}</span>
          </div>
          <div class="tx_over">
            <label for="">纳税人识别号：</label>
            <span :title="invoicecon.buyerNsrsbh">{{
              invoicecon.buyerNsrsbh
            }}</span>
          </div>
          <div class="tx_over">
            <label for="">地址、电话：</label>
            <span :title="`${invoicecon.baddressAndMobile}`">{{
              invoicecon.baddressAndMobile
            }}</span>
          </div>
          <div class="tx_over">
            <label for="">开户行及账号：</label>
            <span :title="`${invoicecon.bankAccountAndAccount}`">{{
              invoicecon.bankAccountAndAccount
            }}</span>
          </div>
        </Col>
        <Col :span="1" class="invoice-table-tit1" style="line-height: 32px">
          密码区
        </Col>
        <Col :span="11" style="word-break: break-all; line-height: 20px">{{
          invoicecon.cipher
        }}</Col>
      </Row>
      <!-- <slot name='invoicecontent' /> -->
      <Table
        class="pt-1 pb-1"
        height="143"
        border
        :columns="columnsTableInvoice"
        size="small"
        :data="dataTableInvoice"
        show-summary
        :summary-method="handleSummary"
        stripe
      >
      </Table>
      <Row class="invoice-table-tail">
        <Col :span="3" class="invoice-table-tit1"> 价税合计 </Col>
        <Col :span="9">
          {{ invoicecon.totalTaxPrice_CN }}
        </Col>
        <Col :span="3" class="invoice-table-tit1"> 小写 </Col>
        <Col :span="9">
          {{ invoicecon.totalTaxPrice }}
        </Col>
      </Row>

      <Row class="invoice-table-tit invoice-table-tit2">
        <Col :span="1" class="invoice-table-tit1" style="line-height: 32px">
          销售方
        </Col>
        <Col :span="11" class="invoice-table-tit1 text-left">
          <div class="tx_over">
            <label for="">名称：</label>
            <span :title="invoicecon.supplerName">{{
              invoicecon.supplerName
            }}</span>
          </div>
          <div class="tx_over">
            <label for="">纳税人识别号：</label>
            <span :title="invoicecon.supplerNsrsbh">{{
              invoicecon.supplerNsrsbh
            }}</span>
          </div>
          <div class="tx_over">
            <label for="">地址、电话：</label>
            <span :title="`${invoicecon.saddressAndMobile}`">{{
              invoicecon.saddressAndMobile
            }}</span>
          </div>
          <div class="tx_over">
            <label for="">开户行及账号：</label>
            <span :title="`${invoicecon.sbankAccountAndAccount}`">{{
              invoicecon.sbankAccountAndAccount
            }}</span>
          </div>
        </Col>
        <Col :span="1" class="invoice-table-tit1" style="line-height: 47px">
          备注
        </Col>
        <Col :span="11">
          {{ invoicecon.remark }}
        </Col>
      </Row>
      <!-- <Row>
        <Col span="6" class="tx_over" :title="`${invoicecon.payee}`"
          >收款人：{{ invoicecon.payee }}</Col
        >
        <Col span="6" class="tx_over" :title="`${invoicecon.reviewer}`"
          >复核：{{ invoicecon.reviewer }}</Col
        >
        <Col span="6" class="tx_over" :title="`${invoicecon.drawer}`"
          >开票人：{{ invoicecon.drawer }}</Col
        >
        <Col span="6">销售方 （章）</Col>
      </Row> -->
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import {
  formatDate,
  formatMonthDate,
  formatMoneyDx,
  regularNum,
} from "@/misc/root-common";
import { getApiAsync, dataTransferText } from "@/misc/baseDict";
let vm = {};
export default {
  filters: {
    filterFormatDate(v, ...args) {
      if (args[1] == "date") {
        return formatDate(v);
      } else if (args[1] == "month") {
        return formatMonthDate(v);
      }
    },
    filterInvoiceType(v) {
      return dataTransferText(vm.invoiceArr, v, "INVOICE_TYPE");
    },
  },
  data() {
    vm = this;
    return {
      invoiceType: "",
      invoicecon: {
        invoiceDate: "",
        invoiceType: "",
        invoiceCode: "",
        invoiceNumber: "",

        checkCode: "",
        supplerName: "",
        supplerNsrsbh: "",
        saddressAndMobile: "",
        sbankAccountAndAccount: "",

        levyRefund: "",
        buyerName: "",
        buyerNsrsbh: "",
        baddressAndMobile: "",
        bankAccountAndAccount: "",

        isVoided: "",
        declareOpt: "",
        totalTaxPrice: "",
        totalTaxPrice_CN: "",
      },
      detailmodalshow: false,
      columnsTableInvoice: [
        {
          title: "货物或应税劳务名称、服务名称",
          key: "itemName",
          ellipsis: true,
          minWidth: 230,
          tooltip: true,
        },
        {
          title: "规格型号",
          width: 100,
          key: "specificationModel",
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "单位",
          width: 100,
          key: "unit",
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "数量",
          width: 100,
          key: "quantity",
        },
        {
          title: "单价",
          width: 100,
          key: "price",
        },
        {
          title: "金额",
          width: 100,
          key: "account",
          align: "right",
          render: (h, p) => {
            const { account } = p.row;
            var text = regularNum(account);
            return h("span", text);
          },
        },
        {
          title: "税率",
          key: "taxRate",
          width: 100,
          render: (h, p) => {
            const { taxRate } = p.row;
            var text = "";
            let num_rate = Number(taxRate);
            if(taxRate =='免税'){
              return h("span", '免税');
            }
            if(taxRate =='不征税'){
              return h("span", '不征税');
            }
            if (num_rate === 0) {
              if (taxRate == "1") {
                text = "免税";
              } else if (taxRate == "2") {
                text = "不征税";
              } else if (taxRate == "3") {
                text = num_rate + "%";
              }
            } else {
              text = num_rate + "%";
            }
            return h("span", text);
          },
        },
        {
          title: "税额",
          key: "tax",
          width: 100,
          align: "right",
        },
      ],
      dataTableInvoice: [],
    };
  },
  methods: {
    getInvoiceDetail(params) {
      // var params = {id:id}
      this.$loading.show();
      this.$api.invoiceInspection
        .detail(params)
        .then((res) => {
          var result = res.data.result;
          if (result == "success") {
            //  const {xxInvoice,xxInvoiceItems} = JSON.parse(res.data.infos);
            const xxInvoice = JSON.parse(res.data.infos)[0];
            const xxInvoiceItems = JSON.parse(res.data.infos)[0][
              "invoiceDetail"
            ];
            if (!!xxInvoice) {
              this.detailmodalshow = true;
              this.invoiceType = params.alxd;
              this.invoicecon = xxInvoice;
              this.dataTableInvoice = xxInvoiceItems;
            } else {
              this.$Message.warning("没有发票基本信息");
            }
          }else{
            this.$Message.error(res.data.infos);
          }
          this.$loading.hide();
        })
        .catch((err) => {
          this.$loading.hide();
        });
    },
    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: "合计",
          };
          return;
        }
        if (
          index === 1 ||
          index === 2 ||
          index === 3 ||
          index === 4 ||
          index === 6
        ) {
          sums[key] = {
            key,
            value: "",
          };
          return;
        }
        const values = data.map((item) => Number(item[key]));
        if (!values.every((value) => isNaN(value))) {
          const v = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[key] = {
            key,
            value: v.toFixed(2),
          };
        } else {
          sums[key] = {
            key,
            value: " ",
          };
        }
      });
      return sums;
    },
  },
  created() {
    getApiAsync("INVOICE_TYPE").then((res) => {
      this.invoiceArr = res;
    });
  },
};
</script>

<style lang="scss" scoped>
.detailmodal-con {
  width: 975px !important;
  /deep/ .ivu-table-with-summary .ivu-table-tbody tr:last-child td {
    border-bottom: 1px solid #e8eaec;
  }
  /deep/ .ivu-modal {
    width: 975px !important;
    top: 10px;
  }
  /deep/ .ivu-modal-footer {
    border-top: none;
  }
  .invoice-date {
    font-size: 14px;
    line-height: 60px;
    span {
      font-weight: bold;
      label {
        font-weight: normal;
      }
    }
  }
  .invoice-name {
    text-align: center;
    position: relative;
    span {
      width: 60%;
      border: 1px #287bcc solid;
      margin: 10px auto;
      display: block;
    }
    .invoice-chapter {
      position: absolute;
      line-height: 69px;
      color: #e73b42;
      font-size: 9px;
      font-family: "宋体";
      top: 10px;
      left: 50%;
      width: 110px;
      height: 69px;
      margin-left: -55px;
    }
  }
  .invoice-code {
    span {
      font-weight: bold;
      display: block;
      width: 100%;
      font-size: 14px;
      padding-left: 30px;
      line-height: 30px;
      label {
        font-weight: normal;
      }
    }
  }
  .invoice-table-tit {
    border: 1px solid #ccc;
    border-bottom: none;
    font-size: 14px;
    width: 100%;
    & > div {
      border-right: 1px solid #e8eaec;
      padding: 2px 10px 0;
      height: 102px;
      &:last-child {
        border-right: none;
      }
    }
    &.invoice-table-tit2 {
      border: 1px solid #ccc;
      border-top: none;
    }
    .invoice-table-tit1 {
      font-weight: bold;
      text-align: center;
      line-height: 24px;
      & > div {
        font-weight: normal;
      }
    }
  }
  .detailmodal-table {
    /deep/ table {
      width: 100% !important;
    }
  }
  .invoice-table-box {
    border: 1px solid #ccc;
    border-top: none;
    padding: 5px 10px 0;
    font-size: 14px;
    .invoice-table-boxcon {
      padding: 0 10px 0 0;
      margin-bottom: 5px;
      label {
        width: 100px;
        text-align: right;
        font-weight: bold;
      }
      // /deep/ .ivu-select, /deep/ .ivu-input-type{width:200px;}
    }
    .invoice-table-boxcon-date {
      width: 50%;
      display: inline;
      padding-right: 20px;
    }
  }
  .invoice-table-tail {
    border: 1px solid #ccc;
    border-top: none;
    font-size: 14px;
    & > div {
      border-right: 1px solid #e8eaec;
      height: 35px;
      padding: 5px 10px;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
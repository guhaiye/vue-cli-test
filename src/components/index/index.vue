<template>
	<div class="indexpage">
		<div class="col-md-12 b-no text-center">
		 欢迎
		</div>
	</div>
</template>
<script>
    import { iframeWidth } from '../../misc/utils'
	export default {
	  name: 'loginIndex',
	  data: () => ({
	    roleid:'',
	    iframesrc: ''
	  }),
	  methods: {
	  },
	  mounted(){
		  this.$loading.hide()
	  }
	}
</script>
<style lang="scss">
	.text-center{text-align:center}
	.indexpage img{margin-top:20%}
</style>
import store from '../store/'
/*
 钩子函数（可选）：
 bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
 inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
 update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
 componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
 unbind: 只调用一次， 指令与元素解绑时调用。

 钩子函数被赋予了以下参数：
 el: 指令所绑定的元素，可以用来直接操作 DOM 。
 binding: 一个对象，包含以下属性：
 name: 指令名，不包括 v- 前缀。
 value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
 oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
 expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
 arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
 modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
 vnode: Vue 编译生成的虚拟节点，查阅 VNode API 了解更多详情。
 oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

 除了 el 之外，其它参数都应该是只读的，尽量不要修改他们。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
 */
export default {
  btnhaspermisson:{
    bind(el,binding,vnode){
      var menuarr = store.state.menu[0].children;
      var haspermisson = 'none';
      $(menuarr).each(function(i,v){
        var url = menuarr[i].funccode;
        if(url == binding.value){
            haspermisson = 'inline-block';
            return;
        }
      })
      if(haspermisson == 'none'){
        setTimeout(()=>{
          if(!!el.parentNode){
          el.parentNode.removeChild(el)
          }
        },0)
      }
    }
},
btnhasperfunc:{
    bind(el,binding){
      var menuarr = store.state.menu[0].children;
      var haspermisson = 'none';
      $(menuarr).each(function(i,v){
        var url = menuarr[i].path;
        if(url == binding.value()){
            haspermisson = 'block';
            return;
        }
      })
      el.style.display = haspermisson
    }
},
autoHeight:{
  bind: function (el, binding, vnode) {
      // this.el.style.color = '#fff'
      // this.el.style.backgroundColor = this.arg
  },
  update: function (el, binding, vnode) {

  },
  componentUpdated: function (el, binding, vnode) {
          const Adaptive=function(){
              let winH=window.innerHeight;
              let top = el.getBoundingClientRect().top;
              let bottom = 58;//winH - el.getBoundingClientRect().bottom;
              let result = winH- top - bottom;
              var tableid = vnode.data.attrs['id'];
              if(tableid == 'modalTable'){ //弹窗上的表格
                vnode.child.tableHeight = result - 80;
              }else if(tableid == 'nopageTable'){ //没有分页的表格
                vnode.child.tableHeight = result + 50;
              }else if(tableid == 'dlTable'){ //表格加编辑功能
                binding.value.context.tableHeight = winH - top - 80
              }else if(tableid == 'modalGrsdsHeight' || tableid == 'modalQysdsHeight' || tableid == 'modalTyHeight'){
                vnode.child.tableHeight = 240
              }else{
                vnode.child.tableHeight = result;
              }
              
          }
          if(typeof Adaptive === "function"){
            Adaptive();
            window.removeEventListener("resize", Adaptive)
            window.addEventListener("resize",Adaptive);
            var searchHigh = document.getElementById('searchHigh');
            if(searchHigh){
               searchHigh.addEventListener('click',Adaptive)
            }
          }
  },
  unbind: function () {
    if(typeof Adaptive === "function"){
      window.removeEventListener("resize", Adaptive)
    }
  }
},

}


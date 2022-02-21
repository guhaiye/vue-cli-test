
import lazyLoading from './lazyLoading'

export default (routers,data) => {
  generaMenu(routers,data)
}
function generaMenu(routers,data){
  data.forEach((item)=>{
    let menu = Object.assign({},item)
    let menujson = lazyLoading(menu.component);
    menu.component = menujson;
    if(item.children != undefined){
      menu.children = []
      generaMenu(menu.children,item.children)
    }
    routers.push(menu)
  })
}
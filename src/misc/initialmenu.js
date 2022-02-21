export const  initialMenu = [
  {title:'用户密码修改',id:'45',component: "userpassword",path:'/cas/userpassword',icon:'ioss-home','showcode':'20201070','funccode':'20201070','nodetype':0,parentId:'-2',level: 1,ishidden: true,meta:{'currentid':'-2','title':'用户密码修改'}},
  {title:'用户个人信息',id:'48',component: "usermessage",path:'/cas/usermessage/:id',icon:'ioss-home','showcode':'20201080','funccode':'20201080','nodetype':0,parentId:'-2',level: 1,ishidden: true,meta:{'currentid':'-2','title':'用户个人信息'}},
  {title:'个人首页配置',id:'49',component: "personalhomeconfig",path:'/cas/personalhomeconfig',icon:'ioss-home','showcode':'20201090','funccode':'20201090','nodetype':0,parentId:'-2',level: 1,ishidden: true,meta:{'currentid':'-2','title':'个人首页配置'}},
  {title:'个人首页配置修改',id:'50',component: "personalhomeconfigModify",path:'/cas/personalhomeconfigModify/:name',icon:'ioss-home','showcode':'2020109010','funccode':'2020109010','nodetype':0,parentId:'-2',level: 1,ishidden: true,meta:{'currentid':'-2','title':'个人首页配置修改'}},
]

export const allnoAuthMenu = [{
  path: '/',
  'redirect': '/index',
  title: '首页'
},
{
  path: '/403',
  title: '403',
  // component: 'error-403
  component: 'noPermission'
},
{
  path: '/404',
  title: '404',
  component: 'error-404'
},
{
  path: '/noPermission',
  title: 'noPermission',
  component: 'noPermission'
},
// {path: '/404', title:'404',component:'error-404'},
{
  path: '*',
  redirect: '/404',
  component: 'error-404'
  // component: 'noPermission'
}
]
import Vue from 'vue';
import VueRouter from 'vue-router';
// import Login from '../views/Login.vue';

const Login = ()=>
    import ('../views/Login')
const Main = ()=>
    import ('../views/Main')

const CategoryEdit = ()=>
    import ('../views/CategoryEdit')
const CategoryList = ()=>
    import ('../views/CategoryList')

const ItemEdit =() => 
    import ('../views/ItemEdit')    
const ItemList =() => 
    import ('../views/ItemList')  

const FindEdit =() => 
    import ('../views/FindEdit')    
const FindList =() => 
    import ('../views/FindList')    

const LostEdit =() => 
    import ('../views/LostEdit')    
const LostList =() => 
    import ('../views/LostList')         

const AdminUserEdit =() => 
    import ('../views/AdminUserEdit')    
const AdminUserList =() => 
    import ('../views/AdminUserList')         
    

Vue.use(VueRouter);

const routes = [
  {path:'/login',name:'login',component:Login,meta:{ isPublic:true}},
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/categories/create',component:CategoryEdit},
      {path:'/categories/edit/:id',component:CategoryEdit,props:true},
      {path:'/categories/list',component:CategoryList},

      {path:'/items/create',component:ItemEdit},
      {path:'/items/edit/:id',component:ItemEdit,props:true},
      {path:'/items/list',component:ItemList},

      {path:'/finds/create',component:FindEdit},
      {path:'/finds/edit/:id',component:FindEdit,props:true},
      {path:'/finds/list',component:FindList},

      {path:'/losts/create',component:LostEdit},
      {path:'/losts/edit/:id',component:LostEdit,props:true},
      {path:'/losts/list',component:LostList},

      {path:'/admin_users/create',component:AdminUserEdit},
      {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true},
      {path:'/admin_users/list',component:AdminUserList},


    ]
  },

];

const router = new VueRouter({
  routes,
});

router.beforeEach((to,from,next) => {
    // console.log(to.meta)
    //无论进入哪一歌路由都要看有没有localStorage 和 isPublic
    if(!to.meta.isPublic && !localStorage.token){
        return next('/login')
        // console.log('need login')
    }
    next()
})

export default router;

<template>
    <div>
<el-container style="height: 100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router  unique-opened :defaults-active="$route.path">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>
          <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/items/create">新建物品</el-menu-item>
          <el-menu-item index="/items/list">物品列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>失物招领</template>
        <el-menu-item-group>
          <template slot="title">失物</template>
           <el-menu-item index="/losts/create">新建失物</el-menu-item>
          <el-menu-item index="/losts/list">失物列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">招领</template>
           <el-menu-item index="/finds/create">新建招领</el-menu-item>
          <el-menu-item index="/finds/list">招领列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
        <el-menu-item-group>
          <template slot="title">管理员</template>
          <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
          <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
           <!-- <span>欢迎来到Mia的校园失物招领管理后台</span> -->
      <!-- <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <!-- <span>Admin</span> -->
      <el-button type="danger" @click.prevent="loginOut">退出登录</el-button>
    </el-header>
    
    <el-main>
  
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>


        
    </div>
</template>


<script>
  export default {
      name:'Main',
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods: {
      loginOut(){
            //退出功能
            //弹出确认对话框
            //用户点击确认，跳回用户登录页面，清除token
                this.$confirm('确定要退出登录吗?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                  }).then(() => {
                    this.$message({
                       type: 'success',
                       message: '退出成功!'
                     });
                     //确认退出，清除token
                     localStorage.removeItem('token')
                     //跳转登录页面(编程式导航)
                     this.$router.push('/login')

                }).catch(() => {
              this.$message({
               type: 'info',
               message: '已取消退出'
          });          
        });
      }
    },
  };
</script>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
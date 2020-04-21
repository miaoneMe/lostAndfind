<template>
  <div>
   <h1>分类列表</h1>
   <el-table :data="items">
    <el-table-column prop="_id" label="ID" width="230"></el-table-column>
    <el-table-column prop="user" label="用户"></el-table-column>
    <el-table-column prop="name" label="物品名称"></el-table-column>
    <el-table-column prop="time" label="时间"></el-table-column>
    <el-table-column prop="region" label="地点"></el-table-column>
    <el-table-column prop="classify" label="类别"></el-table-column>
        <el-table-column prop="tel" label="联系方式"></el-table-column>
    <el-table-column prop="img" label="图标">
        <template slot-scope="scope">
             <img :src="scope.row.img" style="height:3rem;" alt="">
        </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="primary" size="small" 
        @click="$router.push(`/losts/edit/${scope.row._id}`)">编辑</el-button>
     <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
     
     </el-table>

  </div>
</template>

<script>
export default {
  name:'LostList',
  components: {

  },
  data() {
    return {
     items:[],
    }
  },
  methods: {
      async fetch(){
          const res = await this.$http.get('rest/losts')
          this.items = res.data
        //   console.log(res.data)
      },
      async remove(row) {
          this.$confirm(`是否确定删除分类, "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
         const res = await this.$http.delete(`rest/losts/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
      }   
      },
   created() {
       this.fetch()
   },
}
</script>

<style scoped>

</style>

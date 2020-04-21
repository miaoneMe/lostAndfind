<template>
  <div>
    <h1>{{id ? '编辑': '新建'}}失物</h1>
   <el-form  label-width="120px" @submit.native.prevent="save" >
      <el-form-item label="丢失物品名">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="丢失区域" prop="region">
        <el-select v-model="model.region" placeholder="请选择丢失区域">
            <el-option label="一教" value="一教"></el-option>
            <el-option label="二教" value="二教"></el-option>
            <el-option label="一食堂" value="一食堂"></el-option>
            <el-option label="二食堂" value="二食堂"></el-option>
            <el-option label="图书馆" value="图书馆"></el-option>
        </el-select>
        </el-form-item>
            <el-form-item label="丢失物品类型" prop="classify">
               <el-select v-model="model.classify" placeholder="请选择丢失物品类型">
                 <el-option label="日用品" value="日用品"></el-option>
                 <el-option label="电子用品" value="电子用品"></el-option>
                 <el-option label="学习用品" value="学习用品"></el-option>
               </el-select>
         </el-form-item>
          <el-form-item label="丢失时间" required>
          <el-col :span="11">
             <el-form-item prop="time">
              <el-date-picker type="date" placeholder="选择日期" v-model="model.time" style="width: 100%;"></el-date-picker>
             </el-form-item>
             </el-col>
          </el-form-item>
          <el-form-item label="描述丢失的物品" prop="desc">
              <el-input type="textarea" v-model="model.desc"></el-input>
           </el-form-item>
         <el-form-item label="联系方式" prop="tel">
           <el-input v-model="model.tel"></el-input>
         </el-form-item>
        <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'" 
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.img" :src="model.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'LostEdit',
  props:{
      id:{}
  },
  data() {
    return {
      model:{},
      parents:[],
    }
  },
  methods: {
      afterUpload(res){
      //  console.log(res)
      //显示赋值
       this.$set(this.model,'img',res.url)
    //    this.model.icon = res.url
      },
   async save(){
       let res 
       if(this.id) {
         res = await this.$http.put(`rest/losts/${this.id}`,this.model)
          // console.log(111);
          // console.log(res)
       }else {
          res = await this.$http.post('rest/losts',this.model)
       }
        this.$router.push('/losts/list')
        this.$message({
            type:'success',
            message:'保存成功'
        })
     },
    async fetch() {
        const res = await this.$http.get(`rest/losts/${this.id}`)
        this.model = res.data
    },
  },
  created(){
      this.id && this.fetch()
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

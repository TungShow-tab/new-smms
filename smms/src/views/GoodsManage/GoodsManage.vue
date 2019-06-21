<template>
    
    <div class="goods-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">商品管理</span>
      </div>
      <div class="text item">
        <el-form :model="searchForm" label-width="80px">
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-form-item label="选择分类:">
                  <el-select v-model="searchForm.classify" placeholder="---选择分类---">
                    <el-option label="饮料冲调" value="饮料冲调"></el-option>
                    <el-option label="休闲食品" value="休闲食品"></el-option>
                    <el-option label="家居日用" value="家居日用"></el-option>
                    <el-option label="粮油调味" value="粮油调味"></el-option>
                    <el-option label="美容护理" value="美容护理"></el-option>
                    <el-option label="电子数码" value="电子数码"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">
                <el-form-item label="关键字：">
                  <el-input v-model="searchForm.keyword"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">
                <el-button type="success" round @click="search()">查询</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table :data="goodsInfor" stripe style="width: 100%">
        <el-table-column prop="code" label="商品条形码" width="180"></el-table-column>
        <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="classify" label="所属分类"></el-table-column>
        <el-table-column prop="price" label="售价(元)" width="180"></el-table-column>
        <el-table-column prop="salesprice" label="促销价(元)" width="180"></el-table-column>
        <el-table-column prop="vendibility" label="市场价(元)"></el-table-column>
        <el-table-column prop="quantity" label="库存" width="180"></el-table-column>
        <el-table-column prop="totalinventory" label="库存总额(元)" width="180"></el-table-column>
        <el-table-column prop="totalsales" label="销售总额(元)"></el-table-column>
        <el-table-column prop="manage" label="管理">
          <template slot-scope="scope">
            <el-button type="button" size="mini" @click="handleEdit(scope.row.id)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 3, 5, 10, 20, 50]"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
    import moment from "moment";
    export default {
  data() {
    return {
      searchForm: {
        classify: "",
        keyword: ""
      },
      goodsInfor: [
       
      ],
      editid: "",
      total: 5,
      currentPage: 1, // 当前页
      pageSize: 3
    };
  },
  created() {
    this.getGoodsList();
    this.getGoodsListByPage();
  },
   methods: {
    getGoodsList() {
      this.axios
        .get("http://172.16.12.238:5555/goods/goodsmanagment")
        .then(response => {
          this.goodsInfor = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页
    getGoodsListByPage() {
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      this.axios
        .get("http://172.16.12.238:5555/goods/goodslistbypage", {
          params: {
            pageSize,
            currentPage
          }
        })
        .then(response => {
          let { total, data } = response.data;
          this.total = total;
          this.goodsInfor = data;
          if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.getGoodsListByPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getGoodsListByPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoodsListByPage();
    },
    //编辑
    handleEdit(id) {
      this.editid = id;
      this.$router.push({ name: "GoodsAdd", params: { id } });
    },
    //删除
    handleDelete(id) {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`http://172.16.12.238:5555/goods/goodsdelete?id=${id}`)
            .then(response => {
              let { error_code, reason } = response.data;
              // 根据后端响应的数据判断
              if (error_code === 0) {
                this.getGoodsListByPage();
                // 弹出成功的提示
                this.$message({
                  type: "success",
                  message: reason
                });
              } else {
                this.$message.error(reason);
              }
            });
        })
        .catch(err => {
          // 弹出成功的提示
          this.$message({
            type: "info",
            message: "删除取消"
          });
        });
    },
    search(){
      let classify = this.searchForm.classify;
      let keyword = this.searchForm.keyword;
      this.axios.get("http://172.16.12.238:5555/goods/search", {
        params: {
          classify,
          keyword
        }
      }).then(response=>{
        this.goodsInfor=response.data;
      }).catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>

<style lang=less>
@import url("./GoodsManage.less");
</style>

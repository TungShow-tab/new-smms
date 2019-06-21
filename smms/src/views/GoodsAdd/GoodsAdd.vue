<template>
    
    <div class="goods-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">添加商品</span>
      </div>
      <div class="text item">
        <el-form ref="goodsForm" :model="goodsForm" label-width="80px" :rules="rules" status-icon >
          <el-form-item label="所属分类：" prop="classify">
            <el-select v-model="goodsForm.classify" placeholder="---选择分类---">
              <el-option label="饮料冲调" value="饮料冲调"></el-option>
              <el-option label="休闲食品" value="休闲食品"></el-option>
              <el-option label="家居日用" value="家居日用"></el-option>
              <el-option label="粮油调味" value="粮油调味"></el-option>
              <el-option label="美容护理" value="美容护理"></el-option>
              <el-option label="电子数码" value="电子数码"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品条形码：" prop="code">
            <el-input v-model="goodsForm.code" autocomplete="off"></el-input>
            <el-button type="success" @click="createCode()">生成条形码</el-button>
          </el-form-item>
          <el-form-item label="商品名称：" prop="goodsname">
            <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品售价：" prop="price">
            <el-input v-model="goodsForm.price" autocomplete="off"></el-input>元
          </el-form-item>
          <el-form-item label="市场价：" prop="vendibility">
            <el-input v-model="goodsForm.vendibility" autocomplete="off"></el-input>元
            <div class="notify">默认市场价为售价的1.2倍</div>
          </el-form-item>
          <el-form-item label="商品进价：" prop="purchase">
            <el-input v-model="goodsForm.purchase" autocomplete="off" @blur="autoPrice"></el-input>元
          </el-form-item>
          <el-form-item label="入库数量：" prop="quantity">
            <el-input v-model="goodsForm.quantity" autocomplete="off"></el-input>
            <div class="notify">计量商品单位为千克</div>
          </el-form-item>
          <el-form-item label="商品重量：" prop="weight">
            <el-input v-model="goodsForm.weight" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品单位：" prop="units">
            <el-input v-model="goodsForm.units" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会员优惠：" prop="offer">
            <el-radio-group v-model="goodsForm.offer" autocomplete="off">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否促销：" prop="sales">
            <el-radio-group v-model="goodsForm.sales" autocomplete="off">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>

          </el-form-item>
           <el-form-item label="促销价：" prop="salesprice">
            <el-input v-model="goodsForm.salesprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="库存总额：" prop="totalsales">
            <el-input v-model="goodsForm.totalsales" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="销售总额：" prop="totalinventory">
            <el-input v-model="goodsForm.totalinventory" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品简介：" prop="description">
            <el-input type="textarea" v-model="goodsForm.description"></el-input>
            <div class="notify">不超过200汉字</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addGoods('goodsForm')">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
import moment from "moment";
    export default {
  data() {
    const checkNum = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        let patrn = /^\d+(\.\d+)?$/;
        if (!patrn.test(value)) {
          callback(new Error("格式必须为数字"));
        }
        callback();
      }
    };
    const checkLen = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (value.length > 200) {
        callback(new Error("不超过200汉字"));
      }
      callback();
    };
    return {
      goodsForm: {
        classify: "",
        code: "",
        goodsname: "",
        price: "",
        salesprice:"",
        vendibility: "",
        totalsales:"",
        totalinventory:"",
        purchase: "",
        quantity: "",
        weight: "",
        units: "",
        offer: "",
        sales: "",
        description: ""
      },
      rules: {
        classify: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入商品条形码", trigger: "change" }
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { required: true, validator: checkNum, trigger: "blur" }
        ],
        vendibility: [
          { required: false, validator: checkNum, trigger: "blur" }
        ],
        purchase: [{ required: false, validator: checkNum, trigger: "blur" }],
        quantity: [{ required: false, validator: checkNum, trigger: "blur" }],
        weight: [{ required: false, validator: checkNum, trigger: "blur" }],

        description: [{ max: 400, message: "不超过200汉字", trigger: "blur" }]
      }
    };
  },
   methods: {
      autoPrice() {
            this.goodsForm.vendibility =  (parseFloat(this.goodsForm.price) * 1.5).toFixed(2)
            this.goodsForm.purchase =  (parseFloat(this.goodsForm.price)  * 0.8).toFixed(2)
            this.goodsForm.totalinventory =  ((this.goodsForm.price)  * 0.5).toFixed(2)
            this.goodsForm.totalsales =  (parseFloat(this.goodsForm.price) * 10)
            this.goodsForm.salesprice =  (parseFloat(this.goodsForm.price) * 52)
        },
    addGoods(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.$route.params.id)
        if (valid) {
          let params = {
            classify: this.goodsForm.classify,
            code: this.goodsForm.code,
            goodsname: this.goodsForm.goodsname,
            price: this.goodsForm.price,
            vendibility: this.goodsForm.vendibility,
            purchase: this.goodsForm.purchase,
            quantity: this.goodsForm.quantity,
            weight: this.goodsForm.weight,
            units: this.goodsForm.units,
            offer: this.goodsForm.offer,
            salesprice:this.goodsForm.salesprice,
            totalsales:this.goodsForm.totalsales,
            sales: this.goodsForm.sales,
            description: this.goodsForm.description,
            totalinventory:this.goodsForm.totalinventory,
            id: this.$route.params.id
          };
          this.axios
            .post("http://172.16.12.238:5555/goods/savegoods", qs.stringify(params))
            .then(response => {
              let { error_code, reason } = response.data;

              // 根据后端响应的数据判断
              if (error_code === 0) {
                // 弹出成功的提示
                this.$message({
                  type: "success",
                  message: reason
                });

                // 跳转到账号管理列表
                this.$router.push("/home/goodsmanage");
              } else {
                // 弹出失败的提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    createCode() {
      var Num = "";
      for (var i = 0; i < 7; i++) {
        Num += Math.floor(Math.random() * 10);
      }
      this.goodsForm.code = Num;
    },
    // saveGoods(id){
    //   let params = {
    //         classify: this.goodsForm.classify,
    //         code: this.goodsForm.code,
    //         goodsname: this.goodsForm.goodsname,
    //         price: this.goodsForm.price,
    //         vendibility: this.goodsForm.vendibility,
    //         purchase: this.goodsForm.purchase,
    //         quantity: this.goodsForm.quantity,
    //         weight: this.goodsForm.weight,
    //         units: this.goodsForm.units,
    //         offer: this.goodsForm.offer,
    //         sales: this.goodsForm.sales,
    //         description: this.goodsForm.description,
    //         id: id
    //       };
    //       this.axios
    //         .post("http://172.16.12.238:5555/goods/savegoods", qs.stringify(params))
    //         .then(response => {
    //           let { error_code, reason } = response.data;

    //           // 根据后端响应的数据判断
    //           if (error_code === 0) {
    //             // 弹出成功的提示
    //             this.$message({
    //               type: "success",
    //               message: reason
    //             });

    //             // 跳转到账号管理列表
    //             this.$router.push("/goodsmanagement");
    //           } else {
    //             // 弹出失败的提示
    //             this.$message.error(reason);
    //           }
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });
    // },
    getGoodsList(id) {
      this.axios
        .get(`http://172.16.12.238:5555/goods/goodslist?id=${id}`)
        .then(response => {
          this.goodsForm = response.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      this.getGoodsList(id);
    }
  }
};
</script>

<style lang=less>
@import url("./GoodsAdd.less");
</style>

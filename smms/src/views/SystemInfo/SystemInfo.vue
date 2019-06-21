<template>
    <div class="home">
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>基建信息</span>
                </div>
                <div class="text item">
                    <el-alert
                            title="贵金属订单总数：50 ，已销售总金额：15000，库存商品总价：25000.00"
                            type="info"
                            show-icon>
                    </el-alert>
                    <el-alert
                            title="导入数据"
                            type="success"
                            show-icon>
                    </el-alert>
                    <!--左右表格-->
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <!--左侧-->
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>销售排行</span>
                                </div>
                                <el-table
                                        :data="saleData"
                                        style="width: 100%"
                                        :row-class-name="tableRowClassName"
                                >
                                    <!--商品名称-->
                                    <el-table-column
                                            prop="producesName"
                                            label="商品名称"
                                    >
                                    </el-table-column>
                                    <!--销量-->
                                    <el-table-column
                                            prop="saleCount"
                                            label="销量"
                                    >
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>

                        <el-col :span="12">
                            <!--右侧-->
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>获取订单</span>
                                </div>
                                <el-table
                                        :data="saleoutData"
                                        style="width: 100%"
                                        :row-class-name="tableRowClassName">
                                    <!--商品名称-->
                                    <el-table-column
                                            prop="producesName"
                                            label="订单类型"
                                    >
                                    </el-table-column>
                                    <!--销量-->
                                    <el-table-column
                                            prop="repertoryCount"
                                            label="库存"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            prop="saleOut"
                                            label="操作"
                                    >
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-main>
    </div>


</template>
<script>

    export default {
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        },
        data() {
            return {
                saleData: [
                    {
                        producesName:"龙门币",
                        saleCount:10
                    },
                    {
                        producesName:"源石",
                        saleCount:80
                    },
                    {
                        producesName:"聚酸酯",
                        saleCount:15
                    },
                    {
                        producesName:"聚糖块",
                        saleCount:50
                    },
                    {
                        producesName:"固源岩",
                        saleCount:5
                    },
                ],
                saleoutData:[
                    {
                        producesName:"赤金订单",
                        repertoryCount:0,
                        saleOut:"入库"
                    },
                    {
                        producesName:"源石订单",
                        repertoryCount:0,
                        saleOut:"入库"
                    },
                    {
                        producesName:"碳素",
                        repertoryCount:0,
                        saleOut:"入库"
                    },
                ]
            }
        }
    }
</script>
<style lang="less">
@import url("./SystemInfo.less");
</style>
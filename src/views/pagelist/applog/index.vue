<template>
  <d2-container>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>日志信息</span>
        </div>
        <div class="text item">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="医院编号">
                    <!--   <el-cascader placeholder="输入编号或名称" :options="customerNameoptions" v-model="searchForm.hosCode" filterable> </el-cascader>-->
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="">
                            <el-cascader placeholder="输入编号或名称" :options="hosNamelist" v-model="searchForm.hosCode" filterable>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input placeholder="或者输入医院编号" v-model="searchForm.hosCode">{{searchForm.hosCode}}</el-input>
                        </el-form-item>
                    </el-form>
                </el-form-item>
                <el-form-item label="华银条码">
                    <el-input v-model="searchForm.barCode"></el-input>
                </el-form-item>
                <el-form-item label="医院条码">
                    <el-input v-model="searchForm.hospitalNumber"></el-input>
                </el-form-item>
                <el-form-item label="程序类型">
                    <el-select v-model="searchForm.appType">
                        <el-option v-for="item in appTypeEnum" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消息状态">
                    <el-select v-model="searchForm.msgStatus">
                        <el-option v-for="item in msgStatusEnum" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容查找">
                    <el-input v-model="searchForm.msgContent"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="block">
                        <span class="demonstration">时间范围</span>
                        <el-date-picker type="datetimerange" align="right" v-model="searchForm.startDateAndEndDate" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"> </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="clicksearchResult">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>

    <el-table :row-class-name="tableRowClassName" :data="DataList.TableData" v-loading="TableDataLoading" highlight-current-row height="580" style="width: 100%" :row-style="{ height: '8px' }" :cell-style="{ padding: '5px 0' }" :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <el-table-column label="医院编号" width="120">
            <template slot-scope="scope">
                <span>{{ scope.row.HosCode }}</span>
            </template>
        </el-table-column>
        <el-table-column label="华银条码" width="120">
            <template slot-scope="scope">
                <span>{{ scope.row.Barcode }}</span>
            </template>
        </el-table-column>
        <el-table-column label="医院条码" width="120">
            <template slot-scope="scope">
                <el-label>{{ scope.row.HospitalNumber }}</el-label>
            </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
            <template slot-scope="scope">
                <el-label>{{ scope.row.Status==0?"正常":"异常" }}</el-label>
            </template>
        </el-table-column>
        <el-table-column label="程序类型" width="120">
            <template slot-scope="scope">
                <el-label>{{ scope.row.AppType==1?"录单程序":(scope.row.AppType==2?"回传程序":"其他") }}</el-label>
            </template>
        </el-table-column>
        <el-table-column label="消息正文" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <el-label>{{ scope.row.LogMsg }}</el-label>
            </template>
        </el-table-column>
        <el-table-column label="请求内容" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <el-label>{{ scope.row.LogRequestValue }}</el-label>
            </template>
        </el-table-column>
        <el-table-column label="返回内容" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <el-label>{{ scope.row.LogResponseValue }}</el-label>
            </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200">
            <template slot-scope="scope">
                <el-label>{{ scope.row.CreateAt }}</el-label>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[15, 20, 50, 10000]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="DataList.total"> </el-pagination>
</d2-container>
</template>

<script>
import $ from "jquery";
import util from '@/utils/table.js'
export default {
    data() {
        return {
            searchForm: {
                hosCode: "",
                barCode: "",
                hospitalNumber: "",
                appType: 0,
                msgStatus: 999,
                msgContent: "",
                startDate: "",
                endDate: ""
            },
            appTypeEnum: [{
                    value: 0,
                    label: "所有",
                }, {
                    value: 1,
                    label: "录单程序",
                },
                {
                    value: 2,
                    label: "回传程序",
                },
            ],
            msgStatusEnum: [{
                    value: 999,
                    label: "所有",
                }, {
                    value: 0,
                    label: "正常",
                },
                {
                    value: -1,
                    label: "异常",
                },
            ],
            hosNamelist: [],
            DataList: {
                TableData: [],
                currentPage: 1,
                pageSize: 15,
                total: 0
            },
            TableDataLoading: false
        };
    },
    mounted() {
        this.gethosNamelist();
    },
    methods: {
        gethosNamelist() {
            var self = this;
            $.post(
                process.env.VUE_APP_API + "/api/user/gethosnamelist", {
                    keyword: ""
                },
                function (response) {
                    if (response.code == 0) {
                        console.log(response);
                        response.data.records.forEach(function (item, index, arr) {
                            self.hosNamelist.push({
                                label: item.codeNo + " | " + item.checkHospitalName,
                                value: item.codeNo
                            });
                        });
                    }
                },
                "json"
            );
        },
        clicksearchResult() {
            this.DataList.currentPage = 1;
            this.searchResult();
        },
        searchResult() {
            var self = this;
            this.TableDataLoading = true;
            if (this.searchForm.startDateAndEndDate != null) {
                this.searchForm.startDate = util.formatDate.format(this.searchForm.startDateAndEndDate[0], 'yyyy-MM-dd hh:mm:ss');
                this.searchForm.endDate = util.formatDate.format(this.searchForm.startDateAndEndDate[1], 'yyyy-MM-dd hh:mm:ss');
            } else {
                this.searchForm.startDate = "";
                this.searchForm.endDate = "";
            }

            $.post(
                process.env.VUE_APP_API + "/api/logging/getpagelist", {
                    PageIndex: this.DataList.currentPage,
                    PageSize: this.DataList.pageSize,
                    HosCode: this.searchForm.hosCode,
                    BarCode: this.searchForm.barCode,
                    HospitalNumber: this.searchForm.hospitalNumber,
                    AppType: this.searchForm.appType,
                    Status: this.searchForm.msgStatus,
                    StartDate: this.searchForm.startDate,
                    EndDate: this.searchForm.endDate,
                    MsgContent: this.searchForm.msgContent
                },
                function (response) {
                    if (response.code == 0) {
                        self.DataList.TableData = response.data.Records;
                        self.DataList.total = response.data.Total;

                    }
                    self.TableDataLoading = false;
                },
                "json"
            );
        },
        handleSizeChange(val) {
            this.DataList.pageSize = val;
            this.searchResult();
        },
        handleCurrentChange(val) {
            this.DataList.currentPage = val;
            this.searchResult();
        },

    },
};
</script>

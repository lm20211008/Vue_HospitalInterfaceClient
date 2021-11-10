<template>
<d2-container>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>日志信息</span>
        </div>
        <div class="text item">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="医院编号">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="">
                            <el-cascader placeholder="输入编号或名称" :options="hosNameList" v-model="searchForm.hosCode" filterable></el-cascader>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input v-model="searchForm.hoscode" placeholder="或输入医院编号">{{searchForm.hosCode}}</el-input>
                        </el-form-item>
                    </el-form>
                </el-form-item>
                <el-form-item label="华银条码">
                    <el-input v-model="searchForm.barcode"></el-input>
                </el-form-item>
                <el-form-item label="医院条码">
                    <el-input v-model="searchForm.hospitalNumber"></el-input>
                </el-form-item>
                <el-form-item label="程序类型">
                    <el-select v-model="searchForm.appType">
                        <el-option v-for="item in appTypeEnum" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="医院条码">
                    {{info}}
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</d2-container>
</template>

<script>
import $ from "jquery";
import util from '@/utils/table.js'
import axios from 'axios';
import {
    response
} from '@/api/tools';
export default {
    data() {
        return {
            searchForm: {
                hoscode: "",
                barcode: "",
                hospitalNumber: "",
                appType: 0,
                msgStatus: 888,
                msgContent: "",
                startDate: "",
                endDate: ""
            },
            appTypeEnum: [{
                    value: 0,
                    label: "所有"
                },
                {
                    value: 1,
                    label: "录单程序"
                },
                {
                    value: 2,
                    label: "回传程序"
                },
            ],
            hosNameList: [],
            info: [],
        }
    },
    mounted() {
        this.gethosNamelist();
    },
    methods: {
        gethosNamelist() {
            var self = this;
            axios.post("http://wwhispc.huayinlab.com:8078//api/user/gethosnamelist")
                .then((response) => {
                    self.info = response,
                        console.log('输出数据：' + response.data.code),
                        response.data.data.records.forEach(element => {
                            self.hosNameList.push({
                                label: element.codeNo + "|" + element.checkHospitalName,
                                value: element.codeNo
                            })
                        });
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });

            //       $.post(
            //          process.env.VUE_APP_API +"/api/user/gethosnamelist",{
            //            keyword:""
            //          },
            //          function(response){
            //            if(response.code == 0){
            //              console.log(response);
            //              response.data.records.forEach(element => {
            //                self.hosNameList.push({
            //                  label: element.codeNo + "|" + element.checkHospitalName,
            //                  value: element.codeNo
            //                });
            //              });
            //            }
            //          },
            //        )
        }
    },

};
</script>

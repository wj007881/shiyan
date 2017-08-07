<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 教师</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="tableData"  border style="width: 100%">
            <el-table-column prop="code" label="工号">
            </el-table-column>
            <el-table-column prop="password" label="登录密码">
            </el-table-column>
            <el-table-column prop="displayName" label="教师姓名">
            </el-table-column>
            <el-table-column prop="email" label="电子邮件">
            </el-table-column>
            <el-table-column label="操作" >
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </br>
          <div class="add">
    <el-upload
        class="upload-demo"
        ref="upload"
        action="http://172.16.186.93:3000/excle"
        :auto-upload="false"
        :show-file-list='false'
        :data=form>
        <el-button slot="trigger" size="small" type="primary">导入</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认</el-button>
        </el-upload>
          </div>
    </div>
</template>

<script>
    export default {
        data() {
            return { 
                form:{"co":5},            
                tableData:[],
            }
        },
              methods: {         
            handleEdit: function() {
              
            },
            handleDelete:function() {
               
            },
                  submitUpload() {
        this.$refs.upload.submit();
    }
        },

        mounted(){
            const self = this;
           self.$axios.get('http://172.16.186.93:3000/db/teachers')
                .then((response)  =>{
                    self.tableData = response.data;
                });
           self.$axios.get('http://172.16.186.93:3000/setup')
                .then((response)  =>{
                    console.log(response)
                    });
        }
    }
</script>



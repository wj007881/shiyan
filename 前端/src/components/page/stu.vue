<template>
    <div id="stu">
        <el-upload
        class="upload-demo"
        ref="upload"
        action="http://172.16.186.93:3000/excle"
        :auto-upload="false"
        :show-file-list='false'
        :data="form">
        <el-button slot="trigger" size="small" type="primary">导入学生</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认</el-button>
        </el-upload>
        <br>
        <template>
  <el-table
    :data="tableData5"
    max-height="400"
    border
    style="width: 560px;">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="code"
      label="学号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="displayName"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="电子邮件"
      >
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button  type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, tableData5)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        form:{
          "code":this.$store.state.checkid,
          "co":"2"
        },
          tableData3: [],
          tableData4: [],
          tableData5: []
      };
    },
    methods: {
        deleteRow(index, rows) {
        this.tableData3.splice(index, 1);
      },
      submitUpload() {
        this.$refs.upload.submit();

          this.$axios.get('http://172.16.186.93:3000/db/Techers')
  .then((response) => {

    for(var x in response.data){
     if(this.$store.state.check==response.data[x].kechengID){
     this.tableData3.push(response.data[x])
     /*this.tableData4.push(response.data[x].shiyanfabu[0])*/
    };
   };
    for( var i in this.tableData3 ){
       this.tableData4.push(this.tableData3[i].class)
     };
     for( var k=0;k<this.tableData4[0].length;k++){
       let o =0;
       this.tableData5.push(this.tableData4[o][k])
     };               
     })
  .catch(function (error) {
    console.log(error);});
      }
    },


    mounted(){
  this.$axios.get('http://172.16.186.93:3000/db/Techers')
  .then((response) => {

    for(var x in response.data){
     if(this.$store.state.check==response.data[x].kechengID){
     this.tableData3.push(response.data[x])
     /*this.tableData4.push(response.data[x].shiyanfabu[0])*/
    };
   };
    for( var i in this.tableData3 ){
       this.tableData4.push(this.tableData3[i].class)
     };
     for( var k=0;k<this.tableData4[0].length;k++){
       let o =0;
       this.tableData5.push(this.tableData4[o][k])
     };               
     })
  .catch(function (error) {
    console.log(error);});
      }
  }
</script>
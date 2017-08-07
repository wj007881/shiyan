<template>
    <div>
  <el-select v-model="value" placeholder="请选择课程" @change="aaa123()">
    <el-option
      v-for="item in options1"
      :key="item.kechengID"
      :label="item.kechengID"
      :value="item.kechengID">
    </el-option>
  </el-select>
    <br><br>
  <template>
  <el-table
    :data="tableData5"
    max-height="400"
    border
    style="width: 650px">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="code"
      label="学号"
      width="110">
    </el-table-column>
    <el-table-column
      prop="displayName"
      label="姓名">
    </el-table-column>
        <el-table-column
      prop="email"
      label="电子邮件"
      width="110">
    </el-table-column>
    <el-table-column
      prop="sj"
      label="上交状态">
    </el-table-column>
  </el-table>
  </template>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        value:{},
        value1:{},
          options1:[],
          options:[{"shiyan":"实验一"},{"shiyan":"实验二"},{"shiyan":"实验三"},{"shiyan":"实验四"},{"shiyan":"实验五"},{"shiyan":"实验六"}],
          tableData3: [],
          tableData4:[],
          tableData5:[],
      }
    },
    methods:{
      aaa123(){
        let a2;
             for(var x in this.options1){
                 var a1=this.options1[x].kechengID
                     if(this.value==a1){
                       a2=x;
                       this.tableData4.push(this.options1[x].class)
                     };
             };
                 
for( var k=0;k<this.tableData4.length;k++){
                       for( var j=0;j<this.tableData4[k].length;j++){
                       this.tableData5.push(this.tableData4[k][j])
                       }
                     };  




           },
    },
    mounted(){
  this.$axios.get('http://172.16.186.93:3000/db/Techers')
  .then((response) => {

                   for(var x in response.data){
                     if(this.$store.state.loginID==response.data[x].code){
                     this.options1.push(response.data[x])
                     /*this.tableData4.push(response.data[x].shiyanfabu[0])*/
                    };
                   };


                          
  })
  .catch(function (error) {
    console.log(error);
  });
      }
  }
  </script>
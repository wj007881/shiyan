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
    <el-select v-model="value1" placeholder="请选择实验"   @change="bbb123()"     >
        <el-option
        v-for="item1 in options"
        :key="item1.value"
        :label="item1.shiyan"
        :value="item1.shiyan">
        </el-option>
    </el-select>
    <br><br>
   <template>
  <el-table
    :data="tableData7"
    max-height="400"
    border
    style="width: 600px">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="_id"
      label="报告id"
      >
    </el-table-column>
    <el-table-column
      prop="baogao"
      label="报告名称"
      >
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
     >
      <template scope="scope">
        <el-button type="text" size="small" @click="download((scope.$index, scope.row))">下载</el-button>
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
        value:{},
        value1:{},
          options1:[],
          options:[{"shiyan":"实验一"},{"shiyan":"实验二"},{"shiyan":"实验三"},{"shiyan":"实验四"},{"shiyan":"实验五"},{"shiyan":"实验六"}],
          tableData3: [],
          tableData4:[],
          tableData5:[],
          tableData6:[],
          tableData7:[],
      }
    },
    methods:{
      aaa123(){

   let a2;
             for(var x in this.options1){
                 var a1=this.options1[x].kechengID
                     if(this.value==a1){
                       a2=x;
                       this.tableData4.push(this.options1[x].shiyanbaogao)
                     };
             };
            
                    for( var k=0;k<this.tableData4.length;k++){
                       for( var j=0;j<this.tableData4[k].length;j++){
                       this.tableData5.push(this.tableData4[k][j])
                       }
                     };  

           },
           bbb123(){
           let a2;
             for(var x in this.tableData5){
                 var a1=this.tableData5[x].fabuname
                     if(this.value1==a1){
                       a2=x;
                       this.tableData6.push(this.tableData5[x].baogaocount)
                     };
             };
          
               for( var k=0;k<this.tableData6.length;k++){
                       for( var j=0;j<this.tableData6[k].length;j++){
                       this.tableData7.push(this.tableData6[k][j])
                       }
                     };  
           },
    download(index,row){
      let xiaz =this.value+this.value1+'/'+ index.baogao;
                window.open(`http://172.16.186.93:3000/${xiaz}`,"_blank")
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




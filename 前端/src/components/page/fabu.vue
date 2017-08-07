<template>
    <div>    
    
    <el-select v-model="value" placeholder="请选择课程" @change="aaa123()"  >
        <el-option
        v-for="item in options1"
        :key="item.kechengID"
        :label="item.kechengID"
        :value="item.kechengID">
        </el-option>
    </el-select>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择上交期限"
      :picker-options="pickerOptions0">
    </el-date-picker>
    <el-select v-model="value2" placeholder="请选择实验"   @change="bbb123()"     >
        <el-option
        v-for="item1 in options5"
        :key="item1.value"
        :label="item1.shiyan"
        :value="item1.shiyan">
        </el-option>
    </el-select>
    <br><br>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://172.16.186.93:3000/upload"
        :auto-upload="false"
        :show-file-list='false'
        :data="form"
        >
            
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认发布</el-button>
        </el-upload>
    <br><br>
  <template>
  <el-table
    :data="tableData5"
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
      prop="fabu"
      label="报告名称"
      >
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
     >
      <template scope="scope">
        <el-button type="text" size="small">编辑</el-button>
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
          value2:'',
          form:{
            "kechengID":"",
            "id":"",
            "fabuname":this.value2
          },
          shangData:[],
           tableData3: [],
           tableData4: [],
           tableData5: [],
           options5:[{"shiyan":"实验一"},{"shiyan":"实验二"},{"shiyan":"实验三"},{"shiyan":"实验四"},{"shiyan":"实验五"},{"shiyan":"实验六"}],
        options1: [],
        value: '',
        value1:"",
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        }
      }
    },
    methods:{
           aaa123(){
             let x=0;
            let a2=0;
             for(x in this.options1){
                     let a1=this.options1[x].kechengID;
                     if(this.value==a1){
                       a2=x;
                     };
             };
             this.form.kechengID=this.options1[a2].kechengID;
             this.form.id=this.options1[a2]._id;
             /*var a= [{
               'shiyanfabu':[{'fabu':'eqwewqe'},{'fabu':'1111'}],
               }]
             console.log(a[0]);
             console.log(this.options1[0]._id);
          this.$axios.patch(`http://172.16.186.93:3000/db/Techers/${this.options1[0]._id}`,
          a[0]
           );*/
           },bbb123(){
            this.form.fabuname=this.value2;
            
           },
           submitUpload() {
        this.$refs.upload.submit();
      }
      },
    mounted(){
  this.$axios.get('http://172.16.186.93:3000/db/Techers')
  .then((response) => {

                   for(var x in response.data){
                     if(this.$store.state.loginID==response.data[x].code){
                     this.options1.push(response.data[x])
                     this.tableData3.push(response.data[x])
                     /*this.tableData4.push(response.data[x].shiyanfabu[0])*/
                    };
                   };
                    for( var i in this.tableData3 ){
                       this.tableData4.push(this.tableData3[i].shiyanfabu)
                     };
                   /*console.log(this.tableData3);  
                   console.log(this.tableData4[0][0].fabu);*/

                     for( var k=0;k<this.tableData4.length;k++){
                       for( var j=0;j<this.tableData4[k].length;j++){
                       this.tableData5.push(this.tableData4[k][j])
                       }
                     };    
               
                   
  })
  .catch(function (error) {
    console.log(error);
  });
      }
  }
</script>
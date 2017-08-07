<template>
    <div>    
    
    <el-select v-model="nimade" placeholder="请选择课程" @change="aaa123()"  >
        <el-option
        v-for="item in options2"
        :key="item.kechengID"
        :label="item.kechengID"
        :value="item.kechengID">
        </el-option>
    </el-select>
        <el-select v-model="value2" placeholder="请选择实验"  @change="bbb123()"     >
        <el-option
        v-for="item1 in options5"
        :key="item1.shiyan"
        :label="item1.shiyan"
        :value="item1.shiyan">
        </el-option>
    </el-select>
    <br><br>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://172.16.186.93:3000/upload2"
        :auto-upload="false"
        :show-file-list='false'
        :data=form
        >
            
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认发布</el-button>
        </el-upload>
    <br><br>
 <!-- <template>
  <el-table
    :data="options3"
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
      width="110">
    </el-table-column>
    <el-table-column
      prop="fabu"
      label="报告名称"
      width="110">
    </el-table-column>
    <el-table-column
      prop="shiyanfabu"
      label="课程"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shiyan"
      label="实验">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>-->

</div>
</template>

<script>
  export default {
    data() {
      return {
          nimade:{},
          value2:{},
          form:{
            "kechengID":"",
            "code":"2",
            "id":"",
            "fabuname":this.value2
          },
          options5:[{"shiyan":"实验一"},{"shiyan":"实验二"},{"shiyan":"实验三"},{"shiyan":"实验四"},{"shiyan":"实验五"},{"shiyan":"实验六"}],
          options: [],
        options1: [],
        options2: [],
        options3: [],
        options4: [],
        
      }
    },
    methods:{
           aaa123(){
             
            let a2;
             for(var x in this.options2){
                 var a1=this.options2[x].kechengID
                     if(this.nimade==a1){
                       a2=x;
                     };
             };
             this.form.kechengID=this.options2[a2].kechengID;
             this.form.id=this.options2[a2]._id;
           },
           bbb123(){
           this.form.fabuname=this.value2;
           console.log(this.form.fabuname)  
           },
           submitUpload() {
        this.$refs.upload.submit();
      }
      },
    mounted(){
  this.$axios.post('http://172.16.186.93:3000/setup',
       {"opp":this.$store.state.loginID} )
  .then((response) => {
                this.options2=response.data;

                   
  })
  .catch(function (error) {
    console.log(error);
  });
      }
  }
</script>
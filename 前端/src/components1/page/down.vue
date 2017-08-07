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

    <br><br>

    <br><br>
  <template>
  <el-table
    :data="options4"
    max-height="600"
    border
    style="width: 600px">
    <el-table-column
      type="selection"
      width="100">
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
      width="100">
<template scope="scope">
        <el-button type="text" size="small" @click="download((scope.$index, scope.row))">下载</el-button>
</template >
    </el-table-column>
  </el-table>
</template>

</div>
</template>

<script>
  export default {
    data() {
      return {
          nimade:{},
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
                       this.options3.push(this.options2[x].shiyanfabu)
                     };
             };
         for( var k=0;k<this.options3.length;k++){
                       for( var j=0;j<this.options3[k].length;j++){
                       this.options4.push(this.options3[k][j])
                       }
                     };  




           },
download(index,row){
  let a3;
  for(var t in this.options2){
    var a4=this.options2[t].kechengID
    if(this.nimade==a4){
      a3=t
    }
  }
  let a5=this.options2[a3].kechengID;
  console.log(a5)
      let xiaz = a5+'/'+index.fabu;
                window.open(`http://172.16.186.93:3000/${xiaz}`,"_blank")
            }
      },
    mounted(){
  this.$axios.post('http://172.16.186.93:3000/setup',
       {"opp":this.$store.state.loginID} )
  .then((response) => {
                this.options2=       response.data   
                   
  })
  .catch(function (error) {
    console.log(error);
  });
      }
  }
</script>
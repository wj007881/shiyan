<template>
    <div>
    <br><br>
  
  <!--列表-->
		<el-table :data="options2" highlight-current-row  style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="120">
			</el-table-column>
			<el-table-column prop="displayName" label="教师"  >
			</el-table-column>
			<el-table-column prop="kechengName" label="班级名称"  >
			</el-table-column>
			
			
			<el-table-column prop="kechengID" label="班级代码"  >
			</el-table-column>
			
			
		</el-table>

		<!--工具条
		<el-col :span="24" class="toolbar">
			
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>-->
 
    </div>
</template>

<script>
  export default {
    data() {
      return {
        options2:[],
        options1:[],
        options:[],
        options3:[],
        Teachers:[],
          tableData3: [
        {
         kecheng: 'node',
          name: '罗小虎',
          shiyan: '实验1',
          sj:'已交'
        }
        ],
        value: '',
        value1: ''
      }
    },
     methods:{},
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
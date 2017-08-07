<template>
	<section>
		<!--列表-->
		<el-table :data="classes" highlight-current-row  style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="code" label="学号" sortable>
			</el-table-column>
			<el-table-column prop="displayName" label="姓名"sortable>
			</el-table-column>
			
			
			<el-table-column prop="email" label="电子邮件"  sortable>
			</el-table-column>
		
			
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			
			<el-pagination layout="prev, pager, next"  :page-size="20"  style="float:right;">
			</el-pagination>
		</el-col>


		
	</section>
</template>

<script>
	
	export default {
		data() {
      return {
          classes:[] 
      }
    },
        mounted(){
            const self = this;
           self.$axios.get('http://172.16.186.93:3000/db/Users')
                .then((response)  =>{
									for(var i in response.data){
										if(this.$store.state.loginID==response.data[i].code){
                          this.classes[0]=response.data[i]
										};
									}
                    });
										
        }
  }
    
</script>

<style scoped>

</style>
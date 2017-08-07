<template>  
    <div class="sidebar">
      <el-menu   default-active="readme" theme='dark' class="el-menu-vertical-demo" unique-opened router >
          
          <el-submenu index="course-m">

        <template slot="title"><i class="el-icon-message"></i>个人管理</template>
          <el-menu-item-group>
          <el-menu-item index="self"><i class="el-icon-menu"></i>个人信息</el-menu-item>
          <el-menu-item index="class"><i class="el-icon-menu"></i>班级信息</el-menu-item>               
          </el-menu-item-group>
          </el-submenu>
          <el-submenu index="shiyan">
        <template slot="title"><i class="el-icon-message"></i>实验管理</template>
          <el-menu-item index="upload"><i class="el-icon-menu"></i>实验上传</el-menu-item>
          <el-menu-item index="download"><i class="el-icon-menu"></i>实验下载</el-menu-item>
      </el-submenu>

          
    </el-menu>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        items:[],
        kecheng:[]

      }
        
    },
    methods: {
      open3:function(value) {
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
        this.$axios.delete(`http://172.16.186.93:3000/db/Techers/${this.items[value]._id}` );

        this.items.splice(value,1);
          this.$message({
            type: 'success',
            message: '删除成功!'           
          });
          console.log(this.items[value]);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      },
      open4() {
        event.stopPropagation();
         const h = this.$createElement;
        this.$msgbox({
          customClass:"msg",
          closeOnClickModal:false,
          title: '消息',
          message: h('p', null, [
            h('span', null, '课程名称:'),
            h('input', null, ''),
            h("p",{style:"color:white"},"1"),
            h('span', null, '课程代码:'),
            h('input', null, ''),
            h("p",{style:"color:white"},"1"),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
                 var a = document.getElementsByClassName('msg');
              var b = a[0].getElementsByTagName('input')[0].value;
              var c = a[0].getElementsByTagName('input')[1].value;
                
                this.items.push({kechengName:b,kechengID:c});
                this.kecheng.push({kechengName:b,kechengID:c});
                
                console.log(this.kecheng);
                this.$axios.post('http://172.16.186.93:3000/db/Techers',
                this.kecheng[this.kecheng.length-1]
                )
                .then((response) => {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
                }, 1000);
            
            } else {
              done();
            }
          }
        }).then(action => {
          if(action==="confirm"){
                this.$message({
                type: 'success',
                 message: '你已经创建了课程 '
             });
            }else{
                this.$message({
                 type: 'error',
                 message: '你取消了创建课程 ' 
            });
            }
        });
      },

        },
        mounted(){
          this.$axios.get('http://172.16.186.93:3000/db/Techers')
                .then((response) => {
                  console.log(response);
                  this.items=response.data
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
      
  }
  </script>
<style>
 .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
    .msg{
      width:300px;
    }
</style>
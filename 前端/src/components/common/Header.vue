<template>
    <div class="header">
        <div class="logo">实验管理系统</div>
        <div class="user-info">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    欢迎！！！
                </span>
               <el-button type="danger">退出</el-button>
        </div>
    </div>
</template>

<style >
   .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        min-width: 800px;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        background: #1F2D3D;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:300px;
        text-align: center;
    }
     .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
     .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
</style>

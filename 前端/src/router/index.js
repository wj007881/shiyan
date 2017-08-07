import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/stu_login'
        },
          {
            path: '/',
            redirect: '/tea_login'
        },
          {
            path: '/',
            redirect: '/ad_login'
        },
        {
            path: '/teacher',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/Readme',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/stu',
                    component: resolve => require(['../components/page/stu.vue'], resolve)
                },
                 {
                    path: '/fabu',
                    component: resolve => require(['../components/page/fabu.vue'], resolve)
                },
                {
                    path: '/huizong',
                    component: resolve => require(['../components/page/huizong.vue'], resolve)
                },
                {
                    path: '/chakan',
                    component: resolve => require(['../components/page/chakan.vue'], resolve)
                },
                {
                    path: '/xiazai',
                    component: resolve => require(['../components/page/xiazai.vue'], resolve)
                },
            ]
        },
        {
            path: '/student',
            component: resolve => require(['../components1/common/Home.vue'], resolve),
            children:[
                 {
                    path: '/upload',
                    component: resolve => require(['../components1/page/upload.vue'], resolve)
                },
                {
                    path: '/download',
                    component: resolve => require(['../components1/page/down.vue'], resolve)
                },
                 {
                    path: '/class',
                    component: resolve => require(['../components1/page/class.vue'], resolve)
                },
                 {
                    path: '/self',
                    component: resolve => require(['../components1/page/self.vue'], resolve)
                },
            ]
        },
        {
                 path: '/admin',
            component: resolve => require(['../components2/common/Home_ad.vue'], resolve),
            children:[
                 {
                    path: '/admin_stu',
                    component: resolve => require(['../components2/page/admin_stu.vue'], resolve)
                },
                {
                    path: '/admin_tea',
                    component: resolve => require(['../components2/page/admin_tea.vue'], resolve)
                },
              
            ]

        },
        {
            path: '/stu_login',
            component: resolve => require(['../components/page/stu_login.vue'], resolve)
        },
        {
            path: '/tea_login',
            component: resolve => require(['../components/page/tea_login.vue'], resolve)
        },
        {
            path: '/ad_login',
            component: resolve => require(['../components/page/ad_login.vue'], resolve)
        },
    ]
})

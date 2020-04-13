import request from '@/utils/request' //模板提供的组件，axios封装

const apiurl = "/checkcentersys/userinfo/"

export default {

   /*  getTeacherPageListTest(page, limit, searchObj) {
        return request({
            //后端controller里面的路径
            url: `${apiurl}/moreCondtionPageList/${page}/${limit}`,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            data: searchObj
        })
    }, */
    /* getTeacherPageList(page, limit) {
        return request({
            //后端controller里面的路径
            url: '/userinfo/findAllUser/' + page + '/' + limit,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
        })
    }, */

    //分页条件查询的方法
    //三个参数：当前页，每页记录数，条件封装对象
    /* getTeacherPageList(page, limit, searchObj) {
        return request({
            //后端controller里面的路径
            url: '/eduservice/teacher/moreCondtionPageList/' + page + '/' + limit,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            data: searchObj
        })
    }, */

    //分页条件查询的方法
    //三个参数：当前页，每页记录数，条件封装对象
    getUserPageList(page, pageSize, searchObj) {
        return request({
            //后端controller里面的路径
            url: 'http://127.0.0.1:8082/checkcentersys/userinfo/moreCondtionPageList/' + page + '/' + pageSize,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            data: searchObj
        })
    },

    getUser() {
        return request({
            //后端controller里面的路径
            url: 'http://127.0.0.1:8082/checkcentersys/userinfo/list' ,
            //提交方式
            method: 'get'
        })
    },

    
    //删除
    deleteUserId(id) {
        return request({
            //后端controller里面的路径
            url: 'http://127.0.0.1:8082/checkcentersys/userinfo/' + id,
            //提交方式
            method: 'delete'
        })
    },
    //添加
    saveUserInfo(userinfo) {
        return request({
            //后端controller里面的路径
            url: 'http://127.0.0.1:8082/checkcentersys/userinfo/addUser',
            //提交方式
            method: 'post',
            data: userinfo
        })
    },
    //根据id查询
    getUserId(id) {
        return request({
            //后端controller里面的路径
            url: 'http://127.0.0.1:8082/checkcentersys/userinfo/getUserInfo/' + id,
            //url: `${apiurl}/getUserInfo/${id}`,
            //提交方式
            method: 'get'
        })
    },
    //修改用户
    updateUserInfoId(id, userinfo) {
        return request({
            //后端controller里面的路径
            url: 'http://127.0.0.1:8082/checkcentersys/userinfo/updateUserInfo/' + id,
            //提交方式
            method: 'post',
            data: userinfo
        })
    }
}
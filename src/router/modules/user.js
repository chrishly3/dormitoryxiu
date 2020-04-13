/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  name: '用户管理',
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      name: '用户列表',
      component: () => import('@/views/fix/user/index'),
      meta: { title: '用户列表', icon: 'table' }
    },
    {
      path: 'save',
      name: '添加用户',
      component: () => import('@/views/fix/user/form'),
      meta: { title: '添加用户', icon: 'tree' }
    },
    {
      path: 'edit/:id',
      name: '修改用户',
      component: () => import('@/views/fix/user/form'),
      meta: { title: '修改用户', icon: 'tree' },
      hidden: true
    }
  ]
}
export default userRouter

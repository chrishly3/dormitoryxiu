/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const orderRouter = {
  path: '/order',
  component: Layout,
  redirect: '/order/list',
  name: '维修单管理',
  meta: {
    title: '维修单管理',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      name: '维修单列表',
      component: () => import('@/views/fix/order/index'),
      meta: { title: '维修单列表', icon: 'table' }
    },
    {
      path: 'save',
      name: '维修单上报',
      component: () => import('@/views/fix/order/form'),
      meta: { title: '维修单上报', icon: 'tree' }
    },
    {
      path: 'edit/:id',
      name: '修改报修单',
      component: () => import('@/views/fix/order/form'),
      meta: { title: '修改报修单', icon: 'tree' },
      hidden: true
    }
  ]
}
export default orderRouter
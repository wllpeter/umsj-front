import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['privilege'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/permission/user'),
        name: 'UserMangement',
        meta: {
          title: 'userMangement',
          icon: 'user',
          roles: ['usersManage'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          icon: 'edit',
          roles: ['rolesManage']
        }
      },
      {
        path: 'addRole',
        component: () => import('@/views/permission/AddRole'),
        name: 'AddRole',
        hidden: true,
        meta: {
          title: 'addRole',
          icon: 'edit'
        }
      },
      {
        path: 'updateRole',
        component: () => import('@/views/permission/UpdateRole'),
        name: 'UpdateRole',
        hidden: true,
        meta: {
          title: 'updateRole',
          icon: 'edit'
        }
      }
    ]
  },
  {
    path: '/uds',
    component: Layout,
    redirect: '/uds/index',
    alwaysShow: true, // will always show the root menu
    name: 'Uds',
    meta: {
      title: 'uds',
      icon: 'lock',
      roles: ['uds'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/uds/index'),
        name: 'UdsMangement',
        meta: {
          title: 'udsMangement',
          icon: 'list',
          roles: ['udsPublish'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'add',
        component: () => import('@/views/uds/add'),
        name: 'UdsCreate',
        meta: {
          title: 'udsCreate',
          icon: 'edit',
          roles: ['udsPublishCreate']
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

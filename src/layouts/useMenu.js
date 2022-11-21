import {h, resolveComponent} from "vue";

const useMenu = () => {
  const menus = [
    {
      id: '0',
      label: '智能地图',
      icon: 'travel_explore',
      path: 'map',
      children: [
        {
          id: '0-0',
          label: '设备分布',
          path: 'terminal-distribute',
        },
        {
          id: '0-1',
          label: '项目分布',
          path: 'project-distribute',
        },
      ],
    },
    {
      id: '1',
      label: '业务中心',
      icon: 'business_center',
      path: 'business',
      children: [
        {
          id: '1-0',
          label: '订单中心',
          path: 'order',
        },
        {
          id: '1-1',
          label: '客户中心',
          path: 'guest',
        },
        {
          id: '1-2',
          label: '购物中心',
          path: 'shopping',
        },
        {
          id: '1-3',
          label: '物料中心',
          path: 'materials',
        },
        {
          id: '1-4',
          label: '图书中心',
          path: 'books',
        },
      ],
    },
    {
      id: '2',
      label: '监管监控',
      icon: 'video_library',
      path: 'video',
      children: [
        {
          id: '2-0',
          label: '实时视频',
          path: 'live',
        },
        {
          id: '2-1',
          label: '历史视频',
          path: 'history',
        },
        {
          id: '2-2',
          label: '智能巡查',
          path: 'inspection',
        },
      ]
    },
    {
      id: '3',
      label: '设备管理',
      icon: 'developer_mode',
      path: 'device',
      children: [
        {
          id: '3-0',
          label: '图书机',
          path: 'books',
        },
        {
          id: '3-1',
          label: '门禁机',
          path: 'access-control',
        },
        {
          id: '3-2',
          label: '售水机',
          path: 'water-sale',
        },
        {
          id: '3-3',
          label: '茶叶机',
          path: 'tea',
        },
        {
          id: '3-4',
          label: '智能空开',
          path: 'air-switch',
        },
        {
          id: '3-5',
          label: '其他新零售机',
          path: 'retail',
        },
        {
          id: '3-6',
          label: '设备分发',
          path: 'distribution',
        },
      ]
    },
    {
      id: '4',
      label: '信息服务',
      icon: 'info',
      path: 'info',
      children: [
        {
          id: '4-0',
          label: '项目信息',
          path: 'project',
        },
        {
          id: '4-1',
          label: '公司信息',
          path: 'company',
        },
      ]
    },
    {
      id: '5',
      label: '系统服务',
      icon: 'wysiwyg',
      path: 'system',
      children: [
        {
          id: '5-0',
          label: '用户',
          path: 'user',
        },
        {
          id: '5-1',
          label: '角色',
          path: 'role',
        },
        {
          id: '5-2',
          label: '日志',
          path: 'log',
        },
      ]
    },
  ];
  const renderRouterView = () => h(resolveComponent("router-view"));
  // 生成菜单数据
  const getMenus = (menus, parent) => {
    const newMenus = (menus || []).map(el => {
      const {id, label, path, icon, children} = el;
      const item = {id, label, path};
      icon && (item['icon'] = icon)
      if (!parent) {
        item['fullPath'] = path
      } else {
        const {fullPath} = parent;
        item['fullPath'] = `${fullPath}/${path}`;
      }
      if (children) {
        item['children'] = getMenus(children, item);
      }
      return item;
    })
    return newMenus;
  }
  // 生成路由数据
  const getRouter = (menus, parent) => {
    const newMenus = menus.map(el => {
      const {id, label, path, icon, children} = el;
      const item = {id, label, path};
      icon && (item['icon'] = icon)
      if (!parent) {
        item['keys'] = [id]
        item['crumbs'] = [label]
        item['fullPath'] = path
      } else {
        const {keys, crumbs, fullPath} = parent;
        item['keys'] = [...keys, id];
        item['crumbs'] = [...crumbs, label];
        item['fullPath'] = `${fullPath}/${path}`;
      }
      if (children) {
        item['component'] = {render: renderRouterView};
        item['children'] = getRouter(children, item);
      } else {
        item['component'] = () => import(`pages/${item['fullPath']}/index.vue`);
        item['meta'] = {
          routerKeys: item['keys'],
          crumbs: item['crumbs'],
        }
      }
      return item;
    })
    return newMenus;
  }
  return {
    menus,
    getMenus,
    getRouter,
  }
}

export default useMenu;

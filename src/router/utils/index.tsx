import { AppRouteObject, Permission, RouteMeta } from '../type'
import { chain, ascend } from 'ramda'

/**
 * Flatten an array containing a tree structure
 * @param {T[]} trees - An array containing a tree structure
 * @returns {T[]} - Flattened array
 */
export function flattenTrees<T extends { children?: T[] }>(trees: T[] = []): T[] {
  return chain(node => {
    const children = node.children || []
    return [node, ...flattenTrees(children)]
  }, trees)
}

/**
 * return menu routes
 */
export const menuFilter = (items: AppRouteObject[]) => {
  return items
    .filter(item => {
      const show = item.meta?.key
      if (show && item.children) {
        item.children = menuFilter(item.children)
      }
      return show
    })
    .sort(ascend(item => item.order || Number.POSITIVE_INFINITY))
}

/**
 * 基于 src/router/routes/modules 文件结构动态生成路由
 */
export function getRoutesFromModules() {
  const menuModules: AppRouteObject[] = []

  const modules = import.meta.glob('./routes/modules/**/*.tsx', {
    eager: true,
  })
  for (const key in modules) {
    const mod = (modules as any)[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    menuModules.push(...modList)
  }
  return menuModules
}

/**
 * return the routes will be used in sidebar menu
 */
export function getMenuRoutes(appRouteObjects: AppRouteObject[]) {
  // return menuFilter(getMenuModules());
  return menuFilter(appRouteObjects)
}

/**
 * return flatten routes
 */
export function flattenMenuRoutes(routes: AppRouteObject[]) {
  return routes.reduce<RouteMeta[]>((prev, item) => {
    const { meta, children } = item
    if (meta) prev.push(meta)
    if (children) prev.push(...flattenMenuRoutes(children))
    return prev
  }, [])
}

/**
 * 将子路由合并到父路由
 */
export function mergeRoutes(routes: Permission[]) {
  const routeMap: { [key: string]: Permission } = {}
  const nestedRoutes: Permission[] = []

  // 将所有路由存储在一个映射中
  routes.forEach(route => {
    routeMap[route.id] = { ...route, children: [] }
  })

  // 构建嵌套结构
  routes.forEach(route => {
    if (route.parentId) {
      const parent = routeMap[route.parentId]
      if (parent) {
        parent.children!.push(routeMap[route.id])
      }
    } else {
      nestedRoutes.push(routeMap[route.id])
    }
  })

  return nestedRoutes
}

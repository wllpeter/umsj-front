import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

export function judgeAction(defaultPermission) {
  const haveActions = store.getters && store.getters.actions
  let result = true
  for (let i = 0; i < defaultPermission.length; i++) {
    for (let j = 0; j < haveActions.length; j++) {
      if (defaultPermission[i] === haveActions[j]) {
        result = false
        break
      }
    }
  }
  return result
}

// 获取菜单枚举数据
export const getMenuEnum = (data = {}) =>
    axios.post('/api/om/Menu/typeList', data)

// 获取平台端菜单
export const getMenuAllList = (data = {}) =>
    axios.post('/api/om/Menu/AllList', data)

// 菜单详情
export const getMenuDetail = (data = {}) =>
    axios.post('/api/om/menu/detail', data)

// 保存菜单
export const saveMenu = (data = {}) =>
    axios.post('/api/om/menu/save', data)

// 保存菜单功能数据
export const saveFunctions = (data = {}) =>
    axios.post('/api/om/menu/saveFunctions', data)

// 删除菜单
export const deleteMenu = (data = {}) =>
    axios.post('/api/om/menu/delete', data)


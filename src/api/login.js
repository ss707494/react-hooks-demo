// OM登录
export const login = (data = {}) =>
    axios.post('/api/login', data)

// OM登录
export const omLogi = (data = {}) =>
    axios.post('/api/om/account/omLogin', data)


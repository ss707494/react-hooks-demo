import api from '@/api'
import { setToken } from '@/common/token'
import { showMessage } from '@/component/Message'

export const logout = () => {
  setToken('')
  setToken('', 'refresh_token')
}

export const login = async (data) => {
  const { data: res } = await api.login(data)
  if (res.data) {
    setToken(res.token)
    setToken(res.refreshToken, 'refresh_token')
    showMessage({ open: true, message: res.message })
    return true
  } else {
    showMessage({ open: true, message: res.message })
  }
}

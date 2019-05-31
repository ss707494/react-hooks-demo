import api from '@/api'
import { setToken } from '@/common/token'
import { showMessage } from '@/component/Message'

export const logout = () => {
  setToken('')
  setToken('', 'refreshtoken')
}

export const login = async (data) => {
  // const [con] = useCustomContext()
  // const { showMessage } = con
  const { data: res } = await api.login(data)
  if (res.data) {
    setToken(res.token)
    setToken(res.refreshtoken, 'refreshtoken')
    showMessage({ open: true, message: res.message })
    return true
  } else {
    showMessage({ open: true, message: res.message })
  }
}

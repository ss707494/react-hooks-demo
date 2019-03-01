import React, { useState, useContext } from 'react'
import { client } from '@/common/apolloCLient'

export const context = React.createContext({})

export const useCustomContext = () => useContext(context)

export const wrapperContext = (el) => {
  const [cont, setContext] = useState({
    q: '123',
    w: '324234',
    client
  })

  return (
      <context.Provider value={[cont, (data) => setContext({
        ...cont,
        ...data,
      })]}>
        {el}
      </context.Provider>
  )

}

export default {
  context,
  wrapperContext,
  useCustomContext,
}

import React, { useState, useContext } from 'react'
import merge from 'lodash/merge'

export const context = React.createContext({})

export const useCustomContext = () => useContext(context)

export const wrapperContext = (el) => {
  const [cont, setContext] = useState({
    q: '123',
    w: '324234',
  })

  return (
      <context.Provider value={[cont, (data) => {
        return setContext({
          ...merge(cont, data)
        });
      }]}>
        {el}
      </context.Provider>
  )
}

export default {
  context,
  wrapperContext,
  useCustomContext,
}

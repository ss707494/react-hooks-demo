import React from 'react'
import { Route } from 'react-router-dom'

const importAll = list => list.keys().reduce((i, e) => {
  return [
    ...i,
    ...Array.isArray(list(e).default) ? list(e).default : [list(e).default],
  ]
}, [])

export const allRouters = importAll(require.context('./', true, /^\.\/\w*\/index\.js$/i))

export const routes = allRouters.map(({ props, Type }, i) => Type ? <Type {...props} key={`type${i}`}/> : <Route {...props} key={`route${i}`}/>)

// export default routes

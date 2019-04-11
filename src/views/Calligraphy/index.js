import React from 'react'
import loadable from '@loadable/component'
import { AppbarLayout } from '@/component/AppbarLayout'
import { Redirect } from 'react-router-dom'

export default [{
  props: {
    exact: true,
    from: '/calligraphy',
    to: '/calligraphy/booklist',
  },
  Type: props => <Redirect {...props}/>
}, {
  props: {
    path: '/calligraphy/booklist',
    component: loadable(() => import('./Booklist')),
  },
  Layout: AppbarLayout
}, {
  props: {
    path: '/calligraphy/notelist/:id',
    component: loadable(() => import('./NoteList')),
  },
  Layout: AppbarLayout
}, {
  props: {
    path: '/calligraphy/noteDetail/:id',
    component: loadable(() => import('./NoteDetail')),
  },
  Layout: AppbarLayout
}]

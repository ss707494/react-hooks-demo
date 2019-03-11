import React from 'react'
import { useCustomContext } from '@/common/context'
import { client } from '@/common/apolloCLient'
import Demo1 from './demo'

const TestHooks = props => {
  console.log(props)
  console.log(client)
  const [con] = useCustomContext()
  return (
      <div>
        {con.w}
        <footer>
          <Demo1/>
          {props.children}
        </footer>
      </div>
  );
}

export default {
  props: {
    path: '/testHooks',
    component: p => <TestHooks {...p}><div>sldkf</div></TestHooks>,
  },
}

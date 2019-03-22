import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useCustomContext } from '@/common/context'
import Demo1 from './demo'
import { allUser } from '@/gql/user.graphql'
import { queryGraphql } from '@/component/ApolloQuery'

const TestHooks = props => {
  // console.log(props)
  const [getData, data ] = queryGraphql(allUser)

  useEffect(() => {
    getData()
  }, [])
  const [con] = useCustomContext()
  const [D, setTest] = Demo1()
  return (
      <div>
        {
          data && data.user.map(e => <div>{e.id}</div>)
        }
        {con.w}
        <Button onClick={() => setTest('settest111')}>settest</Button>
        {/*<OtherC/>*/}
        <footer>
          {D}
          {props.children}
        </footer>
      </div>
  );
}

export default {
  props: {
    path: '/testHooks',
    component: p => <TestHooks {...p}>
      <div>sldkf</div>
    </TestHooks>,
  },
}

import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useCustomContext } from '@/common/context'
import { getContentImg, detailImg } from '@/gql/note.graphql'
import { queryGraphql } from '@/component/ApolloQuery'
import Demo1 from './demo'

/* eslint-disable */
const TestHooks = props => {
  // console.log(props)
  const [getData, data ] = queryGraphql(getContentImg)
  const [getDetailImg, detailImg0 ] = queryGraphql(detailImg)

  useEffect(() => {
  }, [])
  const [con] = useCustomContext()
  const [D, setTest] = Demo1()
  return (
      <div>
        {
          data.getContentImg && <img alt="" src={data.getContentImg.src} />
        }
        {con.w}
        <Button onClick={async () => {
          getDetailImg({
            id: '5c933f62d5f7c235d047826e'
          })
          // const res = await getData({
          //   data: '道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。',
          // })
          // console.log(res)
        }}>settest</Button>
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

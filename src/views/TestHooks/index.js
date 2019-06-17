import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useCustomContext } from '@/common/context'
import { getContentImg, detailImg } from '@/gql/note.graphql'
import { queryGraphql } from '@/component/ApolloQuery'
import Demo1 from './demo'
import { S } from './style'

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
        }}>settest</Button>
        <footer>
          {D}
          {props.children}

          <S.TextFieldBox
              label="sss"
              placeholder="qweqwe"
              InputLabelProps={{
                shrink: true,
              }}
          ></S.TextFieldBox>
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

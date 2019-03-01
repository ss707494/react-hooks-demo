import React from 'react'
import Button from '@material-ui/core/Button'
import { useCustomContext } from '@/common/context'

export default () => {
  const [con, setCon] = useCustomContext()
  return (
      <Button onClick={() => setCon({w: `${con.w}s`})}>clickDemo1</Button>
  )
}

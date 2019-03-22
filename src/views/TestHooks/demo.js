import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { useCustomContext } from '@/common/context'

export default () => {
  const [con, setCon] = useCustomContext()
  const [test, setTest] = useState('test')
  return [
    (
        <Button onClick={() => setCon({ w: `${con.w}s` })}>{test}</Button>
    ),
    setTest
  ]
}

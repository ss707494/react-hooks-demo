import React from 'react'
import Button from '@material-ui/core/Button'
import Demo1 from './demo'

export const OtherC = () => {
  const [, setTest] = Demo1()
  return (
      <div>
        <Button onClick={() => setTest('settestInOther')} >settestInOther</Button>
      </div>
  )
}


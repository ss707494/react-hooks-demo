import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

export let showMessage = ({ message, open }) => {}

export const CreateMessageObj = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  showMessage = ({ message, open = true }) => {
    setMessage(message)
    setOpen(open)
  }

  return <Snackbar open={open}
                   message={message}
                   autoHideDuration={1000}
                   onClose={() => setOpen(false)}
  />
}

export default {
  showMessage,
  CreateMessageObj,
}

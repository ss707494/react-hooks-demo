import React, { useState, useEffect } from 'react'
import api from '@/api'

export function Greeting() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `this is count: ${count}`
  })
  return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button onClick={() => {
          localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTU1MDAzODQyMCwiZXhwIjoxNTUwMjExMjIwfQ.4425yGKLu9zhEvMTatG-6MUYPUisNsbfH0b1IfmCygg')
        }}>
          add auth
        </button>
      </div>
  );
}

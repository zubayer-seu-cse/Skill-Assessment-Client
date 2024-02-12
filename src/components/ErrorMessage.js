import React from 'react'

export const ErrorMessage = ({message}) => {
  return (
    <div>
        {message ? message + "!" : "" }
    </div>
  )
}

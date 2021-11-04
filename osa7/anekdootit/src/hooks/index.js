import { useState } from 'react'

export const useContentField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onClick = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onClick
  }
}

export const useAuthorField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const onClick = () => {
      setValue('')
    }
  
    return {
      type,
      value,
      onChange,
      onClick
    }
  }

  export const useInfoField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const onClick = () => {
      setValue('')
    }
  
    return {
      type,
      value,
      onChange,
      onClick
    }
  }
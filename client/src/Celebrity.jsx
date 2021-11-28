import { useCallback, useMemo, useState } from 'react'

const Celebrity = ({ goNext, celebrityInfo }) => {
  const [answer, setAnswer] = useState('')

  const choices = useMemo(() => {
    return celebrityInfo.names.map((name) => (
      <li key={name}>
        <label>
          <input
            name='celebrity'
            type='radio'
            value={name}
            onChange={(e) => setAnswer(e.target.value)}
          />
          {name}
        </label>
      </li>
    ))
  }, [celebrityInfo])

  const handleSubmit = useCallback(() => {
    if (answer === celebrityInfo.answer) {
      goNext(true)
    } else {
      goNext(false)
    }
  }, [answer, celebrityInfo, goNext])

  return (
    <div className='celebrity-container'>
      <div className='celebrity-img'>
        <img alt={celebrityInfo.answer} src={celebrityInfo.url} />
      </div>
      <div className='celebrity-selector'>
        <ul>{choices}</ul>
        <button onClick={handleSubmit}>submit</button>
      </div>
    </div>
  )
}

export default Celebrity

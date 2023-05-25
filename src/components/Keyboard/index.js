import {useState, useEffect} from 'react'

import './index.css'

const Keyboard = () => {
  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ]

  const keys = [
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    ';',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
  ]
  const [timer, setTimer] = useState(null)
  const [activeButton, setActiveButton] = useState(null)
  const [totalTime] = useState(300)
  const [textInput, setTextInput] = useState('')
  const [remainingTime, setRemainingTime] = useState(0)
  const [char, setChar] = useState('s')
  const [correctKeyPresses, setCorrectKeyPresses] = useState(0)

  useEffect(() => {
    if (remainingTime === totalTime) {
      console.log(remainingTime)
      clearInterval(timer)
    }
  })

  const startTimer = () => {
    if (!timer) {
      const interval = setInterval(() => {
        setRemainingTime(prevTime => prevTime + 1)
      }, 1000)
      setTimer(interval)
    }
  }

  const onKeyPress = key => {
    if (remainingTime > 0 && remainingTime < totalTime) {
      setTextInput(prevText => prevText + key)
      if (key === textInput + key) {
        setCorrectKeyPresses(prevCorrect => prevCorrect + 1)
      }
    }

    if (remainingTime > 0) {
      const index = Math.floor(Math.random() * keys.length)
      const item = keys[index]
      setChar(item)
      console.log(item)
    }
  }

  const onButtonFocus = key => {
    setActiveButton(key)
  }

  const onButtonBlur = () => {
    setActiveButton(null)
  }

  const getElapsedSecondsInTimeFormat = () => {
    const totalRemainingSeconds = totalTime - remainingTime
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  const renderFocusKeys = key => {
    switch (key) {
      case 'a':
        return 'active-button'
      case 's':
        return 'active-button'
      case 'd':
        return 'active-button'
      case 'f':
        return 'active-button'
      case 'j':
        return 'active-button'
      case 'k':
        return 'active-button'
      case 'l':
        return 'active-button'
      case ';':
        return 'active-button'
      case activeButton:
        return 'active-button'
      default:
        return null
    }
  }

  const calculateAccuracy = () => {
    if (textInput.length === 0) {
      return 0
    }

    const accuracy = (correctKeyPresses / textInput.length) * 100
    return accuracy.toFixed(2)
  }

  return (
    <div className="keyboard-container">
      {remainingTime !== totalTime && (
        <div className="time-text-container">
          <div className="timer">
            Remaining Time:{' '}
            <span className="time">{getElapsedSecondsInTimeFormat()}</span>
          </div>
          <p className="text-input">{textInput}</p>
          <div className="char-button-container">
            <p className="enter-key">Enter this Key</p>
            <p className="char">{char}</p>
            <button
              type="button"
              className="start-timer-button"
              onClick={startTimer}
              disabled={remainingTime === totalTime}
            >
              Start Timer
            </button>
          </div>
        </div>
      )}
      {remainingTime === totalTime && (
        <div className="result-container">
          <p>Total Keys Pressed : {textInput.length} </p>
          <p>WPM : {textInput.length / 5}</p>
          <p>Accuracy : {calculateAccuracy()}%</p>
          <p className="time-up">Time's Up!</p>
        </div>
      )}
      <div className="keyboard">
        {keyboardLayout.map(row => (
          <div className="keyboard-row">
            {row.map(eachKey => (
              <button
                className={renderFocusKeys(eachKey)}
                type="button"
                onClick={() => onKeyPress(eachKey)}
                onFocus={() => onButtonFocus(eachKey)}
                onBlur={onButtonBlur}
              >
                {eachKey}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Keyboard

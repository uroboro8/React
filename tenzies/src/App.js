import Dice from "./components/Dice"
import React from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(false)
  const [timer, setTimer] = React.useState({ timerValue: 0, timerId: 0, hasStarted: false })
  const [username, setUsername] = React.useState({ username: "", isSet: false })
  const [ranking, setRanking] = React.useState({ ranking: [], visibility: false })

  React.useEffect(() => {
    
    if (ranking.ranking.length == 0 && JSON.parse(localStorage.getItem("users")) != null){
      setRanking(prevRanking => {
        return {
          ...prevRanking,
          ranking: JSON.parse(localStorage.getItem("users"))
        }
      })
    }

    if (username.isSet) {
      let user = ""
      while (user == "" || user == null) {
        user = window.prompt("Inserire il nome utente")
      }
      setUsername({
        username: user,
        isSet: false
      })

    }

    let counter = 0;

    for (counter; counter < dices.length; counter++)
      if (dices[counter].value != dices[0].value || !dices[counter].isHeld)
        break;

    if (counter == dices.length) {
      setRolls(prevRolls => prevRolls + 1)
      setTenzies(true)
    }

    if (timer.hasStarted) {
      let timerID = setInterval(() => {
        setTimer(prevTimer => (
          {
            ...prevTimer,
            timerValue: prevTimer.timerValue + 1
          }))
      }, 1000)
      setTimer(prevTimer => (
        {
          ...prevTimer,
          timerId: timerID,
          hasStarted: false
        }))
    }

    if (tenzies) {
      clearInterval(timer.timerId)

      let db = JSON.parse(localStorage.getItem("users"))

      if (db == null)
        db = []

      let userElement = db.find(user => user.name == username.username)

      if (userElement) {
        if (userElement.time > timer.timerValue)
          db[db.findIndex(user => user.name == username.username)] = { name: username.username, time: timer.timerValue }
      }
      else
        db.push({ name: username.username, time: timer.timerValue })

      db.sort((u1, u2) => u1.time - u2.time)

      window.localStorage.setItem("users", JSON.stringify(db))

      setRanking(prevRanking => {
        return {
          ...prevRanking,
          ranking: db
        }
      })
      
      return () => setTimer(({ timerValue: 0, timerId: 0, hasStarted: false }))
    }

  }, [dices, tenzies, username])


  function createDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let newDices = []

    for (let i = 0; i < 10; i++)
      newDices.push(createDie())

    return newDices

  }

  function roll() {

    if (!rolls) {
      setTimer(prevTimer => (
        {
          ...prevTimer,
          hasStarted: true
        }
      ))
    }

    setRolls(prevRolls => prevRolls + 1)

    if (tenzies) {
      setTenzies(false)
      setRolls(false)
      setDices(allNewDice())
      setUsername({ username: "", isSet: true })
      return
    }

    setDices(prevDices => prevDices.map(die => {
      return !die.isHeld ?
        createDie()
        :
        die
    }));

  }

  function holdDice(id) {
    setDices(prevDices => prevDices.map(die => {
      return die.id == id ?
        { ...die, isHeld: !die.isHeld }
        :
        die
    })
    )
  }

  function getUsername() {
    if (username.username === null || username.username === "")
      setUsername(prevUsername => ({
        ...prevUsername,
        isSet: true
      }))
  }

  function toggleRanking() {
    setRanking(prevRanking => {
      return {
        ...prevRanking,
        visibility: !prevRanking.visibility
      }
    })
  }

  const diceArray = dices.map(face => {
    return <Dice
      key={face.id}
      value={face.value}
      isHeld={face.isHeld}
      hold={holdDice}
      id={face.id}
    />
  })


  const rankingArray = ranking.ranking.map((user, index) => {
    return <div key={index}>
      <span>{index + 1}.{user.name} - {user.time}s</span>
    </div>
  }).slice(0, 5)

  const dateTime = new Date()
  dateTime.setSeconds(timer.timerValue)
  dateTime.setMinutes(Math.floor(timer.timerValue / 60))

  return (
    <div className="app--container">
      {tenzies && <Confetti />}
      <main className="position-relative">
        <span className="position-absolute top-0 start-50 translate-middle badge bg-danger timer">
          <h2>
            {timer.timerValue < 60 ? timer.timerValue : dateTime.getMinutes() + ":" + dateTime.getSeconds()}
          </h2>
        </span>
        <a role="button" onClick={toggleRanking}>
          <span className="position-absolute top-50 start-100 translate-middle badge bg-danger ranking--button">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-reception-4" viewBox="0 0 16 16">
              <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z" />
            </svg>
          </span>
        </a>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice--container">
          {diceArray}
        </div>
        <button onClick={roll} onMouseEnter={getUsername} className="position-relative">
          {tenzies ? "New Game" : "Roll"}
          {
            rolls
            &&
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {rolls}
            </span>
          }
        </button>
      </main>
      <div className="ranking" style={ranking.visibility ? { display: "block" } : { display: "none" }}>
        <h2>Ranking</h2>
        {rankingArray}
      </div>
    </div>
  );
}

export default App;

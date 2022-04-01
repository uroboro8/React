import Home from "./components/Home.js"
import React from "react"
import Question from "./components/Question"

function App() {

  const [questions, setQuestions] = React.useState({ questions: [], isFetched: false })
  const [answers, setAnswers] = React.useState([])
  const [checked, setChecked] = React.useState(false)
  const [apiParams, setApiParams] = React.useState({ categoryId: 15, categoryName: "video-games", difficulty: "easy" })
  const [points, setPoints] = React.useState(0)

  React.useEffect(() => {
    if (questions.isFetched) {
      fetch(`https://opentdb.com/api.php?amount=5&category=${apiParams.categoryId}&difficulty=${apiParams.difficulty}`)
        .then(response => response.json())
        .then(data => setQuestions({ questions: data.results, isFetched: false }))
    }

    if (checked) {
      let scores = JSON.parse(localStorage.getItem("scores"))
      if (scores == null)
        scores = []

      let score = scores.find(score => score.category === apiParams.categoryName && score.difficulty === apiParams.difficulty)

      if (score != undefined) {
        if (score.points < points) {
          score = {
            ...score,
            points: points
          }
          scores[scores.findIndex(score => score.category === apiParams.categoryName && score.difficulty === apiParams.difficulty)] = score
        }
      }
      else {
        scores.push({
          category: apiParams.categoryName,
          difficulty: apiParams.difficulty,
          points: points
        })
      }

      localStorage.setItem("scores", JSON.stringify(scores))

    }
  }, [questions, checked])

  function getQuestions(category, difficulty) {
    let params
    switch (category) {
      case "video-games":
        params = { categoryName: "video-games", categoryId: 15, difficulty: difficulty }
        break;
      case "anime-manga":
        params = { categoryName: "anime-manga", categoryId: 31, difficulty: difficulty }
        break;
      case "music":
        params = { categoryName: "music", categoryId: 12, difficulty: difficulty }
        break;
      case "film":
        params = { categoryName: "film", categoryId: 11, difficulty: difficulty }
        break;
      default:
        params = { categoryName: "video-games", categoryId: 15, difficulty: "easy" }
        break;
    }

    setApiParams(params)
    setQuestions({ questions: [], isFetched: true })
  }

  function selectAnswer(answer, id) {
    setAnswers(prevAnswers => {
      let answersArray = [...prevAnswers]
      if (!answersArray.find(ans => ans.id == id))
        answersArray.push({
          id: id,
          answer: answer,
          isCorrect: false
        })
      else
        answersArray[answersArray.findIndex(ans => ans.id == id)] = { id: id, answer: answer, isCorrect: false }

      return answersArray;
    })

  }

  function checkAnswers() {
    if (checked) {
      setQuestions({ questions: [], isFetched: false })
      setPoints(0)
      setAnswers([])
    }
    else {
      let correctAnswersCounter = 0
      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i]
        if (answer.answer == questions.questions[answer.id].correct_answer)
          correctAnswersCounter += 1
      }
      setPoints(correctAnswersCounter);
    }
    setChecked(prevChecked => !prevChecked)
  }

  const questionsArray = questions.questions.map((question, index) => {
    return <Question
      key={index}
      question={question.question}
      incorrectAnswers={question.incorrect_answers}
      correctAnswer={question.correct_answer}
      selectAnswer={selectAnswer}
      checked={checked}
      id={index}
    />
  })

  return (
    <div className={!questions.questions.length ? "home" : "app--container"}>
      {!questions.questions.length
        ?
        <Home getQuestions={getQuestions} />
        :
        <>
          {questionsArray}
          <div className="button--section">
            {checked && <h4>You scored {points}/5 correct answers </h4>}
            <button
              className="button--check"
              onClick={checkAnswers}
            >
              {checked ? "Play Again" : "Check Answers"}
            </button>
          </div>
        </>
      }
    </div>
  );
}

export default App;

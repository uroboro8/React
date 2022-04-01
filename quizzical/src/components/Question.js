import React from "react"
import {decode} from 'html-entities';

function Question(props) {
    const [question, setQuestion] = React.useState("")
    const [answers, setAnswers] = React.useState({ answers: [], selected: "" })

    React.useEffect(() => {
        if (!question) {
            let questionParsed = props.question
            questionParsed = decode(questionParsed)
            setQuestion(questionParsed)

            let answersParsed =  [...props.incorrectAnswers, props.correctAnswer]
            for(let i=0;i<answersParsed.length;i++){
            answersParsed[i] = decode(answersParsed[i])
            }

            setAnswers(({
                answers: [...answersParsed],
                selected: ""
            }))

            setAnswers(prevAnswers => {
                let ans = [...prevAnswers.answers]
                shuffleArray(ans)
                return {
                    answers: ans,
                    selected: ""
                }
            })
        }

    }, [])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const answersArray = answers.answers.map((answer, index) => {
        return <button
            key={index}
            className={
                props.checked ?
                    answer == props.correctAnswer ? "answer--button correct" : answer == answers.selected ? "answer--button wrong" : "answer--button"
                    :
                    answer == answers.selected ? "answer--button selected" : "answer--button"
            }
            onClick={() => {
                setAnswers(prevAnswers => {
                    return {
                        ...prevAnswers,
                        selected: answer
                    }
                })
                props.selectAnswer(answer, props.id);
            }
            }
        >
            {answer}
        </button>
    })

    return (
        <div className="answers--container">
            <h3>{question}</h3>
            <div className="answers">
                {answersArray}
            </div>
            <hr />
        </div>
    );
}

export default Question;
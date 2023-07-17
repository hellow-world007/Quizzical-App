import './App.css';
import React, { useState, useEffect } from 'react'
import Menu from './Menu'
import Question from './Question';
import { nanoid } from 'nanoid'
import Confetti from "react-confetti";

export default function App() {
  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(0)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [categoriesArray, setCategoriesArray] = useState('')
  // console.log(categoriesArray)

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    async function getQuestion() {
      setIsLoading(true);
      const res = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}&type=${categoriesArray}`)

      const data = await res.json();
      // console.log(data)
      let q = []
      data.results.forEach(question =>{
        q.push({id: nanoid(), answers:shuffleArray([...question.incorrect_answers, question.correct_answer]), question:question.question, correct:question.correct_answer, selected: null, checked:false})
      })
      setQuestions(q)
      setIsLoading(false);
  }
    getQuestion()
  }, [count,difficulty,numberOfQuestions,categoriesArray])

  function handleCheck(){
    let selected = true;
    questions.forEach(question =>{
      if (question.selected === null){
          selected = false
          return
      }
    })

    if (!selected){
      return
    }

    setQuestions(questions => questions.map(question => {
      return {...question, checked:true}
    }))
    setChecked(true)

    let correct = 0;
    questions.forEach(question =>{
      if (question.correct === question.selected){
        correct += 1
      }
    })
    setCorrect(correct)
  }

  function handleClickAnswer(id, answer) {
    setQuestions(questions => questions.map(question =>{
      return question.id === id ? {...question, selected: answer} : question
    }))
  }

  function handlePlayAgain(){
    setCount(count => count + 1)
    setChecked(false)
  }

   const questionElement = questions ? questions.map((question,index) =>{
    return(
      <Question
        key={question.id}
        ques={question}
        handleClickAnswer={handleClickAnswer}
        id={question.id}
        index={index}
      />
    )
   }) : []

  function start(){
    setStarted(x => !x)
  }

  return (
      <div className='app-container'>
        {checked && <Confetti />}
        { started ? 
         <div className='start-content-container'>
          { 
          isLoading &&
          <div className="loading">
              <h2 className="loading-text">.....</h2>
          </div>
          }
          {!isLoading && <section>
            {questionElement}
            <div className='end-div'>
              {checked && 
              <span className='score'>
                You scored {correct}/{numberOfQuestions} correct answers
              </span>}
              <button 
                className='check' 
                onClick={checked ? handlePlayAgain : handleCheck}>
                  {checked ? 'Play Again' : 'Check Answer'}
              </button>
            </div>
            </section>}
          </div>
         : 
         <Menu 
            start={start}
            numberOfQuestions={numberOfQuestions}
            difficulty={difficulty}
            setNumberOfQuestions={setNumberOfQuestions}
            setDifficulty={setDifficulty}
            categoriesArray={categoriesArray}
            setCategoriesArray={setCategoriesArray}
         />
         }
      </div>
  )
}

import React from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities';

export default function Question(props) {
  let answers = props.ques.answers;
  // console.log(props.ques)

  function handleClick(answer){
    if (props.ques.checked){
      return
    }
    props.handleClickAnswer(props.id, answer)
  }

  const answersElement = answers.map(answer =>{
    let id = null
    if (props.ques.checked){
      if (props.ques.correct === answer){
        id = 'correct'
      }
      else if(props.ques.selected === answer){
        id = 'incorrect'
      }
      else{
        id = 'not-selected'
      }
    }
    return (
      <button 
        key={nanoid()} 
        id={id} 
        className={answer === props.ques.selected ? 'answer selected' : 'answer'} 
        onClick={() => handleClick(answer)}
      >
          {decode(answer)}
      </button>
    )
  })
  // function generateRandomColor(){
  //   let random='';
  //   for(let i=0; i<6; i++){
  //     let randomNumber= Math.floor(Math.random()*9 + 1);
  //     random += randomNumber
  //   }
  //   return `#${random}`
  // }
  function generateRandomColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (85 + 10 * Math.random()) + '%)'
  }
  // console.log(generateRandomColor())

  const styles={
    backgroundColor: generateRandomColor()
  }
  const setStyle={
    display: props.ques.answers.length === 2 && 'grid',
    gridTemplateColumns:props.ques.answers.length === 2 && '1fr 1fr',
    gridTemplateRows:props.ques.answers.length === 2 && '1fr'
  }
  return (
    <div 
      className='question-container'
      style={styles}
    >
      <h3 className='question-title'>
        {props.index + 1}. {decode(props.ques.question)}
      </h3>
      <div className='answers' style={setStyle}>
          { answersElement }
      </div>
    </div>
  )
}
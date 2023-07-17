import React from 'react'
import AdjustSettings from './AdjustSettings'

export default function Menu(props) {
  return (
    <div className="menu">
      <h1 className='title'>Quizzical</h1>
      <span className='description'>Are you ready to put your knowladge into test?😊</span>

      <h3 className="settings">Adjust Settings:</h3>
        
      <AdjustSettings 
        setNumberOfQuestions={props.setNumberOfQuestions}
        setDifficulty={props.setDifficulty}
        categoriesArray={props.categoriesArray}
        setCategoriesArray={props.setCategoriesArray}
      />

      <button 
        className='start-button' 
        onClick={() => props.start()}
      >
        Start Quizzical
      </button>
    </div>
  )
}

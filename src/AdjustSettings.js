import React,{ useEffect,useState } from 'react'

const AdjustSettings = (props) => {
  const [typeArray, setTypeArray ] = useState([])
  const [difficultiesArray, setDifficultiesArray ] = useState([])
  const [numberArray, setNumberArray ] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories(){
      // const response = await fetch('https://opentdb.com/api_category.php')
      // let data = await response.json()
      // data = data.trivia_categories.map((category) => {
      //     return {name: category.name}
      // })
      // props.setCategoriesArray([{name:"Any Category"}].concat(data))
      // const array = ['General Knowledge','Entertainment: Books','Entertainment: Film']
      const typeArray = ['Any Type','multiple','boolean']
      setTypeArray(typeArray)
      const difficultiesArray = ['Any Difficulty','easy' ,'medium' ,'hard']
      setDifficultiesArray(difficultiesArray)
      const numberArray = [5 ,10 ,15, 20, 25]
      setNumberArray(numberArray)
      
  }

  const [formData, setFormData] = useState(
    {
      category: "Any Type",
      difficulty: "Any Difficulty",
      number: 5
    }
  )
  // console.log(formData.category)

  useEffect(() => {
    props.setCategoriesArray(formData.category)
    props.setDifficulty(formData.difficulty)
    props.setNumberOfQuestions(formData.number)

  }, [formData.category,formData.difficulty,formData.number])

  function handleChange(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })
  }

  return (
    <div className="settings-container"> 

      <div className="number option">
          <label htmlFor="option">Select number of questions:</label>
          <select 
            id="option" 
            value={formData.number}
            onChange={handleChange}
            name="number"
          >
            <option value={numberArray[0]}>
              {numberArray[0]}
            </option>
            <option value={numberArray[1]}>
              {numberArray[1]}
            </option>
            <option value={numberArray[2]}>
              {numberArray[2]}
            </option>
            <option value={numberArray[3]}>
              {numberArray[3]}
            </option>
            <option value={numberArray[4]}>
              {numberArray[4]}
            </option>
          </select>
      </div>
      
      <div className="difficulty option">
          <label htmlFor="option">Select a difficulty:</label>
            <select 
              id="option" 
              value={formData.difficulty}
              onChange={handleChange}
              name="difficulty"
            >
              <option value={difficultiesArray[0]}>
                {difficultiesArray[0]}
              </option>
              <option value={difficultiesArray[1]}>
                {difficultiesArray[1]}
              </option>
              <option value={difficultiesArray[2]}>
                {difficultiesArray[2]}
              </option>
              <option value={difficultiesArray[3]}>
                {difficultiesArray[3]}
              </option>
            </select>
      </div>

      <div className="category option">
          <label htmlFor="option">Select a category:</label>
            <select 
              id="option" 
              value={formData.category}
              onChange={handleChange}
              name="category"
            >
              <option value={typeArray[0]}>
                {typeArray[0]}
              </option>
              <option value={typeArray[1]}>
                {typeArray[1]}
              </option>
              <option value={typeArray[2]}>
                {typeArray[2]}
              </option>
            </select>
      </div>
    
    </div> 
  )
}

export default AdjustSettings
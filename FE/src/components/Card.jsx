import React, { useContext } from 'react'
import './Card.css'
import { Context } from '../Context/Context'


// A single object is comming 
const Card = ({data}) => {
  
  const {setInput  , generateAns} = useContext(Context);
  const clickHandler = () => {
       setInput(data.desc);
      //  generateAns();
  }
  
  return (
    <div onClick={clickHandler} className='card'>
     <p>{data.desc}</p>
     <img src={data.img}/>
    </div>
  )
}

export default Card
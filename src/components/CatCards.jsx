import React from 'react'

export default function CatCards(props) {
  return (
    <div className='card-container'>
      <img src={props.img} alt="" />
      <div style={{textAlign: 'center'}} className="card-info">
        <h3>{props.name}</h3>
        <small>{props.breed}</small>
      </div>
    </div>
  )
}

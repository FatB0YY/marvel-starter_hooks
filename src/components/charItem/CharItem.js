import React from 'react'
import './charItem.scss'

const CharItem = React.forwardRef((props, ref) => {
  return (
    <li className='char__item' ref={ref}>
      <img src={props.thumbnail} alt={props.name} style={props.style} />
      <div className='char__name'>{props.name}</div>
    </li>
  )
})

export default CharItem

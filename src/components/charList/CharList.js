import './charList.scss'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService'
// import CharItem from '../charItem/CharItem'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import React, { useState, useEffect, useRef } from 'react'

const CharList = (props) => {
  const [charArray, setCharArray] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [newItemsLoading, setNewItemsLoading] = useState(false)
  const [offset, setOffset] = useState(210)
  const [charEnded, setCharEnded] = useState(false)

  const marvelService = new MarvelService()

  useEffect(() => {
    onRequest()
  }, [])

  const onRequest = (offset) => {
    onCharListLoading()
    marvelService.getAllCharacters(offset).then(onCharListLoaded).catch(onError)
  }

  const onCharListLoading = () => {
    setNewItemsLoading(true)
  }

  const onCharListLoaded = (newCharArray) => {
    let ended = false
    if (newCharArray < 9) {
      ended = true
    }

    setCharArray((charArray) => [...charArray, ...newCharArray])
    setLoading((loading) => false)
    setNewItemsLoading((newItemsLoading) => false)
    setOffset((item) => item + 9)
    setCharEnded((charEnded) => false)
  }

  const onError = () => {
    setError(true)
    setLoading((loading) => false)
  }

  const itemRefs = useRef([])
  // itemRefs.current = []

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    )
    itemRefs.current[id].classList.add('char__item_selected')
    itemRefs.current[id].focus()
  }

  function renderItems(arr) {
    const items = arr.map((item, idx) => {
      let styleImg = { objectFit: 'cover' }
      if (item.thumbnail.includes('image_not_available')) {
        styleImg = { objectFit: 'contain' }
      }

      return (
        // <CharItem  />
        <li
          key={item.id}
          className='char__item'
          tabIndex={0}
          ref={(el) => (itemRefs.current[idx] = el)}
          onClick={() => {
            props.onCharSelected(item.id)
            focusOnItem(idx)
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelected(item.id)
              focusOnItem(idx)
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={styleImg} />
          <div className='char__name'>{item.name}</div>
        </li>
      )
    })

    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className='char__grid'>{items}</ul>
  }

  const items = renderItems(charArray)

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error) ? items : null

  return (
    <div className='char__list'>
      {errorMessage}
      {spinner}
      {content}
      <button
        onClick={() => onRequest(offset)}
        disabled={newItemsLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        className='button button__main button__long'
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  )
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
}

export default CharList

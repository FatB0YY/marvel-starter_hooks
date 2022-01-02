import './comicsList.scss'
import { Link } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import React, { useState, useEffect } from 'react'

const ComicsList = (props) => {
  const [comicsArray, setComicsArray] = useState([])
  const [newItemsLoading, setNewItemsLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [comicEnded, setComicEnded] = useState(false)

  const { error, loading, getAllComics } = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
    getAllComics(offset).then(onComicListLoaded)
  }

  const onComicListLoaded = (newComicsArray) => {
    let ended = false
    if (newComicsArray < 8) {
      ended = true
    }

    setComicsArray([...comicsArray, ...newComicsArray])
    setNewItemsLoading(false)
    setOffset(offset + 8)
    setComicEnded(ended)
  }

  function renderItems(arr) {
    const items = arr.map((item, idx) => {
      let styleImg = { objectFit: 'cover' }
      if (item.thumbnail.includes('image_not_available')) {
        styleImg = { objectFit: 'contain' }
      }
      // console.log(idx);
      return (
        <li key={idx} className='comics__item'>
          <Link to={`/comics/${item.id}`}>
            <img
              style={styleImg}
              src={item.thumbnail}
              alt={item.title}
              className='comics__item-img'
            />
            <div className='comics__item-name'>{item.title}</div>
            <div className='comics__item-price'>{item.price}</div>
          </Link>
        </li>
      )
    })

    return <ul className='comics__grid'>{items}</ul>
  }

  const items = renderItems(comicsArray)
  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading && !newItemsLoading ? <Spinner /> : null

  return (
    <div className='comics__list'>
      {errorMessage}
      {spinner}
      {items}
      <button
        onClick={() => onRequest(offset)}
        disabled={newItemsLoading}
        style={{ display: comicEnded ? 'none' : 'block' }}
        className='button button__main button__long'
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  )
}

export default ComicsList

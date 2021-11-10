import './charInfo.scss'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'
import { Fragment, useState, useEffect } from 'react'

const CharInfo = (props) => {
  const [char, setChar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const marvelService = new MarvelService()

  useEffect(() => {
    updateChar()
  }, [props.charId])

  // componentDidCatch(error, info) {
  //   console.log(error, info)
  //   this.setState({ error: true })
  // }

  const updateChar = () => {
    const { charId } = props
    if (!charId) return
    onCharLoading()
    marvelService.getCharacter(charId).then(onCharLoaded).catch(onError)
  }

  const onCharLoaded = (char) => {
    setLoading(false)
    setChar(char)
  }

  const onCharLoading = () => {
    setLoading(true)
  }

  const onError = () => {
    setError(true)
    setLoading(false)
  }

  const skeleton = char || loading || error ? null : <Skeleton />
  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !char) ? <View char={char} /> : null

  return (
    <div className='char__info'>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char

  let styleImg = { objectFit: 'cover' }
  if (char.thumbnail.includes('image_not_available')) {
    styleImg = { objectFit: 'contain' }
  }

  const comicsRender = (length, array) => {
    if (!array.length) return 'no comics'

    if (length === 'all') {
      return array.map((item, idx) => {
        return (
          <li key={idx} className='char__comics-item'>
            {item.name}
          </li>
        )
      })
    }

    if (length > 0) {
      const newArray = []
      for (let i = 0; i < length; i++) {
        newArray.push(
          <li key={i} className='char__comics-item'>
            {array[i].name}
          </li>
        )
      }
      return newArray
    } else {
      return 'negative meaning'
    }
  }

  const comicsArray = comicsRender('all', comics)

  return (
    <Fragment>
      <div className='char__basics'>
        <img style={styleImg} src={thumbnail} alt={name} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>{comicsArray}</ul>
    </Fragment>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo

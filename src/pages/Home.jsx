import { Fragment, useState } from 'react'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import RandomChar from '../components/randomChar/RandomChar'
import CharList from '../components/charList/CharList'
import CharInfo from '../components/charInfo/CharInfo'
import decoration from '../resources/img/vision.png'
import CharSearchForm from '../components/CharSearchForm/CharSearchForm';

const Comics = () => {
  const [selectedChar, setSelectedChar] = useState(null)

  const onCharSelected = (id) => {
    setSelectedChar(id)
  }

  return (
    <Fragment>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className='char__content'>
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className='bg-decoration' src={decoration} alt='vision' />
    </Fragment>
  )
}

export default Comics

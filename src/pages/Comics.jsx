import { Fragment } from 'react'
import AppBanner from '../components/appBanner/AppBanner'
import ComicsList from '../components/comicsList/ComicsList'

const Comics = () => {
  return (
    <Fragment>
      <AppBanner />
      <ComicsList />
    </Fragment>
  )
}

export default Comics
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Spinner from '../spinner/Spinner'
const Page404 = lazy(() => import('../../pages/404'))
const Home = lazy(() => import('../../pages/Home'))
const Comics = lazy(() => import('../../pages/Comics'))
const Layout = lazy(() => import('../../pages/Layout'))
const SingleComic = lazy(() => import('../../pages/SingleComic'))

const App = () => {
  return (
    <div className='app'>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/comics' element={<Comics />} />
            <Route path='/comics/:comicId' element={<SingleComic />} />
            <Route path='*' element={<Page404 />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App

// https://youtu.be/ApftxkYnXdo

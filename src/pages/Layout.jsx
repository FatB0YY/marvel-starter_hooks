import { Fragment, Suspense, lazy } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './layout.scss'

const Layout = () => {
  return (
    <Fragment>
      <header className='app__header'>
        <h1 className='app__title'>
          <NavLink to='/'>
            <span>Marvel</span> information portal
          </NavLink>
        </h1>
        <nav className='app__menu'>
          <ul>
            <li>
              <NavLink to='/comics'>Comics</NavLink>
            </li>
            <li>
              <NavLink to='/'>Characters</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </Fragment>
  )
}

export default Layout

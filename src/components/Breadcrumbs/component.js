/* @flow */
import React from 'react'
import Link from 'redux-first-router-link'

type Props = {
  items: Array<any>
}

const Breadcrumbs = ({ items }: Props) => (
  <ul className='list-inline my-0 d-md-inline-flex d-none'>
    <li className='list-inline-item'>
      <Link to='/'>
        <i className='fa fa-home' aria-hidden='true' /> React-Drupal
      </Link>
    </li>
    {items}
  </ul>
)

export default Breadcrumbs

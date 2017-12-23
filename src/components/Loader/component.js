/* @flow */
import React from 'react'
import './styles.scss'
import loader from './pie.svg'

export default ({ fullPage = false, noOffset = false, fixed = true, size = false }: Object) => (
  <div className={`loader ${fullPage ? 'fullpage' : ''} ${noOffset ? 'no-offset' : ''} ${!fixed ? 'not-fixed' : ''} ${size ? size : ''}`}><img alt='Loader' src={loader} /></div>
)

/* @flow */
import { NOT_FOUND } from 'redux-first-router'

export const goToPage = (type: string, category: string) => ({
  type,
  payload: category && { category }
})

export const goHome = () => ({
  type: 'HOME'
})

export const goToAdmin = () => ({
  type: 'ADMIN'
})

export const goToSubpage = () => ({
  type: 'SUBPAGE'
})

export const notFound = () => ({
  type: NOT_FOUND
})

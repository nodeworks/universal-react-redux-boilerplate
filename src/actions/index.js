/* @flow */
import { NOT_FOUND } from 'redux-first-router'

export function goToPage(type: string, category: string) {
  return {
    type,
    payload: category && { category }
  }
}

export function goHome() {
  return {
    type: 'DASHBOARD'
  }
}

export function goToAdmin() {
  return {
    type: 'DASHBOARD'
  }
}

export function notFound() {
  return {
    type: NOT_FOUND
  }
}

export function apiRequesting(entity: string) {
  return {
    type: 'API_REQUESTING',
    entity
  }
}

export function apiProgress(data: any) {
  return {
    type: 'API_DATA',
    data
  }
}

export function apiComplete(entity: string, res: Object) {
  return {
    type: 'API_COMPLETE',
    entity,
    results: res
  }
}

export function apiError(entity: string, err: Object) {
  return {
    type: 'API_ERROR',
    entity,
    err
  }
}

/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'
import Loading from './components/Loading'
import Error from './components/Error'
import isLoading from './selectors/isLoading'
import PageLayout from './layouts/PageLayout'
import './assets/styles/main.scss'

type Props = {
  page: string,
  isLoading: boolean
}

const UniversalComponent = universal(({ page }: Props) => (
  import(`./pages/${page}`)
), {
  minDelay: 500,
  loading: Loading,
  error: Error
})

const Switcher = ({ page, isLoading }: Props) => (
  <PageLayout>
    <UniversalComponent page={page} isLoading={isLoading} />
  </PageLayout>
)

const mapState = ({ page, ...state }) => ({
  page,
  isLoading: isLoading(state)
})

export default connect(mapState)(Switcher)

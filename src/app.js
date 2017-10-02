/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'
import { TransitionGroup, Transition } from 'transition-group'
import Loader from './components/Loader'
import Error from './components/Error'
import isLoading from './selectors/isLoading'
import PageLayout from './layouts/PageLayout'
import './assets/styles/main.scss'

type Props = {
  page: string,
  isLoading: boolean
}

const UniversalComponent = universal(({ page }: Props) => import(`./pages/${page}`), {
  minDelay: 500, // Minimum time the loading component shows
  alwaysDelay: true, // Always delay and not just the first time
  loadingTransition: true, // Show the loading component
  timeout: 15000, // Miliseconds before error component is displayed
  loading: Loader, // Loading component
  error: Error // Error component
})

const Switcher = ({ page, direction, isLoading }: Props) => (
  <PageLayout>
    <TransitionGroup
      className={`switcher ${direction}`}
      duration={500}
      prefix='fade'
    >
      <Transition key={page}>
        <UniversalComponent page={page} isLoading={isLoading} />
      </Transition>
    </TransitionGroup>
  </PageLayout>
)

const mapStateToProps = ({ page, direction, ...state }) => ({
  page,
  direction,
  isLoading: isLoading(state)
})

export default connect(mapStateToProps)(Switcher)

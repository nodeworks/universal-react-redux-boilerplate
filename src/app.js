/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
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
  loading: <Loader fullPage noOffset />, // Loading component
  error: Error // Error component
})

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={700}
    classNames='fade'
    onEntering={() => {$('footer').hide()}}
    onEntered={() => {$('footer').fadeIn()}}
  >
    {children}
  </CSSTransition>
)

const Switcher = ({ page, isLoading }: Props) => (
  <PageLayout page={page}>
    <TransitionGroup className={'switcher'}>
      <Fade key={page}>
        <UniversalComponent page={page} isLoading={isLoading} />
      </Fade>
    </TransitionGroup>
  </PageLayout>
)

const mapStateToProps = ({ page, direction, ...state }) => ({
  page,
  direction,
  isLoading: isLoading(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Switcher)

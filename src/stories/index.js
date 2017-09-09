/* @flow */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withNotes } from '@storybook/addon-notes'
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import createHistory from 'history/createBrowserHistory'
import Header from '../components/Header'
import configureStore from '../config/configureStore'

// Global CSS
import '../assets/styles/main.scss'

const history = createHistory()
const { store } = configureStore(history)

const stories = storiesOf('Header', module)
stories.addDecorator(withKnobs)

const optionsIn = [
  'bounceIn',
  'bounceInDown',
  'fadeIn'
]

const optionsOut = [
  'bounceOut',
  'bounceOutUp',
  'fadeOut'
]

stories.add('Header', withNotes('A very simple component')(() => (
  <Provider store={store}>
    <div>
      <ReduxToastr
        timeOut={number('timeOut', 4000)}
        newestOnTop={boolean('newestOnTop', true)}
        preventDuplicates={boolean('preventDuplicates', true)}
        position='top-right'
        transitionIn={select('transitionIn', optionsIn, 'bounceIn')}
        transitionOut={select('transitionOut', optionsOut, 'bounceOut')}
        progressBar={boolean('progressBar', true)}
      />
      <Header />
    </div>
  </Provider>
)))

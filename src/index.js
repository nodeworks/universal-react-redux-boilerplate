/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import ReduxToastr from 'react-redux-toastr'
import App from './app'
import configureStore from './config/configureStore'

const history = createHistory()
const { store } = configureStore(history, window.REDUX_STATE)

const render = App => {
  const root = document.getElementById('root')

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <div>
          <App />
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position='top-right'
            transitionIn='bounceIn'
            transitionOut='bounceOut'
            progressBar
          />
        </div>
      </Provider>
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./app', () => {
    const App = require('./app').default // eslint-disable-line global-require
    render(App)
  })
}

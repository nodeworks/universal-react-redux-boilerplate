import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Header from './component'

describe('Header', () => {
  const mockState = {
    app: {
      title: 'test'
    }
  }

  const mockStore = configureStore()
  const store = mockStore(mockState)
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    )
  })

  it('contains an h1 header tag', () => {
    expect(wrapper.find('h1')).to.have.length(1)
  })
})

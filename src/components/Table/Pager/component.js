/* @flow */
import React, { Component } from 'react'

type Props = {
  perPage: number,
  total: number,
  currentPage: number,
  changePage: Function
}

type State = {}

class Pager extends Component<Props, State> {
  props: Props
  state: State

  getShowingCount = () => {
    const start = (this.props.currentPage * this.props.perPage) - (this.props.perPage - 1)
    let end = start + this.props.perPage - 1

    if (end > this.props.total) {
      end = this.props.total
    }

    return (`${start} - ${end}`)
  }

  render() {
    let totalPages = this.props.total / this.props.perPage
    if (totalPages < 1) {
      totalPages = 1
    }

    let hasPrevious = this.props.currentPage > 1
    let hasNext = totalPages > this.props.currentPage

    return (
      <div>
        {this.props.total > this.props.perPage
          && (
            <div className='table-pager d-flex justify-content-end align-items-center pb-3'>
              <div className='mr-4'>{this.getShowingCount()} of {this.props.total}</div>
              <div className='mr-3'>
                <div onClick={() => { this.props.changePage('previous', hasPrevious, this.props.currentPage) }} className={`pager-back pager-item d-inline-flex ${hasPrevious ? '' : 'disabled'}`}>
                  <i className='fa fa-angle-left' aria-hidden='true' />
                </div>
                <div onClick={() => { this.props.changePage('next', hasNext, this.props.currentPage) }} className={`pager-forward pager-item d-inline-flex ${hasNext ? '' : 'disabled'}`}>
                  <i className='fa fa-angle-right' aria-hidden='true' />
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default Pager

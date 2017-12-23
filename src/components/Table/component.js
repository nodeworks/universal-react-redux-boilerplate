/* @flow */
import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import openSocket from 'socket.io-client'
import Pager from './Pager'
import Loader from '../Loader'
import OrderDetail from './OrderDetail'

const NoRowsDisplay = ({ isLoading, noDataText }) => {
  if (isLoading) {
    return (
      <Loader fixed={false} />
    )
  }

  return (
    <h3 className='p-5 font-italic'>{noDataText}</h3>
  )
}

type Props = {
  title: string,
  live: ?boolean,
  liveCallback: ?any,
  liveSubscriber: ?string,
  type: string,
  paginated: ?boolean,
  perPage: number,
  columns: Array<any>,
  rows: Array<any>,
  filters: ?any,
  noDataText: ?string,
  isLoading: boolean,
  onDetailClick: ?Function,
  detailsData: ?Array<any>
}

type State = {
  currentPage: number
}

class TableList extends Component<Props, State> {
  tableRef: any
  props: Props
  state: State = {
    currentPage: 1
  }

  static defaultProps = {
    perPage: 10,
    noDataText: 'No Data Yet!',
    liveSubscriber: '',
    liveCallback: false,
    live: false
  }

  componentDidMount() {
    const PORT = process.env.PORT || ''
    const socket = openSocket(`http://localhost:${PORT}`)
    socket.on(this.props.liveSubscriber, () => {
      if (this.props.live && this.props.liveCallback) {
        this.props.liveCallback()
      }
    })
  }

  changePage = (action: string, canChange: boolean, currentPage: number) => {
    if (canChange) {
      if (action === 'next') {
        this.setState({
          currentPage: currentPage + 1
        })
      } else {
        this.setState({
          currentPage: currentPage - 1
        })
      }
    }
  }

  render() {
    const cols = this.props.columns.map((col: string) => <div className='col' key={col}>{col}</div>)

    if (this.props.type === 'detailed') {
      cols.push(
        <div className='col' key='t-header-details' />
      )
    }

    const columnsWrapped = (<th><div className='row'>{cols}</div></th>)
    let rows = this.props.rows.map((row: Array<any>, key: number) => {
      let detailItem = false
      if (this.props.detailsData) {
        detailItem = this.props.detailsData.find(detail => {
          return detail.id === row[0]
        })

        if (detailItem === undefined) {
          detailItem = false
        }
      }

      const columns = row.map((col: string, index: number) => {
        if (this.props.type === 'detailed') {
          return (
            <div onClick={() => this.props.onDetailClick && this.props.onDetailClick(row, detailItem)} data-toggle='collapse' href={`#collapse${key}`} aria-expanded='false' aria-controls={`collapse${key}`} className='col toggler-row' key={col}>
              <span className='mobile-col-header d-none'>{this.props.columns[index]}:</span> {col}
            </div>
          )
        }

        return (
          <div className='col' key={col}>
            <span className='mobile-col-header d-none'>{this.props.columns[index]}:</span> {col}
          </div>
        )
      })

      let details
      if (this.props.type === 'detailed') {
        const uniqueKey = `${row[0]}-data`
        columns.push(
          <div onClick={() => this.props.onDetailClick && this.props.onDetailClick(row, detailItem)} className='col' key={uniqueKey}>
            <i data-toggle='collapse' href={`#collapse${key}`} aria-expanded='false' aria-controls={`collapse${key}`} className='fa fa-caret-left table-toggler' aria-hidden='true' />
          </div>
        )

        details = <OrderDetail item={detailItem} identifier={key} />
      }

      const uniqueKeyTr = `order-${row[1]}`
      return (
        <CSSTransition
          appear
          enter={false}
          exit={false}
          classNames='table-row'
          timeout={2000}
          key={uniqueKeyTr}
        >
          <tr>
            <td>
              <div className={`row ${this.props.type === 'detailed' ? 'detailed' : ''}`}>
                {columns}
              </div>
              {details}
            </td>
          </tr>
        </CSSTransition>
      )
    })

    const totalRows = rows.length
    let currentPage = this.state.currentPage
    if (this.props.paginated) {
      let start = (currentPage * this.props.perPage) - (this.props.perPage - 1)
      let end = start + this.props.perPage - 1

      if (end > totalRows) {
        end = totalRows
      }

      if (start > totalRows) {
        currentPage = 1
        start = 1
      }

      if ((end - start) !== this.props.perPage) {
        end = start + this.props.perPage - 1
      }

      rows = rows.slice(start - 1, end)
    }

    return (
      <div className='chart-wrap pt-3 mb-5 text-center px-3 table-list'>
        <h2 className='mb-4'>{this.props.title} { this.props.live && <span className='live-span'>Live</span> }</h2>
        {this.props.filters ? (<div className='filters-wrapper'>{this.props.filters}</div>) : ''}

        {!rows.length
          ? (
            <NoRowsDisplay isLoading={this.props.isLoading} noDataText={this.props.noDataText} />
          )

          : (
            <div>
              <Table ref={table => { this.tableRef = table }} className='text-left' striped responsive>
                <thead>
                  <tr>
                    {columnsWrapped}
                  </tr>
                </thead>
                <TransitionGroup
                  appear
                  enter
                  component='tbody'
                >
                  {rows}
                </TransitionGroup>
              </Table>
              {this.props.paginated
                && <Pager perPage={this.props.perPage} total={totalRows} currentPage={currentPage} changePage={this.changePage} />
              }
            </div>
          )

        }

      </div>
    )
  }
}

export default TableList
